import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const plan = body.plan;

    console.log("Requested plan (mock):", plan);

    // Validate plan
    if (!plan || !['PRO', 'PREMIUM'].includes(plan)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing plan' },
        { status: 400 }
      );
    }

    // 🧪 MOCK checkout success URL
    const mockUrl = `http://localhost:3000/success?plan=${plan}&mock=true`;

    return NextResponse.json({
      success: true,
      data: { url: mockUrl },
    });
  } catch (error) {
    console.error('Mock Checkout Error:', error);
    return NextResponse.json(
      { success: false, error: 'Mock checkout failed' },
      { status: 500 }
    );
  }
}
