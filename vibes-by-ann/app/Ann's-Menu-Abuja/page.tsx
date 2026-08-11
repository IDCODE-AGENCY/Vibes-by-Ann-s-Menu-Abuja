"use client";
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
});

export default function VibesByAnnPage() {
  return (
    <main className="w-full min-h-screen">
      <PdfViewer url="/vba3.pdf" />
    </main>
  );
}
