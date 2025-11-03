"use client";
import React from "react";

export default function TextAreaInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-blue-400"
      placeholder="Paste your résumé content here..."
      rows={8}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
