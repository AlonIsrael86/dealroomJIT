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
      
      {/* Main content */}
      <main 
        className="min-h-screen lg:mr-64 pt-16 lg:pt-0"
        role="main"
        aria-label="תוכן עיקרי"
      >
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-6xl mx-auto lg:mx-0">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 sm:py-6 px-4 sm:px-10">
          <div className="max-w-6xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Just In Time. כל הזכויות שמורות.</span>
            <span className="text-center sm:text-right">הצעה זו הופקה באמצעות מערכת GeoScale</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
