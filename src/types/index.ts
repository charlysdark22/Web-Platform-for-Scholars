export interface User {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  role: 'autor' | 'revisor' | 'investigador';
  bio?: string;
  profileImage?: string;
  googleScholar?: string;
  orcid?: string;
  researchGate?: string;
  scopus?: string;
  linkedin?: string;
  otrasRedes?: string;
  createdAt: Date;
}

export interface Publication {
  id: string;
  title: string;
  abstract: string;
  content: string;
  authors: User[];
  year: number;
  doi?: string;
  journal?: string;
  keywords: string[];
  categories: string[];
  filePath?: string;
  fileName?: string;
  status: 'draft' | 'published' | 'under_review';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Comment {
  id: string;
  publicationId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  author?: string;
  yearFrom?: number;
  yearTo?: number;
  categories?: string[];
  keywords?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}