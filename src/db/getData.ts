import type { Session } from './types';

export async function getData<T>(
  type: 'skills' | 'education' | 'experience' | 'personal' | 'metadata',
  session?: Session
): Promise<T> {
  const baseUrl = process.env.BASE_URL || '';
  const headers = new Headers();

  if (session) {
    headers.set('Cookie', `session=${encodeURIComponent(JSON.stringify(session))}`);
  }

  const res = await fetch(`${baseUrl}/api/${type}`, {
    headers,
  });

  if (!res.ok) throw new Error(`Failed to fetch ${type} data`);
  return res.json() as Promise<T>;
}
