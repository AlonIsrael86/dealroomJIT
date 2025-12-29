import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מפת האתר | All Tools Index',
  description: 'גישה לכל הכלים והדפים הזמינים באתר - מפת האתר המלאה',
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

