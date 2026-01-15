import { useState } from "react";
import UploadPDF from "./components/uploadPDF";
import AskQuestion from "./components/askQuestions";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
           Gemini RAG Assistant
        </h1>
        
        <UploadPDF onUploaded={() => setReady(true)} />
        <AskQuestion enabled={ready} />
      </div>
    </div>
  );
}