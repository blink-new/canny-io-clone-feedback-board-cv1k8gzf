import { Search, Plus, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  onNewFeedback: () => void;
}

export function Header({ onNewFeedback }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-gray-900">FeedbackBoard</h1>
            <p className="text-sm text-gray-500">Shape the future together</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search feedback..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button onClick={onNewFeedback} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Feedback
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}