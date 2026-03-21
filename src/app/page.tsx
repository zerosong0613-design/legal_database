"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DocumentTable from "@/components/documents/DocumentTable";
import DocumentDetail from "@/components/documents/DocumentDetail";
import DashboardStats from "@/components/dashboard/DashboardStats";
import SettingsPage from "@/components/settings/SettingsPage";
import { MOCK_DOCUMENTS, MOCK_TAGS, type Document } from "@/lib/mock-data";
import { LABELS } from "@/constants/ko";

const PAGE_TITLES: Record<string, string> = {
  dashboard: LABELS.dashboard,
  documents: LABELS.documents,
  search: LABELS.search,
  archive: LABELS.archive,
  settings: LABELS.settings,
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredDocuments = useMemo(() => {
    let docs = MOCK_DOCUMENTS;

    if (selectedCategory) {
      docs = docs.filter((d) => d.categoryId === selectedCategory);
    }

    if (selectedTag) {
      docs = docs.filter((d) => d.tags.some((t) => t.id === selectedTag));
    }

    if (currentPage === "archive") {
      docs = docs.filter((d) => d.status === "archived");
    } else if (currentPage !== "search") {
      docs = docs.filter((d) => d.status === "active");
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.fileName.toLowerCase().includes(q) ||
          d.parties.some((p) => p.toLowerCase().includes(q)) ||
          d.tags.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    return docs;
  }, [searchQuery, selectedCategory, selectedTag, currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedDocument(null);
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery("");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedCategory={selectedCategory}
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          if (currentPage === "dashboard") setCurrentPage("documents");
        }}
      />

      <main style={{ marginLeft: "260px", flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          title={PAGE_TITLES[currentPage] ?? ""}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q && currentPage === "dashboard") setCurrentPage("documents");
          }}
        />

        <div style={{ padding: "24px 32px", flex: 1 }}>
          {/* Dashboard */}
          {currentPage === "dashboard" && <DashboardStats />}

          {/* Documents / Search / Archive */}
          {(currentPage === "documents" || currentPage === "search" || currentPage === "archive") && (
            <div>
              {/* Filter bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "13px", color: "#64748b", marginRight: "4px" }}>태그:</span>
                <button
                  onClick={() => setSelectedTag(null)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: !selectedTag ? "#1e40af" : "#fff",
                    color: !selectedTag ? "#fff" : "#475569",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  전체
                </button>
                {MOCK_TAGS.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedTag(selectedTag === tag.id ? null : tag.id)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      border: `1px solid ${selectedTag === tag.id ? tag.color : "#e2e8f0"}`,
                      backgroundColor: selectedTag === tag.id ? `${tag.color}18` : "#fff",
                      color: selectedTag === tag.id ? tag.color : "#475569",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {tag.name}
                  </button>
                ))}

                <div style={{ flex: 1 }} />

                <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                  {filteredDocuments.length}건
                </span>
              </div>

              <DocumentTable
                documents={filteredDocuments}
                onSelectDocument={setSelectedDocument}
              />
            </div>
          )}

          {/* Settings */}
          {currentPage === "settings" && <SettingsPage />}
        </div>
      </main>

      {/* Document Detail Slide-over */}
      {selectedDocument && (
        <>
          <div
            onClick={() => setSelectedDocument(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              zIndex: 15,
            }}
          />
          <DocumentDetail
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        </>
      )}
    </div>
  );
}
