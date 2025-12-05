"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  const [resumeText, setResumeText] = useState("");
  const [upgraded, setUpgraded] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setLoading(true);
    setUpgraded("");
    try {
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upgrade failed");
      setUpgraded(data.upgraded);
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume Upgrader</h1>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <button className="px-4 py-2 bg-black text-white rounded" onClick={() => router.push("/sign-in")}>Login</button>
          </SignedOut>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Paste your resume</h2>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="w-full h-48 border rounded p-3 mb-4"
          placeholder="Paste resume text here..."
        />

        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleUpgrade} disabled={loading || !resumeText}>
            {loading ? "Upgrading..." : "Upgrade Resume"}
          </button>
          <button className="px-4 py-2 border rounded" onClick={() => setResumeText("")}>Clear</button>
        </div>

        {upgraded && (
          <section className="mt-6">
            <h3 className="text-lg font-medium mb-2">Upgraded Resume</h3>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{upgraded}</pre>
          </section>
        )}
      </main>
    </div>
  );
}
