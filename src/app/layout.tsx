import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "הצעת שירותי SEO | JustInTime Marketing",
  description: "הצעה מותאמת אישית לשירותי קידום אתרים, SEO ו-GEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
