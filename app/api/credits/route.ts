import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { ApiResponse, UserCredits } from '@/types';

export async function GET(): Promise<NextResponse> {
  try {
    const credits = storage.getCredits();
    const response: ApiResponse<UserCredits> = {
      success: true,
      data: credits,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/credits:', error);
    const response: ApiResponse<UserCredits> = {
      success: false,
      error: 'Failed to fetch credits',
    };
    return NextResponse.json(response, { status: 500 });
  }
}