BUGS.forEach(bug=>{
  const pre=document.getElementById(bug.codeId);
  const msg=document.getElementById(bug.msgId);
  const fixBox=document.getElementById(bug.fixId);
  let solved=false;
  bug.lines.forEach((code,i)=>{
    const s=document.createElement('span');
    s.className='cl';
    s.textContent=code;
    s.onclick=()=>{
      if(solved)return;
      if(i===bug.bugLine){
        s.classList.add('sel');
        msg.className='bug-msg show ok';
        msg.innerHTML='🎯 <b>정확해요! 바로 이 줄이 버그예요.</b> 그럼 어떻게 고쳐야 할까요? 아래에서 골라 보세요.';
        fixBox.classList.add('show');
      }else{
        msg.className='bug-msg show no';
        msg.innerHTML='🤔 이 줄은 정상이에요. 변수 이름이나 철자를 자세히 살펴보세요!';
        s.classList.add('shake');
        setTimeout(()=>s.classList.remove('shake'),400);
      }
    };
    pre.appendChild(s);
  });
  bug.fixes.forEach(f=>{
    const b=document.createElement('button');
    b.textContent=f.t;
    b.onclick=()=>{
      if(solved)return;
      if(f.ok){
        solved=true;
        b.classList.add('right');
        msg.className='bug-msg show ok';
        msg.innerHTML='✅ <b>완벽한 수정!</b> '+bug.why;
      }else{
        b.classList.add('wrong');
        msg.className='bug-msg show no';
        msg.innerHTML='❌ 아쉬워요, 다시 한번 생각해 보세요. (힌트: 순서와 철자!)';
      }
    };
    fixBox.appendChild(b);
  });
});

