'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Briefcase, 
  Key, 
  Users,
  BarChart3,
  Search,
  X,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PageItem {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  emoji?: string;
}

const allPages: PageItem[] = [
  // SEO Dashboard Pages
  {
    href: '/overview',
    title: 'סקירה כללית',
    description: 'סקירה כללית של ביצועי האתר, KPIs וממצאים עיקריים',
    icon: LayoutDashboard,
    category: 'SEO Dashboard',
    emoji: '📊'
  },
  {
    href: '/rankings',
    title: 'מיקומים והזדמנויות',
    description: 'ניתוח מילות מפתח, נפחי חיפוש והזדמנויות קידום',
    icon: TrendingUp,
    category: 'SEO Dashboard',
    emoji: '📈'
  },
  {
    href: '/services',
    title: 'השירותים המומלצים',
    description: 'שירותי SEO מומלצים על בסיס הניתוח שבוצע',
    icon: Briefcase,
    category: 'SEO Dashboard',
    emoji: '💼'
  },
  {
    href: '/access',
    title: 'מה אנחנו צריכים',
    description: 'רשימת גישות נדרשות להתחלת העבודה',
    icon: Key,
    category: 'SEO Dashboard',
    emoji: '🔑'
  },
  {
    href: '/about',
    title: 'מי אנחנו',
    description: 'מידע על החברה, השירותים ותהליך העבודה',
    icon: Users,
    category: 'SEO Dashboard',
    emoji: '👥'
  },
  // SEO Reports / Client Dashboards
  {
    href: '/mb-ltd-seo-analysis.html',
    title: 'ניתוח SEO - MB-LTD.co.il',
    description: 'דשבורד ביצועים SEO מפורט עבור MB-LTD - ניתוח מילות מפתח, מתחרים והמלצות',
    icon: BarChart3,
    category: 'SEO Reports',
    emoji: '📊'
  },
  // BestLinks Tools
  {
    href: '/bestlinks-dashboard',
    title: 'BestLinks Dashboard',
    description: 'מעקב סטטוס פרסום מאמרים לאתרי מדיה - דאשבורד מאמרי בסטלינקס',
    icon: BarChart3,
    category: 'BestLinks',
    emoji: '📝'
  },
];

const categories = [
  { id: 'all', label: 'הכל', emoji: '🌐' },
  { id: 'SEO Dashboard', label: 'SEO Dashboard', emoji: '📊' },
  { id: 'SEO Reports', label: 'דוחות SEO', emoji: '📈' },
  { id: 'BestLinks', label: 'BestLinks', emoji: '📝' },
];

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPages = useMemo(() => {
    return allPages.filter(page => {
      const matchesSearch = 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || page.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const groupedPages = useMemo(() => {
    const groups: Record<string, PageItem[]> = {};
    filteredPages.forEach(page => {
      if (!groups[page.category]) {
        groups[page.category] = [];
      }
      groups[page.category].push(page);
    });
    return groups;
  }, [filteredPages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            מפת האתר
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            גישה לכל הכלים והדפים הזמינים באתר. מצאו את מה שאתם מחפשים במהירות
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="חפשו דף או כלי..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <span className="ml-2">{category.emoji}</span>
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        {filteredPages.length > 0 && (
          <div className="mb-6 text-center text-sm text-slate-600">
            נמצאו <span className="font-semibold text-slate-900">{filteredPages.length}</span> דפים
          </div>
        )}

        {/* Pages Grid by Category */}
        {Object.keys(groupedPages).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedPages).map(([category, pages], categoryIndex) => (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span>{categories.find(c => c.id === category)?.emoji || '📁'}</span>
                    {category}
                  </h2>
                  <p className="text-slate-500 mt-1">
                    {pages.length} {pages.length === 1 ? 'דף' : 'דפים'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pages.map((page, index) => {
                    const Icon = page.icon;
                    return (
                      <motion.div
                        key={page.href}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                      >
                        <Link href={page.href}>
                          <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 group">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                                  {page.emoji ? (
                                    <span className="text-2xl">{page.emoji}</span>
                                  ) : (
                                    <Icon className="w-6 h-6 text-blue-600" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {page.title}
                                  </h3>
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs bg-slate-100 text-slate-600"
                                  >
                                    {page.category}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                                {page.description}
                              </p>
                              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                                <span>גשו לדף</span>
                                <ExternalLink className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              לא נמצאו תוצאות
            </h3>
            <p className="text-slate-600">
              נסו לשנות את החיפוש או את הקטגוריה
            </p>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center text-sm text-slate-500"
        >
          <p>מפת האתר | Just In Time</p>
          <p className="mt-2">עודכון אחרון: {new Date().toLocaleDateString('he-IL')}</p>
        </motion.div>
      </div>
    </div>
  );
}

