const WINDOW_MS = 60 * 60 * 1000;
const MAX_MESSAGES = 20;

const sessions = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const session = sessions.get(identifier);

  if (!session || now > session.resetAt) {
    sessions.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_MESSAGES - 1 };
  }

  if (session.count >= MAX_MESSAGES) {
    return { allowed: false, remaining: 0 };
  }

  session.count++;
  return { allowed: true, remaining: MAX_MESSAGES - session.count };
}
