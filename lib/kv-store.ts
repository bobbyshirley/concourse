import { kv } from '@vercel/kv';

const KV_KEY = 'seating:main-hall';

// In-memory fallback so local dev / a build without Vercel KV linked doesn't
// crash. IMPORTANT: this fallback only lives inside a single server process —
// it does NOT sync across devices or even across separate serverless
// invocations. Real multi-device sync requires Vercel KV to actually be
// linked (see project README / setup notes).
let memoryStore: Record<string, string> = {};
let kvAvailable = true;

export async function getSeatAssignments(): Promise<Record<string, string>> {
  if (kvAvailable) {
    try {
      const data = await kv.get<Record<string, string>>(KV_KEY);
      return data ?? {};
    } catch (err) {
      console.warn('[seating] Vercel KV unavailable, using in-memory fallback (single-process only):', err);
      kvAvailable = false;
    }
  }
  return memoryStore;
}

export async function setSeatAssignments(assignments: Record<string, string>): Promise<void> {
  if (kvAvailable) {
    try {
      await kv.set(KV_KEY, assignments);
      return;
    } catch (err) {
      console.warn('[seating] Vercel KV unavailable, using in-memory fallback (single-process only):', err);
      kvAvailable = false;
    }
  }
  memoryStore = assignments;
}
