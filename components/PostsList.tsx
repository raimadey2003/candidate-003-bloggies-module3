'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Trash2, Send, Loader2 } from 'lucide-react';
import { ScheduledPost } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface PostsListProps {
  refreshTrigger: number;
}

export function PostsList({ refreshTrigger }: PostsListProps) {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishingIds, setPublishingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.slice(0, 100)}...`);
      }

      const result = await response.json();
      if (result.success) {
        setPosts(result.data || []);
      } else {
        throw new Error(result.error || 'API returned failure');
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      toast({
        title: "Error",
        description: "Could not load posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const handlePublish = async (post: ScheduledPost) => {
    setPublishingIds(prev => new Set(prev).add(post.id));
    try {
      const response = await fetch(`/api/posts/${post.id}/publish`, {
        method: 'POST',
      });
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Post published successfully",
        });
        fetchPosts();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to publish post",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPublishingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(post.id);
        return newSet;
      });
    }
  };

  const handleDelete = async (post: ScheduledPost) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Post deleted successfully",
        });
        fetchPosts();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete post",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'published': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'facebook': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'linkedin': return 'bg-blue-600/20 text-blue-300 border-blue-600/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Scheduled Posts ({posts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-8 text-white/70">
            No scheduled posts yet. Create your first post above!
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getPlatformColor(post.platform)}>
                        {post.platform}
                      </Badge>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-white mb-3 line-clamp-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.scheduledFor).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(post.scheduledFor).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => handlePublish(post)}
                        disabled={publishingIds.has(post.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {publishingIds.has(post.id) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {post.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
