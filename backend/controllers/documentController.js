import { extractTextFromPDF } from "../services/pdfService.js";
import { splitText } from "../services/textSplitterService.js";
import { buildVectorStore } from "../services/vectorStoreService.js";

export async function uploadDocument(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const text = await extractTextFromPDF(req.file.buffer);
    const docs = await splitText(text);

    await buildVectorStore(docs);

    res.json({
      message: "Document indexed successfully",
      chunks: docs.length,
    });
  } catch (err) {
    next(err);
  }
}
