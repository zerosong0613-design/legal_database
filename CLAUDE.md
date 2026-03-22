# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

법무 지식 아카이브 (Legal Knowledge Archive) — SharePoint에 저장된 법무 문서들의 메타데이터를 동기화하고, 문서별 4섹션 메모(핵심 쟁점/실무 판단/리스크/향후 참고)와 사건별 AI 요약·채팅 기능을 제공하는 사내 웹 애플리케이션.

## Current State: Phase 1 (단일 HTML 프로토타입)

- **파일**: `index.html` (단일 파일, 외부 의존성 없음)
- **프론트엔드**: Vanilla JS + CSS (프레임워크 없음)
- **데이터 저장**: localStorage (`DataAdapter` 패턴 — SP REST API 전환 준비 완료)
- **AI 연동**: Azure OpenAI Chat Completions API
- **인증**: `CURRENT_USER_ID` 하드코딩 (SP 연동 시 Azure AD SSO로 전환)
- **아키텍처 다이어그램**: `architecture.svg`

## Architecture

- 단일 HTML 파일 내 CSS + JS 포함
- `DataAdapter (DA)` 객체가 모든 CRUD 담당 — 내부는 localStorage, SP 전환 시 메서드 내부만 REST API로 교체
- 사용자 식별은 userId 기반 (`CURRENT_USER_ID`) — 모든 owner/caseManager/author가 userId로 저장되고 `userName(userId)` 함수로 이름 조회
- 권한 제어: `isAdmin()` / `canEdit()` 함수로 UI 분기 (admin/editor/viewer)
- 일괄 작업(bulk): 체크박스 다중 선택 → 담당자 일괄 변경, 태그 일괄 추가, CSV 내보내기, 로컬 문서 삭제 (SP 문서 삭제 불가)
- 반응형: 768px 이하 사이드바 오버레이 + 햄버거 메뉴, 테이블 컬럼 자동 숨김
- SP 전환 시 6개 SharePoint Lists 생성: `LKA_DocMeta`, `LKA_DocMemos`, `LKA_CaseNotes`, `LKA_Categories`, `LKA_Tags`, `LKA_Users`

## Key Data Structures

```
카테고리 = { id, name, parentId, caseStatus, casePeriod, caseManager(userId), caseLawFirm, caseSummary }
문서     = { id, title, fileName, ext, size, spPath, catId, status, date, parties[], conf, owner(userId), importance, docType, workCat, matterName, tagIds[], body }
태그     = { id, name, color }
사용자   = { id, name, email, dept, role(admin|editor|viewer), lastLogin }
메모     = { issue, judgment, risk, future, modified, modifiedBy(userId) }
사건메모 = { id, catId, docId, title, content, pinned, author(userId), date }
```

## SP 연동 설계

- 파일 원본: SharePoint 문서 라이브러리 (읽기 전용 동기화, 삭제 불가)
- Graph API: `Files.ReadWrite.All`, `Sites.ReadWrite.All`, `User.Read`, `offline_access`
- SP 동기화 문서 삭제 불가 — SP에서만 삭제. 로컬 등록 문서는 일괄 삭제 가능
- 문서 등록 시: Graph API로 SP에 파일 업로드 + LKA_DocMeta에 메타데이터 저장
- 사건/폴더 추가 시: Graph API로 SP에 폴더 생성 + LKA_Categories에 사건 정보 저장
- 담당자: SP Person 필드 (Azure AD UserId 매핑)

## Conventions

- UI 텍스트는 한국어
- 날짜 포맷: `YYYY.MM.DD`
- 모든 아이콘은 SVG (`IC` 객체) — 이모지 사용 금지
- 담당자/작성자는 userId로 저장, `userName(userId)`로 표시
- localStorage 키에 버전 접미사 사용 (`lka_docs_v4` 등) — 데이터 구조 변경 시 버전 올림
- SP API 토큰은 서버 사이드에서만 처리 (클라이언트 노출 금지)
