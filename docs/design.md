# UI/UX 디자인 가이드

## 🎨 Design System Overview

- **참고 서비스**: 블라인드(Blind), 노션(Notion)
- **디자인 스타일**: Minimal & Information-Centric  
  - 복잡한 장식을 제거하고 정보에 집중할 수 있도록 설계
  - 요소 간 간격과 여백을 활용한 구조적 정돈
- **분위기 및 톤**: 신뢰감, 중립성, 지성적 감성
  - 정치/사회 등 민감한 주제를 다루는 커뮤니티 특성상  
    감정적 표현보다 **중립성과 객관성**이 강조됨

---

## 🎨 Tailwind CSS 컬러 팔레트

| 역할         | 변수 이름        | 색상 코드  | 설명 |
|--------------|------------------|------------|------|
| Primary      | `primary`        | `#1A73E8`  | 포인트 버튼, 강조 텍스트, 인터랙션 요소 |
| Secondary    | `secondary`      | `#F1F3F4`  | 카드 배경, 보조 요소 배경 |
| Accent       | `accent`         | `#34A853`  | 성공 메시지, 긍정 피드백 |
| Error        | `error`          | `#EA4335`  | 경고, 오류 상태 표시 |
| Warning      | `warning`        | `#FBBC05`  | 주의 정보 배경 |
| Neutral BG   | `bg-neutral`     | `#FFFFFF`  | 전체 페이지 배경 |
| Neutral Text | `text-neutral`   | `#3C4043`  | 기본 텍스트 색상 |
| Border       | `border-neutral` | `#E0E0E0`  | 박스 테두리, 분리선 |

---

## 📄 Page Implementations

### 🏠 `/` (Root - 메인페이지)

- **Core Purpose**: 전체 서비스 소개 및 글 탐색 허브
- **Key Components**:
  - 상단바(Header): 로고, 로그인/회원가입, 검색
  - 소개 배너(서브히어로): 슬로건, 한 줄 설명, CTA 버튼
  - 검색바(Search): 태그, 키워드 기반 검색
  - 콘텐츠 섹션:
    - 왼쪽: 베스트 글 리스트
    - 오른쪽: 최신 글 리스트
  - 주제별 글 리스트 (Grid)

- **Layout Structure**:
  - 12 컬럼 그리드 사용
  - 베스트(8col) / 최신글(4col) 좌우 배치
  - 모바일: 1열, 순차적으로 Stack

> 예시 이미지  
> ![](https://picsum.photos/id/1011/800/400)

---

### 📝 `/post/:id` (글 상세페이지)

- **Core Purpose**: 사용자 글 공유 및 댓글 소통
- **Key Components**:
  - 글 제목 및 작성자 닉네임(익명화 처리)
  - 본문 내용(텍스트 우선)
  - 감정태그 / 주제태그
  - 댓글 영역 (간결한 입력창 + 리스트)
  - 추천 버튼, 신고 기능

> 예시 이미지  
> ![](https://picsum.photos/id/1005/800/400)

---

### ➕ `/write` (글쓰기 페이지)

- **Core Purpose**: 글 작성 인터페이스
- **Key Components**:
  - 글 제목 입력란
  - 주제 선택 (드롭다운)
  - 감정 태그 선택 (토글 형태)
  - 본문 에디터 (텍스트 기반, 마크다운 지원 권장)
  - 임시저장 / 게시 버튼

- **UX 고려사항**:
  - 입력 도중 나가기 시 경고 모달
  - 모바일 작성 시 키보드와 겹치지 않도록 대응

---

## 🧩 Layout Components

### ✅ Header (모든 페이지 공통)

- **구성**: 로고 / 검색창 / 로그인 & 회원가입
- **반응형**:
  - 모바일: 햄버거 메뉴, 검색은 아이콘 클릭 시 전개

### ✅ Footer

- 서비스 소개, 이용약관, 개인정보 처리방침, 제작자 정보

---

## 🔄 Interaction Patterns

| 상황 | 패턴 | 설명 |
|------|------|------|
| 글 hover | scale-up, shadow 강조 | 클릭 유도 |
| CTA 버튼 | hover 시 색상 변경 `bg-primary/80` | 명확한 인터랙션 제공 |
| 댓글 작성 후 | 스크롤 이동 + 애니메이션 강조 | 피드백 즉시 제공 |
| 페이지 이동 | 페이드 트랜지션 | 부드러운 흐름 유지 |

---

## 🧱 Breakpoints (반응형 기준)

| 디바이스 | 브레이크포인트 | 설명 |
|----------|----------------|------|
| Mobile   | 320px          | 최소 기준, 단일 열 |
| Tablet   | 768px          | 2열, 섹션 분리 |
| Desktop  | 1024px         | 2~3열 |
| Wide     | 1440px         | 전체 해상도에 맞춘 여백 조정 |

```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1440px
);
