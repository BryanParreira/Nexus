// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Bart, a helpful AI assistant integrated into a team collaboration platform. You are knowledgeable, friendly, professional, and concise in your responses. You can help with work-related questions, provide explanations, assist with problem-solving, and support team productivity.'
          },
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      console.error('OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key. Please check your API key in .env.local' },
          { status: 401 }
        );
      }
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'OpenAI API quota exceeded. Please check your usage limits.' },
          { status: 429 }
        );
      }

      if (response.status === 400) {
        return NextResponse.json(
          { error: 'Invalid request to OpenAI API. Please try again.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: errorData.error?.message || `OpenAI API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseMessage = data.choices?.[0]?.message;

    if (!responseMessage) {
      return NextResponse.json(
        { error: 'No response from OpenAI API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: responseMessage.content,
      role: responseMessage.role,
      usage: data.usage // Optional: include token usage info
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error. Please check your internet connection.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}