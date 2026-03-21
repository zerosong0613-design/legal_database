# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

사내 법무 문서 데이터베이스 웹 애플리케이션. SharePoint에 저장된 법무 문서들의 메타데이터를 동기화하고, 문서별 메모/요약을 관리하며, 아카이브로 활용할 수 있는 시스템.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js + Microsoft Entra ID (Azure AD)
- **External API**: Microsoft Graph API (SharePoint 연동)
- **Deployment**: Docker + docker-compose

## Architecture

- Next.js App Router 기반 풀스택 구조 (별도 백엔드 없음)
- `src/app/api/` Route Handlers가 백엔드 API 역할
- SharePoint 파일 원본은 그대로 유지하고, 메타데이터만 PostgreSQL에 저장
- Microsoft Graph API delta query로 SharePoint 변경분 증분 동기화
- Azure AD SSO로 사내 인증 처리, Graph API 토큰 재사용

## Key Commands

```bash
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint
npx prisma migrate dev   # DB 마이그레이션 실행
npx prisma generate      # Prisma 클라이언트 생성
npx prisma studio        # DB GUI 브라우저
docker-compose up -d     # 로컬 PostgreSQL + 앱 실행
```

## Environment Variables

필수 환경변수 (`.env.local`):
- `DATABASE_URL` - PostgreSQL 연결 문자열
- `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID` - Azure AD 앱 등록 정보
- `SHAREPOINT_SITE_ID` - 대상 SharePoint 사이트 ID
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` - NextAuth 설정

## Conventions

- UI 텍스트는 한국어 (레이블은 `src/constants/ko.ts`에서 관리)
- 날짜 포맷: `YYYY년 MM월 DD일`
- DB 스키마 변경 시 반드시 Prisma migration 생성
- SharePoint API 토큰은 서버 사이드에서만 처리 (클라이언트 노출 금지)
