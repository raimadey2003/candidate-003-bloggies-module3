import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { scheduler } from '@/lib/scheduler';
import { ApiResponse, ScheduledPost } from '@/types';

export const dynamic = 'force-dynamic';


export async function GET(): Promise<NextResponse> {
  try {
    // Ensure scheduler is running
    scheduler.start();
    
    const posts = storage.getAllPosts();
    const response: ApiResponse<ScheduledPost[]> = {
      success: true,
      data: posts,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/posts:', error);
    const response: ApiResponse<ScheduledPost[]> = {
      success: false,
      error: 'Failed to fetch posts',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log('POST /api/posts called');
  
  try {
    // Ensure scheduler is running
    scheduler.start();
    
    // Log request headers
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    let body;
    try {
      const text = await request.text();
      console.log('Raw request text:', text);
      
      if (!text) {
        console.error('Empty request body');
        const response: ApiResponse<ScheduledPost> = {
          success: false,
          error: 'Empty request body',
        };
        return NextResponse.json(response, { status: 400 });
      }
      
      body = JSON.parse(text);
      console.log('Request body:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      const response: ApiResponse<ScheduledPost> = {
        success: false,
        error: 'Invalid JSON in request body',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { content, scheduledFor, platform } = body;

    console.log('Extracted fields:', { content, scheduledFor, platform });

    if (!content || !scheduledFor || !platform) {
      console.log('Missing required fields');
      const response: ApiResponse<ScheduledPost> = {
        success: false,
        error: 'Missing required fields: content, scheduledFor, platform',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate scheduled time is in the future
    let scheduledDate;
    try {
      scheduledDate = new Date(scheduledFor);
      console.log('Scheduled date:', scheduledDate);
    } catch (dateError) {
      console.error('Error parsing scheduled date:', dateError);
      const response: ApiResponse<ScheduledPost> = {
        success: false,
        error: 'Invalid date format for scheduledFor',
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (scheduledDate <= new Date()) {
      console.log('Scheduled time is in the past');
      const response: ApiResponse<ScheduledPost> = {
        success: false,
        error: 'Scheduled time must be in the future',
      };
      return NextResponse.json(response, { status: 400 });
    }

    console.log('Creating post...');
    const post = storage.addPost({
      content,
      scheduledFor,
      platform,
      status: 'pending',
    });

    console.log('Post created:', post);

    const response: ApiResponse<ScheduledPost> = {
      success: true,
      data: post,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/posts:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    const response: ApiResponse<ScheduledPost> = {
      success: false,
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
    return NextResponse.json(response, { status: 500 });
  }
}