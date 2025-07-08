import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { scheduler } from '@/lib/scheduler';
import { ApiResponse } from '@/types';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    const post = storage.getPostById(id);

    if (!post) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Post not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    if (post.status !== 'pending') {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Post is not in pending status',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Manually publish the post
    const success = await scheduler.publishPost(post);

    if (success) {
      const response: ApiResponse<null> = {
        success: true,
        data: null,
      };
      return NextResponse.json(response);
    } else {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to publish post',
      };
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal server error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}