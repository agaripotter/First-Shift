// Content sanity checks. Run: node tests/check_content.js
const fs = require('fs'), path = require('path');
global.window = global;
const src = f => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
eval(['c1','c2','c3','c4','c5','c6','c7','c8','qpatch'].map(f => src(f + '.js')).join('\n') + ';global.__M=MODULES;');
const M = __M, err = [];
let q = 0, cases = 0, mins = 0, shortest = 0, longest = 0, n = 0;
const T = o => Array.isArray(o) ? o[0] : o;
M.forEach(m => { mins += m.mins; m.s.forEach(sc => sc.forEach(b => {
  if (['mcq','multi','order','sort'].includes(b.t)) q++;
  if (b.t === 'mcq') {
    if (b.a >= b.o.length) err.push(m.id + ' mcq answer index');
    if (!b.h) err.push(m.id + ' mcq without hint: ' + b.q.slice(0, 40));
    const L = b.o.map(o => T(o).length); n++;
    if (L[b.a] === Math.min(...L)) shortest++; if (L[b.a] === Math.max(...L)) longest++;
  }
  if (b.t === 'multi' && b.a.some(x => x >= b.o.length)) err.push(m.id + ' multi index');
  if (b.t === 'sort') b.i.forEach(it => { if (it.b >= b.bins.length) err.push(m.id + ' sort bin'); });
  if (b.t === 'case') { cases++; Object.values(b.n).forEach(nd => {
    (nd.ch || []).forEach(c => { if (!b.n[c.go]) err.push(m.id + ' ' + b.title + ' bad go ' + c.go); if (![0,1,2].includes(c.s)) err.push('bad score'); });
    if (nd.ch && nd.ch.length > 1) { n++; const L = nd.ch.map(c => c.x.length), bi = nd.ch.findIndex(c => c.s === 2);
      if (L[bi] === Math.min(...L)) shortest++; if (L[bi] === Math.max(...L)) longest++; }
  }); }
})); });
console.log(`modules ${M.length} · checks ${q} · cases ${cases} · ${mins} min`);
console.log(`patch warnings: ${JSON.stringify(window.__PATCHWARN)}`);
console.log(`answer-length tells: correct is shortest ${shortest}/${n}, longest ${longest}/${n} (aim: neither far above ~1/3)`);
console.log(err.length ? 'ERRORS:\n' + err.join('\n') : 'No structural errors.');
process.exit(err.length || (window.__PATCHWARN || []).length ? 1 : 0);
