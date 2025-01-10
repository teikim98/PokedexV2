Pokedex V2 (포켓몬 도감 Toy Project)
📌 목차 (Table of Contents)

    프로젝트 소개 (Introduction to the Project)
    개발 환경 (Development Environment)
    주요 기능 (Key Features)
    구현 상세 (Implementation Details)
    트러블 슈팅 (Troubleshooting)
    회고 (Lessons Learned)

프로젝트 소개 (Introduction to the Project)

프로젝트명: Pokedex V2 (포켓몬 도감 Toy Project)
프로젝트 메인 페이지:

    프로젝트 개요:
    오픈소스 API인 PokeAPI에서 포켓몬 정보를 가져와, 웹 환경에서 포켓몬스터 게임과 유사한 형태로 정보를 보여주는 토이 프로젝트입니다.
        메인 페이지에서는 포켓몬 목록이 도감 순서대로 표시됩니다.
        상세 페이지에서 포켓몬의 능력치와 기본 정보를 확인할 수 있으며, 육각형 차트로 시각화했습니다.

    프로젝트 목적:
        포켓몬 데이터를 활용해 무한 스크롤, 실시간 검색, 즐겨찾기 등 프론트엔드 기능을 학습하고자 합니다.
        React Query와 Recoil 등 최신 라이브러리를 통해 전역 상태 관리와 데이터 캐싱 전략을 체험합니다.

개발 환경 (Development Environment)
Front-end

    React
    TypeScript
    React Query
    Recoil
    Tailwind CSS

Tools & etc.

    VSCode
    GitHub (버전 관리)
    Axios (API 호출)
    Intersection Observer API (무한 스크롤 구현)

주요 기능 (Key Features)

    무한 스크롤 (Infinite Scroll)
        Intersection Observer API와 useInfiniteQuery를 활용
        포켓몬 목록을 자동으로 추가 로드하며, 스크롤 위치도 안정적으로 유지

    실시간 검색 (Real-time Search)
        포켓몬 이름 (한글/영문) 검색
        타입별 필터링
        검색어 + 타입 복합 조건 필터링

    즐겨찾기 기능 (Bookmark)
        localStorage를 통한 즐겨찾기 포켓몬 데이터 영속화 (추가 예정)
        Recoil로 전역 상태 관리
        모바일/데스크톱 환경 모두 지원

구현 상세 (Implementation Details)
1. React Query

    데이터 캐싱: PokeAPI 응답을 캐싱하여, 뒤로 가기 시 불필요한 재호출을 방지
    useInfiniteQuery: 포켓몬 목록 무한 스크롤에서 사용
    캐싱 전략: 상세보기한 포켓몬 데이터를 재활용

2. Recoil

    전역 상태 관리: 검색어, 타입 필터, 즐겨찾기 포켓몬 목록 등
    localStorage와 연동**(추가 예정)**: 즐겨찾기 목록을 브라우저 종료 후에도 저장할 계획

3. Tailwind CSS

    반응형 디자인: Mobile ~ Desktop까지 대응
    다크모드/라이트모드 지원(준비 중)
    일관성 유지: 공통 클래스와 색상 팔레트를 통해 UI 통일

트러블 슈팅 (Troubleshooting)

    문제상황

        PokeAPI는 영문 이름만 기본적으로 제공
        한국어 이름(species API)이 필요해 추가 API 호출 발생
        결과적으로 두 번의 API 호출이 필요한 상황 (상세 정보 + species)

    해결방법

        비동기 병렬 호출:

        getPokemonDetail: async (id) => { /* 상세 정보 호출 */ },
        getPokemonSpecies: async (id) => { /* 한국어 이름 호출 */ },

            Promise.all 등을 사용해 API 호출을 동시에 처리
            한번 불러온 데이터는 React Query로 캐싱
        데이터 가공:
            species API에서 받은 한국어 이름을 별도의 객체 필드로 저장해둠
            화면에서는 영어/한글 중 원하는 방식으로 표기 가능

    결과

        로딩 시간 절반 단축: 상세정보와 한국어 이름을 병렬로 호출
        재호출 최소화: 한 번 가져온 한국어 이름은 캐싱으로 재활용

회고 (Lessons Learned)

    데이터 구조 사전 설계의 중요성
        PokeAPI에서 제공되는 다양한 정보 중, 필요한 데이터만 선별해 구조화하는 단계가 필수
    React Query & 무한 스크롤의 시너지
        useInfiniteQuery를 통해 불필요한 re-fetch를 막고, UX를 향상할 수 있었음
    한국어 데이터 처리
        API가 제공하지 않는 언어 데이터가 필요한 경우, 별도 API 호출 또는 JSON 매핑 전략이 필요
    상태 관리와 캐싱 전략
        전역 상태(Recoil)와 API 캐싱(React Query)을 분리해 역할을 명확히 구분함으로써 코드 가독성과 유지보수성을 높임
