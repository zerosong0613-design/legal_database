# 법무 문서 데이터베이스 - 구현 계획서

## 1. 프로젝트 개요

SharePoint에 비체계적으로 저장된 법무 문서들을 체계적으로 관리하고, 문서별 메모/요약을 추가하며, 신규 입사자도 과거 법무 이력을 쉽게 파악할 수 있는 사내 웹 애플리케이션.

---

## 2. 기술 스택

| 구분 | 기술 | 선정 사유 |
|------|------|-----------|
| **프론트엔드** | Next.js 14 (App Router) + TypeScript | SSR/SSG 지원, 풀스택 가능 |
| **UI 라이브러리** | shadcn/ui + Tailwind CSS | 빠른 개발, 깔끔한 기업용 UI |
| **백엔드 API** | Next.js API Routes (Route Handlers) | 별도 서버 불필요 |
| **데이터베이스** | PostgreSQL + Prisma ORM | 안정적 RDBMS, 전문 검색 지원 |
| **인증** | NextAuth.js + Microsoft Entra ID (Azure AD) | 사내 SSO 연동 |
| **SharePoint 연동** | Microsoft Graph API | 공식 API |
| **배포** | Docker + 사내 서버 또는 Azure App Service | 내부망 배포 |

---

## 3. 데이터베이스 스키마

```sql
-- 사용자 (Azure AD에서 동기화)
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    azure_ad_id     VARCHAR(255) UNIQUE NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    display_name    VARCHAR(100) NOT NULL,
    department      VARCHAR(100),
    role            VARCHAR(20) DEFAULT 'viewer',  -- 'admin', 'editor', 'viewer'
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    last_login_at   TIMESTAMPTZ
);

-- 카테고리 (계층 구조)
CREATE TABLE categories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    parent_id       UUID REFERENCES categories(id),
    sort_order      INT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 법무 문서 (SharePoint 파일 메타데이터)
CREATE TABLE documents (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title               VARCHAR(500) NOT NULL,
    file_name           VARCHAR(500) NOT NULL,
    file_extension      VARCHAR(20),
    file_size_bytes     BIGINT,
    sharepoint_item_id  VARCHAR(255) UNIQUE,
    sharepoint_drive_id VARCHAR(255),
    sharepoint_url      TEXT,
    sharepoint_path     TEXT,
    category_id         UUID REFERENCES categories(id),
    status              VARCHAR(20) DEFAULT 'active',
    document_date       DATE,
    parties             TEXT[],
    confidentiality     VARCHAR(20) DEFAULT 'internal',
    created_by          UUID REFERENCES users(id),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    synced_at           TIMESTAMPTZ,
    search_vector       TSVECTOR
);

-- 태그
CREATE TABLE tags (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(50) UNIQUE NOT NULL,
    color       VARCHAR(7) DEFAULT '#6B7280'
);

CREATE TABLE document_tags (
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    tag_id      UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (document_id, tag_id)
);

-- 메모/노트
CREATE TABLE notes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id     UUID REFERENCES documents(id) ON DELETE CASCADE,
    author_id       UUID REFERENCES users(id),
    title           VARCHAR(200),
    content         TEXT NOT NULL,
    is_pinned       BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 동기화 이력
CREATE TABLE sync_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    started_at      TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    status          VARCHAR(20),
    files_added     INT DEFAULT 0,
    files_updated   INT DEFAULT 0,
    error_message   TEXT
);
```

---

## 4. SharePoint 연동 설계

### 4.1 Azure AD 앱 등록 필요 권한

```
- Files.Read.All          -- SharePoint 파일 읽기
- Sites.Read.All          -- SharePoint 사이트 읽기
- User.Read               -- 로그인 사용자 정보
- offline_access          -- 리프레시 토큰
```

### 4.2 동기화 흐름

```
[초기 동기화]
1. GET /sites/{site-id}/drives → 문서 라이브러리 목록
2. GET /drives/{drive-id}/root/children → 최상위 폴더/파일
3. 재귀적으로 하위 폴더 탐색 (delta query 활용)
4. 각 파일의 메타데이터를 documents 테이블에 저장
5. SharePoint 폴더 구조를 categories에 매핑

[증분 동기화 - 주기적 실행]
1. GET /drives/{drive-id}/root/delta → 변경분만 조회
2. 신규/수정/삭제 파일 반영
3. sync_logs에 결과 기록
```

### 4.3 API 엔드포인트

```
POST   /api/sync/start              -- 수동 동기화 시작
GET    /api/sync/status              -- 동기화 상태 조회
GET    /api/documents                -- 문서 목록 (필터, 페이지네이션)
GET    /api/documents/[id]           -- 문서 상세
GET    /api/documents/[id]/preview   -- SharePoint 파일 미리보기 URL
PATCH  /api/documents/[id]           -- 문서 메타데이터 수정
GET    /api/documents/search?q=      -- 전문 검색
POST   /api/notes                    -- 메모 작성
PATCH  /api/notes/[id]               -- 메모 수정
DELETE /api/notes/[id]               -- 메모 삭제
GET    /api/categories               -- 카테고리 트리
POST   /api/tags                     -- 태그 생성
```

---

## 5. UI/UX 구조

### 5.1 페이지 구성

```
/                           -- 대시보드 (최근 문서, 통계, 빠른 검색)
/documents                  -- 문서 목록 (테이블 뷰 + 필터 사이드바)
/documents/[id]             -- 문서 상세 + 메모 패널
/search                     -- 고급 검색
/categories                 -- 카테고리 관리
/archive                    -- 아카이브 브라우징 (연도별/카테고리별)
/settings                   -- 관리: 동기화, 사용자 권한, 태그 관리
```

### 5.2 주요 화면

**문서 목록 (`/documents`)**
- 좌측: 카테고리 트리 + 태그 필터
- 중앙: 문서 테이블 (제목, 파일유형, 일자, 카테고리, 태그, 메모 수)
- 상단: 검색바, 정렬, 보기 전환 (테이블/카드)

**문서 상세 (`/documents/[id]`)**
- 상단: 파일 정보 (인라인 편집)
- 좌측: 파일 미리보기 (Graph API embed URL)
- 우측: 메모 패널 (마크다운 에디터)

**대시보드 (`/`)**
- 최근 문서, 카테고리별 통계, 최근 메모, 동기화 상태

---

## 6. 구현 단계

### Phase 1: 기반 구축 (1~2주)
1. Next.js 프로젝트 초기화 (TypeScript, Tailwind, shadcn/ui)
2. Prisma 설정 + PostgreSQL 스키마 마이그레이션
3. NextAuth.js + Azure AD 인증 설정
4. 기본 레이아웃 (사이드바, 헤더)

### Phase 2: SharePoint 연동 (1~2주)
1. Microsoft Graph 클라이언트 구현
2. 초기 동기화 기능
3. 폴더 구조 → 카테고리 자동 매핑
4. 동기화 상태 UI
5. 증분 동기화 (delta query)

### Phase 3: 문서 관리 + 검색 (1~2주)
1. 문서 목록 페이지 (테이블, 필터, 페이지네이션)
2. 문서 상세 페이지 (메타데이터, 파일 미리보기)
3. 카테고리 트리 네비게이션
4. 태그 CRUD
5. 전문 검색

### Phase 4: 메모 시스템 (1주)
1. 메모 CRUD API
2. 마크다운 에디터
3. 메모 패널 UI
4. 메모 고정(pin) 기능

### Phase 5: 아카이브 + 대시보드 (1주)
1. 대시보드 통계
2. 아카이브 브라우징
3. 최근 활동 피드

### Phase 6: 배포 (1주)
1. Docker 컨테이너화
2. 환경변수 관리
3. 사내 서버 배포
4. 접근 권한 설정

---

## 7. 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                -- 대시보드
│   │   ├── documents/
│   │   │   ├── page.tsx            -- 목록
│   │   │   └── [id]/page.tsx       -- 상세
│   │   ├── search/page.tsx
│   │   ├── archive/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── documents/route.ts
│       ├── notes/route.ts
│       └── sync/route.ts
├── components/
│   ├── documents/
│   ├── notes/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── prisma.ts
│   ├── graph-client.ts
│   ├── sync-service.ts
│   └── search.ts
├── prisma/
│   └── schema.prisma
└── constants/
    └── ko.ts
```

---

## 8. 배포 구성

```yaml
# docker-compose.yml
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
    depends_on: [db]

  db:
    image: postgres:16
    volumes: ["pgdata:/var/lib/postgresql/data"]
    environment:
      - POSTGRES_DB=legal_docs
      - POSTGRES_PASSWORD=...
```

---

## 9. 보안 고려사항
- Azure AD 인증 필수 (사내 계정만 접근)
- HTTPS 적용
- SharePoint API 토큰은 서버 사이드에서만 처리
- 기밀등급별 접근 제어
