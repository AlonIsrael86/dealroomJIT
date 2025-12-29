import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dealroom | Just In Time",
  description: "הצעות שירותי SEO אינטראקטיביות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
