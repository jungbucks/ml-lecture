function renderWalkthrough(preId,key){
  const pre=document.getElementById(preId);
  const wt=WALKTHROUGHS[key];
  const note=document.getElementById(wt.noteId);
  wt.lines.forEach(([code,exp])=>{
    const s=document.createElement('span');
    s.className='cl'+(code===''?' blank':'');
    s.textContent=code===''?' ':code;
    if(code!==''){
      s.onclick=()=>{
        pre.querySelectorAll('.cl').forEach(x=>x.classList.remove('sel'));
        s.classList.add('sel');
        note.innerHTML='💬 '+exp;
      };
    }
    pre.appendChild(s);
  });
}
renderWalkthrough('code-linreg','linreg');
renderWalkthrough('code-clf','clf');
renderWalkthrough('code-kerasA','kerasA');
renderWalkthrough('code-kerasB','kerasB');
renderWalkthrough('code-scaler','scaler');
renderWalkthrough('code-compile','compile');

