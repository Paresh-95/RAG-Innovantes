import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function splitText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 150,
  });

  return splitter.createDocuments([text]);
}
