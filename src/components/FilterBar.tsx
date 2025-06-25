import { Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterOptions } from '@/types/feedback';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalCount: number;
}

export function FilterBar({ filters, onFiltersChange, totalCount }: FilterBarProps) {
  const updateFilter = (key: keyof FilterOptions, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'newest').length;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-heading font-semibold text-gray-900">
              All Feedback
            </h2>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {totalCount} posts
            </Badge>
          </div>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ sortBy: 'newest' })}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear filters ({activeFiltersCount})
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>

          <Select value={filters.category || 'all'} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="feature">Feature</SelectItem>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="improvement">Improvement</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.priority || 'all'} onValueChange={(value) => updateFilter('priority', value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 ml-auto">
            <SortAsc className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most-upvoted">Most Upvoted</SelectItem>
                <SelectItem value="most-comments">Most Comments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}