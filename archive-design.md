# archive-design.md
> LKA (Legal Knowledge Archive) 디자인 리뉴얼 명세  
> 기준: Radix UI Themes 토큰 시스템  
> 작성일: 2026-03-29  
> **범위: CSS·스타일 변경만. 기능·구조·로직 변경 없음.**

---

## 0. 변경 원칙

현재 코드의 기능, DOM 구조, JS 로직은 **전혀 손대지 않는다.**  
바꾸는 것은 `<style>` 블록의 CSS 값뿐이다.  
각 섹션은 **현재 값 → 변경 값** 형식으로 기술한다.

---

## 1. 폰트 (Font)

### 현재
```css
body { font-family: 'Segoe UI', -apple-system, sans-serif; }
```
Segoe UI는 Windows 시스템 폰트. 브라우저·OS별 렌더링 편차 크고 한글 완성도 낮음.

### 변경
```html
<!-- <head>에 추가 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**모노스페이스 폰트 (날짜·카운트·코드):**
```css
/* 적용 대상: .matter-cell, .count, 날짜, 페이지네이션 버튼 숫자 */
font-family: 'JetBrains Mono', monospace;
```

| 적용 위치 | 현재 | 변경 |
|-----------|------|------|
| 전체 기본체 | Segoe UI | Pretendard |
| `.count` (카테고리 카운트) | 상속 | JetBrains Mono |
| `.matter-cell` (사건번호) | 상속 | JetBrains Mono |
| `.tl-date` (타임라인 날짜) | 상속 | JetBrains Mono |
| `.note-date` (메모 날짜) | 상속 | JetBrains Mono |
| `.pagination button` | 상속 | JetBrains Mono |

---

## 2. 컬러 토큰 (Color Tokens)

Radix UI Themes의 시맨틱 팔레트 시스템으로 전환.  
`gray`, `blue`, `green`, `red`, `amber`, `violet`, `orange` 스케일 사용.

### CSS 변수 선언 (`:root`에 추가)

```css
:root {
  /* ── Radix Gray Scale ── */
  --gray-1:  #fcfcfc;
  --gray-2:  #f9f9f9;
  --gray-3:  #f0f0f0;
  --gray-4:  #e8e8e8;
  --gray-5:  #e0e0e0;
  --gray-6:  #d8d8d8;
  --gray-7:  #cecece;
  --gray-8:  #bbbbbb;
  --gray-9:  #8d8d8d;
  --gray-10: #838383;
  --gray-11: #646464;
  --gray-12: #202020;

  /* ── Radix Blue Scale (메인 액센트) ── */
  --blue-1:  #fbfdff;
  --blue-2:  #f4faff;
  --blue-3:  #e6f4fe;
  --blue-4:  #d5efff;
  --blue-5:  #c2e5ff;
  --blue-6:  #acd8fc;
  --blue-7:  #8ec8f6;
  --blue-8:  #5eb1ef;
  --blue-9:  #0090ff;   /* primary action */
  --blue-10: #0588f0;
  --blue-11: #0d74ce;   /* link, active text */
  --blue-12: #113264;

  /* ── Radix Green (성공·완료) ── */
  --green-3:  #e9f9ee;
  --green-9:  #30a46c;
  --green-11: #18794e;

  /* ── Radix Red (에러·긴급) ── */
  --red-3:  #ffe0e0;
  --red-9:  #e5484d;
  --red-11: #c62a2f;

  /* ── Radix Amber (경고·검토중) ── */
  --amber-3:  #fef0cd;
  --amber-9:  #ffc53d;
  --amber-11: #915930;

  /* ── Radix Violet (가이드라인·IP) ── */
  --violet-3:  #ede9fe;
  --violet-9:  #6e56cf;
  --violet-11: #5746af;

  /* ── Radix Orange (만료예정) ── */
  --orange-3:  #ffe8d7;
  --orange-9:  #f76b15;
  --orange-11: #bd4b00;

  /* ── Radius 토큰 ── */
  --radius-1: 3px;
  --radius-2: 4px;
  --radius-3: 6px;
  --radius-4: 8px;
  --radius-5: 12px;

  /* ── Shadow 토큰 ── */
  --shadow-xs: 0 1px 2px rgba(0,0,0,.05);
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,.10), 0 2px 4px rgba(0,0,0,.06);
  --shadow-lg: 0 20px 60px rgba(0,0,0,.13), 0 4px 16px rgba(0,0,0,.07);
}
```

---

## 3. 전역 기준값

```css
/* 현재 */
body { background: #f8fafc; color: #1e293b; font-size: 13px; }

/* 변경 */
body { background: var(--gray-2); color: var(--gray-12); font-size: 14px; }
```

기존 `#f8fafc` → `var(--gray-2)` (더 따뜻하고 깔끔한 배경)  
기존 `#1e293b` → `var(--gray-12)` (Radix 스케일 기준)  
기본 폰트 사이즈 13px → **14px** (가독성 향상)

---

## 4. 사이드바 (Sidebar)

### 4-1. 레이아웃
```css
/* 현재 */
.sidebar { width: 260px; background: #fff; border-right: 1px solid #e2e8f0; }

/* 변경 */
.sidebar { width: 216px; background: var(--gray-1); border-right: 1px solid var(--gray-5); }
```
너비 260px → **216px**: 콘텐츠 영역 더 확보. Radix Themes 사이드바 기본값.

### 4-2. 로고 영역
```css
/* 현재 */
.logo { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; }
.logo-icon { background: linear-gradient(135deg, #0f172a, #1e40af); border-radius: 8px; }

/* 변경 */
.logo { padding: 12px 14px; border-bottom: 1px solid var(--gray-5); }
.logo-icon { background: var(--blue-9); border-radius: var(--radius-3); }
```
그라디언트 제거 → 단색 `var(--blue-9)`. Radix 스타일은 단색 기반.

### 4-3. 네비게이션 섹션 라벨
```css
/* 현재 */
.nav-section-label { font-size: 10px; font-weight: 700; color: #475569; letter-spacing: .08em; }
.cat-label { font-size: 10px; font-weight: 700; color: #475569; letter-spacing: .08em; }

/* 변경 */
.nav-section-label,
.cat-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-9);
  letter-spacing: .05em;
  padding: 10px 10px 5px;
}
```

### 4-4. 네비게이션 아이템
```css
/* 현재 */
.nav-item { color: #475569; border-radius: 6px; font-size: 12px; }
.nav-item:hover { background: #f1f5f9; }
.nav-item.active { background: #eff6ff; color: #1e40af; font-weight: 600; }

/* 변경 */
.nav-item { color: var(--gray-11); border-radius: var(--radius-3); font-size: 13.5px; }
.nav-item:hover { background: var(--gray-3); color: var(--gray-12); }
.nav-item.active { background: var(--blue-3); color: var(--blue-11); font-weight: 600; }
```

### 4-5. 카테고리 아이템 (업무분류 목록)
```css
/* 현재 */
.cat-item { color: #475569; border-radius: 6px; font-size: 12px; }
.cat-item:hover { background: #f1f5f9; }
.cat-item.active { background: #e0e7ff; color: #1e40af; font-weight: 600; }
.cat-item .count { font-size: 10px; color: #64748b; background: #f1f5f9; padding: 1px 6px; border-radius: 8px; }

/* 변경 */
.cat-item { color: var(--gray-11); border-radius: var(--radius-3); font-size: 13.5px; }
.cat-item:hover { background: var(--gray-3); color: var(--gray-12); }
.cat-item.active { background: var(--blue-3); color: var(--blue-11); font-weight: 600; }
.cat-item .count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--gray-9);
  background: var(--gray-3);
  padding: 1px 7px;
  border-radius: var(--radius-2);
}
/* active 상태의 카운트 */
.cat-item.active .count {
  background: var(--blue-4);
  color: var(--blue-11);
}
```

### 4-6. 동기화 상태
```css
/* 현재 */
.sync-status { font-size: 10px; color: #64748b; }
.sync-dot { background: #16a34a; }

/* 변경 */
.sync-status {
  padding: 10px 12px;
  border-top: 1px solid var(--gray-5);
  font-size: 12px;
  color: var(--gray-10);
}
.sync-dot {
  width: 7px;
  height: 7px;
  background: var(--green-9);
}
```

---

## 5. 헤더 (Header)

```css
/* 현재 */
.header { height: 56px; background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 24px; }

/* 변경 */
.header {
  height: 48px;
  background: var(--gray-1);
  border-bottom: 1px solid var(--gray-5);
  padding: 0 20px;
}
```
높이 56px → **48px**: Radix Themes 기본 헤더 높이.

### 검색 박스
```css
/* 현재 */
.search-box input {
  width: 280px; padding: 7px 10px 7px 32px;
  border: 1px solid #e2e8f0; border-radius: 8px;
  background: #f8fafc;
}
.search-box input:focus { border-color: #93c5fd; background: #fff; }

/* 변경 */
.search-box input {
  width: 280px; padding: 7px 10px 7px 32px;
  border: 1px solid var(--gray-7);
  border-radius: var(--radius-3);
  background: var(--gray-1);
  font-size: 13.5px;
  transition: border-color .15s, box-shadow .15s;
}
.search-box input:focus {
  border-color: var(--blue-8);
  box-shadow: 0 0 0 1px var(--blue-8);  /* Radix 시그니처 focus ring */
  background: #fff;
  outline: none;
}
```

### 버튼 시스템

Radix Button의 3가지 variant로 통일:

```css
/* primary → solid variant */
.btn-primary {
  padding: 7px 14px;
  background: var(--blue-9);
  color: #fff;
  border: none;
  border-radius: var(--radius-3);
  font-size: 13.5px;
  font-weight: 500;
  transition: background .12s;
}
.btn-primary:hover { background: var(--blue-10); }
.btn-primary:disabled { opacity: .5; cursor: not-allowed; }

/* secondary → soft variant */
.btn-secondary {
  padding: 7px 14px;
  background: var(--gray-3);
  color: var(--gray-12);
  border: none;
  border-radius: var(--radius-3);
  font-size: 13.5px;
  font-weight: 500;
  transition: background .12s;
}
.btn-secondary:hover { background: var(--gray-4); }

/* danger → soft red variant */
.btn-danger {
  padding: 7px 14px;
  background: var(--red-3);
  color: var(--red-11);
  border: none;
  border-radius: var(--radius-3);
  font-size: 13.5px;
  font-weight: 500;
}
.btn-danger:hover { background: #ffd0d0; }

/* icon button → ghost variant */
.btn-icon {
  padding: 6px;
  border: none;
  background: none;
  color: var(--gray-9);
  border-radius: var(--radius-3);
  transition: background .1s, color .1s;
}
.btn-icon:hover { background: var(--gray-3); color: var(--gray-12); }
```

### 유저 아바타
```css
/* 현재 */
.user-avatar { background: linear-gradient(135deg, #1e40af, #3b82f6); }

/* 변경 */
.user-avatar {
  background: var(--blue-9);   /* 그라디언트 제거, 단색 */
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
}
```

---

## 6. 통계 카드 (Stats)

```css
/* 현재 */
.stat-card { background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; }
.stat-card .label { font-size: 11px; color: #475569; }
.stat-card .value { font-size: 24px; font-weight: 700; }
.card { background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; }

/* 변경 */
.stat-card {
  background: var(--gray-1);
  border-radius: var(--radius-4);
  border: 1px solid var(--gray-5);
  box-shadow: var(--shadow-xs);
}
.stat-card .label { font-size: 12px; color: var(--gray-10); }
.stat-card .value { font-size: 26px; font-weight: 700; color: var(--gray-12); }
.card {
  background: var(--gray-1);
  border-radius: var(--radius-4);
  border: 1px solid var(--gray-5);
  box-shadow: var(--shadow-xs);
}
```

---

## 7. 필터 바 (Filter Bar)

### 셀렉트 박스
```css
/* 현재 */
.filter-bar select {
  padding: 5px 8px; border: 1px solid #e2e8f0; border-radius: 6px;
  font-size: 11px; color: #475569;
}

/* 변경 */
.filter-bar select {
  padding: 5px 10px;
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-3);
  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-12);
  background: var(--gray-1);
  transition: border-color .12s;
  cursor: pointer;
}
.filter-bar select:focus {
  border-color: var(--blue-8);
  box-shadow: 0 0 0 1px var(--blue-8);
  outline: none;
}
```

### 태그 버튼 (ToggleGroup)
```css
/* 현재 */
.tag-btn { border-radius: 12px; border: 1px solid #e2e8f0; font-size: 10px; font-weight: 500; }
.tag-btn.active { background: #1e40af; color: #fff; border-color: #1e40af; }

/* 변경 — Radix ToggleGroup 스타일 */
.tag-btn {
  padding: 4px 12px;
  border-radius: var(--radius-3);   /* pill 대신 각진 느낌으로 */
  border: 1px solid var(--gray-5);
  background: var(--gray-1);
  color: var(--gray-11);
  font-size: 12.5px;
  font-weight: 500;
  transition: background .1s, border-color .1s;
}
.tag-btn:hover { background: var(--gray-3); border-color: var(--gray-6); }
.tag-btn.active {
  background: var(--blue-9);
  color: #fff;
  border-color: var(--blue-9);
}
```

### 필터 카운트·리셋
```css
/* 변경 */
.filter-count { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--gray-10); }
.filter-reset { font-size: 12.5px; color: var(--blue-11); }
```

---

## 8. 문서 테이블 (Document Table)

### 테이블 컨테이너
```css
/* 현재 */
.doc-table { background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }

/* 변경 */
.doc-table {
  background: var(--gray-1);
  border-radius: var(--radius-4);
  border: 1px solid var(--gray-5);
  overflow: hidden;
  box-shadow: var(--shadow-xs);
}
```

### 컬럼 헤더
```css
/* 현재 */
.doc-table th {
  padding: 9px 12px; font-size: 10px; font-weight: 600;
  color: #475569; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
}
.doc-table th:hover { background: #f1f5f9; }

/* 변경 */
.doc-table th {
  padding: 9px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: var(--gray-9);
  background: var(--gray-2);
  border-bottom: 1px solid var(--gray-5);
}
.doc-table th:hover { color: var(--gray-12); }
.doc-table th .sort-arrow { color: var(--gray-7); }
.doc-table th .sort-arrow.asc,
.doc-table th .sort-arrow.desc { color: var(--blue-11); }
```

### 테이블 셀 · 행
```css
/* 현재 */
.doc-table td { padding: 9px 12px; border-bottom: 1px solid #f1f5f9; }
.doc-table tr:hover td { background: #f8fafc; }

/* 변경 */
.doc-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--gray-4);
  font-size: 13.5px;
  color: var(--gray-11);
}
.doc-table tr:hover td { background: var(--gray-2); }
```

### 문서 제목
```css
/* 현재 */
.doc-title { font-weight: 500; font-size: 12px; }

/* 변경 */
.doc-title { font-weight: 600; font-size: 13.5px; color: var(--gray-12); }
```

### 그룹 헤더 (업무분류 그룹)
```css
/* 현재 */
.group-header td { background: #f8fafc!important; }
.group-header .gh-name { font-size: 12px; font-weight: 600; color: #1e293b; }
.group-header .gh-count { font-size: 10px; color: #64748b; }

/* 변경 */
.group-header td { background: var(--gray-2)!important; border-bottom: 1px solid var(--gray-5)!important; }
.group-header:hover td { background: var(--gray-3)!important; }
.group-header .gh-name { font-size: 13px; font-weight: 700; color: var(--gray-12); }
.group-header .gh-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--gray-9);
}
```

### 일괄선택 바 (Bulk Bar)
```css
/* 현재 */
.bulk-bar { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; color: #1e40af; }

/* 변경 */
.bulk-bar {
  background: var(--blue-3);
  border: 1px solid var(--blue-6);
  border-radius: var(--radius-4);
  color: var(--blue-11);
  font-size: 13px;
}
```

---

## 9. 뱃지 시스템 (Badge)

Radix Badge의 `variant=soft` 패턴으로 전면 통일.  
**규칙: `background = scale-3`, `color = scale-11`**

### 업무분류 뱃지

```css
/* 기존 .badge, .badge-doctype → 아래로 교체 */

/* 소송·중재 */
.badge-cat-소송 { background: var(--blue-3);   color: var(--blue-11); }
/* M&A·거래 */
.badge-cat-MA   { background: var(--amber-3);  color: var(--amber-11); }
/* 계약 */
.badge-cat-계약 { background: var(--green-3);  color: var(--green-11); }
/* 공정거래 */
.badge-cat-공정 { background: var(--red-3);    color: var(--red-11); }
/* 의약품·IP */
.badge-cat-의약 { background: var(--violet-3); color: var(--violet-11); }
/* 가이드라인 */
.badge-cat-가이드 { background: var(--violet-3); color: var(--violet-11); }

/* 공통 베이스 */
.badge, .badge-doctype {
  padding: 2px 8px;
  border-radius: var(--radius-2);
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
```

### 중요도 뱃지
```css
/* 현재 */
.badge-importance-H { background: #fee2e2; color: #dc2626; }
.badge-importance-M { background: #fef3c7; color: #d97706; }
.badge-importance-L { background: #f1f5f9; color: #64748b; }

/* 변경 — Radix soft 패턴 */
.badge-importance-H { background: var(--red-3);   color: var(--red-11);   border-radius: var(--radius-2); }
.badge-importance-M { background: var(--amber-3); color: var(--amber-11); border-radius: var(--radius-2); }
.badge-importance-L { background: var(--gray-3);  color: var(--gray-10);  border-radius: var(--radius-2); }
```

### 상태 뱃지
```css
/* 현재 */
.badge-status-active   { background: #dcfce7; color: #16a34a; }
.badge-status-review   { background: #fef3c7; color: #d97706; }
.badge-status-ref      { background: #f1f5f9; color: #64748b; }
.badge-status-archived { background: #e0e7ff; color: #4f46e5; }

/* 변경 */
.badge-status-active   { background: var(--green-3);  color: var(--green-11);  border-radius: var(--radius-2); }
.badge-status-review   { background: var(--amber-3);  color: var(--amber-11);  border-radius: var(--radius-2); }
.badge-status-ref      { background: var(--gray-3);   color: var(--gray-10);   border-radius: var(--radius-2); }
.badge-status-archived { background: var(--violet-3); color: var(--violet-11); border-radius: var(--radius-2); }
```

### 상태 인디케이터 도트
```css
/* 현재 (인라인 스타일로 처리된 경우 포함) */
/* 변경 — 클래스 추가 */
.status-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.status-dot.완료 { background: var(--green-9); }
.status-dot.검토중 { background: var(--amber-9); }
.status-dot.갱신필요 { background: var(--red-9); }
.status-dot.검토전 { background: var(--gray-7); }
```

---

## 10. 페이지네이션 (Pagination)

```css
/* 현재 */
.pagination button {
  padding: 5px 10px; border: 1px solid #e2e8f0; border-radius: 6px;
  background: #fff; font-size: 11px; color: #475569;
}
.pagination button.active { background: #1e40af; color: #fff; border-color: #1e40af; }

/* 변경 */
.pagination {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 12px; gap: 4px;
}
.pagination button {
  min-width: 30px; height: 30px; padding: 0 8px;
  border-radius: var(--radius-3);
  border: 1px solid transparent;
  background: transparent;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--gray-11);
  transition: background .1s;
}
.pagination button:hover:not(.active):not(:disabled) { background: var(--gray-3); }
.pagination button.active {
  background: var(--blue-9);
  color: #fff;
  font-weight: 600;
}
.pagination button:disabled { opacity: .4; cursor: not-allowed; }
```

---

## 11. 디테일 패널 (Detail Panel)

```css
/* 현재 */
.detail-panel { background: #fff; box-shadow: -4px 0 20px rgba(0,0,0,.08); }
.detail-header { border-bottom: 1px solid #e2e8f0; }
.overlay { background: rgba(0,0,0,.18); }

/* 변경 */
.detail-panel {
  background: var(--gray-1);
  box-shadow: var(--shadow-lg);
}
.overlay { background: rgba(0,0,0,.22); }
.detail-section h4 {
  font-size: 11px; font-weight: 600;
  color: var(--gray-9);
  text-transform: uppercase;
  letter-spacing: .06em;
}
```

### 메모 텍스트 영역
```css
/* 현재 */
.note-textarea { border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; }
.note-textarea:focus { border-color: #93c5fd; background: #fff; }

/* 변경 */
.note-textarea {
  border: 1px solid var(--gray-6);
  border-radius: var(--radius-3);
  background: var(--gray-2);
  font-size: 13px;
  transition: border-color .15s, box-shadow .15s;
}
.note-textarea:focus {
  border-color: var(--blue-8);
  box-shadow: 0 0 0 1px var(--blue-8);
  background: #fff;
  outline: none;
}
```

### 탭 (note-tabs)
```css
/* 현재 */
.note-tab { font-size: 11px; color: #64748b; border-bottom: 2px solid transparent; }
.note-tab.active { color: #1e40af; border-bottom-color: #1e40af; }

/* 변경 */
.note-tab { font-size: 13px; color: var(--gray-10); }
.note-tab.active { color: var(--blue-11); border-bottom-color: var(--blue-9); }
```

---

## 12. 모달 (Modal)

```css
/* 현재 */
.modal { background: #fff; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
.modal-header h2 { font-size: 15px; font-weight: 700; }
.form-row label { font-size: 10px; font-weight: 600; color: #475569; }
.form-row input, .form-row select, .form-row textarea { border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; }
.form-row input:focus { border-color: #93c5fd; }

/* 변경 */
.modal {
  background: var(--gray-1);
  border-radius: var(--radius-5);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-5);
}
.modal-header { border-bottom: 1px solid var(--gray-5); }
.modal-header h2 { font-size: 15px; font-weight: 700; color: var(--gray-12); }
.modal-footer { border-top: 1px solid var(--gray-5); }

.form-row label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--gray-10);
  letter-spacing: .03em;
  text-transform: none;   /* uppercase 제거 — Radix는 일반 케이스 */
  margin-bottom: 5px;
}
.form-row input,
.form-row select,
.form-row textarea {
  border: 1px solid var(--gray-7);
  border-radius: var(--radius-3);
  font-size: 13.5px;
  color: var(--gray-12);
  background: var(--gray-1);
  padding: 7px 10px;
  transition: border-color .15s, box-shadow .15s;
}
.form-row input:focus,
.form-row select:focus,
.form-row textarea:focus {
  border-color: var(--blue-8);
  box-shadow: 0 0 0 1px var(--blue-8);
  outline: none;
}
```

---

## 13. 컨펌 다이얼로그 (Confirm Dialog)

```css
/* 현재 */
.confirm-box { background: #fff; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,.15); }
.confirm-box h3 { font-size: 14px; font-weight: 700; }
.confirm-box p { font-size: 12px; color: #64748b; }

/* 변경 */
.confirm-box {
  background: var(--gray-1);
  border-radius: var(--radius-5);
  border: 1px solid var(--gray-5);
  box-shadow: var(--shadow-lg);
}
.confirm-box h3 { font-size: 15px; font-weight: 700; color: var(--gray-12); }
.confirm-box p { font-size: 13px; color: var(--gray-10); line-height: 1.6; }
```

---

## 14. 토스트 (Toast)

```css
/* 현재 */
.toast { background: #f0fdf4; border-radius: 8px; font-size: 12px; box-shadow: 0 4px 12px rgba(0,0,0,.1); }
.toast.success { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.toast.error   { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.toast.info    { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }

/* 변경 — Radix Toast 패턴 */
.toast {
  padding: 11px 16px;
  border-radius: var(--radius-4);
  font-size: 13.5px;
  font-weight: 500;
  box-shadow: var(--shadow-md);
  min-width: 220px;
}
.toast.success {
  background: var(--green-3);
  color: var(--green-11);
  border: 1px solid #86efac;
}
.toast.error {
  background: var(--red-3);
  color: var(--red-11);
  border: 1px solid #fca5a5;
}
.toast.info {
  background: var(--blue-3);
  color: var(--blue-11);
  border: 1px solid var(--blue-6);
}
```

---

## 15. 케이스 요약 (Case Summary)

```css
/* 현재 */
.case-header { background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; }
.case-summary-text { background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
.timeline::before { background: #e2e8f0; }
.tl-dot { border: 2px solid #3b82f6; background: #fff; }
.tl-item.first .tl-dot { background: #3b82f6; }
.tl-card { border: 1px solid #e2e8f0; }
.tl-card:hover { border-color: #93c5fd; }

/* 변경 */
.case-header {
  background: var(--gray-1);
  border-radius: var(--radius-4);
  border: 1px solid var(--gray-5);
  box-shadow: var(--shadow-xs);
}
.case-summary-text {
  background: var(--gray-2);
  border-radius: var(--radius-3);
  border: 1px solid var(--gray-5);
  font-size: 13.5px;
  line-height: 1.7;
}
.timeline::before { background: var(--gray-5); }
.tl-dot { border: 2px solid var(--blue-8); background: var(--gray-1); }
.tl-item.first .tl-dot { background: var(--blue-9); border-color: var(--blue-9); }
.tl-card {
  border: 1px solid var(--gray-5);
  box-shadow: var(--shadow-xs);
}
.tl-card:hover { border-color: var(--blue-7); }
.tl-date { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--gray-9); }
```

### 메모 카드 (Note Card)
```css
/* 현재 */
.note-card { border: 1px solid #e2e8f0; background: #f8fafc; }
.note-card.pinned { background: #fffbeb; border-color: #fde68a; }

/* 변경 */
.note-card {
  border: 1px solid var(--gray-5);
  background: var(--gray-2);
  border-radius: var(--radius-4);
}
.note-card.pinned {
  background: var(--amber-3);
  border-color: #fcd34d;
}
.note-card .note-title { font-size: 13px; }
.note-card .note-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--gray-9);
}
.note-card .note-body { font-size: 13px; color: var(--gray-11); line-height: 1.65; }
```

---

## 16. 설정 탭 (Settings Tabs)

```css
/* 현재 */
.tabs { border-bottom: 1px solid #e2e8f0; }
/* .tab 클래스 (설정 내 탭) */

/* 변경 */
.tabs { border-bottom: 1px solid var(--gray-5); }
/* tab 아이템 — note-tab과 동일한 방식으로 */
```

---

## 17. 스크롤바

```css
/* 현재 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

/* 변경 */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--gray-6);
  border-radius: 999px;
}
::-webkit-scrollbar-thumb:hover { background: var(--gray-8); }
```

---

## 18. 검색 하이라이트

```css
/* 현재 */
.search-highlight { background: #fef08a; border-radius: 2px; }

/* 변경 */
.search-highlight {
  background: var(--amber-3);
  border-radius: var(--radius-1);
  padding: 0 1px;
}
```

---

## 19. 빈 상태 (Empty State)

```css
/* 현재 */
.empty-state .empty-icon { background: #f1f5f9; color: #64748b; }
.empty-state .empty-title { color: #475569; }
.empty-state .empty-desc { color: #64748b; }

/* 변경 */
.empty-state .empty-icon {
  background: var(--gray-3);
  color: var(--gray-9);
}
.empty-state .empty-title { font-size: 14px; color: var(--gray-11); }
.empty-state .empty-desc { font-size: 13px; color: var(--gray-9); }
```

---

## 20. 정보 박스 (Info Box)

```css
/* 현재 */
.info-box.blue  { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
.info-box.green { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; }
.info-box.amber { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }

/* 변경 */
.info-box.blue  { background: var(--blue-3);  border: 1px solid var(--blue-6);   color: var(--blue-11);  }
.info-box.green { background: var(--green-3); border: 1px solid #86efac;         color: var(--green-11); }
.info-box.amber { background: var(--amber-3); border: 1px solid #fcd34d;         color: var(--amber-11); }
```

---

## 21. 메인 영역 레이아웃 조정

```css
/* 현재 */
.main { margin-left: 260px; }
.content { padding: 20px 24px; }

/* 변경 */
.main { margin-left: 216px; }   /* 사이드바 너비 변경에 맞춤 */
.content { padding: 20px 20px; }
```

---

## 변경 요약표

| 항목 | 현재 값 | 변경 값 |
|------|---------|---------|
| 폰트 | Segoe UI (13px) | Pretendard (14px) |
| 배경 | `#f8fafc` | `var(--gray-2)` |
| 텍스트 | `#1e293b` | `var(--gray-12)` |
| 액센트 | `#1e40af` | `var(--blue-9)` |
| 사이드바 너비 | 260px | 216px |
| 헤더 높이 | 56px | 48px |
| 보더 | `#e2e8f0` | `var(--gray-5)` |
| 서브 텍스트 | `#64748b` | `var(--gray-10)` |
| focus ring | `border: #93c5fd` | `box-shadow: 0 0 0 1px var(--blue-8)` |
| 버튼 그라디언트 | linear-gradient | 단색 `var(--blue-9)` |
| 뱃지 border-radius | 4px | `var(--radius-2)` = 4px |
| 날짜·카운트 폰트 | 상속 | JetBrains Mono |

---

_목업 참고 파일: `lka-radix-mockup.html`_
