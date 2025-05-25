import { NextResponse } from 'next/server';
import ReactPDF from '@react-pdf/renderer';
import { list, put } from '@vercel/blob';
import { and, asc, eq, not, or, sql } from 'drizzle-orm';

import { db } from '@db';
import { education, experiences, personal, skills } from '@db/schema';

import ResumePDF from './_components/layout';

export async function GET(request: Request) {
  const email = request.headers.get('X-Include-Email');
  const phone = request.headers.get('X-Include-Phone');

  let pathName = 'public/LuukLeenders-Resume_en_2025';
  if (email === 'true') pathName = `limited/LuukLeenders-Resume_en_2025`;
  if (phone === 'true') pathName = `full/LuukLeenders-Resume_en_2025`;

  try {
    const { blobs } = await list();
    if (blobs.length > 0) {
      const filtered = blobs
        .filter((blob) => blob.pathname.startsWith(pathName))
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

      const blob = filtered[0];
      if (!blob) {
        throw new Error('No existing blob found');
      }

      const response = await fetch(blob.url);
      const buffer = await response.arrayBuffer();
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="LuukLeenders-Resume_en_2025.pdf"',
        },
      });
    }
  } catch {
    console.warn('No existing blob found, generating new PDF');
  }

  const [educationData, experienceData, skillsData, personalData] = await Promise.all([
    db.select().from(education).orderBy(asc(education.id)),
    db.select().from(experiences).orderBy(asc(experiences.id)),
    db.select().from(skills).orderBy(asc(skills.id)),
    db
      .select({
        id: personal.id,
        key: personal.key,
        value: personal.value,
        private: personal.private,
      })
      .from(personal)
      .where(
        or(
          and(not(eq(personal.key, 'E-mail')), not(eq(personal.key, 'Phone'))),
          and(eq(personal.key, 'E-mail'), eq(sql`${email}`, true)),
          and(eq(personal.key, 'Phone'), eq(sql`${phone}`, true))
        )
      )
      .orderBy(asc(personal.id)),
  ]);

  const downloadPDF = await ReactPDF.renderToStream(
    <ResumePDF
      education={educationData}
      experience={experienceData}
      personal={personalData}
      skills={skillsData}
    />
  );

  const chunks: Buffer[] = [];
  for await (const chunk of downloadPDF) {
    chunks.push(Buffer.from(chunk));
  }
  const pdfBuffer = Buffer.concat(chunks);

  await put(pathName, pdfBuffer, {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/pdf',
  });

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="LuukLeenders-Resume_en_2025.pdf"',
    },
  });
}
