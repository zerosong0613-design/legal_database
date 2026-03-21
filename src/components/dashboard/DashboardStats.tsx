"use client";

import { MOCK_CATEGORIES, MOCK_DOCUMENTS, MOCK_SYNC_LOG, formatDateTime } from "@/lib/mock-data";

export default function DashboardStats() {
  const totalDocs = MOCK_DOCUMENTS.length;
  const activeDocs = MOCK_DOCUMENTS.filter((d) => d.status === "active").length;
  const totalNotes = MOCK_DOCUMENTS.reduce((sum, d) => sum + d.noteCount, 0);
  const rootCategories = MOCK_CATEGORIES.filter((c) => !c.parentId);

  const stats = [
    { label: "전체 문서", value: totalDocs, color: "#3b82f6", bg: "#eff6ff" },
    { label: "활성 문서", value: activeDocs, color: "#16a34a", bg: "#f0fdf4" },
    { label: "작성된 메모", value: totalNotes, color: "#8b5cf6", bg: "#f5f3ff" },
    { label: "카테고리", value: rootCategories.length, color: "#ea580c", bg: "#fff7ed" },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>{s.label}</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {/* Category Distribution */}
        <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
            카테고리별 문서 현황
          </h3>
          {rootCategories.map((cat) => (
            <div key={cat.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "13px", color: "#475569" }}>{cat.name}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{cat.count}</span>
              </div>
              <div style={{ height: "6px", backgroundColor: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(cat.count / 50) * 100}%`,
                    backgroundColor: "#3b82f6",
                    borderRadius: "3px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Sync Status */}
        <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
            동기화 상태
          </h3>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f0fdf4",
              borderRadius: "10px",
              border: "1px solid #bbf7d0",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#16a34a" }}>정상 동기화됨</span>
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              마지막 동기화: {formatDateTime(MOCK_SYNC_LOG.completedAt!)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#3b82f6" }}>{MOCK_SYNC_LOG.filesAdded}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>신규 파일</div>
            </div>
            <div style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#8b5cf6" }}>{MOCK_SYNC_LOG.filesUpdated}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>수정 파일</div>
            </div>
          </div>
          <button
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "10px",
              backgroundColor: "#1e40af",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            수동 동기화 시작
          </button>
        </div>
      </div>

      {/* Recent Documents */}
      <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
          최근 등록 문서
        </h3>
        {MOCK_DOCUMENTS.slice(0, 5).map((doc) => (
          <div
            key={doc.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>{doc.title}</span>
              {doc.tags.slice(0, 2).map((tag) => (
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
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{formatDateTime(doc.createdAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
