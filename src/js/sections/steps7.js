let stepPicked=[];
function initStepGame(){
  stepPicked=[];
  const pool=document.getElementById('stepPool');
  const ans=document.getElementById('stepAnswer');
  const msg=document.getElementById('stepMsg');
  ans.innerHTML='';msg.className='bug-msg';msg.innerHTML='';
  pool.innerHTML='';
  shuffleArr(STEP7.map((t,i)=>({t,i}))).forEach(o=>{
    const b=document.createElement('button');
    b.textContent=o.t;
    b.onclick=()=>{
      if(b.disabled)return;
      b.disabled=true;
      stepPicked.push(o.i);
      const li=document.createElement('li');
      li.textContent=o.t;
      ans.appendChild(li);
      if(stepPicked.length===STEP7.length)checkStepGame();
    };
    pool.appendChild(b);
  });
}
function checkStepGame(){
  const ans=document.getElementById('stepAnswer');
  let ok=0;
  [...ans.children].forEach((li,pos)=>{
    if(stepPicked[pos]===pos){li.classList.add('good');ok++;}
    else{li.classList.add('bad');li.textContent+=`  →  정답: ${STEP7[pos]}`;}
  });
  const msg=document.getElementById('stepMsg');
  msg.className='bug-msg show '+(ok===STEP7.length?'ok':'no');
  msg.innerHTML=ok===STEP7.length?'🏆 <b>완벽해요!</b> 7단계 순서를 정확히 외웠네요.':`📌 <b>${ok}/7개 위치가 정확해요.</b> 빨간 항목의 정답을 확인하고 "다시 섞기"로 재도전하세요!`;
}
initStepGame();

