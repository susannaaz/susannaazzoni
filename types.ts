export enum PublicationType {
  JOURNAL = 'Journal Article',
  CONFERENCE = 'Conference Proceeding',
  PREPRINT = 'Preprint'
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  url?: string;
  pdfUrl?: string;
  abstract?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Collaboration {
  id: string;
  name: string;
  description: string;
  contribution: string;
  imageUrl: string;
  url: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  category: 'Award' | 'Talk' | 'Press' | 'Publication';
  content: string;
}

export interface Talk {
  id: string;
  date: string;
  title: string;
  event: string;
  location?: string;
  type: 'Invited' | 'Contributed' | 'Seminar' | 'Colloquium' | 'Poster' | 'Talk' | 'Seminar' | 'Colloquium' | 'Fireslide' | 'Poster';
  url?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}