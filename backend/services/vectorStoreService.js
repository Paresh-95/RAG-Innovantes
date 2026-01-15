import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { setVectorStore } from "../models/vectorStoreModel.js";
import dotenv from "dotenv";

dotenv.config();

export async function buildVectorStore(docs) {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "models/embedding-001",
  });

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  setVectorStore(store);
}
