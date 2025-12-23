import { Sidebar } from '@/components/layout/Sidebar';
import { mockSnapshot } from '@/lib/mockSnapshot';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { client } = mockSnapshot;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar 
        clientName={client.companyName} 
        domain={client.domain}
      />
      <main 
        className="mr-64 min-h-screen"
        role="main"
        aria-label="תוכן עיקרי"
      >
        <div className="p-6 md:p-8 lg:p-10 max-w-6xl">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="mr-0 border-t border-slate-200 bg-white py-6 px-10">
          <div className="max-w-6xl flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Just In Time. כל הזכויות שמורות.</span>
            <span>הצעה זו הופקה באמצעות מערכת GeoScale</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
