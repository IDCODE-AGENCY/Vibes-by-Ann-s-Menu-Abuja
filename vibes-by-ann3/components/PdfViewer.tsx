'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(700);


  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth > 768 ? 700 : window.innerWidth - 40);
    };
    
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center items-start pt-4 pb-24">
      <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-full">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading menu canvas...</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            className="max-w-full"
            width={pageWidth}
          />
        </Document>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full shadow-2xl border border-white/40">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
          className="px-4 py-1.5 bg-neutral-900 text-white text-sm font-semibold rounded-full disabled:bg-gray-300 disabled:text-gray-500 hover:bg-neutral-800 transition-colors shadow-sm"
        >
          Prev
        </button>
        
        <p className="text-gray-800 font-semibold text-sm tracking-wide min-w-[80px] text-center select-none">
          {pageNumber} / {numPages ?? '...'}
        </p>
        
        <button
          disabled={numPages !== null && pageNumber >= numPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
          className="px-4 py-1.5 bg-neutral-900 text-white text-sm font-semibold rounded-full disabled:bg-gray-300 disabled:text-gray-500 hover:bg-neutral-800 transition-colors shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
