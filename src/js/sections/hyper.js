const gh=document.getElementById('grid-hyper');
HYPER.forEach(h=>{
  const d=document.createElement('div');
  d.className='flip c-ens';
  d.innerHTML=`<div class="in">
    <div class="face front"><div style="font-size:2rem">⚙️</div><div class="name" style="font-family:Consolas,monospace">${h.name}</div><div class="one">${h.one}</div><span class="tap">클릭해서 뒤집기 ↻</span></div>
    <div class="face back"><div class="name" style="font-family:Consolas,monospace">${h.name}</div><div class="def">${h.def}<br><br><b>예시:</b> <code style="background:#e8f7ee;padding:2px 6px;border-radius:5px">${h.ex}</code></div><span class="tap">↻</span></div>
  </div>`;
  d.onclick=()=>d.classList.toggle('on');
  gh.appendChild(d);
});

