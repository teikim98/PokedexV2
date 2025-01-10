# Pokedex V2 (포켓몬 도감 Toy Project)

## 📌 목차 (Table of Contents)
- [프로젝트 소개 (Introduction to the Project)](#프로젝트-소개-introduction-to-the-project)
- [개발 환경 (Development Environment)](#개발-환경-development-environment)
- [주요 기능 (Key Features)](#주요-기능-key-features)
- [구현 상세 (Implementation Details)](#구현-상세-implementation-details)
- [트러블 슈팅 (Troubleshooting)](#트러블-슈팅-troubleshooting)
- [회고 (Lessons Learned)](#회고-lessons-learned)

## 프로젝트 소개 (Introduction to the Project)

### 프로젝트명: Pokedex V2 (포켓몬 도감 Toy Project)

### 프로젝트 메인 페이지:
<img width="1514" alt="스크린샷 2025-01-02 오후 2 27 27" src="https://github.com/user-attachments/assets/079a6ce8-ca8c-4ee3-9934-684111dddc41" />
<img width="973" alt="스크린샷 2025-01-02 오후 2 32 54" src="https://github.com/user-attachments/assets/90b6aa9d-7424-4c80-813f-baaecb0b4271" />

### 프로젝트 개요:
오픈소스 PokeAPI에서 포켓몬 정보를 받아, 포켓몬스터 게임과 유사한 형태로 웹에서 정보를 보여주는 토이 프로젝트입니다.
- 메인 페이지에 포켓몬 목록이 도감 순서대로 표시됩니다.
- 상세 페이지에서는 능력치, 기본 정보를 육각형 차트로 시각화하여 제공합니다.

### 프로젝트 목적:
- 무한 스크롤, 실시간 검색, 즐겨찾기 등 주요 프론트엔드 기능 구현
- React Query, Recoil 등 라이브러리를 통한 데이터 캐싱 및 상태 관리 학습

## 개발 환경 (Development Environment)

### Front-end
- React
- TypeScript
- React Query
- Recoil
- Tailwind CSS

### Tools & etc.
- VSCode
- GitHub (버전 관리)
- Axios (API 통신)
- Intersection Observer API (무한 스크롤 구현)

## 주요 기능 (Key Features)

### 무한 스크롤 (Infinite Scroll)
- Intersection Observer와 useInfiniteQuery로 구현
- 스크롤 위치 안정 유지

### 실시간 검색 (Real-time Search)
- 포켓몬 이름(한글/영문) 검색
- 타입별 필터링
- 검색어 + 타입 조합 검색

### 즐겨찾기 (Bookmark)
- localStorage를 통한 데이터 영속성 (추가 예정)
- Recoil로 전역 상태 관리
- 모바일/데스크톱 모두 지원

## 구현 상세 (Implementation Details)

### 1. React Query
- 캐싱 기능을 통해 뒤로가기로 돌아왔을 때 불필요한 API 호출을 방지
- useInfiniteQuery로 무한 스크롤 상태 관리
- 상세 페이지에서 포켓몬 데이터를 재활용

### 2. Recoil
- 검색어, 타입 필터, 즐겨찾기 포켓몬 목록 등 전역 상태 관리
- localStorage와 연동(추가 예정)하여 즐겨찾기 목록을 브라우저 종료 후에도 저장

### 3. Tailwind CSS
- 반응형 디자인(Mobile ~ Desktop)
- 다크모드/라이트모드 지원(준비 중)
- 일관성 있는 스타일과 애니메이션 효과 제공

## 트러블 슈팅 (Troubleshooting)

### 문제 상황
- PokeAPI에서는 영문 이름만 기본 제공
- 한국어 이름을 위해서는 pokemon-species API를 추가 호출
- 두 번의 API 호출로 로딩 시간이 길어지는 문제 발생

### 해결 방법
```typescript
// 포켓몬 상세 정보 호출
const getPokemonDetail = async (id: string | number): Promise<Pokemon> => {
  const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);
  return response.data;
};

// 포켓몬 species 정보 (한국어 이름) 호출
const getPokemonSpecies = async (id: string | number): Promise<string | undefined> => {
  const response = await axios.get<PokemonSpecies>(`${BASE_URL}/pokemon-species/${id}`);
  return response.data.names.find(name => name.language.name === 'ko')?.name;
};
```

- React Query 캐시 활용 → 재호출 최소화
- 데이터 가공 후 영문/한글 병행 표시 가능

## 회고 (Lessons Learned)

### 데이터 구조 사전 설계
- PokeAPI 응답 중 필요한 부분만 선별해 활용하는 과정이 필수

### React Query & 무한 스크롤
- useInfiniteQuery로 유저 편의성과 성능 최적화를 모두 달성

### 한국어 데이터 처리
- 영문만 제공되는 API를 국내 사용자를 위해 별도 Species API 호출 및 가공

### 상태 관리 & 캐싱 전략
- 전역 상태와 API 캐싱을 분리하여 코드 가독성과 유지보수성 개선
