import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockSnapshot } from '@/lib/mockSnapshot';
import { 
  Search, 
  Bot, 
  FileText, 
  MapPin, 
  Zap,
  CheckCircle2,
  Star
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Search,
  Bot,
  FileText,
  MapPin,
  Zap,
};

export default function ServicesPage() {
  const { recommendedServices } = mockSnapshot;

  return (
    <div>
      <PageHeader 
        title="השירותים המומלצים"
        subtitle="על בסיס הניתוח שערכנו, אלו השירותים שיביאו את התוצאות הטובות ביותר"
      />

      {/* Services Grid */}
      <div className="grid gap-6">
        {recommendedServices.map((service) => {
          const Icon = iconMap[service.icon] || Search;
          
          return (
            <Card 
              key={service.id}
              className={`transition-all duration-200 hover:shadow-lg cursor-default ${
                service.isRecommended 
                  ? 'border-blue-200 bg-gradient-to-l from-blue-50/50 to-white ring-1 ring-blue-100' 
                  : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      service.isRecommended 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        {service.isRecommended && (
                          <Badge className="bg-blue-600 text-white">
                            <Star className="w-3 h-3 ml-1" aria-hidden="true" />
                            מומלץ
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm text-slate-500">
                        {service.nameEn}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* What's Included */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
                      מה כולל
                    </h4>
                    <ul className="space-y-2">
                      {service.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 
                            className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" 
                            aria-hidden="true" 
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why It Matters */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                      למה זה חשוב
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.whyItMatters}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Note */}
      <div className="mt-8 p-6 bg-slate-100 rounded-xl border border-slate-200">
        <p className="text-slate-600 text-sm text-center">
          <strong className="text-slate-700">שימו לב:</strong>{' '}
          המחירים והפרטים המדויקים נדונים בשיחה אישית לאחר קבלת הגישות ובניית תוכנית עבודה מותאמת.
        </p>
      </div>
    </div>
  );
}




