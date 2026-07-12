const projTl=document.getElementById('projTimeline');
PROJ.forEach((p,i)=>{
  const c=PROJ_COLORS[i];
  const st=document.createElement('div');
  st.className='pstage'+(i===0?' open':'');
  st.innerHTML=`<button style="background:${c}"><span>${p.name}</span><span class="chev">▼</span></button>
    <div class="pbody" style="border-left-color:${c}">
      <b style="font-size:.88rem;color:${c}">수행 내용</b>
      <ul>${p.tasks.map(t=>`<li>${t}</li>`).join('')}</ul>
      <div class="ex" style="background:${c}18"><b style="color:${c}">수행 예시 🌡</b><br>${p.ex}</div>
    </div>`;
  st.querySelector('button').onclick=()=>st.classList.toggle('open');
  projTl.appendChild(st);
  if(i<PROJ.length-1){
    const cn=document.createElement('div');
    cn.className='pconn';cn.style.borderTopColor=c;
    projTl.appendChild(cn);
  }
});

