"use client";

import { useState } from "react";
import TextAreaInput from "@/components/TextAreaInput";
import UpgradeButton from "@/components/UpgradeButton";
import OutputBox from "@/components/OutputBox";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data.result || data.error || "Error upgrading résumé");
    } catch (e: any) {
      setResult(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🚀 Resume Upgrader
      </h1>

      <div className="w-full max-w-3xl">
        <TextAreaInput value={text} onChange={setText} />
        <div className="flex justify-center mt-4">
          <UpgradeButton onClick={handleUpgrade} loading={loading} />
        </div>
        <OutputBox result={result} />
      </div>
    </main>
  );
}
