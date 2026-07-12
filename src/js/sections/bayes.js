/* ================================================================
   11. 나이브 베이즈 스팸 필터 계산기
================================================================ */
function updateBayes(){
  const pS=parseFloat(document.getElementById('bPrior').value);
  const pWS=parseFloat(document.getElementById('bLike').value);
  const pWN=parseFloat(document.getElementById('bLikeN').value);
  document.getElementById('bPriorV').textContent=pS.toFixed(2);
  document.getElementById('bLikeV').textContent=pWS.toFixed(2);
  document.getElementById('bLikeNV').textContent=pWN.toFixed(2);
  const ev=pWS*pS+pWN*(1-pS);
  const post=ev>0?pWS*pS/ev:0;
  document.getElementById('bayesCalc').innerHTML=
    `<b>사후 확률(Posterior)</b> P(스팸|무료) = P(무료|스팸)·P(스팸) / P(무료)<br>
     = (${pWS.toFixed(2)} × ${pS.toFixed(2)}) / ${ev.toFixed(3)} = <b style="font-size:1.15rem;color:var(--unsup-deep)">${(post*100).toFixed(1)}%</b>`;
  const bar=document.getElementById('bayesBar');
  bar.style.width=(post*100).toFixed(1)+'%';
  bar.textContent=(post*100).toFixed(1)+'%';
}
['bPrior','bLike','bLikeN'].forEach(id=>document.getElementById(id).oninput=updateBayes);
updateBayes();

