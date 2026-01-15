import { useState } from "react";
import { API_BASE } from "../api";

export default function AskQuestion({ enabled }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!question) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setAnswer(data.answer);
    } catch (err) {
      setAnswer(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span className="text-3xl">💬</span>
        Ask Question
      </h3>

      <div className="space-y-4">
        <input
          placeholder={enabled ? "Ask something from the document..." : "Upload a PDF first to ask questions"}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={!enabled}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
        
        <button
          onClick={ask}
          disabled={loading || !enabled}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Thinking...
            </span>
          ) : (
            "Ask"
          )}
        </button>

        {answer && (
          <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-lg shadow-sm">
            <strong className="block text-indigo-900 font-bold text-lg mb-3">Answer:</strong>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}