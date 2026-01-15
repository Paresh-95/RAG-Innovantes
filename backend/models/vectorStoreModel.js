let vectorStore = null;

export function setVectorStore(store) {
  vectorStore = store;
}

export function getVectorStore() {
  if (!vectorStore) {
    throw new Error("Vector store not initialized. Upload a document first.");
  }
  return vectorStore;
}
