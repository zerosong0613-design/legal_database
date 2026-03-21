"use client";

import {
  type Document,
  formatFileSize,
  formatDate,
  getFileIcon,
  getFileIconColor,
  getCategoryName,
} from "@/lib/mock-data";

interface DocumentTableProps {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
}

export default function DocumentTable({ documents, onSelectDocument }: DocumentTableProps) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
            <th style={thStyle}>문서명</th>
            <th style={{ ...thStyle, width: "100px" }}>유형</th>
            <th style={{ ...thStyle, width: "120px" }}>카테고리</th>
            <th style={{ ...thStyle, width: "120px" }}>문서 일자</th>
            <th style={{ ...thStyle, width: "90px" }}>크기</th>
            <th style={{ ...thStyle, width: "80px" }}>메모</th>
            <th style={{ ...thStyle, width: "100px" }}>기밀등급</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              style={{
                borderBottom: "1px solid #f1f5f9",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {/* Title + Tags */}
              <td style={tdStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      minWidth: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: `${getFileIconColor(doc.fileExtension)}15`,
                      color: getFileIconColor(doc.fileExtension),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {getFileIcon(doc.fileExtension)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "13px", color: "#1e293b", marginBottom: "3px" }}>
                      {doc.title}
                    </div>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {doc.tags.map((tag) => (
                        <span
                          key={tag.id}
                          style={{
                            fontSize: "10px",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            backgroundColor: `${tag.color}18`,
                            color: tag.color,
                            fontWeight: 500,
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </td>

              {/* File Extension */}
              <td style={tdStyle}>
                <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase" }}>
                  .{doc.fileExtension}
                </span>
              </td>

              {/* Category */}
              <td style={tdStyle}>
                <span style={{ fontSize: "12px", color: "#475569" }}>{getCategoryName(doc.categoryId)}</span>
              </td>

              {/* Date */}
              <td style={tdStyle}>
                <span style={{ fontSize: "12px", color: "#475569" }}>{formatDate(doc.documentDate)}</span>
              </td>

              {/* Size */}
              <td style={tdStyle}>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>{formatFileSize(doc.fileSizeBytes)}</span>
              </td>

              {/* Notes Count */}
              <td style={tdStyle}>
                {doc.noteCount > 0 ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "#3b82f6",
                      fontWeight: 500,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {doc.noteCount}
                  </span>
                ) : (
                  <span style={{ fontSize: "12px", color: "#cbd5e1" }}>-</span>
                )}
              </td>

              {/* Confidentiality */}
              <td style={tdStyle}>
                <ConfidentialityBadge level={doc.confidentiality} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {documents.length === 0 && (
        <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}

function ConfidentialityBadge({ level }: { level: string }) {
  const config: Record<string, { bg: string; color: string; label: string }> = {
    public: { bg: "#dcfce7", color: "#16a34a", label: "공개" },
    internal: { bg: "#e0e7ff", color: "#4f46e5", label: "사내" },
    confidential: { bg: "#fee2e2", color: "#dc2626", label: "기밀" },
  };
  const c = config[level] ?? config.internal;
  return (
    <span
      style={{
        fontSize: "11px",
        padding: "2px 8px",
        borderRadius: "4px",
        backgroundColor: c.bg,
        color: c.color,
        fontWeight: 500,
      }}
    >
      {c.label}
    </span>
  );
}

const thStyle: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748b",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
};
