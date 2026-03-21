"use client";

import { useState } from "react";

interface SharePointConfig {
  siteUrl: string;
  rootFolder: string;
  syncInterval: string;
  autoSync: boolean;
}

interface FolderNode {
  name: string;
  path: string;
  children: FolderNode[];
  isExpanded: boolean;
  isSelected: boolean;
}

// SharePoint 폴더 구조를 시뮬레이션한 mock 데이터
const MOCK_SP_FOLDERS: FolderNode[] = [
  {
    name: "법무",
    path: "/sites/company/Shared Documents/법무",
    isExpanded: true,
    isSelected: true,
    children: [
      {
        name: "2026",
        path: "/sites/company/Shared Documents/법무/2026",
        isExpanded: true,
        isSelected: false,
        children: [
          { name: "CP사건 (공정거래)", path: "/sites/company/Shared Documents/법무/2026/CP사건", isExpanded: false, isSelected: false, children: [] },
          { name: "M&A건 (DEF인수)", path: "/sites/company/Shared Documents/법무/2026/MA건_DEF인수", isExpanded: false, isSelected: false, children: [] },
          { name: "노동소송건", path: "/sites/company/Shared Documents/법무/2026/노동소송", isExpanded: false, isSelected: false, children: [] },
        ],
      },
      {
        name: "2025",
        path: "/sites/company/Shared Documents/법무/2025",
        isExpanded: true,
        isSelected: false,
        children: [
          { name: "XYZ 특허소송", path: "/sites/company/Shared Documents/법무/2025/XYZ특허소송", isExpanded: false, isSelected: false, children: [] },
          { name: "NDA/비밀유지", path: "/sites/company/Shared Documents/법무/2025/NDA", isExpanded: false, isSelected: false, children: [] },
          { name: "본사 임대차", path: "/sites/company/Shared Documents/법무/2025/본사임대차", isExpanded: false, isSelected: false, children: [] },
          { name: "JKL 원자재 공급건", path: "/sites/company/Shared Documents/법무/2025/JKL원자재공급", isExpanded: false, isSelected: false, children: [] },
          { name: "ABC 라이선스건", path: "/sites/company/Shared Documents/법무/2025/ABC라이선스", isExpanded: false, isSelected: false, children: [] },
        ],
      },
      {
        name: "2024",
        path: "/sites/company/Shared Documents/법무/2024",
        isExpanded: false,
        isSelected: false,
        children: [
          { name: "사업자등록 갱신", path: "/sites/company/Shared Documents/법무/2024/사업자등록", isExpanded: false, isSelected: false, children: [] },
          { name: "내부통제 정비", path: "/sites/company/Shared Documents/법무/2024/내부통제", isExpanded: false, isSelected: false, children: [] },
        ],
      },
      {
        name: "이사회자료",
        path: "/sites/company/Shared Documents/법무/이사회자료",
        isExpanded: false,
        isSelected: false,
        children: [
          { name: "2026 이사회", path: "/sites/company/Shared Documents/법무/이사회자료/2026", isExpanded: false, isSelected: false, children: [] },
          { name: "2025 이사회", path: "/sites/company/Shared Documents/법무/이사회자료/2025", isExpanded: false, isSelected: false, children: [] },
          { name: "2024 이사회", path: "/sites/company/Shared Documents/법무/이사회자료/2024", isExpanded: false, isSelected: false, children: [] },
        ],
      },
      {
        name: "규정",
        path: "/sites/company/Shared Documents/법무/규정",
        isExpanded: false,
        isSelected: false,
        children: [],
      },
    ],
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"sharepoint" | "users" | "tags">("sharepoint");
  const [config, setConfig] = useState<SharePointConfig>({
    siteUrl: "https://회사명.sharepoint.com/sites/legal",
    rootFolder: "/법무",
    syncInterval: "60",
    autoSync: true,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [folders, setFolders] = useState<FolderNode[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const handleConnect = () => {
    setIsConnecting(true);
    // 실제로는 Graph API 호출
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setFolders(MOCK_SP_FOLDERS);
    }, 1500);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setSyncResult(null);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncResult("동기화 완료: 20개 파일 동기화됨 (신규 3, 업데이트 7, 변경없음 10)");
    }, 2000);
  };

  const tabs = [
    { id: "sharepoint" as const, label: "SharePoint 연동" },
    { id: "users" as const, label: "사용자 권한" },
    { id: "tags" as const, label: "태그 관리" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "2px", marginBottom: "24px", borderBottom: "1px solid #e2e8f0" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #1e40af" : "2px solid transparent",
              background: "none",
              color: activeTab === tab.id ? "#1e40af" : "#64748b",
              fontWeight: activeTab === tab.id ? 600 : 400,
              fontSize: "14px",
              cursor: "pointer",
              marginBottom: "-1px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "sharepoint" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Connection Settings */}
          <Section title="SharePoint 사이트 연결">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <FormField label="SharePoint 사이트 URL">
                <input
                  type="text"
                  value={config.siteUrl}
                  onChange={(e) => setConfig({ ...config, siteUrl: e.target.value })}
                  placeholder="https://회사명.sharepoint.com/sites/사이트명"
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Azure AD Tenant ID">
                <input
                  type="text"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Client ID (앱 등록)">
                <input
                  type="text"
                  placeholder="Azure AD에서 등록한 앱의 Client ID"
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Client Secret">
                <input
                  type="password"
                  placeholder="Azure AD 앱의 Client Secret"
                  style={inputStyle}
                />
              </FormField>
            </div>

            <div style={{ marginTop: "16px", padding: "12px 16px", backgroundColor: "#eff6ff", borderRadius: "8px", border: "1px solid #bfdbfe", fontSize: "13px", color: "#1e40af", lineHeight: "1.6" }}>
              <strong>Azure AD 앱 등록 필요 권한:</strong><br />
              Files.Read.All, Sites.Read.All, User.Read, offline_access<br />
              <span style={{ color: "#64748b" }}>* IT팀에서 Azure Portal &gt; App registrations에서 앱을 등록하고 위 권한을 부여해야 합니다.</span>
            </div>

            <button
              onClick={handleConnect}
              disabled={isConnecting}
              style={{
                ...buttonPrimaryStyle,
                marginTop: "12px",
                opacity: isConnecting ? 0.6 : 1,
              }}
            >
              {isConnecting ? "연결 중..." : isConnected ? "재연결" : "SharePoint 연결"}
            </button>

            {isConnected && (
              <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#16a34a" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
                SharePoint에 정상 연결되었습니다
              </div>
            )}
          </Section>

          {/* Folder Selection */}
          {isConnected && (
            <Section title="동기화 대상 폴더 선택">
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 12px" }}>
                아래 SharePoint 폴더 구조에서 동기화할 루트 폴더를 선택하세요.
                선택한 폴더의 하위 폴더가 자동으로 카테고리로 매핑됩니다.
              </p>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "16px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  backgroundColor: "#fafbfc",
                }}
              >
                {folders.map((folder) => (
                  <FolderTreeNode key={folder.path} node={folder} depth={0} />
                ))}
              </div>

              <div style={{ marginTop: "12px", padding: "12px 16px", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0", fontSize: "13px", color: "#15803d" }}>
                <strong>선택된 루트 폴더:</strong> /법무<br />
                하위 폴더 구조가 사이드바의 카테고리 트리로 자동 반영됩니다.
              </div>
            </Section>
          )}

          {/* Sync Settings */}
          {isConnected && (
            <Section title="동기화 설정">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <FormField label="자동 동기화 간격">
                  <select
                    value={config.syncInterval}
                    onChange={(e) => setConfig({ ...config, syncInterval: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="15">15분마다</option>
                    <option value="30">30분마다</option>
                    <option value="60">1시간마다</option>
                    <option value="360">6시간마다</option>
                    <option value="1440">1일마다</option>
                  </select>
                </FormField>
                <FormField label="자동 동기화">
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" }}>
                    <input
                      type="checkbox"
                      checked={config.autoSync}
                      onChange={(e) => setConfig({ ...config, autoSync: e.target.checked })}
                      style={{ width: "16px", height: "16px", accentColor: "#1e40af" }}
                    />
                    자동 동기화 활성화 (SharePoint 변경 사항 자동 반영)
                  </label>
                </FormField>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button
                  onClick={handleSync}
                  disabled={isSyncing}
                  style={{
                    ...buttonPrimaryStyle,
                    opacity: isSyncing ? 0.6 : 1,
                  }}
                >
                  {isSyncing ? "동기화 중..." : "수동 동기화 실행"}
                </button>
                <button style={buttonSecondaryStyle}>
                  설정 저장
                </button>
              </div>

              {syncResult && (
                <div style={{ marginTop: "12px", padding: "12px 16px", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0", fontSize: "13px", color: "#15803d" }}>
                  {syncResult}
                </div>
              )}
            </Section>
          )}

          {/* How it works */}
          <Section title="동작 방식">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <StepCard
                step={1}
                title="SharePoint 폴더 연결"
                description="법무 문서가 저장된 SharePoint 사이트와 루트 폴더를 지정합니다."
              />
              <StepCard
                step={2}
                title="폴더 → 카테고리 매핑"
                description="SharePoint의 폴더 구조가 좌측 사이드바 카테고리 트리로 자동 반영됩니다."
              />
              <StepCard
                step={3}
                title="파일 목록 동기화"
                description="각 폴더 내 파일들의 메타데이터가 문서 목록에 표시됩니다. 원본 파일은 SharePoint에 그대로 유지됩니다."
              />
            </div>
          </Section>
        </div>
      )}

      {activeTab === "users" && (
        <Section title="사용자 권한 관리">
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px" }}>
            Azure AD 그룹 기반으로 접근 권한이 관리됩니다. 사용자는 첫 로그인 시 자동 등록됩니다.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                <th style={thStyle}>이름</th>
                <th style={thStyle}>이메일</th>
                <th style={thStyle}>부서</th>
                <th style={thStyle}>권한</th>
                <th style={thStyle}>마지막 접속</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "김법무", email: "km@company.com", dept: "법무팀", role: "관리자", lastLogin: "2026.03.21 09:30" },
                { name: "이대리", email: "lee@company.com", dept: "법무팀", role: "편집자", lastLogin: "2026.03.20 17:00" },
                { name: "박변호사", email: "park@company.com", dept: "법무팀", role: "편집자", lastLogin: "2026.03.19 14:20" },
                { name: "최과장", email: "choi@company.com", dept: "경영기획", role: "뷰어", lastLogin: "2026.03.18 10:15" },
              ].map((user) => (
                <tr key={user.email} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={{ ...tdStyle, color: "#64748b", fontSize: "12px" }}>{user.email}</td>
                  <td style={tdStyle}>{user.dept}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 500,
                      backgroundColor: user.role === "관리자" ? "#fee2e2" : user.role === "편집자" ? "#e0e7ff" : "#f1f5f9",
                      color: user.role === "관리자" ? "#dc2626" : user.role === "편집자" ? "#4f46e5" : "#64748b",
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: "#94a3b8", fontSize: "12px" }}>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {activeTab === "tags" && (
        <Section title="태그 관리">
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px" }}>
            문서에 부여할 태그를 관리합니다. 태그를 통해 사건 유형, 진행 상태 등을 빠르게 파악할 수 있습니다.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {[
              { name: "긴급", color: "#dc2626" },
              { name: "검토완료", color: "#16a34a" },
              { name: "검토중", color: "#d97706" },
              { name: "갱신필요", color: "#9333ea" },
              { name: "만료예정", color: "#ea580c" },
              { name: "NDA", color: "#0891b2" },
              { name: "소송", color: "#7c3aed" },
              { name: "이사회", color: "#0369a1" },
              { name: "M&A", color: "#b91c1c" },
              { name: "CP(공정거래)", color: "#4f46e5" },
            ].map((tag) => (
              <div
                key={tag.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                }}
              >
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: tag.color }} />
                <span style={{ fontSize: "13px", fontWeight: 500 }}>{tag.name}</span>
                <button style={{ border: "none", background: "none", color: "#94a3b8", cursor: "pointer", fontSize: "16px", padding: "0 2px" }}>
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input type="text" placeholder="새 태그 이름" style={{ ...inputStyle, flex: 1 }} />
            <input type="color" defaultValue="#6366f1" style={{ width: "40px", height: "38px", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer" }} />
            <button style={buttonPrimaryStyle}>추가</button>
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "20px 24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>{title}</h3>
      {children}
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function FolderTreeNode({ node, depth }: { node: FolderNode; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 8px",
          paddingLeft: `${depth * 20 + 8}px`,
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          color: node.isSelected ? "#1e40af" : "#374151",
          fontWeight: node.isSelected ? 600 : 400,
          backgroundColor: node.isSelected ? "#eff6ff" : "transparent",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        ) : (
          <span style={{ width: "14px" }} />
        )}
        <svg width="16" height="16" viewBox="0 0 24 24" fill={node.isSelected ? "#3b82f6" : "#fbbf24"} stroke="none">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <span>{node.name}</span>
        {node.isSelected && (
          <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "4px", backgroundColor: "#1e40af", color: "#fff", marginLeft: "4px" }}>
            루트
          </span>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <FolderTreeNode key={child.path} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
      <div style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        backgroundColor: "#1e40af",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: 700,
        marginBottom: "10px",
      }}>
        {step}
      </div>
      <div style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5" }}>{description}</div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "13px",
  outline: "none",
  backgroundColor: "#fff",
  color: "#1e293b",
};

const buttonPrimaryStyle: React.CSSProperties = {
  padding: "9px 20px",
  backgroundColor: "#1e40af",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
};

const buttonSecondaryStyle: React.CSSProperties = {
  padding: "9px 20px",
  backgroundColor: "#fff",
  color: "#475569",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
};

const thStyle: React.CSSProperties = {
  padding: "10px 14px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748b",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: "13px",
};
