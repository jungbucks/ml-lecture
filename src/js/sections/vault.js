/* ================================================================
   페이지 접근 관문 (교사 공유용 비밀번호)
   ⚠️ 솔직한 설계 메모: 이 관문은 "가벼운 공유 잠금"이지 보안이 아니다.
      프론트엔드 검증은 F12로 우회되고(해시 비교문에 중단점), 페이지 콘텐츠는
      해제 전에도 이미 DOM/소스 안에 있어 꺼내 볼 수 있다. 저장한 해시도 원문이
      짧으면 오프라인 사전공격에 수 초면 역산된다. 진짜 비밀 자료를 넣지 말 것.
      교사끼리 링크 공유 시 아무나 못 열게 하는 '문지기' 용도로만 쓴다.
================================================================ */
(function () {
  // 비밀번호 원문은 소스에 두지 않는다 — SHA-256 해시만 저장해 비교(원문은 교사가 구두/메모로 전달).
  const PW_HASH = '881bcf2656d83234af5eceec43ab7ff2d04dff4637ec962bbf4ae4913b147723';
  const SESSION_KEY = 'mll_gate_ok';   // 세션 내 재입력 방지(새로고침해도 이 탭에선 유지)

  async function sha256Hex(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function unlock(save) {
    if (save) { try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {} }
    document.body.classList.remove('gated');
    const gate = document.getElementById('pageGate');
    if (gate) {
      gate.classList.add('hidden');
      // 스크린리더/포커스: 본문 첫 요소로 이동
      const nav = document.querySelector('nav a');
      if (nav) nav.focus();
    }
  }

  window.gateTry = async function () {
    const input = document.getElementById('gatePw');
    const msg = document.getElementById('gateMsg');
    const pw = (input.value || '').trim();
    if (!pw) { msg.className = 'vault-msg err'; msg.textContent = '비밀번호를 입력해 주세요.'; return; }
    let hex;
    try {
      hex = await sha256Hex(pw);
    } catch (e) {
      msg.className = 'vault-msg err';
      msg.textContent = '이 브라우저에서는 검증을 지원하지 않아요. 최신 브라우저로 열어 주세요.';
      return;
    }
    if (hex === PW_HASH) {
      msg.className = 'vault-msg ok';
      msg.textContent = '✅ 환영합니다! 자료를 여는 중…';
      setTimeout(() => unlock(true), 300);
    } else {
      msg.className = 'vault-msg err';
      msg.textContent = '❌ 비밀번호가 올바르지 않습니다. 다시 확인해 보세요!';
      input.select();
    }
  };

  // 로드 시: 이미 이 세션에서 통과했으면 관문 건너뛰기, 아니면 입력창 포커스
  document.addEventListener('DOMContentLoaded', function () {
    let ok = false;
    try { ok = sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) {}
    if (ok) { unlock(false); return; }
    const input = document.getElementById('gatePw');
    if (input) input.focus();
  });

  /* ── F12 '과속방지턱' (벽 아님) ──
     솔직히: devtools를 완벽히 막는 프론트 코드는 없다. debugger 무한루프는 정상
     사용자·접근성 도구를 망가뜨리므로 쓰지 않는다. 여기서는 흔한 훔쳐보기 단축키·
     우클릭에 위트 있는 안내만 띄우는 가벼운 억제만 한다(학습 페이지라 소스 열람을
     적대시하지 않는다 — 이 페이지 곳곳이 오히려 코드 읽기를 가르친다). */
  function gateToast(text) {
    let el = document.getElementById('gateToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'gateToast';
      el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);' +
        'background:#2c2620;color:#fff;padding:10px 18px;border-radius:10px;font-size:.9rem;' +
        'font-weight:700;z-index:10000;box-shadow:0 4px 16px rgba(0,0,0,.3);opacity:0;transition:opacity .2s;';
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.opacity = '1';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = '0'; }, 2200);
  }
  document.addEventListener('keydown', function (e) {
    const blocked =
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes((e.key || '').toUpperCase())) ||
      (e.ctrlKey && (e.key || '').toUpperCase() === 'U');
    if (blocked) {
      e.preventDefault();
      gateToast('🥷 소스를 뜯어보려는군요? 이 잠금은 원래 F12로 뚫려요 — 정직 모드!');
    }
  });
})();
