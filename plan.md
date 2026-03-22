# 법무 지식 아카이브 (Legal Knowledge Archive) - 구현 계획서

## 1. 프로젝트 개요

SharePoint에 저장된 법무 문서들의 메타데이터를 동기화하고, 문서별 4섹션 메모(핵심 쟁점/실무 판단/리스크/향후 참고)와 사건 정보 관리, AI 요약·채팅 기능을 통해 법무 이력을 체계적으로 관리하는 사내 웹 애플리케이션.

---

## 2. 현재 구현 상태 (Phase 1 - 단일 HTML 프로토타입)

### 2.1 기술 스택

| 구분 | 기술 | 비고 |
|------|------|------|
| **프론트엔드** | 단일 HTML + Vanilla JS + CSS | 외부 라이브러리 없음 |
| **데이터 저장** | localStorage (DataAdapter 패턴) | SP REST API 전환 준비 완료 |
| **AI 연동** | Azure OpenAI (Chat Completions API) | 사내망 Azure 테넌트 |
| **인증** | CURRENT_USER_ID 하드코딩 | Phase 2에서 Azure AD SSO |

### 2.2 사이드바 네비게이션

```
⚖ 법무 지식 아카이브 (클릭→대시보드)
────────────────────
⊞ 대시보드
★ 중요 문서         3
👤 내 담당          12
──── 사건/사무 분류 ────
▾ 2026              8
   CP사건 (공정거래)  3
   M&A건 (DEF인수)   4
   노동소송건        1
▾ 2025             10
   XYZ 특허소송      2
   NDA/비밀유지 완료  1   ← 종료 사건 표시
   ...
▾ 이사회자료         3
  규정/정책          1
────────────────────
⚙ 설정 (관리자만)
● 동기화 상태: 정상
```

### 2.3 구현 완료 기능

#### 페이지 구성
- **대시보드** — 전체 통계, 진행 중 사건, 내 담당 사건, 최근 팀 활동, 문서유형 분포, 최근 등록 문서
- **중요 문서** — importance=High 문서 필터
- **내 담당** — 현재 사용자가 담당자인 문서/사건 필터 + 유효건만 토글
- **사건/사무 분류** — SP 폴더 구조 기반 트리 → 폴더별 그룹핑 문서 목록
- **사건 요약** — 사건 정보(상태/기간/담당자/법무법인/개요) + AI 요약 + 주요 문서 + AI 채팅 + 사건 메모
- **설정** — SharePoint 연동 / AI 연동 / 카테고리 관리 / 사용자 권한 / 태그 관리 (5탭)

#### 문서 목록
- 폴더별 그룹핑 뷰 (검색/정렬 시 평면 리스트로 자동 전환)
- 다중 필터: 문서유형, 업무분류, 담당자, 상태, 중요도, 태그
- 컬럼 정렬 (제목/문서유형/업무분류/담당자/일자/상태/중요도)
- ★ 중요 문서 토글 (테이블에서 바로 클릭)
- 유효건만 토글 (종료 사건 문서 숨김, 전역 적용)
- 체크박스 다중 선택 → 일괄 작업 바:
  - 담당자 일괄 변경 (모달에서 선택)
  - 태그 일괄 추가/제거 (모달에서 체크박스 토글)
  - CSV 내보내기 (선택 문서 메타데이터 다운로드)
  - 로컬 문서 삭제 (SP 동기화 문서는 삭제 불가, 로컬 등록 문서만)
- 페이지네이션 (15건 단위)
- 모바일 반응형 (768px 이하 사이드바 오버레이, 테이블 컬럼 자동 숨김)

#### 문서 상세 패널 (우측 슬라이드)
- 파일 정보: 문서유형, 업무분류, 사건명, 담당자, 일자, 기밀등급, 당사자, SP경로
- **4섹션 메모**: 핵심 쟁점 [T] / 실무 판단 [J] / 리스크 포인트 [!] / 향후 참고 [F]
- **AI 메모 자동 작성**: 파일 내용 분석 → 비어있는 섹션만 AI가 자동 채움
- 관련 문서: 동일 사건, 동일 유형 자동 추천
- 수정 버튼 → 수정 모달
- ★ 중요 문서 토글

#### 사건 요약 페이지
- 사건 정보 (상태/기간/담당자/외부법무법인/개요) — 수정 모달로 편집 가능
- AI 요약 생성 (문서+메모 분석 → 요약/핵심이슈/조치사항/위험도)
- **주요 문서** — 중요 문서(★) 상단 그룹, 일반 문서 하단 (메모 유무 표시)
- AI 채팅 (사건 컨텍스트 기반 멀티턴 대화)
- 사건 메모 (고정/일반 구분, 추가/수정/삭제)

#### AI 기능 (Azure OpenAI)
- 사건 요약 자동생성 (결과 localStorage 캐싱)
- 문서 메모 AI 자동 작성 (기존 메모 보존, 빈 섹션만 채움)
- 사건별 AI 채팅 (히스토리 localStorage 저장)
- SP 연동 시: Azure AI Document Intelligence로 PDF/DOCX 텍스트 추출 가능

#### 권한 제어
| 기능 | 관리자 | 편집자 | 뷰어 |
|------|:---:|:---:|:---:|
| 문서/사건 조회, 검색, AI 채팅 | O | O | O |
| 문서 등록, 메타 수정, 메모 작성, ★ 토글 | O | O | - |
| 사건 정보 수정, 동기화, 설정 | O | - | - |

#### 사용자 관리 (설정 > 사용자 권한)
- 사용자 추가/제거, 역할 변경 (드롭다운 즉시 반영)
- 자기 자신의 역할 변경 불가
- 담당자 드롭다운 전체 연동 (사용자 목록에서 admin/editor만)
- SP 연동 시: Azure AD 사용자 자동 조회, Person 필드 매핑

### 2.4 데이터 모델

```
카테고리 (=사건/사무 단위)
├── id, name, parentId
├── caseStatus      (진행중/검토중/완료/참고자료)
├── casePeriod      (기간)
├── caseManager     (userId → Person 필드)
├── caseLawFirm     (외부 법무법인)
└── caseSummary     (사건 개요)

문서 (SharePoint 파일 메타데이터)
├── id, title, fileName, ext, size, spPath, catId
├── status, date, parties[], conf, created
├── owner           (userId → Person 필드)
├── importance      (High/Medium/Low)
├── docType, workCat, matterName
├── tagIds[], body
└── (파일 원본은 SP 문서 라이브러리에 보관)

사용자 (Azure AD 연동)
├── id, name, email, dept
├── role            (admin/editor/viewer)
└── lastLogin

문서 메모 (4섹션)
├── docId → issue, judgment, risk, future
├── modified, modifiedBy (userId)

사건 메모 (리스트)
├── catId, docId, title, content
├── pinned, author (userId), date
```

### 2.5 DataAdapter (저장소 추상화)

| 메서드 | Phase 1 (데모) | Phase 2 (SP) |
|--------|---------------|-------------|
| getDocs/addDoc/updateDoc | localStorage | LKA_DocMeta + Graph API |
| getCats/addCat/updateCat | localStorage | LKA_Categories + SP 폴더 생성 |
| getTags/addTag/deleteTag | localStorage | LKA_Tags |
| getUsers/updateUserRole | localStorage | LKA_Users / Azure AD Groups |
| getDocMemo/setDocMemo | localStorage | LKA_DocMemos |
| getCaseNotes/addCaseNote/updateCaseNote/deleteCaseNote | localStorage | LKA_CaseNotes |
| getAISummary/getChatHistory | localStorage | localStorage (AI 캐시) |
| exportCSV (일괄 내보내기) | 브라우저 다운로드 | 브라우저 다운로드 |
| bulk 담당자 변경/태그 추가 | DA.updateDoc() 반복 | LKA_DocMeta batch update |

### 2.6 SP 연동 원칙

| 이 시스템에서 | SharePoint에서 | 방향 |
|-------------|---------------|------|
| 문서 등록 (파일 첨부) | 파일 업로드 + 폴더 배치 | 여기 → SP |
| 문서 동기화 | 폴더 구조 읽기 (delta query) | SP → 여기 |
| 사건/폴더 추가 | 폴더 생성 | 여기 → SP |
| 메타데이터/메모/태그 | SP Lists에 저장 | 여기 → SP |
| 담당자 | Person 필드 (Azure AD 자동) | SP ↔ 여기 |
| **SP 문서 삭제** | **SP에서만 가능** | SP only |
| 로컬 문서 삭제 | 일괄 선택 → 삭제 (SP 미동기화 문서만) | 여기 only |
| 일괄 담당자 변경/태그 추가 | 다중 선택 → 모달 | 여기 → SP |
| CSV 내보내기 | 선택 문서 메타데이터 다운로드 | 여기 only |
| **폴더 삭제** | **SP에서만 가능** | SP only |

### 2.7 샘플 데이터 (20건)

| 사건/분류 | 문서 수 | 상태 | 담당자 |
|-----------|---------|------|--------|
| CP사건 (공정거래) 2026 | 3건 | 진행중 | 김법무 |
| DEF Corp 인수 M&A 2026 | 4건 | 진행중 | 김법무 |
| 홍OO 부당해고 2026 | 1건 | 진행중 | 이대리 |
| XYZ 특허소송 2025 | 2건 | 진행중 | 김법무 |
| NDA/임대차/공급/라이선스 2025 | 4건 | 완료/검토중 | 김법무/이대리 |
| 사업자등록/내부통제 2024 | 2건 | 참고자료 | 이대리/김법무 |
| 이사회자료 | 3건 | 완료 | 김법무/이대리 |
| 규정/정책 | 1건 | 참고자료 | 이대리 |

---

## 3. 향후 구현 계획

### Phase 2: SharePoint 연동

1. Azure AD 앱 등록 (Files.ReadWrite.All, Sites.ReadWrite.All, User.Read)
2. DataAdapter 메서드를 SP REST API로 전환
3. SharePoint Lists 6개 자동 생성 (LKA_DocMeta, LKA_DocMemos, LKA_CaseNotes, LKA_Categories, LKA_Tags, LKA_Users)
4. localStorage → SP Lists 마이그레이션
5. Graph API 파일 동기화 (초기 + delta query 증분)
6. Azure AD SSO 인증 연동
7. Person 필드 자동 매핑 (담당자/작성자)

### Phase 3: Next.js 풀스택 전환 (선택)

1. Next.js 14 + TypeScript + Tailwind + shadcn/ui
2. PostgreSQL + Prisma (SP Lists 대체 또는 병행)
3. API Routes (문서, 메모, 검색, 동기화, AI)
4. NextAuth.js + Azure AD
5. 서버 사이드 AI/SP 토큰 관리

### Phase 4: 고도화

1. Azure AI Document Intelligence 연동 (PDF/DOCX 텍스트 추출)
2. 전문 검색 (PostgreSQL tsvector 또는 SP Search API)
3. 파일 미리보기 (Graph API embed URL)
4. 증분 동기화 자동화 (스케줄러)
5. 알림 (만료 예정 계약, 기일 임박 등)

### Phase 5: 배포

```yaml
# docker-compose.yml (Phase 3 이후)
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgresql://...
      - AZURE_AD_CLIENT_ID=...
      - AZURE_AD_CLIENT_SECRET=...
      - AZURE_AD_TENANT_ID=...
      - SHAREPOINT_SITE_ID=...
      - AZURE_OPENAI_ENDPOINT=...
      - AZURE_OPENAI_DEPLOYMENT=...
      - AZURE_OPENAI_API_KEY=...
    depends_on: [db]
  db:
    image: postgres:16
    volumes: ["pgdata:/var/lib/postgresql/data"]
    environment:
      - POSTGRES_DB=legal_docs
      - POSTGRES_PASSWORD=...
```

---

## 4. 보안 고려사항

- Azure AD 인증 필수 (사내 계정만 접근)
- 역할 기반 접근 제어 (admin/editor/viewer)
- SharePoint 파일 원본은 이 시스템에서 삭제 불가 (원본 보호)
- Azure OpenAI API Key: Phase 1은 localStorage, Phase 2부터 서버 환경변수
- SP API 토큰은 서버 사이드에서만 처리
- 법무 문서 내용은 Azure 테넌트 내에서만 처리 (외부 유출 방지)
- 기밀등급별 표시 (공개/사내/기밀)

---

## 5. 파일 구조

```
Legal-database/
├── index.html          ← Phase 1 프로토타입 (단일 파일)
├── architecture.svg    ← 시스템 아키텍처 다이어그램
├── plan.md             ← 이 파일 (구현 계획서)
├── CLAUDE.md           ← Claude Code 가이드
└── .git/
```
