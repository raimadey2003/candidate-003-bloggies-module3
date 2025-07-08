import { storage } from './storage';
import { ScheduledPost } from '@/types';

class PostScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly CHECK_INTERVAL = 30000; // 30 seconds
  private isRunning = false;

  start() {
    if (this.isRunning) return;

    console.log('Starting post scheduler...');
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.checkAndPublishPosts();
    }, this.CHECK_INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      console.log('Post scheduler stopped.');
    }
  }

  private async checkAndPublishPosts() {
    try {
      const postsToPublish = storage.getPostsReadyToPublish();

      for (const post of postsToPublish) {
        try {
          await this.publishPost(post);
        } catch (error) {
          console.error(`Error publishing post ${post.id}:`, error);
          storage.updatePost(post.id, { status: 'failed' });
        }
      }
    } catch (error) {
      console.error('Error in checkAndPublishPosts:', error);
    }
  }

  async publishPost(post: ScheduledPost): Promise<boolean> {
    console.log(`Publishing post ${post.id}: ${post.content.substring(0, 50)}...`);

    const success = await this.simulatePublishToSocialMedia(post);

    if (success) {
      storage.updatePost(post.id, {
        status: 'published',
        publishedAt: new Date().toISOString(),
      });

      storage.awardCredits(2);
      console.log(`Post ${post.id} published successfully. Credits awarded.`);
      return true;
    } else {
      storage.updatePost(post.id, { status: 'failed' });
      console.log(`Failed to publish post ${post.id}`);
      return false;
    }
  }

  private async simulatePublishToSocialMedia(post: ScheduledPost): Promise<boolean> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    // 95% success rate
    return Math.random() > 0.05;
  }
}

export const scheduler = new PostScheduler();
