// ml-lecture 빌더 — src/ 를 단일 HTML로 인라인해 dist/ml_dl_interactive.html 생성
// 의존성 0. 실행: node tools/build.mjs
// 겸사겸사 검문: ① 매니페스트의 파일 존재 ② 각 JS 문법 ③ src에 미등록 JS가 없는지
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, 'ml_dl_interactive.html');

let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
const errors = [];
const used = new Set(['index.html']);

// CSS 인라인
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) => {
  const p = path.join(SRC, href);
  if (!fs.existsSync(p)) { errors.push('CSS 없음: ' + href); return _; }
  used.add(href.replace(/\//g, path.sep));
  return '<style>\n' + fs.readFileSync(p, 'utf8').trim() + '\n</style>';
});

// JS 인라인 + 문법 검사
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, srcPath) => {
  const p = path.join(SRC, srcPath);
  if (!fs.existsSync(p)) { errors.push('JS 없음: ' + srcPath); return _; }
  used.add(srcPath.replace(/\//g, path.sep));
  const code = fs.readFileSync(p, 'utf8');
  try { new Function(code); } catch (e) { errors.push('문법 오류 [' + srcPath + ']: ' + e.message); }
  return '<script>\n' + code.trim() + '\n</script>';
});

// 미등록 파일 검문 (만들어 놓고 index.html에 안 올리는 사고 방지)
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else {
      const rel = path.relative(SRC, p);
      if (/\.(js|css)$/.test(f.name) && !used.has(rel)) errors.push('index.html에 미등록: ' + rel);
    }
  }
}
walk(SRC);

if (errors.length) {
  console.error('❌ 빌드 실패:\n - ' + errors.join('\n - '));
  process.exit(1);
}
if (/src="(?:data|js|css)\//.test(html) || /<link rel="stylesheet"/.test(html)) {
  console.error('❌ 인라인되지 않은 참조가 남아 있음');
  process.exit(1);
}

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(OUT, html);
console.log('✅ 빌드 완료 → dist/ml_dl_interactive.html (' + (html.length / 1024).toFixed(1) + 'KB)');
