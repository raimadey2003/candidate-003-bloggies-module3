import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { ApiResponse, ScheduledPost } from '@/types';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    const success = storage.deletePost(id);

    if (success) {
      const response: ApiResponse<null> = {
        success: true,
        data: null,
      };
      return NextResponse.json(response);
    } else {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Post not found',
      };
      return NextResponse.json(response, { status: 404 });
    }
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete post',
    };
    return NextResponse.json(response, { status: 500 });
  }
}