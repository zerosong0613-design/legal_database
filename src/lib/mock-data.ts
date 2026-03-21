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
  // 연도별 사건
  { id: "cat-2026", name: "2026", parentId: null, count: 8 },
  { id: "cat-2026-cp", name: "CP사건 (공정거래)", parentId: "cat-2026", count: 3 },
  { id: "cat-2026-ma", name: "M&A건 (DEF인수)", parentId: "cat-2026", count: 4 },
  { id: "cat-2026-labor", name: "노동소송건", parentId: "cat-2026", count: 1 },

  { id: "cat-2025", name: "2025", parentId: null, count: 15 },
  { id: "cat-2025-patent", name: "XYZ 특허소송", parentId: "cat-2025", count: 5 },
  { id: "cat-2025-nda", name: "NDA/비밀유지", parentId: "cat-2025", count: 3 },
  { id: "cat-2025-lease", name: "본사 임대차", parentId: "cat-2025", count: 2 },
  { id: "cat-2025-supply", name: "JKL 원자재 공급건", parentId: "cat-2025", count: 3 },
  { id: "cat-2025-license", name: "ABC 라이선스건", parentId: "cat-2025", count: 2 },

  { id: "cat-2024", name: "2024", parentId: null, count: 6 },
  { id: "cat-2024-reg", name: "사업자등록 갱신", parentId: "cat-2024", count: 2 },
  { id: "cat-2024-compliance", name: "내부통제 정비", parentId: "cat-2024", count: 4 },

  // 이사회/경영
  { id: "cat-board", name: "이사회자료", parentId: null, count: 12 },
  { id: "cat-board-2026", name: "2026 이사회", parentId: "cat-board", count: 4 },
  { id: "cat-board-2025", name: "2025 이사회", parentId: "cat-board", count: 5 },
  { id: "cat-board-2024", name: "2024 이사회", parentId: "cat-board", count: 3 },

  // 규정/정책
  { id: "cat-policy", name: "규정/정책", parentId: null, count: 8 },
];

export const MOCK_TAGS: Tag[] = [
  { id: "tag-1", name: "긴급", color: "#dc2626" },
  { id: "tag-2", name: "검토완료", color: "#16a34a" },
  { id: "tag-3", name: "검토중", color: "#d97706" },
  { id: "tag-4", name: "갱신필요", color: "#9333ea" },
  { id: "tag-5", name: "만료예정", color: "#ea580c" },
  { id: "tag-6", name: "NDA", color: "#0891b2" },
  { id: "tag-7", name: "소송", color: "#7c3aed" },
  { id: "tag-8", name: "이사회", color: "#0369a1" },
  { id: "tag-9", name: "M&A", color: "#b91c1c" },
  { id: "tag-10", name: "CP(공정거래)", color: "#4f46e5" },
];

export const MOCK_DOCUMENTS: Document[] = [
  // 2026 - CP사건
  {
    id: "doc-1",
    title: "공정위 시정명령서",
    fileName: "FTC_Corrective_Order_2026.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 3200000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/CP사건",
    categoryId: "cat-2026-cp",
    status: "active",
    documentDate: "2026-01-15",
    parties: ["공정거래위원회", "당사"],
    confidentiality: "confidential",
    createdAt: "2026-01-16T09:00:00Z",
    updatedAt: "2026-01-16T09:00:00Z",
    noteCount: 4,
    tags: [MOCK_TAGS[0], MOCK_TAGS[9]],
  },
  {
    id: "doc-2",
    title: "CP프로그램 이행점검 보고서",
    fileName: "CP_Compliance_Report_Q1_2026.docx",
    fileExtension: "docx",
    fileSizeBytes: 1850000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/CP사건",
    categoryId: "cat-2026-cp",
    status: "active",
    documentDate: "2026-02-20",
    parties: [],
    confidentiality: "internal",
    createdAt: "2026-02-21T10:30:00Z",
    updatedAt: "2026-02-21T10:30:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[2], MOCK_TAGS[9]],
  },
  {
    id: "doc-3",
    title: "외부 법무법인 의견서 (과징금 감경)",
    fileName: "Legal_Opinion_FTC_Penalty.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 2100000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/CP사건",
    categoryId: "cat-2026-cp",
    status: "active",
    documentDate: "2026-02-28",
    parties: ["법무법인 광장"],
    confidentiality: "confidential",
    createdAt: "2026-03-01T09:00:00Z",
    updatedAt: "2026-03-01T09:00:00Z",
    noteCount: 3,
    tags: [MOCK_TAGS[0], MOCK_TAGS[9]],
  },
  // 2026 - M&A건
  {
    id: "doc-4",
    title: "DEF Corp 인수 LOI (의향서)",
    fileName: "DEF_LOI_2026.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 1500000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/MA건_DEF인수",
    categoryId: "cat-2026-ma",
    status: "active",
    documentDate: "2026-01-10",
    parties: ["DEF Corp", "당사"],
    confidentiality: "confidential",
    createdAt: "2026-01-11T11:00:00Z",
    updatedAt: "2026-01-11T11:00:00Z",
    noteCount: 2,
    tags: [MOCK_TAGS[8]],
  },
  {
    id: "doc-5",
    title: "DEF Corp 실사보고서 (법률)",
    fileName: "DEF_Legal_DD_Report.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 8500000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/MA건_DEF인수",
    categoryId: "cat-2026-ma",
    status: "active",
    documentDate: "2026-02-15",
    parties: ["법무법인 한빛", "DEF Corp"],
    confidentiality: "confidential",
    createdAt: "2026-02-16T14:00:00Z",
    updatedAt: "2026-03-05T10:00:00Z",
    noteCount: 6,
    tags: [MOCK_TAGS[0], MOCK_TAGS[2], MOCK_TAGS[8]],
  },
  {
    id: "doc-6",
    title: "DEF Corp SPA (주식매매계약서) 초안",
    fileName: "DEF_SPA_Draft_v2.docx",
    fileExtension: "docx",
    fileSizeBytes: 4200000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/MA건_DEF인수",
    categoryId: "cat-2026-ma",
    status: "active",
    documentDate: "2026-03-10",
    parties: ["DEF Corp", "당사"],
    confidentiality: "confidential",
    createdAt: "2026-03-11T09:00:00Z",
    updatedAt: "2026-03-15T16:00:00Z",
    noteCount: 5,
    tags: [MOCK_TAGS[2], MOCK_TAGS[8]],
  },
  {
    id: "doc-7",
    title: "DEF Corp 기업결합 신고서",
    fileName: "DEF_Merger_Filing.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 3100000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/MA건_DEF인수",
    categoryId: "cat-2026-ma",
    status: "active",
    documentDate: "2026-03-18",
    parties: ["공정거래위원회"],
    confidentiality: "confidential",
    createdAt: "2026-03-19T10:00:00Z",
    updatedAt: "2026-03-19T10:00:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[8], MOCK_TAGS[9]],
  },
  // 2026 - 노동소송
  {
    id: "doc-8",
    title: "부당해고 구제신청서 (홍OO)",
    fileName: "Labor_Case_Hong_2026.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 2400000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2026/노동소송",
    categoryId: "cat-2026-labor",
    status: "active",
    documentDate: "2026-02-05",
    parties: ["홍OO", "당사"],
    confidentiality: "confidential",
    createdAt: "2026-02-06T09:00:00Z",
    updatedAt: "2026-02-06T09:00:00Z",
    noteCount: 3,
    tags: [MOCK_TAGS[6], MOCK_TAGS[2]],
  },
  // 2025 - XYZ 특허소송
  {
    id: "doc-9",
    title: "XYZ 특허 침해 소송 소장",
    fileName: "XYZ_Patent_Complaint.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 5200000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2025/XYZ특허소송",
    categoryId: "cat-2025-patent",
    status: "active",
    documentDate: "2025-06-20",
    parties: ["XYZ Technologies", "당사"],
    confidentiality: "confidential",
    createdAt: "2025-06-21T11:00:00Z",
    updatedAt: "2025-09-10T16:00:00Z",
    noteCount: 5,
    tags: [MOCK_TAGS[6], MOCK_TAGS[2]],
  },
  {
    id: "doc-10",
    title: "XYZ 특허소송 답변서",
    fileName: "XYZ_Patent_Response.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 4300000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2025/XYZ특허소송",
    categoryId: "cat-2025-patent",
    status: "active",
    documentDate: "2025-08-20",
    parties: ["XYZ Technologies", "당사"],
    confidentiality: "confidential",
    createdAt: "2025-08-21T11:00:00Z",
    updatedAt: "2025-08-21T11:00:00Z",
    noteCount: 3,
    tags: [MOCK_TAGS[6], MOCK_TAGS[1]],
  },
  // 2025 - NDA
  {
    id: "doc-11",
    title: "GHI 파트너 NDA",
    fileName: "GHI_NDA_2025.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 650000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2025/NDA",
    categoryId: "cat-2025-nda",
    status: "active",
    documentDate: "2025-04-10",
    parties: ["GHI Partners", "당사"],
    confidentiality: "confidential",
    createdAt: "2025-04-11T13:00:00Z",
    updatedAt: "2025-04-11T13:00:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[5], MOCK_TAGS[1]],
  },
  // 2025 - 임대차
  {
    id: "doc-12",
    title: "본사 사무실 임대차 계약서",
    fileName: "Office_Lease_2025.docx",
    fileExtension: "docx",
    fileSizeBytes: 1850000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2025/본사임대차",
    categoryId: "cat-2025-lease",
    status: "active",
    documentDate: "2025-01-10",
    parties: ["서울빌딩 주식회사", "당사"],
    confidentiality: "internal",
    createdAt: "2025-01-11T10:30:00Z",
    updatedAt: "2025-02-15T14:00:00Z",
    noteCount: 2,
    tags: [MOCK_TAGS[4]],
  },
  // 2025 - JKL 원자재
  {
    id: "doc-13",
    title: "JKL 원자재 공급계약서",
    fileName: "JKL_Supply_Agreement.docx",
    fileExtension: "docx",
    fileSizeBytes: 1750000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2025/JKL원자재공급",
    categoryId: "cat-2025-supply",
    status: "active",
    documentDate: "2025-07-05",
    parties: ["JKL Industries", "당사"],
    confidentiality: "internal",
    createdAt: "2025-07-06T09:00:00Z",
    updatedAt: "2025-07-06T09:00:00Z",
    noteCount: 2,
    tags: [MOCK_TAGS[2]],
  },
  // 2025 - ABC 라이선스
  {
    id: "doc-14",
    title: "ABC Corp 소프트웨어 라이선스 계약서",
    fileName: "ABC_License_Agreement_2025.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 2450000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2025/ABC라이선스",
    categoryId: "cat-2025-license",
    status: "active",
    documentDate: "2025-03-15",
    parties: ["ABC Corp", "당사"],
    confidentiality: "confidential",
    createdAt: "2025-03-16T09:00:00Z",
    updatedAt: "2025-03-16T09:00:00Z",
    noteCount: 3,
    tags: [MOCK_TAGS[1]],
  },
  // 2024 - archived
  {
    id: "doc-15",
    title: "사업자 등록증 갱신 서류",
    fileName: "Business_Registration_Renewal.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 420000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2024/사업자등록",
    categoryId: "cat-2024-reg",
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
    id: "doc-16",
    title: "내부 컴플라이언스 규정 (2024 개정)",
    fileName: "Compliance_Policy_2024.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 3100000,
    sharepointUrl: "#",
    sharepointPath: "/법무/2024/내부통제",
    categoryId: "cat-2024-compliance",
    status: "archived",
    documentDate: "2024-06-01",
    parties: [],
    confidentiality: "internal",
    createdAt: "2024-06-02T08:00:00Z",
    updatedAt: "2024-06-02T08:00:00Z",
    noteCount: 0,
    tags: [MOCK_TAGS[3]],
  },
  // 이사회자료
  {
    id: "doc-17",
    title: "제42기 정기이사회 안건 (DEF 인수 승인)",
    fileName: "Board_42_DEF_Approval.pptx",
    fileExtension: "pptx",
    fileSizeBytes: 6500000,
    sharepointUrl: "#",
    sharepointPath: "/법무/이사회자료/2026",
    categoryId: "cat-board-2026",
    status: "active",
    documentDate: "2026-03-05",
    parties: [],
    confidentiality: "confidential",
    createdAt: "2026-03-06T08:00:00Z",
    updatedAt: "2026-03-06T08:00:00Z",
    noteCount: 2,
    tags: [MOCK_TAGS[7], MOCK_TAGS[8]],
  },
  {
    id: "doc-18",
    title: "제42기 임시이사회 의사록",
    fileName: "Board_42_Extraordinary_Minutes.docx",
    fileExtension: "docx",
    fileSizeBytes: 1200000,
    sharepointUrl: "#",
    sharepointPath: "/법무/이사회자료/2026",
    categoryId: "cat-board-2026",
    status: "active",
    documentDate: "2026-01-20",
    parties: [],
    confidentiality: "confidential",
    createdAt: "2026-01-21T09:00:00Z",
    updatedAt: "2026-01-21T09:00:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[7], MOCK_TAGS[1]],
  },
  {
    id: "doc-19",
    title: "제41기 정기이사회 의사록",
    fileName: "Board_41_Regular_Minutes.docx",
    fileExtension: "docx",
    fileSizeBytes: 1800000,
    sharepointUrl: "#",
    sharepointPath: "/법무/이사회자료/2025",
    categoryId: "cat-board-2025",
    status: "active",
    documentDate: "2025-03-25",
    parties: [],
    confidentiality: "confidential",
    createdAt: "2025-03-26T09:00:00Z",
    updatedAt: "2025-03-26T09:00:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[7], MOCK_TAGS[1]],
  },
  // 규정/정책
  {
    id: "doc-20",
    title: "개인정보 처리방침 (v3.2)",
    fileName: "Privacy_Policy_v3.2.pdf",
    fileExtension: "pdf",
    fileSizeBytes: 980000,
    sharepointUrl: "#",
    sharepointPath: "/법무/규정",
    categoryId: "cat-policy",
    status: "active",
    documentDate: "2025-06-01",
    parties: [],
    confidentiality: "public",
    createdAt: "2025-06-02T08:00:00Z",
    updatedAt: "2025-06-02T08:00:00Z",
    noteCount: 1,
    tags: [MOCK_TAGS[1]],
  },
];

export const MOCK_NOTES: Note[] = [
  {
    id: "note-1",
    documentId: "doc-1",
    authorName: "김법무",
    title: "시정명령 핵심 내용",
    content: "- 시정명령 유형: 가격담합 관련 시정조치\n- 과징금: 약 50억원 (감경 여부 검토 중)\n- 이행기한: 2026.04.30\n- 향후 재발방지 프로그램 제출 필요",
    isPinned: true,
    createdAt: "2026-01-16T10:00:00Z",
    updatedAt: "2026-01-16T10:00:00Z",
  },
  {
    id: "note-2",
    documentId: "doc-1",
    authorName: "이대리",
    title: "대응 전략 논의",
    content: "법무법인 광장과 미팅 결과:\n- 자진시정 감경 (20%) 가능성 있음\n- CP프로그램 이행실적 제출로 추가 감경 기대\n- 행정소송 병행 여부는 4월 중 결정",
    isPinned: false,
    createdAt: "2026-01-20T14:30:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
  },
  {
    id: "note-3",
    documentId: "doc-5",
    authorName: "김법무",
    title: "실사 주요 리스크",
    content: "DEF Corp 법률실사 결과 핵심 이슈:\n1. 미해결 노동소송 2건 (예상 패소금액 ~3억)\n2. 환경규제 위반 이력 (과태료 납부 완료)\n3. 핵심 특허 2건 만료 임박 (2027.06)\n4. 주주간계약 중 Tag-along 조항 해소 필요\n\n법무법인 의견: 인수가 조정 또는 에스크로 5억 설정 권고",
    isPinned: true,
    createdAt: "2026-02-17T15:00:00Z",
    updatedAt: "2026-03-05T10:00:00Z",
  },
  {
    id: "note-4",
    documentId: "doc-6",
    authorName: "박변호사",
    title: "SPA 검토 포인트",
    content: "- 제5조 진술보증: 환경/노동 관련 진술보증 범위 확대 필요\n- 제8조 손해배상: 상한 인수가의 30% → 50%로 협상 중\n- 제12조 선행조건: 공정위 기업결합 승인 포함\n- Closing 예정일: 2026.06.30",
    isPinned: true,
    createdAt: "2026-03-12T09:00:00Z",
    updatedAt: "2026-03-15T16:00:00Z",
  },
  {
    id: "note-5",
    documentId: "doc-9",
    authorName: "김법무",
    title: "소송 경과",
    content: "XYZ 측 특허 3건 중 2건은 무효 사유 확인됨. 답변서에 선행기술 자료 첨부 완료.\n\n다음 기일: 2025년 10월 15일\n담당 법원: 서울중앙지방법원\n담당 재판부: 민사합의50부",
    isPinned: true,
    createdAt: "2025-08-22T09:00:00Z",
    updatedAt: "2025-09-10T16:00:00Z",
  },
  {
    id: "note-6",
    documentId: "doc-17",
    authorName: "김법무",
    title: "이사회 결의 사항",
    content: "DEF Corp 인수 건 만장일치 승인.\n- 인수가: 000억원\n- 지급방식: 현금 70% + 주식교환 30%\n- 실사 완료 후 최종 가격 조정 예정",
    isPinned: false,
    createdAt: "2026-03-06T10:00:00Z",
    updatedAt: "2026-03-06T10:00:00Z",
  },
  {
    id: "note-7",
    documentId: "doc-8",
    authorName: "이대리",
    title: "노동위원회 일정",
    content: "홍OO 부당해고 구제신청 건\n- 조사기일: 2026.03.25\n- 당사 참석자: 인사팀장, 법무담당\n- 준비서류: 근무평가서, 징계위원회 의사록, 취업규칙",
    isPinned: false,
    createdAt: "2026-02-10T11:00:00Z",
    updatedAt: "2026-02-10T11:00:00Z",
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
