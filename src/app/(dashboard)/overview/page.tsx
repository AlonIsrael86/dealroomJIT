'use client';

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockSnapshot } from '@/lib/mockSnapshot';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Bot,
  Link2,
  Gauge,
  ChevronLeft,
  Lightbulb,
  Target,
} from 'lucide-react';
import Link from 'next/link';

// Mock trend data for the chart
const trendData = [
  { month: 'ינו׳', traffic: 1200 },
  { month: 'פבר׳', traffic: 1350 },
  { month: 'מרץ', traffic: 1100 },
  { month: 'אפר׳', traffic: 1450 },
  { month: 'מאי', traffic: 1680 },
  { month: 'יוני', traffic: 1520 },
  { month: 'יולי', traffic: 1750 },
  { month: 'אוג׳', traffic: 1890 },
];

const severityConfig = {
  high: {
    bg: 'bg-gradient-to-l from-red-50 to-red-100/50',
    border: 'border-red-200',
    icon: 'text-red-500',
    badge: 'bg-red-100 text-red-700 border-red-200',
    label: 'קריטי',
    gradient: 'from-red-400 to-red-600',
  },
  medium: {
    bg: 'bg-gradient-to-l from-amber-50 to-yellow-100/50',
    border: 'border-amber-200',
    icon: 'text-amber-500',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    label: 'בינוני',
    gradient: 'from-amber-400 to-amber-600',
  },
  low: {
    bg: 'bg-gradient-to-l from-blue-50 to-cyan-100/50',
    border: 'border-blue-200',
    icon: 'text-blue-500',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    label: 'נמוך',
    gradient: 'from-blue-400 to-blue-600',
  },
};

const categoryIcons: Record<string, React.ElementType> = {
  technical: Gauge,
  content: BarChart3,
  ai: Bot,
  links: Link2,
  local: Target,
};

function KPICard({ 
  kpi, 
  index 
}: { 
  kpi: typeof mockSnapshot.kpis[0]; 
  index: number;
}) {
  const isPlaceholder = kpi.isPlaceholder;
  const trendUp = kpi.trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm font-medium text-slate-500">
            {kpi.label}
          </span>
          {kpi.change !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              trendUp 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {trendUp ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="ltr-nums">{Math.abs(kpi.change)}%</span>
            </div>
          )}
        </div>

        {isPlaceholder ? (
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-lg font-semibold text-amber-700">
              {kpi.value}
            </span>
          </div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900 ltr-nums tabular-nums">
              {kpi.value}
            </span>
          </div>
        )}
      </CardContent>
    </motion.div>
  );
}

function FindingCard({ 
  finding, 
  index 
}: { 
  finding: typeof mockSnapshot.findings[0]; 
  index: number;
}) {
  const config = severityConfig[finding.severity];
  const CategoryIcon = categoryIcons[finding.category] || Gauge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      className={`relative rounded-xl border p-5 ${config.bg} ${config.border} transition-all duration-300 hover:shadow-lg cursor-default group`}
    >
      {/* Severity indicator line */}
      <div className={`absolute right-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b ${config.gradient}`} />

      <div className="flex items-start gap-4 pr-3">
        <div className={`p-2.5 rounded-xl ${
          finding.severity === 'high' 
            ? 'bg-red-100' 
            : finding.severity === 'medium'
              ? 'bg-amber-100'
              : 'bg-blue-100'
        } transition-transform duration-300 group-hover:scale-110`}>
          <CategoryIcon className={`w-5 h-5 ${config.icon}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-slate-900">
              {finding.title}
            </h3>
            <Badge variant="outline" className={`${config.badge} text-xs`}>
              {config.label}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {finding.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function OpportunitySummaryCard() {
  const { opportunitySummary } = mockSnapshot;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-xl"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">סיכום הזדמנויות</h3>
        </div>

        <p className="text-lg leading-relaxed text-blue-100 mb-6">
          {opportunitySummary}
        </p>

        <Link href="/rankings">
          <Button 
            variant="secondary" 
            className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg cursor-pointer group"
          >
            <span>צפה בניתוח מילות המפתח</span>
            <ChevronLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

function TrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">מגמת תנועה</h3>
            <p className="text-sm text-slate-500">8 חודשים אחרונים (נתונים לדוגמה)</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            <TrendingUp className="w-3 h-3 ml-1" />
            +58% צמיחה
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
                labelStyle={{ color: '#94A3B8', marginBottom: '8px' }}
                itemStyle={{ color: '#F8FAFC' }}
              />
              <Area
                type="monotone"
                dataKey="traffic"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#trafficGradient)"
                name="כניסות"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </motion.div>
  );
}

function NextStepsCard() {
  const steps = [
    { 
      label: 'השלמת גישות', 
      href: '/access',
      status: 'pending',
      description: 'נדרשות גישות נוספות להתחלת העבודה'
    },
    { 
      label: 'סקירת שירותים', 
      href: '/services',
      status: 'ready',
      description: 'צפו בשירותים המומלצים עבורכם'
    },
    { 
      label: 'יצירת קשר', 
      href: '/about',
      status: 'ready',
      description: 'לתיאום שיחה ותחילת עבודה'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">צעדים הבאים</h3>
      </div>
      <div>
        {steps.map((step, index) => (
          <Link
            key={step.label}
            href={step.href}
            className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              step.status === 'pending'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                {step.label}
              </p>
              <p className="text-sm text-slate-500 truncate">
                {step.description}
              </p>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-all group-hover:-translate-x-1" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function OverviewPage() {
  const { client, kpis, findings } = mockSnapshot;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">סקירה כללית</h1>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                {client.industry}
              </Badge>
            </div>
            <p className="text-slate-600">
              הצעת שירותי SEO עבור{' '}
              <span className="font-semibold text-blue-600">
                {client.companyName}
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <KPICard key={kpi.label} kpi={kpi} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <TrendChart />
        </div>

        {/* Next Steps - Takes 1 column */}
        <div>
          <NextStepsCard />
        </div>
      </div>

      {/* Findings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-xl">
              <Sparkles className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">ממצאים עיקריים</h2>
              <p className="text-sm text-slate-500">זיהינו {findings.length} נקודות לשיפור</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {findings.filter(f => f.severity === 'high').length} קריטיים
          </Badge>
        </div>

        <div className="grid gap-4">
          {findings.map((finding, index) => (
            <FindingCard key={finding.id} finding={finding} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Opportunity Summary */}
      <OpportunitySummaryCard />
    </div>
  );
}

