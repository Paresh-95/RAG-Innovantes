import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getVectorStore } from "../models/vectorStoreModel.js";
import { getCachedAnswer,setCachedAnswer } from "./cacheService.js";


const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-3-flash-preview",
  temperature: 0,
});

export async function answerQuestion(question) {
  //cache check 
  const cached = getCachedAnswer(question);
  if (cached) {
    console.log("🟢 CACHE HIT");
    return cached;
  }

  console.log("🔴 CACHE MISS");

  const vectorStore = getVectorStore();

  const results = await vectorStore.similaritySearch(question, 4);
  const context = results.map(r => r.pageContent).join("\n\n");

  const prompt = `
Answer ONLY using the context below.
If the answer is missing, say:
"The document does not contain this information."

Context:
"""
${context}
"""

Question:
${question}
`;

  const response = await llm.invoke(prompt);
  const answer = response.content;
  setCachedAnswer(question, answer);
  return answer;
}
