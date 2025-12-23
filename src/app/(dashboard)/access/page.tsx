import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockSnapshot } from '@/lib/mockSnapshot';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Key
} from 'lucide-react';

const statusConfig = {
  missing: {
    label: 'חסר',
    icon: AlertCircle,
    color: 'bg-red-100 text-red-700 border-red-200',
    iconColor: 'text-red-500',
  },
  requested: {
    label: 'בבקשה',
    icon: Clock,
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    iconColor: 'text-amber-500',
  },
  received: {
    label: 'התקבל',
    icon: CheckCircle2,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    iconColor: 'text-emerald-500',
  },
};

export default function AccessPage() {
  const { accessItems } = mockSnapshot;

  const receivedCount = accessItems.filter(item => item.status === 'received').length;
  const totalCount = accessItems.length;
  const progressPercent = Math.round((receivedCount / totalCount) * 100);

  return (
    <div>
      <PageHeader 
        title="מה אנחנו צריכים"
        subtitle="כדי להתחיל בעבודה, אנחנו צריכים גישה לכלים הבאים"
      />

      {/* Progress Section */}
      <Card className="mb-8 bg-gradient-to-l from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Key className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">התקדמות הגישות</h3>
                <p className="text-sm text-slate-600">
                  <span className="ltr-nums">{receivedCount}</span> מתוך <span className="ltr-nums">{totalCount}</span> גישות התקבלו
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              <span className="ltr-nums">{progressPercent}%</span>
            </div>
          </div>
          <Progress 
            value={progressPercent} 
            className="h-3"
            aria-label={`התקדמות: ${progressPercent}%`}
          />
        </CardContent>
      </Card>

      {/* Access Items Grid */}
      <div className="grid gap-4">
        {accessItems.map((item) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;

          return (
            <Card 
              key={item.id}
              className={`transition-all duration-200 ${
                item.status === 'received' 
                  ? 'bg-emerald-50/50 border-emerald-200' 
                  : item.status === 'requested'
                    ? 'bg-amber-50/50 border-amber-200'
                    : ''
              }`}
            >
              <CardContent className="py-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      item.status === 'received' 
                        ? 'bg-emerald-100' 
                        : item.status === 'requested'
                          ? 'bg-amber-100'
                          : 'bg-slate-100'
                    }`}>
                      <StatusIcon 
                        className={`w-5 h-5 ${config.iconColor}`} 
                        aria-hidden="true" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{item.name}</h3>
                        <span className="text-sm text-slate-400">({item.nameEn})</span>
                      </div>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={config.color}>
                      {config.label}
                    </Badge>
                    
                    {item.status === 'missing' && item.ctaUrl && (
                      <Button 
                        variant="default" 
                        size="sm"
                        className="cursor-pointer"
                        asChild
                      >
                        <a 
                          href={item.ctaUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {item.ctaLabel}
                          <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                    
                    {item.status === 'missing' && !item.ctaUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="cursor-pointer"
                      >
                        {item.ctaLabel}
                      </Button>
                    )}

                    {item.status === 'requested' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled
                        className="opacity-60"
                      >
                        {item.ctaLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Instructions */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-slate-900 mb-4">איך להעניק גישה?</h3>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-xs">1</span>
              <p>לחצו על כפתור &quot;הענק גישה&quot; ליד כל כלי</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-xs">2</span>
              <p>הוסיפו את <strong className="text-slate-700">hello@justintime.co.il</strong> כמשתמש עם הרשאות צפייה (Viewer)</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-xs">3</span>
              <p>עדכנו אותנו לאחר הענקת הגישה ואנחנו נאשר קבלה</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




