import { NextResponse } from 'next/server';
import { isMessageClean } from '@/lib/profanityFilter';

export interface ChatMessage {
  id: string;
  name: string;
  text: string;
  timestamp: number;
}

// Ensure TypeScript knows about this property on globalThis
declare global {
  var chatMessages: ChatMessage[] | undefined;
}

if (!globalThis.chatMessages) {
  globalThis.chatMessages = [
    {
      id: 'system-1',
      name: 'Admin',
      text: 'Assalamu Alaikum! Welcome to Sukoon. Let us know your thoughts.',
      timestamp: Date.now(),
    }
  ];
}

export async function GET() {
  // Return the last 50 messages to prevent overload
  const recentMessages = globalThis.chatMessages!.slice(-50);
  return NextResponse.json({ messages: recentMessages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, text } = body;

    if (!name || !text || text.trim() === '') {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    if (text.length > 200) {
      return NextResponse.json({ error: 'Message is too long (max 200 chars).' }, { status: 400 });
    }

    // --- PROFANITY & ABUSE FILTER ---
    if (!isMessageClean(text) || !isMessageClean(name)) {
      return NextResponse.json(
        { error: 'Your message contains banned or abusive words and cannot be sent.' },
        { status: 403 }
      );
    }

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      text: text.trim(),
      timestamp: Date.now(),
    };

    globalThis.chatMessages!.push(newMessage);

    // Keep the array from growing infinitely in memory
    if (globalThis.chatMessages!.length > 100) {
      globalThis.chatMessages!.shift();
    }

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
