import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { FeedbackCard } from '@/components/FeedbackCard';
import { FeedbackDetail } from '@/components/FeedbackDetail';
import { FeedbackPost, FilterOptions } from '@/types/feedback';
import { feedbackPosts } from '@/data/sampleData';
import toast from 'react-hot-toast';

function App() {
  const [posts, setPosts] = useState<FeedbackPost[]>(feedbackPosts);
  const [selectedPost, setSelectedPost] = useState<FeedbackPost | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'newest'
  });

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(post => post.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter(post => post.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter(post => post.priority === filters.priority);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'most-upvoted':
        filtered.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'most-comments':
        filtered.sort((a, b) => b.commentsCount - a.commentsCount);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return filtered;
  }, [posts, filters]);

  const handleUpvote = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              upvotes: post.hasUserUpvoted ? post.upvotes - 1 : post.upvotes + 1,
              hasUserUpvoted: !post.hasUserUpvoted
            }
          : post
      )
    );

    // Update selected post if it's the one being upvoted
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prevPost => 
        prevPost ? {
          ...prevPost,
          upvotes: prevPost.hasUserUpvoted ? prevPost.upvotes - 1 : prevPost.upvotes + 1,
          hasUserUpvoted: !prevPost.hasUserUpvoted
        } : null
      );
    }

    const post = posts.find(p => p.id === postId);
    if (post) {
      toast.success(
        post.hasUserUpvoted ? 'Upvote removed!' : 'Thanks for your upvote!',
        { duration: 2000 }
      );
    }
  };

  const handleSelectPost = (post: FeedbackPost) => {
    setSelectedPost(post);
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      user: {
        id: 'current-user',
        name: 'You',
        email: 'you@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      content,
      createdAt: new Date(),
      likes: 0
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
              commentsCount: post.commentsCount + 1
            }
          : post
      )
    );

    // Update selected post
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prevPost => 
        prevPost ? {
          ...prevPost,
          comments: [...prevPost.comments, newComment],
          commentsCount: prevPost.commentsCount + 1
        } : null
      );
    }

    toast.success('Comment added successfully!', { duration: 2000 });
  };

  const handleNewFeedback = () => {
    toast('Coming soon! New feedback form will be added.', {
      icon: '🚀',
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewFeedback={handleNewFeedback} />
      <FilterBar 
        filters={filters} 
        onFiltersChange={setFilters} 
        totalCount={filteredPosts.length} 
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <FeedbackCard
              key={post.id}
              post={post}
              onUpvote={handleUpvote}
              onSelect={handleSelectPost}
            />
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                No feedback found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </main>

      <FeedbackDetail
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onUpvote={handleUpvote}
        onAddComment={handleAddComment}
      />
    </div>
  );
}

export default App;