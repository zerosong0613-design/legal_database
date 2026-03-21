"use client";

import { LABELS } from "@/constants/ko";

interface HeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Header({ title, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 5,
      }}
    >
      <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
        {title}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={LABELS.searchPlaceholder}
            style={{
              width: "360px",
              padding: "8px 12px 8px 36px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              backgroundColor: "#f8fafc",
              color: "#1e293b",
            }}
          />
        </div>

        {/* User */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          KM
        </div>
      </div>
    </header>
  );
}
