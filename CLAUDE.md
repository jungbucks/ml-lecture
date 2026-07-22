# ml-lecture — 머신러닝·딥러닝 특강 페이지 유지보수 가이드

> 단일 HTML(`ml_dl_interactive.html`, 131KB)을 2026-07-08에 이 구조로 이식(Fable). 원본은 `backup/`에 보존.
> 앞으로의 계획은 `ROADMAP.md`(3개월 로드맵, 2026-07-14 신설 — 사용자 액션 대기 목록 포함) 참조.
> 정글(`C:\Users\정벅\jungle`)·마크다운(`C:\Users\정벅\markdown`)과는 **별개 프로젝트** — 그쪽 규칙(CSP·sw.js·이벤트 위임)을 끌어오지 말 것.

대상: 고등학생 정보 교과 시험 대비 인터랙티브 부교재. 톤 = 위트 있는 비유 + 시험 포인트.

**배포 경로 (2026-07-14 현행화)**:
- **주 배포 = GitHub Pages** https://jungbucks.github.io/ml-lecture/ — main에 푸시하면 Actions(`.github/workflows/deploy.yml`)가 **`src/` 폴더를 그대로 루트에 게시**한다. 즉 **push가 곧 라이브 배포**이므로 src가 미완성인 상태로 push 금지.
- 보조 배포 = `dist/ml_dl_interactive.html` 단일 파일(오프라인·게시판 파일 업로드용).

## 절대 규칙

1. **ES 모듈(import/export) 금지.** 학생 PC에서 file://(더블클릭)로 열리는 게 전제 — ESM은 file://에서 죽는다. 모든 JS는 **classic script + 전역 공유**(한 파일의 top-level `const`/`function`을 다른 파일이 그대로 사용). `<input type="module">`, fetch, CDN 라이브러리 전부 금지.
2. **수정 후 `node tools/build.mjs` 필수.** 빌드가 ① 매니페스트 파일 존재 ② JS 문법 ③ 미등록 파일까지 검문한다. 빌드 실패 상태로 끝내지 말 것.
3. **새 파일을 만들면 `src/index.html`의 `<script src>` 목록에 등록** (빌드가 미등록을 잡아주지만, 순서는 사람이 정한다). **로드 순서: data/* → js/core.js → js/sections/*(현재 순서 유지) → pagefx.js 맨 끝.** 엔진이 데이터 const를 로드 시점에 읽으므로 데이터가 먼저여야 한다(TDZ).
4. **데이터/엔진 분리 원칙**: 콘텐츠(문항·카드·비유·문구) 수정은 `src/data/`만 건드린다. 엔진(`src/js/`)을 같이 고쳐야 하는 콘텐츠 수정은 설계 신호 — 멈추고 재검토. 각 데이터 파일 머리에 스키마 주석이 있다.
5. **공유는 Pages URL 또는 dist 파일만.** 온라인은 Pages URL(문서 머리 참조 — push=배포임을 기억), 파일로 줄 땐 dist 단일 파일. src 폴더를 통째로 학생에게 주지 말 것. 홈의 `C:\Users\정벅\ml_dl_interactive.html`은 과거 배포 방식의 **스테일 사본(2026-07-09, 현재 dist보다 뒤처짐)** — 기준 아님, 갱신 의무도 없음.
6. **동기화 쌍 (한쪽만 고치면 안 되는 것들)**:
   - `data/ann-types.js`(매칭 게임) ↔ index.html ④-4 신경망 표 — 문구 일치
   - `data/steps7.js` ↔ index.html ① 7단계 목록 — 문구 일치 (게임 채점이 이 텍스트 기준)
   - ⚠️ 섹션 번호는 재배치 때마다 변한다(현행: ①7단계 ②도감 ③스케일링 ④딥러닝입문 ⑤하이퍼 ⑥코드 ⑦버그 ⑧코드퀴즈 ⑨프로젝트 ⑩자가진단 ⑪심화). 재배치 시 이 규칙의 번호와 데이터 파일 속 "섹션(N)" 참조 문구도 함께 갱신할 것
   - `data/quizzes.js`의 FINAL 문항 추가 시 FINAL_SEC(오답노트 섹션 매핑)도 추가
7. **학번·이름은 저장 금지**(개인정보 — 결과 요약 복사에만 사용). localStorage 자체를 현재 안 쓴다.
8. **작은 글씨 금지(사용자 확정 선호)** — 본문성 텍스트 0.85rem(≈13px) 미만으로 내리지 말 것. 위트 톤(비유·이모지) 유지하되 화면 흔들림·파티클 같은 과한 이펙트는 넣지 않는다.
9. 인라인 onclick은 이 프로젝트에서 **허용**(CSP 없음, 기존 관례). top-level 함수는 window에 자동 노출되므로 그대로 동작한다.

## 구조

```
src/index.html        마크업 전체 + css/js 매니페스트 (섹션 ①~⑭ + 배지·헤더)
src/css/style.css     전체 스타일 (팔레트 :root 변수 — hex 추가 전에 기존 변수 확인)
src/data/*.js         ★ 콘텐츠 (수정의 90%가 여기) — 파일별 스키마는 각 파일 첫 줄 주석
src/js/core.js        공용 유틸(shuffleArr)
src/js/sections/*.js  섹션 엔진 19개 (파일명 = 섹션)
tools/build.mjs       src → dist 인라인 빌더 (의존성 0)
tools/probe.template.html  검증 프로브 템플릿
dist/ml_dl_interactive.html  배포물 (빌드 산출 — 직접 수정 금지)
backup/               이식 전 원본
```

- 개발 중 미리보기: `src/index.html`을 그냥 브라우저로 열면 됨(classic script라 file://에서도 동작 — 빌드 없이 확인 가능).
- 대상 독자·문체·비유 사례: 교과서/모의고사/수능(검증 데이터), 양궁 코치(과적합), 오답 노트(부스팅), 담임 선생님(스태킹), 금붕어(RNN)/다이어리(LSTM) — 새 콘텐츠도 이 결로.

## 검증 방법 (이 PC 특이사항 포함)

- 이 PC: git 있음(원격 = github.com/jungbucks/ml-lecture, **main 푸시 = Pages 자동 배포** — 커밋·푸시는 사용자 몫), python은 스토어 스텁, 셸 PowerShell 5.1(`&&` 없음). Node v22 있음.
- 절차: `node tools/build.mjs` → ml-lecture 루트를 Node http 서버로 서빙 → `tools/probe.template.html`을 `dist/__probe.html`로 복사해 시나리오 작성 → 헤드리스 Edge `--dump-dom`으로 수확 → **__probe.html 삭제**.
- 회귀 기준: 2026-07-08 이식 검증에서 쓴 **24개 시나리오**(카드 그리드 수/플립/워크스루·stratify/버그찾기/퍼셉트론/스케일러/활성화/검증데이터/양궁 3상태/해석퀴즈/프로젝트/자가진단 15문항 채점·복사/베이즈/7단계/신경망 매칭 7/소프트맥스/kNN/트리/미니넷/LSTM·앙상블 표). 구조를 건드렸다면 전부, 콘텐츠만 바꿨다면 해당 섹션 + 자가진단만 돌려도 된다.
- 프로브 함정: top-level `const`는 `w.이름` 접근 불가(전역 어휘 스코프) — DOM에서 읽을 것. top-level `function`은 가능. 자가진단은 **문항 셔플+번호 재부여**(finalquiz.js가 `q`의 "N." 프리픽스를 떼고 재매김)라 문항 번호 문자열로 단언하지 말고 `.q-item` 개수+본문 키워드로 검사. 헤드리스 Edge는 `--user-data-dir`(임시 프로필) 없이는 기존 프로세스에 위임해 --dump-dom이 빈 출력이 됨.

## 현재 상태 (2026-07-18)

완성·Pages 배포 중. 섹션 11개(현행 번호는 규칙 6 참조), 자가진단 20문항. 강화학습·분류 평가지표(혼동행렬·정밀도/재현율)·경사하강 체험존 포함.
- **용어 표기 = 과대적합 / 과소적합 / 적합**(교과서 통일). '과적합' 병기는 검증 카드 1회만. 새 콘텐츠도 이 표기.
- **관문**: 페이지 전체 접근 관문(`gateTry`, sessionStorage `mll_gate_ok`, F12 억제). 관문 뒤에 진짜 비밀 넣지 말 것(F12로 우회 — 공유용 문지기일 뿐). 해시는 코드에만.
- 잔여 계획 = `ROADMAP.md`. 미푸시 커밋이 있으면 **push = Pages 배포**(사용자 몫).
