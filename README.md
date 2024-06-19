# 단어 시험지 생성 프로젝트

본 프로젝트는 단어 시험지 생성 프로젝트로, Firebase를 사용하여 로그인, DB, 배포 기능을 구현하였습니다.

### 프로젝트 소개

프로젝트에 사용된 스킬입니다.
<br/>

![firebase](https://img.shields.io/badge/Firebase-DD2C00.svg?style=for-the-badge&logo=Firebase&logoColor=white)
![react](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![react-hook-form](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)
![recoil](https://img.shields.io/badge/Recoil-3578E5.svg?style=for-the-badge&logo=Recoil&logoColor=white)
![styled-components](https://img.shields.io/badge/styledcomponents-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)
![react-router](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white)

<br/>

기존 단어 시험지 생성 웹사이트의 사용자 입력이 불편하다는 의견을 얻어 사용자 친화적인 디자인으로 재구성하였습니다. 계정 생성 및 로그인이 가능하고 DB에 저장되어 있는 데이터들을 바탕으로 단어 시험지를 만들고 출력할 수 있습니다. 로그인 한 사용자는 만들었던 시험지를 저장하여 프로필 창에서 다시 확인이 가능합니다.

이전에 미완성된 팀 프로젝트의 결과물을 더 확장시켰습니다. 시험지 생성 및 출력 기능까지 있었고 계정 생성 및 로그인, 프로필, 시험지 저장 및 확인 기능을 추가하였습니다.
<br/>

### 프로젝트 일정

24.03.18 - 24.05.23 : 1차 배포 완료(80% 완성도, 기본 기능 동작)

### 문제 및 해결

#### 1. 상태 관리

초기 프로젝트의 기능은 시험지 생성 및 출력까지 존재하였습니다. 시험지 생성까지 여러 단계를 거쳐야 하다보니 상태 관리가 복잡해지는 것을 느꼈고 간단한 프로젝트이기 때문에 Recoil을 사용하여 상태 관리를 하였습니다. 이후 프로젝트를 확장하다보니 이전 프로젝트와의 충돌이 생겼습니다. 가장 큰 문제는 사용자가 저장한 시험지를 확인할 때 발생했습니다. 테스트를 위해 새로고침을 하고 시험지를 확인하려고 할 때 결과가 나오지 않았습니다. 원인은 시험지를 보여주는 컴포넌트가 상태 관리에 의존했기 때문이었습니다. 새로고침을 뒤에는 상태가 초기화 되기 때문에 컴포넌트의 렌더링에서 오류가 발생한 것이었습니다. 상태에 의존하지 않는 컴포넌트를 추가하여 문제를 해결했습니다. 이전 컴포넌트도 상태에 의존하지 않도록 수정할 계획입니다.

본 프로젝트를 통해 상태 관리 라이브러리를 직접 사용해보고 고려해야 할 점을 느낄 수 있었습니다. 다양한 상태 관리 라이브러리들을 경험하고 각각의 장단점을 분석한 뒤 프로젝트의 성격에 맞는 라이브러리를 선택해야 한다는 것을 배웠습니다.

#### 2. Firebase 확장

기존 Firebase가 제공하는 사용자 정보는 제한적이었습니다. 본 프로젝트에서는 사용자의 프로필, 소개말을 비롯하여 이전에 저장했던 단어 시험지 정보가 사용자 정보에 포함되어야했습니다. 제공된 사용자 정보를 수정해보려고 했지만 허용되지 않는 범위였습니다. 따라서 새로운 사용자 컬렉션을 생성하여 보다 다양한 사용자의 정보를 저장할 수 있게끔 보완하였습니다.

모든 라이브러리나 API가 설계한 것 만큼의 기능이나 정보를 제공하지 않을 수 있다는 것을 염두해야 한다는 것을 배웠습니다. 도구에 휘둘리지 않고 도구를 이용하는 자세에 대해 생각할 수 있었습니다.

<br/>

### 관련 링크

배포 링크 : [https://my-voca-947ab.web.app](https://my-voca-947ab.web.app)
