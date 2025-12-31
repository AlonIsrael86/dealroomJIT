import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BestLinks Dashboard | מעקב פרסומים',
  description: 'מעקב סטטוס פרסום מאמרים לאתרי מדיה - דאשבורד מאמרי בסטלינקס',
};

export default function BestLinksDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


