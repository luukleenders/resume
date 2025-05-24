export async function getData<T>(
  type: 'skills' | 'education' | 'experience' | 'personal' | 'metadata',
  includePrivate: boolean
): Promise<T> {
  const baseUrl = process.env.BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/${type}?includePrivate=${includePrivate}`);
  if (!res.ok) throw new Error(`Failed to fetch ${type} data`);
  return res.json() as Promise<T>;
}
