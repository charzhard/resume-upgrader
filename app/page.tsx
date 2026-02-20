"use client";

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpgrade() {
    setLoading(true);
    setError("");
    setOutputText("");

    try {
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume: inputText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const upgraded = data.result || "No result returned.";


      setOutputText(upgraded);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Resume Upgrader</h1>

      <textarea
        placeholder="Paste your resume content here..."
        className="w-full max-w-2xl p-4 border rounded-md min-h-[200px] bg-white shadow"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleUpgrade}
        disabled={loading || !inputText.trim()}
        className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Upgrading..." : "Upgrade Resume"}
      </button>

      {error && (
        <p className="mt-4 text-red-600 font-medium bg-red-100 p-3 rounded">
          {error}
        </p>
      )}

      {outputText && (
        <div className="w-full max-w-2xl mt-6 p-4 bg-white border rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2">Upgraded Resume</h2>
          <pre className="whitespace-pre-wrap">{outputText}</pre>
        </div>
      )}
    </main>
  );
}
