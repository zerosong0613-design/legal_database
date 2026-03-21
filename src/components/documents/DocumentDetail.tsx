"use client";

import { useState } from "react";
import {
  type Document,
  type Note,
  MOCK_NOTES,
  formatFileSize,
  formatDate,
  formatDateTime,
  getFileIcon,
  getFileIconColor,
  getCategoryName,
} from "@/lib/mock-data";

interface DocumentDetailProps {
  document: Document;
  onClose: () => void;
}

export default function DocumentDetail({ document: doc, onClose }: DocumentDetailProps) {
  const [notes, setNotes] = useState<Note[]>(
    MOCK_NOTES.filter((n) => n.documentId === doc.id)
  );
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    const note: Note = {
      id: `note-new-${Date.now()}`,
      documentId: doc.id,
      authorName: "김법무",
      title: newNoteTitle || "메모",
      content: newNoteContent,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setIsAddingNote(false);
  };

  const pinnedNotes = notes.filter((n) => n.isPinned);
  const otherNotes = notes.filter((n) => !n.isPinned);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "680px",
        height: "100vh",
        backgroundColor: "#fff",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: "4px",
            color: "#94a3b8",
            marginTop: "2px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: `${getFileIconColor(doc.fileExtension)}15`,
                color: getFileIconColor(doc.fileExtension),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {getFileIcon(doc.fileExtension)}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#1e293b" }}>{doc.title}</h2>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>{doc.fileName}</span>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {doc.tags.map((tag) => (
              <span
                key={tag.id}
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
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

      {/* File Info */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <InfoItem label="카테고리" value={getCategoryName(doc.categoryId)} />
          <InfoItem label="문서 일자" value={formatDate(doc.documentDate)} />
          <InfoItem label="파일 크기" value={formatFileSize(doc.fileSizeBytes)} />
          <InfoItem
            label="기밀등급"
            value={doc.confidentiality === "confidential" ? "기밀" : doc.confidentiality === "internal" ? "사내" : "공개"}
          />
          {doc.parties.length > 0 && (
            <InfoItem label="관련 당사자" value={doc.parties.join(", ")} />
          )}
          <InfoItem label="SharePoint 경로" value={doc.sharepointPath} />
        </div>

        <button
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            backgroundColor: "#eff6ff",
            color: "#1e40af",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          SharePoint에서 열기
        </button>
      </div>

      {/* Notes Section */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>
            메모 ({notes.length})
          </h3>
          <button
            onClick={() => setIsAddingNote(!isAddingNote)}
            style={{
              padding: "6px 14px",
              backgroundColor: "#1e40af",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            + 메모 추가
          </button>
        </div>

        {/* New Note Form */}
        {isAddingNote && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f8fafc",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              marginBottom: "12px",
            }}
          >
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="메모 제목"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "13px",
                marginBottom: "8px",
                outline: "none",
              }}
            />
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="핵심 내용을 메모하세요..."
              rows={4}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "13px",
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setIsAddingNote(false)}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "#fff",
                  color: "#64748b",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={handleAddNote}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "#1e40af",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                저장
              </button>
            </div>
          </div>
        )}

        {/* Pinned Notes */}
        {pinnedNotes.map((note) => (
          <NoteCard key={note.id} note={note} pinned />
        ))}

        {/* Other Notes */}
        {otherNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}

        {notes.length === 0 && !isAddingNote && (
          <div style={{ textAlign: "center", padding: "32px", color: "#94a3b8", fontSize: "13px" }}>
            아직 메모가 없습니다. 첫 메모를 추가해보세요.
          </div>
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>{label}</div>
      <div style={{ fontSize: "13px", color: "#1e293b", fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function NoteCard({ note, pinned }: { note: Note; pinned?: boolean }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        backgroundColor: pinned ? "#fffbeb" : "#f8fafc",
        borderRadius: "10px",
        border: `1px solid ${pinned ? "#fde68a" : "#e2e8f0"}`,
        marginBottom: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {pinned && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
          <span style={{ fontWeight: 600, fontSize: "13px", color: "#1e293b" }}>{note.title}</span>
        </div>
        <span style={{ fontSize: "11px", color: "#94a3b8" }}>{formatDateTime(note.createdAt)}</span>
      </div>
      <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
        {note.content}
      </div>
      <div style={{ marginTop: "8px", fontSize: "11px", color: "#94a3b8" }}>
        작성자: {note.authorName}
      </div>
    </div>
  );
}
