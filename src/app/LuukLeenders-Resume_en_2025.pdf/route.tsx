import { NextResponse } from 'next/server';
import ReactPDF from '@react-pdf/renderer';
import { and, asc, eq, not, or, sql } from 'drizzle-orm';

import { db } from '@db';
import { education, experiences, personal, skills } from '@db/schema';

import ResumePDF from './_components/layout';

export async function GET(request: Request) {
  const email = request.headers.get('X-Include-Email');
  const phone = request.headers.get('X-Include-Phone');

  const educationData = await db.select().from(education).orderBy(asc(education.id));
  const experienceData = await db.select().from(experiences).orderBy(asc(experiences.id));
  const skillsData = await db.select().from(skills).orderBy(asc(skills.id));
  const personalData = await db
    .select({
      id: personal.id,
      key: personal.key,
      value: personal.value,
      private: personal.private,
    })
    .from(personal)
    .where(
      and(
        or(not(eq(personal.key, 'E-mail')), not(eq(personal.key, 'Phone'))),
        or(not(eq(personal.key, 'E-mail')), eq(sql`${email}`, true)),
        or(not(eq(personal.key, 'Phone')), eq(sql`${phone}`, true))
      )
    )
    .orderBy(asc(personal.id));

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

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume.pdf"',
    },
  });
}
