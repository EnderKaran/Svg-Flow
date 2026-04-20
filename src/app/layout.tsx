import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

// UI için modern font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SVG-Flow | Modern SVG to React Converter",
  description: "Clean, optimized, and production-ready React components from your SVG files instantly.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          "min-h-screen bg-[#0B1120] text-slate-200 antialiased font-sans",
          geistSans.variable,
          jetbrainsMono.variable
        )}
      >
        {children}

        <Toaster 
          theme="dark" 
          position="bottom-right"
          expand={false}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}