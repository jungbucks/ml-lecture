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
  if(!g){ console.warn('[cards] 그리드 없음(데이터↔마크업 불일치): '+gid); return; }  // 리뷰 반영: 한 그리드 누락이 전체 카드를 죽이지 않게
  items.forEach(it=>g.appendChild(makeFlip(it)));
});

