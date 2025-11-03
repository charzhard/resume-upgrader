"use client";
import React from "react";

export default function UpgradeButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-60 transition"
    >
      {loading ? "Upgrading..." : "Upgrade Resume"}
    </button>
  );
}
