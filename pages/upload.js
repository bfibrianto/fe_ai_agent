"use client";

import { useState } from "react";

export default function UploadPage() {
  const [projectId, setProjectId] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    
    setLoading(true)

    console.log("Loading:", loading)

    e.preventDefault();

    if (!projectId || !file) {
      setMessage("Project ID dan File wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("project_id", projectId);
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/rag/load/document/", {
        method: "POST",
        body: formData,
      });
        setLoading(false)
        console.log("Loading:", loading)
      if (res.ok) {
        setMessage("Dokumen berhasil diunggah dan dimuat ke vector DB!");
      } else {
        const err = await res.text();
        setMessage(`Gagal mengunggah dokumen: ${err}`);
      }
    } catch (error) {
      setMessage(`Terjadi error: ${error.message}`);
    }
  };

return (
    <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload Dokumen ke Vector DB</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Project ID</label>
                <input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">File (PDF/DOCX)</label>
                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border rounded p-2"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
                disabled={loading}
            >
                {loading ? (
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                ) : (
                    "Upload"
                )}
            </button>
            {message && <p className="mt-4 text-sm">{message}</p>}
        </form>
    </div>
);
}
