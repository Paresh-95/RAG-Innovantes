import { useState } from "react";
import { API_BASE } from "../api";

export default function UploadPDF({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) return alert("Select a PDF");

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/documents`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage(`✅ Indexed ${data.chunks} chunks`);
      onUploaded();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span className="text-3xl">📄</span>
        Upload PDF
      </h3>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1 text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-indigo-400 transition-colors"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {message && (
          <p className={`p-4 rounded-lg text-sm font-medium ${
            message.startsWith('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}