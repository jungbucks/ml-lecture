/* ================================================================
   6. 활성화 함수 플레이그라운드
================================================================ */
const FNS=[
  {key:'linear', name:'선형(Linear)', color:'#1fa8a0', on:false, f:x=>x},
  {key:'step', name:'계단 함수', color:'#8a7a63', on:false, f:x=>x>=0?1:0},
  {key:'sigmoid', name:'Sigmoid', color:'#e8863a', on:true, f:x=>1/(1+Math.exp(-x))},
  {key:'tanh', name:'Tanh', color:'#3a7de8', on:true, f:x=>Math.tanh(x)},
  {key:'relu', name:'ReLU', color:'#2fa05a', on:true, f:x=>Math.max(0,x)},
  {key:'lrelu', name:'Leaky ReLU (α=0.1)', color:'#8a4fd3', on:false, f:x=>x>0?x:0.1*x},
  {key:'elu', name:'ELU (α=1)', color:'#d64545', on:false, f:x=>x>=0?x:(Math.exp(x)-1)}
];
const AX={xmin:-4,xmax:4,ymin:-2,ymax:4};
function tX(x,W){return (x-AX.xmin)/(AX.xmax-AX.xmin)*(W-50)+35;}
function tY(y,H){return H-30-(y-AX.ymin)/(AX.ymax-AX.ymin)*(H-50);}

const togBox=document.getElementById('fnToggles');
FNS.forEach(fn=>{
  const lab=document.createElement('label');
  lab.style.borderColor=fn.color;
  lab.innerHTML=`<input type="checkbox" ${fn.on?'checked':''}> <span style="color:${fn.color}">${fn.name}</span>`;
  lab.querySelector('input').onchange=e=>{fn.on=e.target.checked;drawAct();};
  togBox.appendChild(lab);
});

function drawAct(){
  const cv=document.getElementById('actCanvas'),ctx=cv.getContext('2d');
  const W=cv.width,H=cv.height;
  ctx.clearRect(0,0,W,H);
  // grid
  ctx.strokeStyle='#f0ebe0';ctx.lineWidth=1;
  for(let gx=Math.ceil(AX.xmin);gx<=AX.xmax;gx++){ctx.beginPath();ctx.moveTo(tX(gx,W),tY(AX.ymin,H));ctx.lineTo(tX(gx,W),tY(AX.ymax,H));ctx.stroke();}
  for(let gy=Math.ceil(AX.ymin);gy<=AX.ymax;gy++){ctx.beginPath();ctx.moveTo(tX(AX.xmin,W),tY(gy,H));ctx.lineTo(tX(AX.xmax,W),tY(gy,H));ctx.stroke();}
  // axes
  ctx.strokeStyle='#b7a88f';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(tX(AX.xmin,W),tY(0,H));ctx.lineTo(tX(AX.xmax,W),tY(0,H));ctx.stroke();
  ctx.beginPath();ctx.moveTo(tX(0,W),tY(AX.ymin,H));ctx.lineTo(tX(0,W),tY(AX.ymax,H));ctx.stroke();
  ctx.fillStyle='#8a7a63';ctx.font='11px sans-serif';ctx.textAlign='center';
  for(let gx=Math.ceil(AX.xmin);gx<=AX.xmax;gx++){if(gx!==0)ctx.fillText(gx,tX(gx,W),tY(0,H)+16);}
  for(let gy=Math.ceil(AX.ymin);gy<=AX.ymax;gy++){if(gy!==0)ctx.fillText(gy,tX(0,W)-14,tY(gy,H)+4);}
  // curves
  const xNow=parseFloat(document.getElementById('xSlider').value);
  FNS.forEach(fn=>{
    if(!fn.on)return;
    ctx.strokeStyle=fn.color;ctx.lineWidth=2.5;ctx.beginPath();
    let started=false;
    for(let px=0;px<=400;px++){
      const x=AX.xmin+(AX.xmax-AX.xmin)*px/400;
      let y=fn.f(x);
      if(y>AX.ymax+0.5||y<AX.ymin-0.5){started=false;continue;}
      const cx=tX(x,W),cy=tY(y,H);
      if(!started){ctx.moveTo(cx,cy);started=true;}else ctx.lineTo(cx,cy);
    }
    ctx.stroke();
    // dot at xNow
    const yv=fn.f(xNow);
    if(yv<=AX.ymax&&yv>=AX.ymin){
      ctx.fillStyle=fn.color;
      ctx.beginPath();ctx.arc(tX(xNow,W),tY(yv,H),6,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    }
  });
  // vertical marker
  ctx.strokeStyle='rgba(138,79,211,.35)';ctx.lineWidth=1.5;ctx.setLineDash([5,4]);
  ctx.beginPath();ctx.moveTo(tX(xNow,W),tY(AX.ymin,H));ctx.lineTo(tX(xNow,W),tY(AX.ymax,H));ctx.stroke();
  ctx.setLineDash([]);
  // value chips
  const vb=document.getElementById('fnValues');
  vb.innerHTML='';
  FNS.forEach(fn=>{
    if(!fn.on)return;
    const sp=document.createElement('span');
    sp.style.color=fn.color;sp.style.borderColor=fn.color;
    sp.textContent=`${fn.name}: f(${xNow.toFixed(2)}) = ${fn.f(xNow).toFixed(3)}`;
    vb.appendChild(sp);
  });
}
document.getElementById('xSlider').oninput=e=>{
  document.getElementById('xVal').textContent=parseFloat(e.target.value).toFixed(2);
  drawAct();
};
drawAct();

