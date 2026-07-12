let FINAL_STATE=[],gradeWarned=false,lastResult=null;
function renderFinal(){
  const box=document.getElementById('finalQuizBox');
  box.innerHTML='';
  gradeWarned=false;lastResult=null;
  const warn=document.getElementById('gradeWarn');
  warn.className='bug-msg';warn.innerHTML='';
  /* 문항 순서 + 보기 순서 모두 셔플 */
  FINAL_STATE=shuffleArr(FINAL.map((it,idx)=>({it,idx,order:shuffleArr(it.opts.map((_,oi)=>oi))})));
  FINAL_STATE.forEach((st,qi)=>{
    const {it,order}=st;
    const d=document.createElement('div');
    d.className='q-item';
    let oh='';
    order.forEach(origIdx=>{
      oh+=`<label><input type="radio" name="fq${qi}" value="${origIdx}"> ${it.opts[origIdx]}</label>`;
    });
    d.innerHTML=`<div class="qt">${qi+1}. ${it.q.replace(/^\d+\.\s*/,'')}</div><div class="q-opts">${oh}</div>
      <div class="q-exp">✅ <b>정답: ${it.opts[it.a]}</b><br>${it.exp}</div>`;
    box.appendChild(d);
  });
}
function gradeFinal(){
  const items=document.querySelectorAll('#finalQuizBox .q-item');
  const warn=document.getElementById('gradeWarn');
  const unanswered=[];
  items.forEach((d,qi)=>{if(!d.querySelector('input:checked'))unanswered.push(qi+1);});
  if(unanswered.length>0&&!gradeWarned){
    gradeWarned=true;
    warn.className='bug-msg show no';
    warn.innerHTML=`⚠️ <b>${unanswered.length}개 문항(${unanswered.join(', ')}번)이 아직 미답변이에요.</b> 미답변은 오답 처리됩니다. 그래도 채점하려면 "채점하기"를 한 번 더 누르세요.`;
    return;
  }
  warn.className='bug-msg';warn.innerHTML='';
  let score=0;const wrongs=[];
  items.forEach((d,qi)=>{
    const st=FINAL_STATE[qi],it=st.it;
    const sel=d.querySelector('input:checked');
    d.querySelectorAll('.q-opts label').forEach((lab,oi)=>{
      lab.classList.remove('right','wrong');
      const origIdx=st.order[oi];
      if(origIdx===it.a)lab.classList.add('right');
      else if(sel&&parseInt(sel.value)===origIdx)lab.classList.add('wrong');
    });
    d.querySelector('.q-exp').classList.add('show');
    if(sel&&parseInt(sel.value)===it.a)score++;
    else wrongs.push(st);
  });
  const total=FINAL.length;
  document.getElementById('scoreNum').textContent=score;
  const nm=document.getElementById('stuName').value.trim();
  const sid=document.getElementById('stuId').value.trim();
  document.getElementById('scoreTitle').textContent=nm?nm+'님의 점수':'나의 점수';
  /* 결과 메타(학번·이름·일시) — 제출용 요약에 포함 */
  const now=new Date(),pad=n=>String(n).padStart(2,'0');
  const when=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate())+' '+pad(now.getHours())+':'+pad(now.getMinutes());
  document.getElementById('resultMeta').textContent=(sid||nm)
    ? [sid?'학번 '+sid:'',nm?'이름 '+nm:''].filter(Boolean).join(' · ')+' · '+when
    : when+' — 맨 위 표지에 학번·이름을 입력하면 제출 요약에 포함돼요';
  const msg=document.getElementById('scoreMsg');
  if(score===total)msg.textContent='🏆 완벽해요! 시험 준비 끝!';
  else if(score>=total*0.8)msg.textContent='🎉 훌륭해요! 틀린 문제만 다시 확인하세요.';
  else if(score>=total*0.5)msg.textContent='💪 절반 이상! 해설을 읽고 다시 도전해 보세요.';
  else msg.textContent='📚 카드와 표를 한 번 더 복습한 뒤 다시 풀어 봐요!';
  /* 오답 노트: 틀린 개념 → 복습 섹션 링크 */
  const rv=document.getElementById('wrongReview');
  if(wrongs.length===0){
    rv.innerHTML='🌟 <b>오답 없음!</b> 모든 개념을 정확히 알고 있어요.';
  }else{
    rv.innerHTML='📝 <b>오답 노트 — 아래 섹션으로 이동해 복습하세요:</b><ul style="padding-left:20px;margin-top:6px">'+
      wrongs.map(st=>{
        const [sid,sname]=FINAL_SEC[st.idx];
        return `<li style="margin:4px 0">핵심 개념 <b>${st.it.opts[st.it.a]}</b> → <a href="#${sid}" style="color:var(--unsup-deep);font-weight:700">${sname}</a></li>`;
      }).join('')+'</ul>';
  }
  /* 제출용 요약 저장 (복사 버튼에서 사용) */
  lastResult={score,total,when,wrongNames:wrongs.map(st=>st.it.opts[st.it.a])};
  const r=document.getElementById('quizResult');
  r.style.display='block';
  r.scrollIntoView({behavior:'smooth',block:'center'});
}
/* ---- 결과 요약 복사 (활동지 제출용) ---- */
function copyResult(btn){
  if(!lastResult)return;
  const sid=document.getElementById('stuId').value.trim()||'(미입력)';
  const nm=document.getElementById('stuName').value.trim()||'(미입력)';
  const txt=[
    '[머신러닝·딥러닝 특강 자가진단 결과]',
    '학번: '+sid+' / 이름: '+nm,
    '점수: '+lastResult.score+' / '+lastResult.total,
    '일시: '+lastResult.when,
    lastResult.wrongNames.length
      ? '복습할 개념: '+lastResult.wrongNames.join(', ')
      : '복습할 개념: 없음 (전부 정답 🌟)'
  ].join('\n');
  const orig='📋 결과 요약 복사 (제출용)';
  const done=ok=>{btn.textContent=ok?'✅ 복사 완료! 붙여넣어 제출하세요':'❌ 복사 실패 — 다시 시도해 주세요';setTimeout(()=>{btn.textContent=orig;},2000);};
  if(navigator.clipboard&&navigator.clipboard.writeText)
    navigator.clipboard.writeText(txt).then(()=>done(true),()=>done(copyFallbackTa(txt)));
  else done(copyFallbackTa(txt));
}
function copyFallbackTa(t){
  const ta=document.createElement('textarea');
  ta.value=t;ta.style.position='fixed';ta.style.opacity='0';
  document.body.appendChild(ta);ta.select();
  let ok=false;try{ok=document.execCommand('copy');}catch(e){}
  ta.remove();return ok;
}
function resetFinal(){
  renderFinal();
  document.getElementById('quizResult').style.display='none';
  document.getElementById('finalquiz').scrollIntoView({behavior:'smooth'});
}
renderFinal();

