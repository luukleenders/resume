import { NextResponse } from 'next/server';
import ReactPDF from '@react-pdf/renderer';

import { getData } from '@db/getData';
import type { Education, Experience, Personal, Skill } from '@db/types';

import ResumePDF from './_components/layout';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('includeEmail') === 'true';
  const phone = searchParams.get('includePhone') === 'true';

  const [education, experience, personal, skills] = await Promise.all([
    getData<Education[]>('education'),
    getData<Experience[]>('experience'),
    getData<Personal[]>('personal', { email, phone }),
    getData<Skill[]>('skills'),
  ]);

  const filteredPersonal = personal.filter(
    (item) =>
      (item.key !== 'E-mail' && item.key !== 'Phone') ||
      (item.key === 'E-mail' && email) ||
      (item.key === 'Phone' && phone)
  );

  const downloadPDF = await ReactPDF.renderToStream(
    <ResumePDF
      education={education}
      experience={experience}
      personal={filteredPersonal}
      skills={skills}
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
