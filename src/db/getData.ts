export async function getData<T>(
  type: 'skills' | 'education' | 'experience' | 'personal' | 'metadata',
  fields?: {
    email?: boolean;
    phone?: boolean;
  }
): Promise<T> {
  const baseUrl = process.env.BASE_URL || '';
  const res = await fetch(
    `${baseUrl}/api/${type}?includeEmail=${fields?.email}&includePhone=${fields?.phone}`
  );
  if (!res.ok) throw new Error(`Failed to fetch ${type} data`);
  return res.json() as Promise<T>;
}
