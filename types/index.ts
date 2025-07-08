export interface ScheduledPost {
  id: string;
  content: string;
  scheduledFor: string;
  status: 'pending' | 'published' | 'failed';
  createdAt: string;
  publishedAt?: string;
  platform: 'twitter' | 'facebook' | 'linkedin';
}

export interface UserCredits {
  totalCredits: number;
  raffleEntries: number;
  lastUpdated: string;
  isPro?: boolean;
  isPremiun?: boolean;
  subscriptionStatus?: 'active' | 'inactive' | 'cancelled';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}