/* ================================================================
   5. 스케일러 비교
================================================================ */
const SC_DATA=[10,20,30,40,50,200];
const SC_INFO={
  standard:{name:"StandardScaler",desc:"평균을 0, 표준편차를 1로 맞춥니다. 이상치(200)가 평균·표준편차를 끌어당겨서 나머지 값들이 한쪽에 몰리는 것을 볼 수 있어요.",
    fn:d=>{const m=d.reduce((a,b)=>a+b)/d.length;const sd=Math.sqrt(d.reduce((a,b)=>a+(b-m)**2,0)/d.length);return d.map(x=>(x-m)/sd);}},
  minmax:{name:"MinMaxScaler",desc:"최솟값을 0, 최댓값을 1로 맞춥니다. 이상치(200)가 1이 되면서 나머지 값들이 0 근처에 눌려 붙는 것을 볼 수 있어요.",
    fn:d=>{const mn=Math.min(...d),mx=Math.max(...d);return d.map(x=>(x-mn)/(mx-mn));}},
  robust:{name:"RobustScaler",desc:"중앙값(Median)과 IQR(상위25%−하위25%)을 사용합니다. 이상치의 영향을 덜 받아 10~50 값들이 비교적 고르게 퍼져 있는 것을 볼 수 있어요.",
    fn:d=>{const s=[...d].sort((a,b)=>a-b);const q=(p)=>{const i=(s.length-1)*p;const lo=Math.floor(i),hi=Math.ceil(i);return s[lo]+(s[hi]-s[lo])*(i-lo);};const med=q(.5),iqr=q(.75)-q(.25);return d.map(x=>(x-med)/iqr);}}
};
let curScaler='standard';
function pickScaler(btn){
  document.querySelectorAll('.sc-btns button').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  curScaler=btn.dataset.sc;
  drawScaler();
}
function drawScaler(){
  const cv=document.getElementById('scCanvas'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;
  ctx.clearRect(0,0,W,H);
  const info=SC_INFO[curScaler];
  const out=info.fn(SC_DATA);
  document.getElementById('scDesc').textContent='📌 '+info.name+': '+info.desc+' (변환값: '+out.map(v=>v.toFixed(2)).join(', ')+')';
  function drawGroup(x0,w,vals,title,color){
    const maxAbs=Math.max(...vals.map(Math.abs),0.001);
    const plotH=H-90,zero=vals.some(v=>v<0)?40+plotH*(maxAbs/(2*maxAbs)):40+plotH-10;
    const scale=vals.some(v=>v<0)?(plotH/2-14)/maxAbs:(plotH-20)/maxAbs;
    ctx.strokeStyle='#ddd';ctx.beginPath();ctx.moveTo(x0,zero);ctx.lineTo(x0+w,zero);ctx.stroke();
    const bw=w/vals.length*0.55,gap=w/vals.length;
    vals.forEach((v,i)=>{
      const bx=x0+gap*i+gap*0.22;
      const bh=v*scale;
      ctx.fillStyle=(SC_DATA[i]===200)?'#d64545':color;
      if(bh>=0)ctx.fillRect(bx,zero-bh,bw,Math.max(bh,1.5));
      else ctx.fillRect(bx,zero,bw,-bh);
      ctx.fillStyle='#6b5f50';ctx.font='11px sans-serif';ctx.textAlign='center';
      ctx.fillText((Math.abs(v)>=10?v.toFixed(0):v.toFixed(2)),bx+bw/2,(bh>=0?zero-bh-6:zero-bh+14));
    });
    ctx.fillStyle='#2c2620';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
    ctx.fillText(title,x0+w/2,H-14);
  }
  drawGroup(30,W/2-60,SC_DATA,'변환 전 (원본)','#c9bda6');
  drawGroup(W/2+30,W/2-60,out,'변환 후 ('+info.name+')','#2fa05a');
}
drawScaler();

