import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';

/**
 * Generate a PDF File from an HTML element.
 * Uses html2canvas to render, then pdf-lib to create a proper multi-page PDF.
 * @param {HTMLElement} element - The element to capture
 * @param {object} options
 * @param {string} options.filename - Output filename (default: 'document.pdf')
 * @param {number} options.scale - Render scale for quality (default: 2)
 * @param {number[]} options.margin - [top, right, bottom, left] in PDF points (default: [30, 30, 30, 30])
 * @returns {Promise<File>}
 */
export async function generatePDF(element, options = {}) {
  const {
    filename = 'document.pdf',
    scale = 2,
    margin = [30, 30, 30, 30],
  } = options;

  const [mTop, mRight, mBottom, mLeft] = margin;

  // Render HTML to canvas at high DPI
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  // A4 in PDF points
  const A4_W = 595.28;
  const A4_H = 841.89;
  const contentW = A4_W - mLeft - mRight;
  const contentH = A4_H - mTop - mBottom;

  // Scale factor to fit canvas width into PDF content width
  const imgScale = contentW / canvas.width;
  const totalImgH = canvas.height * imgScale;

  const pdfDoc = await PDFDocument.create();
  const numPages = Math.max(1, Math.ceil(totalImgH / contentH));

  for (let i = 0; i < numPages; i++) {
    // Slice the source canvas for this page
    const srcY = Math.round((i * contentH) / imgScale);
    const srcH = Math.min(
      Math.round(contentH / imgScale),
      canvas.height - srcY
    );
    if (srcH <= 0) break;

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = srcH;
    const ctx = pageCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

    // Embed as PNG
    const blob = await new Promise(r => pageCanvas.toBlob(r, 'image/png'));
    const imgBytes = new Uint8Array(await blob.arrayBuffer());
    const img = await pdfDoc.embedPng(imgBytes);

    const displayH = srcH * imgScale;
    const page = pdfDoc.addPage([A4_W, A4_H]);
    page.drawImage(img, {
      x: mLeft,
      y: A4_H - mTop - displayH,
      width: contentW,
      height: displayH,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new File([pdfBytes], filename, { type: 'application/pdf' });
}
