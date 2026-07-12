function makeFlip(item){
  const d=document.createElement('div');
  d.className='flip '+item.cls;
  d.innerHTML=`<div class="in">
    <div class="face front">${SVGS[item.svg]||''}<div class="name">${item.name}</div><div class="one">${item.one}</div><span class="tap">클릭해서 뒤집기 ↻</span></div>
    <div class="face back"><div class="name">${item.name}</div><div class="def">${item.def}</div><span class="tap">↻ 다시 뒤집기</span></div>
  </div>`;
  d.onclick=()=>d.classList.toggle('on');
  return d;
}
Object.entries(ALGO_CARDS).forEach(([gid,items])=>{
  const g=document.getElementById(gid);
  items.forEach(it=>g.appendChild(makeFlip(it)));
});

