import { ScheduledPost, UserCredits } from '@/types';

// In-memory storage for the tech assessment
class InMemoryStorage {
  private posts: ScheduledPost[] = [];
  private credits: UserCredits = {
    totalCredits: 10, // Starting credits
    raffleEntries: 0,
    lastUpdated: new Date().toISOString(),
    isPro: false,
    isPremiun: false,
    subscriptionStatus: 'inactive',
  };

  // Posts management
  getAllPosts(): ScheduledPost[] {
    try {
      console.log('getAllPosts called, returning', this.posts.length, 'posts');
      return [...this.posts];
    } catch (error) {
      console.error('Error in getAllPosts:', error);
      return [];
    }
  }

  getPostById(id: string): ScheduledPost | undefined {
    try {
      console.log('getPostById called with id:', id);
      return this.posts.find(post => post.id === id);
    } catch (error) {
      console.error('Error in getPostById:', error);
      return undefined;
    }
  }

  addPost(post: Omit<ScheduledPost, 'id' | 'createdAt'>): ScheduledPost {
    try {
      console.log('addPost called with:', post);
      
      const newPost: ScheduledPost = {
        ...post,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
      };
      
      console.log('Generated new post:', newPost);
      
      this.posts.push(newPost);
      console.log('Post added, total posts:', this.posts.length);
      
      return newPost;
    } catch (error) {
      console.error('Error in addPost:', error);
      throw new Error(`Failed to add post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  updatePost(id: string, updates: Partial<ScheduledPost>): ScheduledPost | null {
    try {
      console.log('updatePost called with id:', id, 'updates:', updates);
      const index = this.posts.findIndex(post => post.id === id);
      if (index === -1) {
        console.log('Post not found for update');
        return null;
      }
      
      this.posts[index] = { ...this.posts[index], ...updates };
      console.log('Post updated:', this.posts[index]);
      return this.posts[index];
    } catch (error) {
      console.error('Error in updatePost:', error);
      return null;
    }
  }

  deletePost(id: string): boolean {
    try {
      console.log('deletePost called with id:', id);
      const index = this.posts.findIndex(post => post.id === id);
      if (index === -1) {
        console.log('Post not found for deletion');
        return false;
      }
      
      this.posts.splice(index, 1);
      console.log('Post deleted, remaining posts:', this.posts.length);
      return true;
    } catch (error) {
      console.error('Error in deletePost:', error);
      return false;
    }
  }

  // Credits management
  getCredits(): UserCredits {
    try {
      console.log('getCredits called, returning:', this.credits);
      return { ...this.credits };
    } catch (error) {
      console.error('Error in getCredits:', error);
      return {
        totalCredits: 0,
        raffleEntries: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  awardCredits(amount: number): UserCredits {
    try {
      console.log('awardCredits called with amount:', amount);
      this.credits.totalCredits += amount;
      this.credits.raffleEntries += Math.floor(amount / 2); // 1 raffle entry per 2 credits
      this.credits.lastUpdated = new Date().toISOString();
      console.log('Credits updated:', this.credits);
      return { ...this.credits };
    } catch (error) {
      console.error('Error in awardCredits:', error);
      return { ...this.credits };
    }
  }

  // Utility
  private generateId(): string {
    try {
      const id = Math.random().toString(36).substr(2, 9);
      console.log('Generated ID:', id);
      return id;
    } catch (error) {
      console.error('Error in generateId:', error);
      const fallbackId = Date.now().toString();
      console.log('Using fallback ID:', fallbackId);
      return fallbackId;
    }
  }

  // Get posts ready to publish
  getPostsReadyToPublish(): ScheduledPost[] {
    try {
      const now = new Date();
      const readyPosts = this.posts.filter(post => 
        post.status === 'pending' && 
        new Date(post.scheduledFor) <= now
      );
      console.log('getPostsReadyToPublish found', readyPosts.length, 'posts ready to publish');
      return readyPosts;
    } catch (error) {
      console.error('Error in getPostsReadyToPublish:', error);
      return [];
    }
  }

  // Stripe integration methods
  upgradeToPro(credits: number = 100): UserCredits {
    try {
      console.log('upgradeToPro called with credits:', credits);
      this.credits.totalCredits += credits;
      this.credits.raffleEntries += Math.floor(credits / 2);
      this.credits.isPro = true;
      this.credits.subscriptionStatus = 'active';
      this.credits.lastUpdated = new Date().toISOString();
      console.log('User upgraded to pro:', this.credits);
      return { ...this.credits };
    } catch (error) {
      console.error('Error in upgradeToPro:', error);
      return { ...this.credits };
    }
  }

  upgradeToPremium(credits: number = 250): UserCredits {
    try {
      console.log('upgradeToPremium called with credits:', credits);
      this.credits.totalCredits += credits;
      this.credits.raffleEntries += Math.floor(credits / 2);
      this.credits.isPro = true;
      this.credits.isPremiun = true;
      this.credits.subscriptionStatus = 'active';
      this.credits.lastUpdated = new Date().toISOString();
      console.log('User upgraded to premium:', this.credits);
      return { ...this.credits };
    } catch (error) {
      console.error('Error in upgradeToPremium:', error);
      return { ...this.credits };
    }
  }
}

export const storage = new InMemoryStorage();