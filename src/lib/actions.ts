'use server'

import { optimize } from 'svgo';

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
              { 'stroke': 'currentColor' },
            ],
          },
        },
      ],
    });

    const cleanSvg = result.data;

    
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
import { cn } from "@/lib/utils"; // Tailwind merge yardımcısı (eğer varsa)

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
    return `// Hata: SVG dönüştürülemedi. Lütfen kodun doğruluğunu kontrol edin.\n// ${error}`;
  }
}