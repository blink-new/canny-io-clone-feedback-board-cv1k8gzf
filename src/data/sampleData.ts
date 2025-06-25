import { FeedbackPost, User, Comment } from '../types/feedback';

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Lisa Zhang',
    email: 'lisa@example.com',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=64&h=64&fit=crop&crop=face'
  }
];

const sampleComments: Comment[] = [
  {
    id: 'c1',
    user: users[1],
    content: 'This would be a game-changer for our workflow! Really looking forward to this feature.',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    likes: 8
  },
  {
    id: 'c2',
    user: users[2],
    content: 'I agree! We\'ve been waiting for dark mode for months. The current UI is too bright during night coding sessions.',
    createdAt: new Date('2024-01-15T14:20:00Z'),
    likes: 12
  },
  {
    id: 'c3',
    user: users[3],
    content: 'Please prioritize this! Our team productivity would increase significantly.',
    createdAt: new Date('2024-01-16T09:15:00Z'),
    likes: 5
  }
];

export const feedbackPosts: FeedbackPost[] = [
  {
    id: '1',
    title: 'Add Dark Mode Support',
    description: 'Please add a dark mode toggle to the interface. This would help reduce eye strain during long work sessions and provide a more modern look to the application.',
    category: 'feature',
    status: 'in-progress',
    priority: 'high',
    author: users[0],
    upvotes: 247,
    hasUserUpvoted: true,
    commentsCount: 18,
    comments: sampleComments,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-16T12:00:00Z'),
    tags: ['ui', 'accessibility', 'design']
  },
  {
    id: '2',
    title: 'Integrate with Slack',
    description: 'It would be great to have Slack integration so we can receive notifications and updates directly in our team channels.',
    category: 'integration',
    status: 'planned',
    priority: 'medium',
    author: users[1],
    upvotes: 156,
    hasUserUpvoted: false,
    commentsCount: 12,
    comments: [],
    createdAt: new Date('2024-01-12T14:30:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    tags: ['slack', 'notifications', 'integration']
  },
  {
    id: '3',
    title: 'Export Data to CSV',
    description: 'Allow users to export their data in CSV format for analysis and reporting purposes. This is critical for our monthly reports.',
    category: 'feature',
    status: 'under-review',
    priority: 'high',
    author: users[2],
    upvotes: 89,
    hasUserUpvoted: true,
    commentsCount: 7,
    comments: [],
    createdAt: new Date('2024-01-14T11:45:00Z'),
    updatedAt: new Date('2024-01-16T15:30:00Z'),
    tags: ['export', 'csv', 'data', 'reporting']
  },
  {
    id: '4',
    title: 'Mobile App Performance Issues',
    description: 'The mobile app is very slow when loading large datasets. It often crashes on older devices. This needs urgent attention as many of our users are mobile-first.',
    category: 'bug',
    status: 'in-progress',
    priority: 'critical',
    author: users[3],
    upvotes: 312,
    hasUserUpvoted: false,
    commentsCount: 25,
    comments: [],
    createdAt: new Date('2024-01-08T16:20:00Z'),
    updatedAt: new Date('2024-01-16T09:00:00Z'),
    tags: ['mobile', 'performance', 'crash', 'urgent']
  },
  {
    id: '5',
    title: 'Improve Search Functionality',
    description: 'The current search is basic and doesn\'t support filters, advanced queries, or fuzzy matching. Users need better search capabilities.',
    category: 'improvement',
    status: 'planned',
    priority: 'medium',
    author: users[4],
    upvotes: 124,
    hasUserUpvoted: true,
    commentsCount: 9,
    comments: [],
    createdAt: new Date('2024-01-13T09:15:00Z'),
    updatedAt: new Date('2024-01-15T13:45:00Z'),
    tags: ['search', 'filters', 'ux']
  },
  {
    id: '6',
    title: 'Add Two-Factor Authentication',
    description: 'Security is important! Please add 2FA support with authenticator apps and SMS backup for better account protection.',
    category: 'feature',
    status: 'completed',
    priority: 'high',
    author: users[0],
    upvotes: 198,
    hasUserUpvoted: false,
    commentsCount: 14,
    comments: [],
    createdAt: new Date('2023-12-20T10:30:00Z'),
    updatedAt: new Date('2024-01-05T14:00:00Z'),
    tags: ['security', '2fa', 'authentication']
  }
];