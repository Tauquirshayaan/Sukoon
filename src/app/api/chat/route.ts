import { NextResponse } from 'next/server';
import { isMessageClean } from '@/lib/profanityFilter';
import { headers } from 'next/headers';

export interface ChatMessage {
  id: string;
  name: string;
  text: string;
  timestamp: number;
}

// ----- In-memory store (persists across hot-reloads via globalThis) -----
declare global {
  var chatMessages: ChatMessage[] | undefined;
  var rateLimitMap: Map<string, number[]> | undefined;
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

if (!globalThis.rateLimitMap) {
  globalThis.rateLimitMap = new Map<string, number[]>();
}

// ----- Rate limiter: max 5 messages per 10 seconds per IP -----
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (globalThis.rateLimitMap!.get(ip) ?? []).filter(
    (t) => t > windowStart
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  globalThis.rateLimitMap!.set(ip, timestamps);
  // Prune old IPs periodically to avoid unbounded memory growth
  if (globalThis.rateLimitMap!.size > 5000) {
    for (const [key, val] of globalThis.rateLimitMap!.entries()) {
      if (val.every((t) => t <= windowStart)) globalThis.rateLimitMap!.delete(key);
    }
  }
  return false;
}

// ----- Reserved names that users cannot impersonate -----
const RESERVED_NAMES = ['admin', 'sukoon', 'system', 'bot', 'moderator', 'mod'];

function isReservedName(name: string): boolean {
  const lower = name.toLowerCase().trim();
  return RESERVED_NAMES.some((r) => lower === r || lower.startsWith(r + ' '));
}

export async function GET() {
  const recentMessages = globalThis.chatMessages!.slice(-50);
  return NextResponse.json({ messages: recentMessages });
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ??
      headersList.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'You are sending messages too fast. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, text } = body;

    // Validate presence and types
    if (!name || !text || typeof name !== 'string' || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid message format.' }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    if (!trimmedText) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }
    if (trimmedText.length > 200) {
      return NextResponse.json({ error: 'Message is too long (max 200 chars).' }, { status: 400 });
    }
    if (trimmedName.length > 50) {
      return NextResponse.json({ error: 'Name is too long (max 50 chars).' }, { status: 400 });
    }
    if (trimmedName.length < 1) {
      return NextResponse.json({ error: 'Name cannot be empty.' }, { status: 400 });
    }

    // Prevent impersonation of reserved names
    if (isReservedName(trimmedName)) {
      return NextResponse.json(
        { error: 'That name is reserved. Please use your assigned flower name.' },
        { status: 403 }
      );
    }

    // Profanity & abuse filter
    if (!isMessageClean(trimmedText) || !isMessageClean(trimmedName)) {
      return NextResponse.json(
        { error: 'Your message contains banned or abusive words and cannot be sent.' },
        { status: 403 }
      );
    }

    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: trimmedName,
      text: trimmedText,
      timestamp: Date.now(),
    };

    globalThis.chatMessages!.push(newMessage);

    // Cap at 100 messages
    if (globalThis.chatMessages!.length > 100) {
      globalThis.chatMessages!.shift();
    }

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process message.' }, { status: 500 });
  }
}
