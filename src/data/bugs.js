/* [데이터] 버그 찾기 — BUGS[] {codeId,msgId,fixId,bugLine,lines,fixes,why}. */
/* ================================================================
   3. 버그 찾기
================================================================ */
const BUGS=[
  {codeId:"bug1-code",msgId:"bug1-msg",fixId:"bug1-fix",bugLine:1,
   lines:["# 2. 데이터 분할 (학습용 80%, 테스트용 20%)",
          "X_train, X_test, X_train, X_test = train_test_split(X, y, test_size=0.2, random_state=42)",
          "model = LinearRegression()",
          "model.fit(X_train, y_train)"],
   fixes:[
     {t:"X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)",ok:true},
     {t:"X_test, X_train, y_test, y_train = train_test_split(X, y, test_size=0.2, random_state=42)",ok:false},
     {t:"X_train, y_train, X_test, y_test = train_test_split(X, y, test_size=0.2, random_state=42)",ok:false}],
   why:"train_test_split은 <b>X_train, X_test, y_train, y_test</b> 순서로 4개의 값을 돌려줍니다. 위 코드는 X_train과 X_test라는 같은 이름을 두 번 써서 y(정답) 데이터가 사라져 버려요! 훈련 데이터 조합은 X_train·y_train, 테스트 데이터 조합은 X_test·y_test라는 것을 기억하세요."},
  {codeId:"bug2-code",msgId:"bug2-msg",fixId:"bug2-fix",bugLine:0,
   lines:["scaler = MixMaxScaler()",
          "X_train = scaler.fit_transform(X_train)",
          "X_test = scaler.transform(X_test)"],
   fixes:[
     {t:"scaler = MinMaxScaler()",ok:true},
     {t:"scaler = MaxMinScaler()",ok:false},
     {t:"scaler = MixMinScaler()",ok:false}],
   why:"사이킷런의 실제 클래스 이름은 <b>MinMaxScaler()</b>입니다. 데이터를 기본값 [0,1] 사이 숫자로 변환하는 스케일러예요(feature_range 옵션을 주면 [-1,1] 등으로도 가능). Min(최솟값)과 Max(최댓값)를 이용한다고 기억하면 철자를 헷갈리지 않아요!"}
];

