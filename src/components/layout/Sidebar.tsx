"use client";

import { LABELS } from "@/constants/ko";
import { MOCK_CATEGORIES, type Category } from "@/lib/mock-data";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

const NAV_ITEMS = [
  { id: "dashboard", label: LABELS.dashboard, icon: "grid" },
  { id: "documents", label: LABELS.documents, icon: "file" },
  { id: "search", label: LABELS.search, icon: "search" },
  { id: "archive", label: LABELS.archive, icon: "archive" },
  { id: "settings", label: LABELS.settings, icon: "settings" },
];

function NavIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    file: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    search: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    archive: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
    settings: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}

function CategoryTree({
  categories,
  parentId,
  selectedCategory,
  onSelect,
}: {
  categories: Category[];
  parentId: string | null;
  selectedCategory: string | null;
  onSelect: (id: string | null) => void;
}) {
  const items = categories.filter((c) => c.parentId === parentId);
  if (items.length === 0) return null;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((cat) => {
        const children = categories.filter((c) => c.parentId === cat.id);
        const isSelected = selectedCategory === cat.id;
        return (
          <li key={cat.id}>
            <button
              onClick={() => onSelect(isSelected ? null : cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "6px 12px",
                marginLeft: parentId ? "16px" : "0",
                border: "none",
                borderRadius: "6px",
                background: isSelected ? "#e0e7ff" : "transparent",
                color: isSelected ? "#1e40af" : "#475569",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: isSelected ? 600 : 400,
                textAlign: "left",
              }}
            >
              <span>{cat.name}</span>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>{cat.count}</span>
            </button>
            {children.length > 0 && (
              <CategoryTree
                categories={categories}
                parentId={cat.id}
                selectedCategory={selectedCategory}
                onSelect={onSelect}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ currentPage, onNavigate, selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1e40af, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            LG
          </div>
          <span style={{ fontWeight: 700, fontSize: "16px", color: "#1e293b" }}>
            {LABELS.appName}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "12px 12px 8px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "10px 12px",
                border: "none",
                borderRadius: "8px",
                background: isActive ? "#eff6ff" : "transparent",
                color: isActive ? "#1e40af" : "#475569",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                marginBottom: "2px",
                textAlign: "left",
              }}
            >
              <NavIcon type={item.icon} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Category Tree */}
      <div style={{ padding: "8px 12px", borderTop: "1px solid #e2e8f0", flex: 1, overflowY: "auto" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", padding: "8px 12px 4px", letterSpacing: "0.05em" }}>
          {LABELS.categories}
        </div>
        <CategoryTree
          categories={MOCK_CATEGORIES}
          parentId={null}
          selectedCategory={selectedCategory}
          onSelect={onSelectCategory}
        />
      </div>

      {/* Sync Status */}
      <div style={{ padding: "16px", borderTop: "1px solid #e2e8f0", fontSize: "12px", color: "#94a3b8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
          {LABELS.syncStatus}: 정상
        </div>
        <div>{LABELS.lastSynced}: 2025.09.15 06:02</div>
      </div>
    </aside>
  );
}
