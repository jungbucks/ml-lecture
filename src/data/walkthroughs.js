/* [데이터] 코드 워크스루 — WALKTHROUGHS[키].lines = [코드줄, 해설] 쌍. 빈 줄은 ["",""]. */
/* ================================================================
   2. 코드 워크스루
================================================================ */
const WALKTHROUGHS = {
  linreg:{noteId:"note-linreg",lines:[
    ["import numpy as np","수치 계산 라이브러리 numpy를 np라는 이름으로 불러옵니다."],
    ["from sklearn.model_selection import train_test_split","데이터를 훈련용/테스트용으로 나눠 주는 함수 train_test_split을 불러옵니다."],
    ["from sklearn.linear_model import LinearRegression  # 선형회귀","선형 회귀 모델을 불러옵니다. 데이터를 가장 잘 나타내는 직선(또는 평면)을 그려 미래의 숫자를 예측하는 알고리즘이에요."],
    ["",""],
    ["# 1. 데이터 준비 (공부 시간 x, 시험 점수 y)","x는 독립변수(공부 시간), y는 종속변수(시험 점수)입니다."],
    ["X = np.array([[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]])","공부 시간 데이터 10개. 독립변수 X는 2차원 배열 형태로 준비합니다."],
    ["y = np.array([15,25,35,42,50,62,75,82,91,98])","각 공부 시간에 대응하는 시험 점수(정답 레이블) 10개입니다."],
    ["",""],
    ["# 2. 데이터 분할 (학습용 80%, 테스트용 20%)","전체 데이터를 훈련용 80%, 테스트용 20%로 나눕니다."],
    ["X_train, X_test, X_train, X_test = train_test_split(X, y, test_size=0.2, random_state=42)","⚠️ <b>이 줄, 뭔가 이상하지 않나요?</b> 일부러 숨겨 둔 오타예요. '버그 찾기' 섹션(⑦)에서 직접 고쳐 보세요! random_state=42는 실행할 때마다 같은 방식으로 나뉘도록 고정하는 값입니다."],
    ["# test_size=0.2는 20%를 테스트용으로 떼어놓겠다는 의미. 보통 0.2~0.3으로 정함","test_size=0.2는 20%를 테스트용으로 떼어놓겠다는 의미. 보통 0.2~0.3으로 정합니다."],
    ["",""],
    ["# 3. 모델 선택 및 학습","이제 알고리즘(모델)을 고르고 학습시킬 차례!"],
    ["model = LinearRegression()","선형 회귀 모델 객체를 만듭니다."],
    ["model.fit(X_train, y_train)","fit() = 학습! 훈련 데이터 조합(X_train, y_train)으로 모델을 학습시킵니다."]
  ]},
  clf:{noteId:"note-clf",lines:[
    ["import numpy as np","수치 계산 라이브러리 numpy를 불러옵니다."],
    ["from sklearn.model_selection import train_test_split","데이터 분할 함수를 불러옵니다."],
    ["from sklearn.linear_model import LogisticRegression  # 로지스틱회귀","로지스틱 회귀 모델. 시그모이드 함수를 활용해 데이터가 특정 집단에 속할 확률(0~1 사이)을 계산하여 데이터를 분류합니다."],
    ["",""],
    ["# 1. 데이터 준비 (특성 x: [공부 시간, 출석률], 레이블 y: 합격 여부 1 또는 0)","이번엔 특성이 2개(공부 시간, 출석률)이고, 정답은 합격(1)/불합격(0)인 <b>분류</b> 문제입니다."],
    ["X = np.array([[1,20],[2,30],[3,40],[4,70],[5,60],[6,80],[7,90],[8,85],[9,95],[10,100]])","학생 10명의 [공부 시간, 출석률] 데이터. x는 독립변수입니다."],
    ["y = np.array([0,0,0,0,1,1,1,1,1,1])","합격 여부 레이블. y는 종속변수입니다."],
    ["",""],
    ["# 2. 데이터 분할 (학습용 80%, 테스트용 20%)","훈련 데이터 조합은 X_train, y_train. 테스트 데이터 조합은 X_test, y_test입니다."],
    ["X_train, X_test, X_train, X_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)","⚠️ 선형 회귀 코드와 <b>같은 오타</b>가 여기도 있어요! '버그 찾기' 섹션(⑦)에서 확인하세요. 그리고 이번엔 <b>stratify=y</b>라는 새 인자가 보이죠? 아랫줄 해설을 클릭!"],
    ["# stratify=y : y(정답)의 클래스 비율을 훈련/테스트에 그대로 유지 (층화 추출)","<b>stratify=y</b> — 전체 데이터의 합격:불합격 비율이 6:4라면, 훈련 데이터와 테스트 데이터도 <b>각각 6:4가 되도록</b> 나눠 줍니다(층화 추출). 그냥 무작위로 나누면 운 나쁘게 테스트 데이터에 불합격만 몰릴 수 있는데, 그걸 막아 줘요. 데이터가 적거나 클래스가 불균형한 <b>분류</b> 문제에서 특히 중요합니다! (y가 연속된 숫자인 회귀에서는 쓰지 않아요 — 그래서 위의 선형 회귀 코드에는 없습니다.)"],
    ["",""],
    ["# 3. 모델 선택 및 학습 (분류를 위해 LogisticRegression 사용)","예측이 아닌 분류 문제이므로 LinearRegression 대신 LogisticRegression을 씁니다."],
    ["model = LogisticRegression()","로지스틱 회귀 모델 객체 생성."],
    ["model.fit(X_train, y_train)  # train 데이터들로 학습","train 데이터들로 학습합니다."]
  ]},
  kerasA:{noteId:"note-kerasA",lines:[
    ["import tensorflow as tf","딥러닝 라이브러리 텐서플로를 불러옵니다."],
    ["from tensorflow.keras.models import Sequential","층을 순서대로 쌓는 Sequential 모델을 불러옵니다."],
    ["from tensorflow.keras.layers import Flatten, Dense","Flatten(차원 변환)과 Dense(완전연결층)를 불러옵니다."],
    ["",""],
    ["model = Sequential([","층을 위에서 아래로 차례차례 쌓기 시작!"],
    ["    Flatten(input_shape=(28, 28)),      # 28x28 이미지를 1차원 데이터로 변환","① 28×28 이미지를 1차원 데이터로 변환합니다."],
    ["    Dense(128, activation='relu'),      # 은닉층","② 128개 노드의 은닉층. 활성화 함수는 ReLU(양수면 그대로, 0 이하면 0)."],
    ["    Dense(10, activation='softmax')     # 출력층","③ 10개 노드의 출력층 + Softmax → 10개 클래스 중 하나를 고르는 <b>다중 클래스 분류</b>임을 알 수 있어요!"],
    ["])","모델 완성!"]
  ]},
  kerasB:{noteId:"note-kerasB",lines:[
    ["model = Sequential([","층 쌓기 시작."],
    ["    Dense(64, activation='relu'),   # 은닉층","① 64개 노드의 은닉층, ReLU 사용."],
    ["    Dense(32, activation='tanh'),   # 은닉층","② 32개 노드의 은닉층, Tanh(출력 -1~1) 사용."],
    ["    Dense(1)                        # 출력층, 활성화 함수 없음","③ 노드 1개 출력층, <b>활성화 함수 없음(선형)</b> → 숫자를 그대로 내보내는 <b>회귀(예측) 문제</b>입니다!"],
    ["])","모델 완성!"]
  ]},
  scaler:{noteId:"note-scaler",lines:[
    ["scaler = MixMaxScaler()","① 개발자는 MinMaxScaler를 스케일러로 결정… 그런데 ⚠️ 철자가 이상하죠? 시험 단골 함정 오타예요! '버그 찾기' 섹션(⑦)의 버그 2번에서 고쳐 보세요."],
    ["X_train = scaler.fit_transform(X_train)","② 훈련 데이터(X_train) 기준으로 스케일링 기준을 만들어(fit) 변환(transform)합니다."],
    ["X_test = scaler.transform(X_test)","③ 테스트 데이터는 이미 학습한 스케일링 기준으로 변환만 합니다. (새로 fit하지 않아요!)"]
  ]},
  compile:{noteId:"note-compile",lines:[
    ["model.compile(optimizer='adam', loss='mse', metrics=['mae'])","adam 최적화, mse 손실함수, mae 평가지표 → 손실이 MSE이므로 <b>회귀 문제</b>임을 알 수 있어요."],
    ["history = model.fit(X_train, y_train, epochs=20, batch_size=64, validation_split=0.2)","훈련 데이터를 20회 반복학습(epochs=20), 한 번에 64개씩 처리(batch_size=64), 훈련 데이터의 20%는 검증 데이터로 사용(validation_split=0.2)."],
    ["model.evaluate(X_test, y_test)","학습이 끝난 뒤 테스트 데이터로 모델 성능을 평가합니다."]
  ]}
};

