import { ChevronUp, MessageCircle, Clock, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FeedbackPost } from '@/types/feedback';
import { formatDistanceToNow } from 'date-fns';

interface FeedbackCardProps {
  post: FeedbackPost;
  onUpvote: (id: string) => void;
  onSelect: (post: FeedbackPost) => void;
}

const statusColors = {
  'under-review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'planned': 'bg-blue-100 text-blue-800 border-blue-200',
  'in-progress': 'bg-purple-100 text-purple-800 border-purple-200',
  'completed': 'bg-green-100 text-green-800 border-green-200',
  'declined': 'bg-gray-100 text-gray-800 border-gray-200'
};

const categoryColors = {
  'feature': 'bg-emerald-100 text-emerald-700',
  'bug': 'bg-red-100 text-red-700',
  'improvement': 'bg-orange-100 text-orange-700',
  'integration': 'bg-cyan-100 text-cyan-700'
};

const priorityColors = {
  'low': 'text-gray-500',
  'medium': 'text-yellow-600',
  'high': 'text-orange-600',
  'critical': 'text-red-600'
};

export function FeedbackCard({ post, onUpvote, onSelect }: FeedbackCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-gray-200">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Upvote button */}
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <Button
              variant={post.hasUserUpvoted ? "default" : "outline"}
              size="sm"
              className={`flex flex-col h-auto py-2 px-3 gap-1 transition-all ${
                post.hasUserUpvoted 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' 
                  : 'hover:bg-purple-50 hover:border-purple-300'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onUpvote(post.id);
              }}
            >
              <ChevronUp className="w-4 h-4" />
              <span className="text-xs font-medium">{post.upvotes}</span>
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0" onClick={() => onSelect(post)}>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-lg text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>
              
              <Badge className={statusColors[post.status]} variant="outline">
                {post.status.replace('-', ' ')}
              </Badge>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-600">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-600">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Badge className={categoryColors[post.category]} variant="secondary">
                    {post.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.commentsCount}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
                </div>

                <div className={`flex items-center gap-1 ${priorityColors[post.priority]}`}>
                  <Tag className="w-4 h-4" />
                  <span className="capitalize font-medium">{post.priority}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="text-xs">{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-500">{post.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}