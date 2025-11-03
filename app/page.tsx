"use client";

import { useState } from "react";

export default function HomePage() {
  const [resumeText, setResumeText] = useState("");
  const [updatedResume, setUpdatedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpgrade = async () => {
    setLoading(true);
    setError("");
    setUpdatedResume("");

    try {
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data = await res.json();
      setUpdatedResume(data.upgradedResume);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          🚀 Resume Upgrader
        </h1>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text here..."
          className="w-full h-48 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleUpgrade}
          disabled={loading || !resumeText.trim()}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {loading ? "Upgrading..." : "Upgrade Resume"}
        </button>

        {error && (
          <p className="text-red-500 text-center text-sm mt-2">{error}</p>
        )}

        {updatedResume && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">✨ Upgraded Resume:</h2>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg text-sm">
              {updatedResume}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
