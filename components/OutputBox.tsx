"use client";
import React from "react";

export default function OutputBox({ result }: { result: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-2xl border mt-4 whitespace-pre-wrap min-h-[200px]">
      {result ? result : "Your upgraded résumé will appear here."}
    </div>
  );
}
