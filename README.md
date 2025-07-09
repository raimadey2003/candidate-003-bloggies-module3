# Smart Scheduler - Module 3

A production-ready social media post scheduler with credit management system, built for tech assessment.

## 🚀 Features

- **Smart Scheduling**: Create and schedule posts for Twitter, Facebook, and LinkedIn
- **Auto-Publishing**: Cron-like system automatically publishes posts at scheduled times
- **Credit System**: Earn 2 credits per published post, with raffle entry tracking
- **Admin Dashboard**: Real-time view of credits, raffle entries, and post statistics
- **Manual Publishing**: One-click manual publishing for immediate posts
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Error Handling**: Graceful timeout handling and retry logic

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes with TypeScript
- **Storage**: In-memory storage (JSON-compatible)
- **Scheduling**: Custom cron-like scheduler with 30-second intervals
- **UI Components**: Radix UI primitives with custom styling

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/raimadey2003/candidate-003-bloggies-module3.git
   cd candidate-003-bloggies-module3
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev


   ```

## 🌍 Environment Variables
.env.local
# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

## 🧪 Test Commands

```bash
# Start development server
npm run dev


```

## Deployment
After cloning the repository, start the development server locally before opening the Vercel link:
Once the server is running on http://localhost:3000, you can proceed to open the Vercel link in your browser.

⚠️ Note: The Vercel deployment depends on the local server being active.

https://candidate-003-bloggies-module3-4hvrm5g0w-raima-deys-projects.vercel.app


## 📋 API Endpoints

### Posts
- `GET /api/posts` - List all scheduled posts
- `POST /api/posts` - Create a new scheduled post
- `POST /api/posts/[id]/publish` - Manually publish a post
- `DELETE /api/posts/[id]` - Delete a scheduled post

### Credits
- `GET /api/credits` - Get current credits and raffle entries

## 🎯 Core Features

### 1. Post Scheduling
- Create posts with content, platform selection, and future scheduling
- Supports Twitter, Facebook, and LinkedIn
- Validates scheduling time is in the future
- Character limit enforcement (280 chars)

### 2. Auto-Publishing System
- Background scheduler checks every 30 seconds for posts ready to publish
- Simulates API calls to social media platforms
- 95% success rate with graceful error handling
- Automatic credit awarding on successful publish

### 3. Credit Management
- Awards 2 credits per successfully published post
- Converts credits to raffle entries (1 entry per 2 credits)
- Real-time credit tracking and display

### 4. Admin Dashboard
- Live statistics for credits, raffle entries, and posts
- Post status breakdown (pending, published, failed)
- Auto-refreshing data every 10 seconds

## 🎨 Design Features

- **Modern Glassmorphism**: Backdrop blur effects with subtle transparency
- **Gradient Backgrounds**: Beautiful purple-to-blue gradient theme
- **Micro-interactions**: Smooth animations and hover effects
- **Responsive Layout**: Mobile-first design with tablet and desktop optimizations
- **Status Indicators**: Color-coded badges for post status and platforms
- **Loading States**: Proper loading indicators throughout the app

## 📊 Sample Responses

See `/samples` directory for samples.

## 🔧 Architecture

- **Modular Components**: Separated concerns with reusable components
- **Type Safety**: Full TypeScript coverage with strict types
- **Error Boundaries**: Graceful error handling and user feedback
- **Performance**: Optimized with Next.js app router and server components where applicable

## 🚦 Status

✅ All core requirements implemented  
✅ Production-ready code quality  
✅ Responsive design  
✅ Error handling  
✅ Credit system integration  
✅ Auto-publishing scheduler  

