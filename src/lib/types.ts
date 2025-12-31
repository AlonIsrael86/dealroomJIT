// SEO Proposal Dashboard Types

export type AccessStatus = 'missing' | 'requested' | 'received';
export type KeywordIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export interface KeywordData {
  keyword: string;
  searchVolumeIL: number;
  searchVolumeGlobal: number;
  currentPosition: number | null; // null = not ranked
  intent: KeywordIntent;
  isMoneyKeyword?: boolean;
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: 'technical' | 'content' | 'ai' | 'links' | 'local';
}

export interface ServicePackage {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  includes: string[];
  whyItMatters: string;
  icon: string;
  isRecommended?: boolean;
}

export interface AccessItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  status: AccessStatus;
  ctaLabel: string;
  ctaUrl?: string;
}

export interface ClientInfo {
  domain: string;
  companyName: string;
  contactName?: string;
  industry: string;
  proposalDate: string;
}

export interface TrafficKPI {
  label: string;
  value: string | number;
  change?: number; // percentage
  trend?: 'up' | 'down' | 'neutral';
  isPlaceholder?: boolean; // true if we don't have access yet
}

export interface ProposalSnapshot {
  client: ClientInfo;
  kpis: TrafficKPI[];
  keywords: KeywordData[];
  findings: Finding[];
  recommendedServices: ServicePackage[];
  accessItems: AccessItem[];
  opportunitySummary: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  services: string[];
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}







