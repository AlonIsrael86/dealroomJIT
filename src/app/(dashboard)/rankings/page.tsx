import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockSnapshot } from '@/lib/mockSnapshot';
import { TrendingUp, Target, Search, DollarSign } from 'lucide-react';

const intentLabels: Record<string, { label: string; color: string }> = {
  informational: { label: 'מידע', color: 'bg-blue-100 text-blue-700' },
  commercial: { label: 'מסחרי', color: 'bg-purple-100 text-purple-700' },
  transactional: { label: 'רכישה', color: 'bg-emerald-100 text-emerald-700' },
  navigational: { label: 'ניווט', color: 'bg-slate-100 text-slate-700' },
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString('he-IL');
}

function PositionBadge({ position }: { position: number | null }) {
  if (position === null) {
    return (
      <span className="text-slate-400 font-medium">—</span>
    );
  }

  const getColor = (pos: number) => {
    if (pos <= 3) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (pos <= 10) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (pos <= 30) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <Badge variant="outline" className={`${getColor(position)} font-mono`}>
      <span className="ltr-nums">{position}</span>
    </Badge>
  );
}

export default function RankingsPage() {
  const { keywords } = mockSnapshot;

  // Calculate stats
  const totalKeywords = keywords.length;
  const rankedKeywords = keywords.filter(k => k.currentPosition !== null).length;
  const topTenKeywords = keywords.filter(k => k.currentPosition !== null && k.currentPosition <= 10).length;
  const moneyKeywords = keywords.filter(k => k.isMoneyKeyword).length;
  const totalSearchVolume = keywords.reduce((sum, k) => sum + k.searchVolumeIL, 0);

  return (
    <div>
      <PageHeader 
        title="מיקומים והזדמנויות"
        subtitle="ניתוח מילות מפתח, נפחי חיפוש והזדמנויות קידום"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 ltr-nums">{totalKeywords}</p>
                <p className="text-sm text-slate-600">מילות מפתח</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Target className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 ltr-nums">{topTenKeywords}</p>
                <p className="text-sm text-slate-600">בעמוד ראשון</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 ltr-nums">{formatNumber(totalSearchVolume)}</p>
                <p className="text-sm text-slate-600">נפח חיפוש כולל</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-amber-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 ltr-nums">{moneyKeywords}</p>
                <p className="text-sm text-slate-600">מילות מפתח מסחריות</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>ניתוח מילות מפתח</span>
            <Badge variant="secondary" className="font-normal">
              <span className="ltr-nums">{rankedKeywords}</span> / <span className="ltr-nums">{totalKeywords}</span> ממוקמות
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="rtl-table">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">מילת מפתח</TableHead>
                  <TableHead className="text-center">נפח חיפוש (IL)</TableHead>
                  <TableHead className="text-center">נפח גלובלי</TableHead>
                  <TableHead className="text-center">מיקום נוכחי</TableHead>
                  <TableHead className="text-center">Intent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((keyword, index) => (
                  <TableRow 
                    key={index}
                    className={keyword.isMoneyKeyword ? 'bg-amber-50/50' : ''}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {keyword.isMoneyKeyword && (
                          <DollarSign 
                            className="w-4 h-4 text-amber-500 flex-shrink-0" 
                            aria-label="מילת מפתח מסחרית"
                          />
                        )}
                        <span>{keyword.keyword}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="ltr-nums font-mono text-sm">
                        {formatNumber(keyword.searchVolumeIL)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="ltr-nums font-mono text-sm text-slate-500">
                        {formatNumber(keyword.searchVolumeGlobal)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <PositionBadge position={keyword.currentPosition} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="secondary" 
                        className={intentLabels[keyword.intent].color}
                      >
                        {intentLabels[keyword.intent].label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-amber-500" aria-hidden="true" />
          <span>מילת מפתח מסחרית (Money Keyword)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">—</span>
          <span>לא ממוקמים (הזדמנות לקידום)</span>
        </div>
      </div>
    </div>
  );
}






