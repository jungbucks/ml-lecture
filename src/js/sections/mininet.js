/* ================================================================
   18. 순전파/역전파 오버레이 도식 (PDF 3쪽 스타일)
================================================================ */
function drawMiniNet(id,dir){
  const L=[{x:45,n:3},{x:150,n:4},{x:255,n:2}];
  const pos=L.map(l=>{const ys=[];const gap=130/(l.n+1);for(let i=1;i<=l.n;i++)ys.push(5+gap*i);return ys;});
  let h='';
  for(let a=0;a<2;a++)pos[a].forEach(y1=>pos[a+1].forEach(y2=>h+=`<line x1="${L[a].x}" y1="${y1}" x2="${L[a+1].x}" y2="${y2}" stroke="#ddd3c2" stroke-width="1"/>`));
  L.forEach((l,i)=>pos[i].forEach(y=>h+=`<circle cx="${l.x}" cy="${y}" r="11" fill="#fff" stroke="#c9bda6" stroke-width="2"/>`));
  const col=dir==='fwd'?'#9a9a9a':'#d3b892';
  const lab=dir==='fwd'?'순전파':'역전파';
  h+=dir==='fwd'
    ?`<path d="M30 70 L240 70 L240 58 L275 75 L240 92 L240 80 L30 80 Z" fill="${col}" opacity=".8"/>`
    :`<path d="M270 70 L60 70 L60 58 L25 75 L60 92 L60 80 L270 80 Z" fill="${col}" opacity=".8"/>`;
  h+=`<text x="150" y="80" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">${lab}</text>`;
  h+=`<text x="45" y="160" text-anchor="middle" font-size="11" fill="#8a7a63">입력층</text><text x="150" y="160" text-anchor="middle" font-size="11" fill="#8a7a63">은닉층</text><text x="255" y="160" text-anchor="middle" font-size="11" fill="#8a7a63">출력층</text>`;
  document.getElementById(id).innerHTML=h;
}
drawMiniNet('fwdNet','fwd');
drawMiniNet('bwdNet','bwd');

