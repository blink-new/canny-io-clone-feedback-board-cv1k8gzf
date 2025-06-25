import { useState } from 'react';
import { X, ChevronUp, MessageCircle, Send, Heart, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { FeedbackPost } from '@/types/feedback';
import { formatDistanceToNow } from 'date-fns';

interface FeedbackDetailProps {
  post: FeedbackPost | null;
  isOpen: boolean;
  onClose: () => void;
  onUpvote: (id: string) => void;
  onAddComment: (postId: string, content: string) => void;
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

export function FeedbackDetail({ post, isOpen, onClose, onUpvote, onAddComment }: FeedbackDetailProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) return null;

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    onAddComment(post.id, newComment);
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={statusColors[post.status]} variant="outline">
                  {post.status.replace('-', ' ')}
                </Badge>
                <Badge className={categoryColors[post.category]} variant="secondary">
                  {post.category}
                </Badge>
                <div className={`flex items-center gap-1 ${priorityColors[post.priority]}`}>
                  <Tag className="w-4 h-4" />
                  <span className="text-sm font-medium capitalize">{post.priority}</span>
                </div>
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 leading-tight">
                {post.title}
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            {/* Author and metadata */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant={post.hasUserUpvoted ? "default" : "outline"}
                  onClick={() => onUpvote(post.id)}
                  className={`flex items-center gap-2 ${
                    post.hasUserUpvoted 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'hover:bg-purple-50 hover:border-purple-300'
                  }`}
                >
                  <ChevronUp className="w-4 h-4" />
                  {post.upvotes} Upvotes
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.description}
              </p>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Comments section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-heading font-semibold text-gray-900">
                  Comments ({post.commentsCount})
                </h3>
              </div>

              {/* Add comment */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3 min-h-[80px] resize-none bg-white"
                    />
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || isSubmitting}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.user.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2 leading-relaxed">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-auto p-1 text-gray-500 hover:text-red-500">
                          <Heart className="w-4 h-4 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {post.comments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}