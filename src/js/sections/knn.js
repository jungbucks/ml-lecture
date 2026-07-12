/* ================================================================
   16. kNN 체험존 — k 값 토글
================================================================ */
function setKnn(k){
  const c3=document.getElementById('knnC3'),c5=document.getElementById('knnC5'),dot=document.getElementById('knnDot');
  const b3=document.getElementById('knnK3'),b5=document.getElementById('knnK5'),msg=document.getElementById('knnMsg');
  if(k===3){
    c3.setAttribute('opacity','1');c5.setAttribute('opacity','.22');
    dot.setAttribute('fill','#d64545');
    b3.className='act fwd';b5.className='act neutral';
    msg.innerHTML='<b>k=3</b> : 가장 가까운 이웃 3개는 🔺2개, 🟦1개 → 다수결로 <b style="color:#d64545">🔺 빨강 삼각형</b>으로 분류!';
  }else{
    c5.setAttribute('opacity','1');c3.setAttribute('opacity','.28');
    dot.setAttribute('fill','#3a7de8');
    b3.className='act neutral';b5.className='act fwd';
    msg.innerHTML='<b>k=5</b> : 이웃 5개로 넓히면 🔺2개, 🟦3개 → 다수결로 <b style="color:#3a7de8">🟦 파랑 사각형</b>으로 분류!<br>같은 데이터라도 <b>k 값에 따라 결과가 달라질 수 있어요.</b>';
  }
}
setKnn(3);

