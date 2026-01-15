import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractTextFromPDF(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(" ") + "\n";
  }

  return text.trim();
}
