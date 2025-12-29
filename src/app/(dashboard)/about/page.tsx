import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { companyInfo } from '@/lib/mockSnapshot';
import { 
  Mail, 
  Phone, 
  Globe,
  ArrowLeft
} from 'lucide-react';

export default function AboutPage() {
  const { name, tagline, description, services, processSteps, faqs, contact } = companyInfo;

  return (
    <div>
      <PageHeader 
        title="מי אנחנו"
        subtitle={tagline}
      />

      {/* Company Intro */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="prose prose-slate max-w-none">
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Overview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">השירותים שלנו</h2>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2"
            >
              {service}
            </Badge>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>איך עובדים איתנו</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    <span className="ltr-nums">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
                {step.step < processSteps.length && (
                  <div className="hidden lg:block absolute top-5 left-0 -translate-x-full">
                    <ArrowLeft className="w-6 h-6 text-slate-300" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>שאלות נפוצות</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right hover:text-blue-600 cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-gradient-to-l from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle>צרו קשר</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">אימייל</p>
                <p className="font-medium text-slate-900">{contact.email}</p>
              </div>
            </a>

            <a 
              href={`tel:${contact.phone.replace(/-/g, '')}`}
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">טלפון</p>
                <p className="font-medium text-slate-900 ltr-nums">{contact.phone}</p>
              </div>
            </a>

            <a 
              href={`https://${contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">אתר</p>
                <p className="font-medium text-slate-900">{contact.website}</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}





