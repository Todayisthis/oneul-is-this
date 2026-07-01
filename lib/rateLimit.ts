const store = new Map<string, { count: number; resetAt: number }>();

const MAX_ENTRIES = 10_000;

function cleanup() {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function rateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();

  if (store.size >= MAX_ENTRIES) cleanup();

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count += 1;
  return true;
}
