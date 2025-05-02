# Rolling
마음을 종이비행기에 담아 전하세요. 부담 없이, 따뜻하게.

## 🚀 배포 주소
[롤링 바로가기](https://rolling-gamma.vercel.app/)

## 📝 프로젝트 소개
Rolling은 소중한 사람들에게 마음을 전할 수 있는 롤링 페이퍼 서비스입니다. 이름, 배경, 색삭을 설정하여 롤링 페이퍼를 만들고, 메시지와 이모지 반응을 남겨보세요.

## 📚 기술 스택
### Language
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">

### FrontEnd
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

### Style
<img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white"><img src="https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css-modules&logoColor=white">

### 도구 및 유틸리티
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">

### API
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

### 코드 포매터 및 검사 도구
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"><img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">

### 협업툴
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white"><img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white">

### 배포 및 CI/CD
<img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"><img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">


## 👥 팀원 소개
<table width="100%">
  <tr align="center" bgcolor="#f8f8f8">
    <th width="20%">박광민</th>
    <th width="20%">이찬호</th>
    <th width="20%">이승민</th>
    <th width="20%">전지윤</th>
    <th width="20%">윤진우</th>
  </tr>
  <tr align="center">
    <td><img src="https://github.com/user-attachments/assets/167246c7-9218-4208-a6ef-fcac9f3851e0" width="180" height="180"></td>
    <td><img src="https://github.com/user-attachments/assets/b7b784fc-30c3-4a1a-8b2f-14f899e1042c" width="180" height="180"></td>
    <td><img src="https://github.com/user-attachments/assets/d688f02f-f451-4364-b9a4-326f953d8206" width="180" height="180"></td>
    <td><img src="https://github.com/user-attachments/assets/4ea665ec-37f8-4068-aede-b3cbd62642f6" width="180" height="180"></td>
    <td><img src="https://github.com/user-attachments/assets/b106db3e-240f-4f58-814c-8c2171b2ba10" width="180" height="180"></td>
  </tr>
  <tr align="center">
    <td style="text-align:center"><a href="https://github.com/minimo-9"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/></a>      </td>
    <td style="text-align:center"><a href="https://github.com/LeeCh0129"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/></a>     </td>
    <td style="text-align:center"><a href="https://github.com/dltmdals3929"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>     </a></td>
    <td style="text-align:center"><a href="https://github.com/dkslel1225"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/></a>    </td>
    <td style="text-align:center"><a href="https://github.com/Yun-Jinwoo"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/></a></td>
</tr>
</table>

## 🔨 역할 분담
### 박광민
- 공용 컴포넌트(Button, Input) 개발 및 버튼 중복 클릭 방지 처리
- Axios 통신 모듈화 및 API 관리, 에러 발생 시 사용자 알림(Alert) 처리 
- 메시지 작성 페이지 반응형 구현 및 메타태그를 활용한 미리보기 설정
- 전체 폰트 스타일 적용 (에디터 및 렌더링 결과물에 클래스 기반 반영)
- 홈 페이지 및 메시지 작성 페이지 애니메이션 효과 구현
- 메시지 작성 페이지(`/post/:id/message`) 구현
  - 드롭다운 컴포넌트 개발
  - Rich Text Editor(Quill) 커스텀 툴바 구성 (링크, 색상, 리스트 등 포함)
  - 프로필 이미지 업로드 기능 및 기본 이미지 클릭 시 초기화 처리
  - 폼/에디터 유효성 검사 및 버튼 비활성화 처리
  - 프로필 이미지 GET 요청 시 Skeleton UI 적용
  - 기존 API 연동(GET) 및 게시글 작성(POST) 기능 구현
  - 작성 완료 후 해당 카드 페이지(`/post/:id`)로 이동 처리
  - 로컬스토리지 임시 저장 및 관리 기능 개발  
    - 작성 중 임시 저장  
    - 제출 시 임시 저장 삭제  
    - 저장 후 24시간 경과 시 자동 삭제
  - 초기 상태 세팅 처리 (기본 이미지, 기본 폰트 등)

### 이찬호
- 프로젝트 초기 세팅
  - ESLint, Prettier 등 도구 설정
- 깃허브 프로젝트 관리
  - PR 템플릿 설정
  - 브랜치 전략 수립 및 관리
  - Fork Repository 자동 동기화 워크플로우 구축
- CI/CD 파이프라인 구축
  - GitHub Actions 워크플로우 설정
  - Vercel 자동배포 환경 구성
    - Production/Preview 환경 분리
- 헤더 서비스 구현
  - 이모지 리액션 기능 (추가/조회/카운팅)
    - Optimstic UI 패턴 적용
    - 중복 클릭 방지
  - 카카오톡 공유 기능
  - URL 클립보드 복사 기능
    - 토스트 알림
  - 반응형 UI/UX 구현

### 이승민
- 메인 화면 구현
- 반응형 UI/UX 구현

### 전지윤
- 공통 헤더 컴포넌트 구현
- /list 페이지 캐러셀 구현
    - 슬라이드 기능: 화면 크기에 따라 버튼, 터치, 드래그 입력 방식으로 동작
    - 캐러셀 끝 도달 시 Bounce 애니메이션 적용
    - Skeleton UI와 이미지 Preload 처리로 초기 로딩 시 사용자 경험 개선


### 윤진우
- 롤링 페이퍼 생성 페이지 (`/post`) 구현
  - 배경 색상 및 이미지 선택 기능 제공
  - 배경 이미지 업로드 기능 추가 구현
  - 입력된 데이터를 기반으로 API에 POST 요청 후, 생성된 페이지로 이동
  - 이미지 로딩 중 스켈레톤 UI를 적용해 사용자 경험 향상

- 롤링 페이퍼 페이지 (`/post/{id}`) 구현
  - `IntersectionObserver`를 활용한 무한 스크롤 기능 구현 (메시지를 일정 개수씩 반복 호출)
  - 사용자 입력값에 대해 XSS 방지를 위해 `DOMPurify` 적용
  - 메시지 클릭 시 상세 내용을 모달 창으로 출력
  - 메시지 내용이 길 경우 `...`으로 처리하여 레이아웃 균형 유지
  - 뒤로 가기 버튼 추가로 페이지 탐색 편의성 제공

- 롤링 페이퍼 편집 페이지 (`/post/{id}/edit`) 구현
  - 메시지 삭제 기능 구현 
  - 페이지 삭제 기능 구현 (**실수 방지를 위해 2단계 확인창을 적용하여 안전성 강화**)
  - 편집 모드에서는 "추가하기" 버튼이 숨겨지므로, 메시지 개수를 조정해 레이아웃의 시각적 균형을 유지

- 사용자 경험(UX) 최적화
  - 뒤로 가기 버튼에 지속적인 색상 변화 애니메이션을 적용해, 특정 배경 이미지 위에서도 눈에 띄도록 개선
  - 모달 창 등장 및 종료에 부드러운 애니메이션을 적용해 사용자 몰입도 향상
  - 메시지 삭제 버튼에 hover 애니메이션 추가로 조작 피드백 제공

## 📂 폴더 구조
``` bash
project-root/
├── src/
│   ├── api/                  
│   ├── assets/               
│   │   ├── images/           
│   │   └── styles/           
│   ├── components/           
│   │   ├── common/           
│   │   └── layout/           
│   ├── context/              
│   ├── hooks/                
│   ├── pages/                
│   ├── utils/                
│   ├── App.jsx               
│   └── main.jsx              
└── ...
```

## 📝 컨벤션

### 🧐 Commit Type & Emoji Guide

| **commit type** | **description** |
|---------------|----------------|
| feat | ✨ 기능 추가 |
| feat | 🖼️ 아이콘 추가 |
| fix | 🐛 버그 수정 |
| docs | 📝 문서 수정 |
| style | 🎨 UI, 스타일 관련 추가 및 수정 |
| refactor | ♻️ 리팩토링 |
| chore | 🔧 설정, 빌드 변경 |
| chore | 📁 폴더 구조 변경 또는 디렉토리 작업 |
| remove | 🔥 불필요한 코드/파일 제거 |
| deploy | 🚀 프로젝트 배포 |



### 📂 폴더/파일명 네이밍 컨벤션

| **대상** | **규칙** | **예시** |
|------|------|--------|
| 폴더명 | 케밥케이스 (kebab-case) | components, user-profile |
| 컴포넌트 파일명 | 파스칼케이스 (PascalCase) | UserProfile.jsx |
| 스타일 파일명 | 케밥케이스 + .styles.js | user-profile.styles.js |
| 이미지/아이콘 파일명 | 케밥케이스 | logo-icon.png, profile-default.png |
| 함수명/변수명 | 카멜케이스 (camelCase) | fetchUserData, userList |
| 환경변수 | 대문자+스네이크케이스 | VITE_API_URL |
| 클래스명 | BEM 방식 | .block__element--modifier |

### 🖊️ Git Flow

| **브랜치명** | **설명** |
|------------|---------|
| main | 배포 브랜치 |
| develop | 통합 개발 브랜치 |
| feature/* | 기능 개발 브랜치 |

### 🌿 브랜치 네이밍 컨벤션

| **브랜치 종류** | **네이밍 규칙** | **예시** |
|------|------|--------|
| 기능 개발 | feature/{이름} | feature/park |
| 버그 수정 | fix/{버그-설명} | fix/login-button-bug |
| 문서 수정 | docs/{문서-설명} | docs/readme-update |

