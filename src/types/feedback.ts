export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

export interface FeedbackPost {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'bug' | 'improvement' | 'integration';
  status: 'under-review' | 'planned' | 'in-progress' | 'completed' | 'declined';
  priority: 'low' | 'medium' | 'high' | 'critical';
  author: User;
  upvotes: number;
  hasUserUpvoted: boolean;
  commentsCount: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface FilterOptions {
  category?: string;
  status?: string;
  priority?: string;
  sortBy: 'newest' | 'oldest' | 'most-upvoted' | 'most-comments';
}