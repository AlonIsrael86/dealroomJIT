'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Briefcase, 
  Key, 
  Users,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/overview',
    label: 'סקירה כללית',
    icon: LayoutDashboard,
  },
  {
    href: '/rankings',
    label: 'מיקומים והזדמנויות',
    icon: TrendingUp,
  },
  {
    href: '/services',
    label: 'השירותים המומלצים',
    icon: Briefcase,
  },
  {
    href: '/access',
    label: 'מה אנחנו צריכים',
    icon: Key,
  },
  {
    href: '/about',
    label: 'מי אנחנו',
    icon: Users,
  },
];

interface SidebarProps {
  clientName?: string;
  domain?: string;
}

export function Sidebar({ clientName = 'לקוח', domain }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className="fixed right-0 top-0 z-40 h-screen w-64 bg-[#1E293B] flex flex-col"
      role="navigation"
      aria-label="תפריט ראשי"
    >
      {/* Primary Brand: Just In Time */}
      <div className="flex flex-col items-center justify-center px-6 py-6 border-b border-white/10">
        <p className="text-white/50 text-xs mb-2">מבית</p>
        <Link href="/overview" aria-label="חזרה לסקירה כללית">
          <Image
            src="/justintime-white-logo-transparent.png"
            alt="Just In Time Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Client Info */}
      <div className="px-6 py-4 border-b border-white/10">
        <p className="text-white/60 text-xs mb-1">הצעה עבור</p>
        <p className="text-white font-medium text-sm">{clientName}</p>
        {domain && (
          <a 
            href={`https://${domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-xs flex items-center gap-1 hover:text-blue-300 transition-colors mt-1 cursor-pointer"
            aria-label={`פתח את ${domain} בחלון חדש`}
          >
            {domain}
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-1" role="list">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Secondary Brand: Geoscale */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="flex flex-col items-center justify-center">
          <span className="text-white/40 text-xs mb-2">בשיתוף</span>
          <Image
            src="/Geoscale-white-logo-transparent.png"
            alt="Geoscale Logo"
            width={90}
            height={22}
            className="h-5 w-auto opacity-60 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </aside>
  );
}
