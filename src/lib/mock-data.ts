export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileExtension: string;
  fileSizeBytes: number;
  sharepointUrl: string;
  sharepointPath: string;
  categoryId: string;
  status: "active" | "archived" | "deleted";
  documentDate: string;
  parties: string[];
  confidentiality: "public" | "internal" | "confidential";
  createdAt: string;
  updatedAt: string;
  noteCount: number;
  tags: Tag[];
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Note {
  id: string;
  documentId: string;
  authorName: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SyncLog {
  id: string;
  startedAt: string;
  completedAt: string | null;
  status: "running" | "success" | "failed";
  filesAdded: number;
  filesUpdated: number;
}

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "계약서", parentId: null, count: 45 },
  { id: "cat-2", name: "소송/분쟁", parentId: null, count: 23 },
  { id: "cat-3", name: "자문의견서", parentId: null, count: 18 },
  { id: "cat-4", name: "규정/정책", parentId: null, count: 31 },
  { id: "cat-5", name: "인허가/등록", parentId: null, count: 12 },
  { id: "cat-6", name: "매매계약", parentId: "cat-1", count: 15 },
  { id: "cat-7", name: "용역계약", parentId: "cat-1", count: 12 },
  { id: "cat-8", name: "임대차계약", parentId: "cat-1", count: 8 },
  { id: "cat-9", name: "라이선스계약", parentId: "cat-1", count: 10 },
];

export const MOCK_TAGS: Tag[] = [
  { id: "tag-1", name: "긴급", color: "#dc2626" },
  { id: "tag-2", name: "검토완료", color: "#16a34a" },
  { id: "tag-3", name: "검토중", color: "#d97706" },
  { id: "tag-4", name: "갱신필요", color: "#9333ea" },
  { id: "tag-5", name: "만료예정", color: "#ea580c" },
  { id: "tag-6", name: "NDA", color: "#0891b2" },
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    title: "ABC Corp 소프트웨어 라이선스 계약서",
    fileName: "ABC_Corp_License_Agreement_2025.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 2450000,
    sharepointUrl: "#",
    sharepointPath: "/법무/계약서/라이선스계약",
    categoryId: "cat-9",
    status: "active",
    documentDate: "2025-03-15",
    parties: ["ABC Corp", "당사"],
    confidentiality: "confidential",
    createdAt: "2025-03-16T09:00:00Z",
    updatedAt: "2025-03-16T09:00:00Z",
    noteCount: 3,
    tags: [MOCK_TAGS[1], MOCK_TAGS[5]],
  },
  {
    id: "doc-2",
    title: "2025년도 사무실 임대차 계약서",
    fileName: "Office_Lease_2025.docx",
    fileExtension: "docx",
    fileSizeBytes: 1850000,
    sharepointUrl: "#",
    sharepointPath: "/법무/계약서/임대차계약",
    categoryId: "cat-8",
    status: "active",
    documentDate: "2025-01-10",
    parties: ["서울빌딩 주식회사", "당사"],
    confidentiality: "internal",
    createdAt: "2025-01-11T10:30:00Z",
    updatedAt: "2025-02-15T14:00:00Z",
    noteCount: 2,
    tags: [MOCK_TAGS[4]],
  },
  {
    id: "doc-3",
    title: "개인정보 처리방침 (v3.2)",
    fileName: "Privacy_Policy_v3.2.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 980000,
    sharepointUrl: "#",
    sharepointPath: "/법무/규정/개인정보",
    categoryId: "cat-4",
    status: "active",
    documentDate: "2025-06-01",
    parties: [],
    confidentiality: "public",
    createdAt: "2025-06-02T08:00:00Z",
    updatedAt: "2025-06-02T08:00:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[1]],
  },
  {
    id: "doc-4",
    title: "XYZ 기술 특허 침해 소송 답변서",
    fileName: "XYZ_Patent_Response.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 5200000,
    sharepointUrl: "#",
    sharepointPath: "/법무/소송/특허",
    categoryId: "cat-2",
    status: "active",
    documentDate: "2025-08-20",
    parties: ["XYZ Technologies", "당사"],
    confidentiality: "confidential",
    createdAt: "2025-08-21T11:00:00Z",
    updatedAt: "2025-09-10T16:00:00Z",
    noteCount: 5,
    tags: [MOCK_TAGS[0], MOCK_TAGS[2]],
  },
  {
    id: "doc-5",
    title: "DEF 물류 용역 계약서",
    fileName: "DEF_Logistics_Service_Agreement.docx",
    fileExtension: "docx",
    fileSizeBytes: 1200000,
    sharepointUrl: "#",
    sharepointPath: "/법무/계약서/용역계약",
    categoryId: "cat-7",
    status: "active",
    documentDate: "2025-05-22",
    parties: ["DEF 물류", "당사"],
    confidentiality: "internal",
    createdAt: "2025-05-23T09:30:00Z",
    updatedAt: "2025-05-23T09:30:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[1]],
  },
  {
    id: "doc-6",
    title: "내부 컴플라이언스 규정 (2025)",
    fileName: "Compliance_Policy_2025.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 3100000,
    sharepointUrl: "#",
    sharepointPath: "/법무/규정/컴플라이언스",
    categoryId: "cat-4",
    status: "active",
    documentDate: "2025-02-01",
    parties: [],
    confidentiality: "internal",
    createdAt: "2025-02-02T08:00:00Z",
    updatedAt: "2025-02-02T08:00:00Z",
    noteCount: 0,
    tags: [MOCK_TAGS[3]],
  },
  {
    id: "doc-7",
    title: "GHI 파트너 NDA (비밀유지계약)",
    fileName: "GHI_NDA_2025.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 650000,
    sharepointUrl: "#",
    sharepointPath: "/법무/계약서/NDA",
    categoryId: "cat-1",
    status: "active",
    documentDate: "2025-04-10",
    parties: ["GHI Partners", "당사"],
    confidentiality: "confidential",
    createdAt: "2025-04-11T13:00:00Z",
    updatedAt: "2025-04-11T13:00:00Z",
    noteCount: 2,
    tags: [MOCK_TAGS[5], MOCK_TAGS[1]],
  },
  {
    id: "doc-8",
    title: "사업자 등록증 갱신 서류",
    fileName: "Business_Registration_Renewal.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 420000,
    sharepointUrl: "#",
    sharepointPath: "/법무/인허가",
    categoryId: "cat-5",
    status: "archived",
    documentDate: "2024-12-15",
    parties: [],
    confidentiality: "internal",
    createdAt: "2024-12-16T10:00:00Z",
    updatedAt: "2024-12-16T10:00:00Z",
    noteCount: 0,
    tags: [],
  },
  {
    id: "doc-9",
    title: "JKL 매매계약서 (원자재 공급)",
    fileName: "JKL_Supply_Agreement.docx",
    fileExtension: "docx",
    fileSizeBytes: 1750000,
    sharepointUrl: "#",
    sharepointPath: "/법무/계약서/매매계약",
    categoryId: "cat-6",
    status: "active",
    documentDate: "2025-07-05",
    parties: ["JKL Industries", "당사"],
    confidentiality: "internal",
    createdAt: "2025-07-06T09:00:00Z",
    updatedAt: "2025-07-06T09:00:00Z",
    noteCount: 4,
    tags: [MOCK_TAGS[2]],
  },
  {
    id: "doc-10",
    title: "외부 법률 자문의견서 (M&A 관련)",
    fileName: "Legal_Opinion_MA_2025.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 4800000,
    sharepointUrl: "#",
    sharepointPath: "/법무/자문의견서",
    categoryId: "cat-3",
    status: "active",
    documentDate: "2025-09-01",
    parties: ["법무법인 한빛"],
    confidentiality: "confidential",
    createdAt: "2025-09-02T14:00:00Z",
    updatedAt: "2025-09-05T10:00:00Z",
    noteCount: 6,
    tags: [MOCK_TAGS[0], MOCK_TAGS[2]],
  },
];

export const MOCK_NOTES: Note[] = [
  {
    id: "note-1",
    documentId: "doc-1",
    authorName: "김법무",
    title: "계약 핵심 조항",
    content: "- 라이선스 기간: 2025.03~2028.03 (3년)\n- 자동 갱신 조항 있음 (만료 90일 전 서면 통지 시 해지 가능)\n- 사용 범위: 국내 사업부 전체\n- 위약금: 잔여 기간 라이선스비의 50%",
    isPinned: true,
    createdAt: "2025-03-16T10:00:00Z",
    updatedAt: "2025-03-16T10:00:00Z",
  },
  {
    id: "note-2",
    documentId: "doc-1",
    authorName: "이대리",
    title: "검토 의견",
    content: "제8조 손해배상 조항 검토 필요. 상한액이 계약금액의 100%로 설정되어 있어 리스크 있음. 법무법인 의견 받아볼 것.",
    isPinned: false,
    createdAt: "2025-03-17T14:30:00Z",
    updatedAt: "2025-03-17T14:30:00Z",
  },
  {
    id: "note-3",
    documentId: "doc-1",
    authorName: "김법무",
    title: "수정 이력",
    content: "2025.03.18 - 제8조 손해배상 상한 50%로 수정 합의\n2025.03.20 - 최종본 서명 완료",
    isPinned: false,
    createdAt: "2025-03-20T16:00:00Z",
    updatedAt: "2025-03-20T16:00:00Z",
  },
  {
    id: "note-4",
    documentId: "doc-4",
    authorName: "박변호사",
    title: "소송 진행 상황",
    content: "XYZ 측 특허 3건 중 2건은 무효 사유 확인됨. 답변서에 선행기술 자료 첨부 완료.\n\n**다음 기일:** 2025년 10월 15일\n**담당 법원:** 서울중앙지방법원",
    isPinned: true,
    createdAt: "2025-08-22T09:00:00Z",
    updatedAt: "2025-09-10T16:00:00Z",
  },
  {
    id: "note-5",
    documentId: "doc-10",
    authorName: "김법무",
    title: "자문 요약",
    content: "M&A 대상 회사의 주요 법적 리스크:\n1. 미해결 노동 소송 2건\n2. 환경 규제 위반 이력\n3. 핵심 특허 만료 임박 (2026.06)\n\n법무법인 의견: 인수가 조정 또는 에스크로 설정 권고",
    isPinned: true,
    createdAt: "2025-09-02T15:00:00Z",
    updatedAt: "2025-09-05T10:00:00Z",
  },
];

export const MOCK_SYNC_LOG: SyncLog = {
  id: "sync-1",
  startedAt: "2025-09-15T06:00:00Z",
  completedAt: "2025-09-15T06:02:30Z",
  status: "success",
  filesAdded: 3,
  filesUpdated: 7,
};

// Helper functions
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function getFileIcon(ext: string): string {
  switch (ext) {
    case "pdf": return "PDF";
    case "docx": case "doc": return "DOC";
    case "xlsx": case "xls": return "XLS";
    case "pptx": case "ppt": return "PPT";
    case "hwp": return "HWP";
    default: return "FILE";
  }
}

export function getFileIconColor(ext: string): string {
  switch (ext) {
    case "pdf": return "#dc2626";
    case "docx": case "doc": return "#2563eb";
    case "xlsx": case "xls": return "#16a34a";
    case "pptx": case "ppt": return "#ea580c";
    case "hwp": return "#0891b2";
    default: return "#6b7280";
  }
}

export function getCategoryName(categoryId: string): string {
  return MOCK_CATEGORIES.find(c => c.id === categoryId)?.name ?? "미분류";
}
