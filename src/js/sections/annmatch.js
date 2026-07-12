let annOrder=[],annCur=0,annMiss=0;
function initAnnGame(){
  annOrder=shuffleArr(ANN_MATCH.map((_,i)=>i));annCur=0;annMiss=0;
  const chips=document.getElementById('annChips');
  chips.innerHTML='';
  ANN_MATCH.forEach((m,i)=>{
    const b=document.createElement('button');
    b.textContent=m.n;
    b.onclick=()=>pickAnn(b,i);
    chips.appendChild(b);
  });
  const msg=document.getElementById('annMsg');
  msg.className='bug-msg';msg.innerHTML='';
  showAnnQ();
}
function showAnnQ(){
  const q=document.getElementById('annQ');
  if(annCur>=ANN_MATCH.length){
    q.innerHTML='🎉 <b>매칭 완료!</b> 틀린 횟수: '+annMiss+'회'+(annMiss===0?' — 완벽해요!':' — 위의 표를 다시 읽고 재도전해 보세요.');
    return;
  }
  q.innerHTML=`<b>Q${annCur+1}/${ANN_MATCH.length}.</b> ${ANN_MATCH[annOrder[annCur]].d}`;
}
function pickAnn(btn,i){
  if(btn.classList.contains('done')||annCur>=ANN_MATCH.length)return;
  if(i===annOrder[annCur]){
    btn.classList.add('done');
    annCur++;
    showAnnQ();
  }else{
    annMiss++;
    btn.classList.add('flash');
    setTimeout(()=>btn.classList.remove('flash'),400);
    const msg=document.getElementById('annMsg');
    msg.className='bug-msg show no';
    msg.innerHTML='❌ 아니에요! 설명 속 키워드를 다시 보세요.';
    setTimeout(()=>{msg.className='bug-msg';},1200);
  }
}
initAnnGame();

