/* [데이터] 하이퍼파라미터 플립카드 — HYPER[] {name,one,def,ex}. */
/* ================================================================
   7. 하이퍼파라미터 플립카드
================================================================ */
const HYPER=[
  {name:"optimizer",one:"어떻게 최적화할까?",def:"모델 학습을 위한 최적화 알고리즘. adam, sgd 등이 있으며 adam이 대표적. 역전파에서 가중치·편향 수정에 사용됨.",ex:"optimizer='adam'"},
  {name:"loss",one:"예측이 얼마나 틀렸나?",def:"손실 함수. 예측값과 실제값의 차이를 계산. 분류: binary_crossentropy(이진) / categorical_crossentropy(다중). 회귀: MSE, MAE.",ex:"loss='mse'"},
  {name:"metrics",one:"사람이 보는 성적표",def:"인간이 성능을 평가하는 지표(학습에는 관여하지 않음). 분류: accuracy, 회귀: MSE, MAE.",ex:"metrics=['accuracy']"},
  {name:"epochs",one:"전체 반복 학습 횟수",def:"전체 훈련 데이터를 반복 학습시키는 횟수.",ex:"epochs=20"},
  {name:"batch_size",one:"한 번에 몇 개씩?",def:"한 번에 모델이 처리하는 훈련 데이터 개수.",ex:"batch_size=64"},
  {name:"validation_split",one:"검증용으로 얼마나 떼어둘까?",def:"훈련 데이터 중 검증 데이터(모의고사)로 분류하는 비율. 검증 데이터의 역할은 아래 '모의고사' 설명 참고!",ex:"validation_split=0.2"}
];
