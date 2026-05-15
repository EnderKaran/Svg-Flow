'use server'

import { optimize } from 'svgo';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { savedComponents, users } from '@/db/schema';
import { eq , and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * SVG kodunu optimize eder ve React (TSX) bileşenine dönüştürür.
 */
export async function convertSvgToComponent(rawSvg: string) {
  if (!rawSvg || rawSvg.trim() === '') {
    return '// Lütfen geçerli bir SVG kodu girin.';
  }

  try {
    const result = optimize(rawSvg, {
      multipass: true,
      plugins: [
        'preset-default',
        'removeDimensions',
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: 'svg',
            attributes: ['class', 'id'],
          },
        },
        {
          name: 'addAttributesToSVGElement',
          params: {
            attributes: [
              { fill: 'currentColor' },
              { stroke: 'currentColor' },
            ],
          },
        },
      ],
    });

    const cleanSvg = result.data;

    // React JSX Nitelik Dönüşümleri
    const jsxSvg = cleanSvg
      .replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/viewbox=/g, 'viewBox=');

    const componentName = "GeneratedIcon";

    const tsxOutput = `
import React from 'react';
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const ${componentName} = ({ 
  size = 24, 
  className, 
  ...props 
}: IconProps) => (
  ${jsxSvg.replace(
    '<svg',
    `<svg 
    width={size} 
    height={size} 
    className={cn("shrink-0", className)} 
    {...props}`
  )}
);

export default ${componentName};
`.trim();

    return tsxOutput;
  } catch (error) {
    console.error("Conversion Error:", error);
    return `// Hata: SVG dönüştürülemedi.\n// ${error}`;
  }
}

/**
 * Kullanıcıyı veritabanında senkronize eder (Upsert mantığı).
 */
async function getOrCreateUser() {
  const { userId: clerkId } = await auth();
  const user = await currentUser();

  if (!clerkId || !user) return null;

  // Önce kullanıcıyı kontrol et
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  if (existingUser) return existingUser;

  // Yoksa oluştur (User Sync)
  const [newUser] = await db.insert(users).values({
    clerkId,
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
  }).returning();

  return newUser;
}

/**
 * Üretilen bileşeni Neon veritabanına (The Vault) kaydeder.
 */
export async function saveToVault({
  name,
  rawSvg,
  optimizedTsx,
}: {
  name: string;
  rawSvg: string;
  optimizedTsx: string;
}) {
  try {
    const dbUser = await getOrCreateUser();

    if (!dbUser) {
      return { success: false, error: "Oturum açmanız gerekiyor." };
    }

    await db.insert(savedComponents).values({
      name: name || "Untitled Icon",
      rawSvg,
      optimizedTsx,
      userId: dbUser.id,
      category: "Icon",
    });

    // Vault sayfası verilerini tazelemek için cache'i temizle
    revalidatePath("/vault");

    return { success: true };
  } catch (error) {
    console.error("Database Save Error:", error);
    return { success: false, error: "Veritabanına kaydedilirken bir hata oluştu." };
  }
}

export async function getVaultComponents() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return [];

    // Önce dahili kullanıcı ID'sini alıyoruz
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (!user) return [];

    // Kullanıcıya ait tüm bileşenleri en yeni en üstte olacak şekilde getiriyoruz
    const results = await db.query.savedComponents.findMany({
      where: eq(savedComponents.userId, user.id),
      orderBy: (savedComponents, { desc }) => [desc(savedComponents.createdAt)],
    });

    return results;
  } catch (error) {
    console.error("Vault Fetch Error:", error);
    return [];
  }
}

export async function deleteVaultComponent(id: string) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return { success: false, error: "Oturum açmanız gerekiyor." };

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (!user) return { success: false, error: "Kullanıcı bulunamadı." };

    // Hem ID hem de userId kontrolü (Güvenlik için kritik)
    await db.delete(savedComponents).where(
      and(
        eq(savedComponents.id, id),
        eq(savedComponents.userId, user.id)
      )
    );

    revalidatePath("/vault");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Silme işlemi başarısız oldu." };
  }
}