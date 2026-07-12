function renderMiniQuiz(boxId,items,prefix){
  const box=document.getElementById(boxId);
  items.forEach((it,qi)=>{
    const d=document.createElement('div');
    d.className='q-item';
    let oh='';
    it.opts.forEach((o,oi)=>{
      oh+=`<label><input type="radio" name="${prefix}${qi}" value="${oi}"> ${o}</label>`;
    });
    d.innerHTML=`<div class="qt">${it.q}</div><div class="q-opts">${oh}</div>
      <button class="reveal-btn">정답 확인</button>
      <div class="q-exp">✅ <b>정답: ${it.opts[it.a]}</b><br>${it.exp}</div>`;
    d.querySelector('.reveal-btn').onclick=()=>{
      const sel=d.querySelector('input:checked');
      d.querySelectorAll('.q-opts label').forEach((lab,oi)=>{
        lab.classList.remove('right','wrong');
        if(oi===it.a)lab.classList.add('right');
        else if(sel&&parseInt(sel.value)===oi)lab.classList.add('wrong');
      });
      d.querySelector('.q-exp').classList.add('show');
    };
    box.appendChild(d);
  });
}
renderMiniQuiz('quizSetC',QUIZ_C,'qc');
renderMiniQuiz('quizSetB',QUIZ_B,'qb');

