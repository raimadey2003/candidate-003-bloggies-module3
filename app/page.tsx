'use client';

import { useState } from 'react';
import { CreatePostForm } from '@/components/CreatePostForm';
import { PostsList } from '@/components/PostsList';
import { AdminDashboard } from '@/components/AdminDashboard';
import { UpgradeModal } from '@/components/UpgradeModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart3, Settings, Crown } from 'lucide-react';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handlePostCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white text-center">
              Smart Scheduler
            </h1>
            <Button
              onClick={() => setShowUpgradeModal(true)}
              size="sm"
              className="ml-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium"
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
          </div>
          <p className="text-white/70 text-center mt-2">
            Schedule and manage your social media posts with intelligent automation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="scheduler" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-lg border-white/20">
            <TabsTrigger 
              value="scheduler" 
              className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <Calendar className="h-4 w-4" />
              Scheduler
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <BarChart3 className="h-4 w-4" />
              Admin Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="posts" 
              className="flex items-center gap-2 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <Settings className="h-4 w-4" />
              Manage Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheduler" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CreatePostForm onPostCreated={handlePostCreated} />
              <div className="space-y-6">
                <PostsList refreshTrigger={refreshTrigger} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="posts">
            <PostsList refreshTrigger={refreshTrigger} />
          </TabsContent>
        </Tabs>
      </main>

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
}