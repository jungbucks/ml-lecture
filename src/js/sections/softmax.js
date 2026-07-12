/* ================================================================
   14. Softmax 체험 데모
================================================================ */
function updateSoftmax(){
  const z=[1,2,3].map(i=>parseFloat(document.getElementById('smz'+i).value));
  z.forEach((v,i)=>document.getElementById('smzV'+(i+1)).textContent=v.toFixed(1));
  const ex=z.map(v=>Math.exp(v));
  const s=ex.reduce((a,b)=>a+b);
  ex.forEach((e,i)=>{
    const p=e/s;
    const bar=document.getElementById('smxBar'+(i+1));
    bar.style.width=(p*100).toFixed(1)+'%';
    bar.textContent=(p*100).toFixed(1)+'%';
  });
}
[1,2,3].forEach(i=>document.getElementById('smz'+i).oninput=updateSoftmax);
updateSoftmax();

