'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Trophy, TrendingUp, Loader2, Crown, Star, CreditCard } from 'lucide-react';
import { UserCredits, ScheduledPost } from '@/types';
import { UpgradeModal } from './UpgradeModal';

export function AdminDashboard() {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [creditsResponse, postsResponse] = await Promise.all([
          fetch('/api/credits'),
          fetch('/api/posts'),
        ]);

        const creditsResult = await creditsResponse.json();
        const postsResult = await postsResponse.json();

        if (creditsResult.success) {
          setCredits(creditsResult.data);
        }
        if (postsResult.success) {
          setPosts(postsResult.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getPostStats = () => {
    const total = posts.length;
    const published = posts.filter(p => p.status === 'published').length;
    const pending = posts.filter(p => p.status === 'pending').length;
    const failed = posts.filter(p => p.status === 'failed').length;
    
    return { total, published, pending, failed };
  };

  const stats = getPostStats();

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
    <div className="space-y-6">
      {/* Credits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Account Status Card */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Account Status</CardTitle>
            {credits?.isPro ? (
              credits?.isPremiun ? (
                <Star className="h-4 w-4 text-yellow-400" />
              ) : (
                <Crown className="h-4 w-4 text-blue-400" />
              )
            ) : (
              <CreditCard className="h-4 w-4 text-gray-400" />
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  {credits?.isPro ? (credits?.isPremiun ? 'Premium' : 'Pro') : 'Free'}
                </div>
                <p className="text-xs text-white/60">
                  {credits?.isPro ? 'Active subscription' : 'Upgrade for more features'}
                </p>
              </div>
              {!credits?.isPro && (
                <Button
                  size="sm"
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Upgrade
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Credits</CardTitle>
            <Coins className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{credits?.totalCredits || 0}</div>
            <p className="text-xs text-white/60">2 credits per published post</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Raffle Entries</CardTitle>
            <Trophy className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{credits?.raffleEntries || 0}</div>
            <p className="text-xs text-white/60">1 entry per 2 credits</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Published Posts</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.published}</div>
            <p className="text-xs text-white/60">Successfully published</p>
          </CardContent>
        </Card>
      </div>

      {/* Posts Statistics */}
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Posts Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/90">Total Posts</span>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {stats.total}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Published</span>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                {stats.published}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Pending</span>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                {stats.pending}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Failed</span>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                {stats.failed}
              </Badge>
            </div>
          </div>
          
          {credits?.lastUpdated && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-white/60">
                Last updated: {new Date(credits.lastUpdated).toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
}