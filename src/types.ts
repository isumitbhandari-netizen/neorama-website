export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  imageUrl: string;
  description: string;
  clientBrief?: string;
  deliverables?: string;
  year: string;
  customStats?: { label: string; value: string }[];
  vimeoIds?: string[];
  youtubeIds?: string[];
  galleryImages?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface ProposalRequest {
  projectName: string;
  email: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  description: string;
}
