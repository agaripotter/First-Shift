/* ===== First Shift engine ===== */
(function(){
const APP=document.getElementById('app');
const KEY='firstshift.cmc.v3';
let S=load();
const BLK={};      // key -> block
const TMP={};      // transient selections
let VIEW={v:'home'};

function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.ans)return s;}catch(e){}return{name:'',pos:{},ans:{},done:{}};}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr,seed){const r=rng(seed);const a=arr.map((x,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  if(a.every((x,i)=>x===i)&&a.length>1){[a[0],a[1]]=[a[1],a[0]];}return a;}
const M=()=>window.MODULES.find(m=>m.id===VIEW.m);
const drName=()=>S.name?('Dr. '+S.name):'Doctor';
function fill(h){return String(h).replace(/\{DR\}/g,esc(drName())).replace(/\{([^{}|]*)\|([^{}|]*)\}/g,(m,a,b)=>S.g==='f'?b:a);}

/* ---------- ECG generation ---------- */
function ecgPath(type,W,H,opt){
  opt=opt||{};const mid=H*0.58;const pts=[];const r=rng(hash(type+(opt.seed||'')));
  const beat=(x0,bw,amp,st,wide)=>{ // returns list of [x,y]
    const p=[];const f=(t)=>{ // t in 0..1 across beat
      let y=0;
      if(!wide){
        if(t>.10&&t<.20)y-=Math.sin((t-.10)/.10*Math.PI)*amp*.12; // P
        if(t>.26&&t<.28)y+=(t-.26)/.02*amp*.10; // Q
        if(t>=.28&&t<.31)y-=amp*(1-(Math.abs(t-.295)/.015))*1.0; // R
        if(t>=.31&&t<.34)y+=amp*.22*(1-Math.abs(t-.325)/.015); // S
        if(t>=.34&&t<.46)y-=st*amp; // ST
        if(t>=.46&&t<.62)y-=(Math.sin((t-.46)/.16*Math.PI)*amp*.24)+st*amp*(1-(t-.46)/.16);
      }else{
        if(t<.55)y-=Math.sin(t/.55*Math.PI)*amp*.95;
        else y+=Math.sin((t-.55)/.45*Math.PI)*amp*.55;
      }
      return y;};
    for(let i=0;i<=40;i++){const t=i/40;p.push([x0+t*bw,mid+f(t)]);}
    return p;};
  const amp=H*0.5;
  if(type==='asystole'){for(let x=0;x<=W;x+=4)pts.push([x,mid+Math.sin(x/37)*1.5+(r()-.5)*1.2]);}
  else if(type==='vf'){let a=amp*.5;for(let x=0;x<=W;x+=3){a+= (r()-.5)*2;a=Math.max(amp*.15,Math.min(amp*.6,a));pts.push([x,mid+Math.sin(x/7+Math.sin(x/23)*2)*a*.8+(r()-.5)*4]);}}
  else if(type==='vt'){const bw=W/(opt.beats||9);for(let x0=0;x0<W;x0+=bw)pts.push(...beat(x0,bw,amp*.9,0,true));}
  else if(type==='af'){let x0=0;while(x0<W){const bw=W/12*(0.6+r()*0.9);const b=beat(x0,bw,amp*.85,0,false).map(([x,y],i)=>{const t=i/40;let yy=y;if(t>.08&&t<.24)yy=mid; return [x,yy+Math.sin(x*1.3)*1.6+(r()-.5)*1.5];});pts.push(...b);x0+=bw;}}
  else { // sinus, stemi, brady, tachy
    const n=opt.beats||(type==='brady'?3:type==='tachy'?10:5);const bw=W/n;const st=type==='stemi'?.32:0;
    for(let i=0;i<n;i++)pts.push(...beat(i*bw,bw,amp*.85,st,false));
  }
  return 'M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L');
}
const STRIPS={sinus:'Sinus rhythm',vf:'Ventricular fibrillation',vt:'Ventricular tachycardia (wide, regular)',asystole:'Asystole',af:'Atrial fibrillation (irregularly irregular)',stemi:'ST elevation',brady:'Sinus bradycardia',tachy:'Sinus tachycardia',pea:'Organised rhythm on the monitor'};
function strip(type,label){
  const t=type==='pea'?'sinus':type;const d=ecgPath(t,600,90,{beats:type==='pea'?6:undefined});
  return `<div class="strip"><svg viewBox="0 0 600 90" preserveAspectRatio="none"><path d="${d}" fill="none" stroke="#2b1a14" stroke-width="1.6" stroke-linejoin="round"/></svg><div class="sl">${esc(label||'Rhythm strip — what is it?')}</div></div>`;
}
function monTrace(hr,rhythm){
  let type=rhythm||'sinus';if(hr===0||hr==='--')type=rhythm||'asystole';
  const beats=Math.max(1,Math.round((Number(hr)||60)*4/60));
  const d=ecgPath(type==='sinus'||type==='stemi'?type:type,400,46,{beats:beats,seed:'m'});
  return `<svg viewBox="0 0 800 46" preserveAspectRatio="none"><path d="${d}" fill="none" stroke="#3BE37A" stroke-width="1.6"/><path d="${d}" transform="translate(400 0)" fill="none" stroke="#3BE37A" stroke-width="1.6"/></svg>`;
}
function monitor(v,prev){
  v=v||{};prev=prev||{};
  const cell=(k,cls,lab,val)=>val===undefined?'':`<div class="v ${cls}${prev[k]!==undefined&&prev[k]!==val?' chg':''}"><small>${lab}</small><b>${esc(val)}</b></div>`;
  return `<div class="mon"><div class="trace">${monTrace(v.hr,v.r)}</div><div class="vit">${cell('hr','hr','HR',v.hr)}${cell('bp','bp','BP',v.bp)}${cell('sp','sp','SpO₂',v.sp)}${cell('rr','rr','RR',v.rr)}${cell('t','t','TEMP',v.t)}${cell('g','g','GLUC',v.g)}${cell('gcs','gcs','GCS',v.gcs)}</div></div>`;
}

/* ---------- block renderers ---------- */
function rb(b,k){
  BLK[k]=b;let h='';
  switch(b.t){
    case 'h':h=`<h3 class="h">${fill(b.x)}</h3>`;break;
    case 'h4':h=`<h4 class="h">${fill(b.x)}</h4>`;break;
    case 'p':h=`<div class="p"><p>${fill(b.x)}</p></div>`;break;
    case 'list':{const tag=b.o?'ol':'ul';h=(b.title?`<p style="margin-bottom:6px"><b>${b.title}</b></p>`:'')+`<${tag} class="l">${b.i.map(x=>`<li>${fill(x)}</li>`).join('')}</${tag}>`;break;}
    case 'mentor':{const who=b.who||'Dr. Hanan Al-Harbi · Consultant, Emergency Medicine';const av=b.av||'HH';h=`<div class="mentor"><div class="av ${b.c||''}">${av}</div><div class="bub"><div class="who">${who}</div>${fill(b.x)}</div></div>`;break;}
    case 'say':h=`<div class="say"><div class="who">${b.who}</div><div class="ar" lang="ar">${fill(b.ar)}</div>${b.en?`<div class="en">“${fill(b.en)}”</div>`:''}</div>`;break;
    case 'call':{const T={rule:'Rule',pearl:'Pearl',danger:'Never',saudi:'Saudi context',local:'CMC policy',idea:'The intuition'};h=`<div class="call ${b.k}"><div class="ct">${b.title||T[b.k]}</div>${fill(b.x)}</div>`;break;}
    case 'table':h=`<div class="tbl"><table><thead><tr>${b.head.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;break;
    case 'nums':h=`<div class="nums">${b.i.map(x=>`<div class="num"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`;break;
    case 'cards':h=`<div class="cards">${b.i.map((c,j)=>`<button class="flip" data-act="flip"><div class="in"><div class="f">${c[0]}<small>Tap to flip</small></div><div class="bk">${c[1]}</div></div></button>`).join('')}</div>`;break;
    case 'reveal':h=`<button class="reveal" data-act="reveal"><div class="rq">${b.q}</div><div class="ra">${fill(b.a)}</div></button>`;break;
    case 'strip':h=strip(b.r,b.label);break;
    case 'check':h=`${b.title?`<p style="margin-bottom:8px"><b>${b.title}</b></p>`:''}<div class="check">${b.i.map(x=>`<label><input type="checkbox"><span>${x}</span></label>`).join('')}</div>`;break;
    case 'mcq':h=rMcq(b,k);break;
    case 'multi':h=rMulti(b,k);break;
    case 'order':h=rOrder(b,k);break;
    case 'sort':h=rSort(b,k);break;
    case 'case':h=rCase(b,k);break;
    case 'tool':h=TOOLS[b.name]?splitTool(TOOLS[b.name].r(k,b)):'';break;
    default:h='';
  }
  return `<div class="blk" id="b-${k}">${h}</div>`;
}
function splitTool(h){if(h.indexOf('<!--SPLIT-->')<0)return h;const a=h.indexOf('<div class="ts">');const tsEnd=h.indexOf('</div>',a)+6;const last=h.lastIndexOf('</div>');
  return h.slice(0,tsEnd)+'<div class="tgrid"><div class="tc">'+h.slice(tsEnd,last).replace('<!--SPLIT-->','</div><div class="to">')+'</div></div>'+h.slice(last);}
function sayH(s){return `<div class="say"><div class="who">${s.who}</div><div class="ar" lang="ar">${fill(s.ar)}</div>${s.en?`<div class="en">“${fill(s.en)}”</div>`:''}</div>`;}
function fbBox(ok,e,label){return `<div class="fb ${ok?'ok':'no'}"><b class="v">${label||(ok?'Correct':'Not quite')}</b>${fill(e||'')}</div>`;}
const OT=o=>Array.isArray(o)?o[0]:o, OW=o=>Array.isArray(o)?o[1]:'';
function hintBtn(b,k){return b.h?`<button class="hintb" data-act="hint" data-k="${k}">Need a hint?</button><div class="hintx" id="h-${k}">💡 ${fill(b.h)}</div>`:'';}
function rMcq(b,k){
  const a=S.ans[k];const tr=(S.tr&&S.tr[k])||[];const order=b.noshuffle?b.o.map((x,i)=>i):shuffle(b.o,hash(k+'o'));
  let h=`<div class="q"><div class="q-tag">${b.tag||'Check'}</div><div class="q-q">${fill(b.q)}</div><div class="opts">`;
  order.forEach((i,p)=>{const o=b.o[i];let c='opt';let dis=!!a;
    if(a){if(i===b.a)c+=' right';else if(i===a.v||tr.includes(i))c+=' wrong';else c+=' dim';}
    else if(tr.includes(i)){c+=' wrong';dis=true;}
    h+=`<button class="${c}" data-act="mcq" data-k="${k}" data-i="${i}" ${dis?'disabled':''}><span class="ol">${String.fromCharCode(65+p)}</span><span>${OT(o)}</span></button>`;});
  h+='</div>';
  if(a){let why='';const wrongs=(a.tries||[]).concat(a.ok?[]:[a.v]).filter((x,j,arr)=>x!==b.a&&arr.indexOf(x)===j);
    wrongs.forEach(x=>{if(OW(b.o[x]))why+=`<div class="why1"><b>Why not “${OT(b.o[x]).replace(/<[^>]+>/g,'').slice(0,60)}${OT(b.o[x]).length>60?'…':''}”?</b> ${OW(b.o[x])}</div>`;});
    const lab=a.pts===1?'Correct — first try':a.pts>0?'Got there on the second try':'Not this time';
    h+=fbBox(a.pts>0,why+(why?'<div style="margin-top:8px">':'')+fill(b.e||'')+(why?'</div>':''),lab);}
  else if(tr.length){h+=`<div class="fb no"><b class="v">Not quite — one more try for half credit</b>${b.h?'💡 '+fill(b.h):'Re-read the question: what matters most here?'}</div>`;}
  else h+=hintBtn(b,k);
  return h+'</div>';
}
function rMulti(b,k){
  const a=S.ans[k];const sel=a?new Set(a.v):(TMP[k]||new Set());const A=new Set(b.a);const order=shuffle(b.o,hash(k+'m'));
  let h=`<div class="q"><div class="q-tag">${b.tag||'Select all that apply'}</div><div class="q-q">${fill(b.q)}</div><div class="opts">`;
  order.forEach(i=>{const o=b.o[i];let c='opt';if(a){if(A.has(i)&&sel.has(i))c+=' right';else if(!A.has(i)&&sel.has(i))c+=' wrong';else if(A.has(i))c+=' miss';else c+=' dim';}else if(sel.has(i))c+=' sel';
    const w=a&&OW(o)&&((A.has(i)&&!sel.has(i))||(!A.has(i)&&sel.has(i)))?`<div class="owhy">${OW(o)}</div>`:'';
    h+=`<button class="${c}" data-act="multi" data-k="${k}" data-i="${i}" ${a?'disabled':''}><span class="ol">${a?(A.has(i)?'✓':'·'):(sel.has(i)?'✓':'')}</span><span>${OT(o)}${w}</span></button>`;});
  h+='</div>';
  if(a)h+=fbBox(a.ok,b.e,a.ok?'All correct':'Partly right — '+Math.round(a.pts*100)+'% credit. Dashed = ones you missed');
  else h+=`<div class="qact"><button class="btn dark" data-act="multichk" data-k="${k}" ${sel.size?'':'disabled'}>Check</button></div>`+hintBtn(b,k);
  return h+'</div>';
}
function rOrder(b,k){
  const a=S.ans[k];const n=b.i.length;
  let h=`<div class="q"><div class="q-tag">${b.tag||'Put in order'}</div><div class="q-q">${fill(b.q)}</div>`;
  if(a){h+=`<div class="ord-seq">${a.v.map((ix,p)=>`<div class="ord-it ${ix===p?'ok':'bad'}"><span class="on">${p+1}</span><span>${b.i[ix]}</span></div>`).join('')}</div>`;
    h+=fbBox(a.ok,(a.ok?'':'<b>Correct order:</b><ol style="margin:6px 0 8px;padding-left:20px">'+b.i.map(x=>`<li>${x}</li>`).join('')+'</ol>')+(b.e||''));}
  else{const seq=TMP[k]||[];const order=shuffle(b.i,hash(k));
    h+=`<div class="ord-seq">${seq.map((ix,p)=>`<button class="ord-it" data-act="ordrm" data-k="${k}" data-p="${p}"><span class="on">${p+1}</span><span>${b.i[ix]}</span></button>`).join('')}</div>`;
    h+=`<div class="ord-pool">${order.filter(ix=>!seq.includes(ix)).map(ix=>`<button class="ord-it" data-act="ordadd" data-k="${k}" data-i="${ix}"><span class="on" style="background:var(--line);color:var(--ink)">+</span><span>${b.i[ix]}</span></button>`).join('')}</div>`;
    h+=`<div class="qact"><button class="btn dark" data-act="ordchk" data-k="${k}" ${seq.length===n?'':'disabled'}>Check order</button>${seq.length?`<button class="btn ghost" data-act="ordreset" data-k="${k}">Reset</button>`:''}</div>`;}
  return h+'</div>';
}
function binLabel(bin){return (bin.c?`<span class="dot" style="background:${bin.c}"></span>`:'')+bin.l;}
function rSort(b,k){
  const a=S.ans[k];const sel=a?a.v:(TMP[k]||{});
  let h=`<div class="q"><div class="q-tag">${b.tag||'Sort'}</div><div class="q-q">${fill(b.q)}</div>`;
  const order=b.noshuffle?b.i.map((x,i)=>i):shuffle(b.i,hash(k));
  order.forEach(ix=>{const it=b.i[ix];let cls='srt-row';if(a)cls+=sel[ix]===it.b?' ok':' bad';
    h+=`<div class="${cls}"><div class="sx">${it.x}</div><div class="sb">${b.bins.map((bin,bi)=>`<button class="chip ${sel[ix]===bi?'sel':''}" data-act="sort" data-k="${k}" data-i="${ix}" data-b="${bi}" ${a?'disabled':''}>${binLabel(bin)}</button>`).join('')}</div>`;
    if(a)h+=`<div class="why">${sel[ix]===it.b?'✓ ':'✗ Answer: <b>'+b.bins[it.b].l+'</b>. '}${it.w||''}</div>`;h+='</div>';});
  if(a)h+=fbBox(a.pts===a.max,`You placed <b>${a.pts} of ${a.max}</b> correctly. ${b.e||''}`,a.pts===a.max?'Perfect sort':'Review the ones in red');
  else h+=`<div class="qact"><button class="btn dark" data-act="sortchk" data-k="${k}" ${Object.keys(sel).length===b.i.length?'':'disabled'}>Check (${Object.keys(sel).length}/${b.i.length})</button></div>`;
  return h+'</div>';
}
function rCase(b,k){
  const a=S.ans[k]||{path:[],cur:b.start||'start',pts:0,max:0};
  let vit=Object.assign({},b.mon||{});let prev={};
  let body='';
  a.path.forEach(st=>{const n=b.n[st.n];if(n.mon){prev=Object.assign({},vit);Object.assign(vit,n.mon);}const c=n.ch[st.c];
    body+=`<div class="node past"><div class="nx">${fill(n.x)}</div>${n.say?sayH(n.say):''}${n.strip?strip(n.strip,n.stripl):''}<div class="picked"><span>${c.x}</span><span class="score-chip s${c.s}">${c.s===2?'BEST':c.s===1?'OK':'RISKY'}</span></div>${fbBox(c.s===2,c.f,c.s===2?'Good call':c.s===1?'Acceptable — but':'Careful')}</div>`;});
  const n=b.n[a.cur];
  if(n.mon){prev=Object.assign({},vit);Object.assign(vit,n.mon);}
  const ended=!n.ch||!n.ch.length;
  body+=`<div class="node"><div class="nx">${fill(n.x)}</div>${n.say?sayH(n.say):''}${n.strip?strip(n.strip,n.stripl):''}`;
  if(!ended)body+=`<div class="chs">${shuffle(n.ch,hash(k+a.cur+a.path.length)).map(i=>`<button class="ch" data-act="case" data-k="${k}" data-i="${i}">${n.ch[i].x}</button>`).join('')}</div>`;
  else{const pct=a.max?Math.round(a.pts/a.max*100):100;body+=`<div class="outcome"><div class="os">${pct}%<small>decision score · ${a.pts}/${a.max}</small></div>${b.debrief?`<div style="margin-top:8px;font-size:14.5px">${fill(b.debrief)}</div>`:''}<div class="qact"><button class="btn ghost" data-act="caseredo" data-k="${k}">Replay case</button></div></div>`;}
  body+='</div>';
  return `<div class="case ${b.nomon?'nomon':''}"><div class="case-h"><b>${b.title}</b><span>${b.pt||'Case'}</span></div><div class="case-in">${b.nomon?'':'<div class="case-m">'+monitor(vit,prev)+'<div class="case-pt">'+(b.pt||'')+'</div></div>'}<div class="case-b">${body}</div></div></div>`;
}
function answered(k){const b=BLK[k];if(!b)return true;
  if(['mcq','multi','order','sort'].includes(b.t))return !!S.ans[k];
  if(b.t==='case'){const a=S.ans[k];if(!a)return false;const n=b.n[a.cur];return !n.ch||!n.ch.length;}
  return true;}

/* ---------- tools ---------- */
const TOOLS={};
TOOLS.gcs={st:{e:4,v:5,m:6},r(k){const s=TMP[k]||(TMP[k]=Object.assign({},this.st));
  const E=[[4,'Spontaneous'],[3,'To voice'],[2,'To pain'],[1,'None']],V=[[5,'Oriented'],[4,'Confused'],[3,'Inappropriate words'],[2,'Sounds only'],[1,'None']],Mo=[[6,'Obeys commands'],[5,'Localises pain'],[4,'Withdraws'],[3,'Abnormal flexion'],[2,'Extension'],[1,'None']];
  const g=(lab,key,arr)=>`<div class="lbl">${lab}</div><div class="seg">${arr.map(([v,t])=>`<button class="${s[key]===v?'on':''}" data-act="gcs" data-k="${k}" data-f="${key}" data-v="${v}"><b>${v}</b>${t}</button>`).join('')}</div>`;
  const tot=s.e+s.v+s.m;const msg=tot<=8?'Severe (≤8): cannot protect the airway reliably — call your senior and anaesthesia now.':tot<=12?'Moderate (9–12): needs CT head, close neuro obs and senior review.':'Mild (13–15): still look for red flags, intoxication and anticoagulants.';
  return `<div class="tool"><div class="tt">GCS calculator</div><div class="ts">Tap the best response in each category. Report it as E–V–M, not just the total.</div>${g('Eyes','e',E)}${g('Verbal','v',V)}${g('Motor','m',Mo)}<!--SPLIT--><div class="out"><div class="big">GCS ${tot}<small>E${s.e} V${s.v} M${s.m}</small></div><p>${msg}</p></div></div>`;}};
TOOLS.abg={r(k){const s=TMP[k]||(TMP[k]={ph:7.25,co2:28,hco3:12,na:138,cl:100});
  const f=(lab,key,step)=>`<label>${lab}<input type="number" inputmode="decimal" step="${step}" value="${s[key]}" data-act="abgin" data-k="${k}" data-f="${key}"></label>`;
  const P=[['DKA',{ph:7.12,co2:20,hco3:8,na:134,cl:98}],['COPD retainer',{ph:7.28,co2:68,hco3:31,na:140,cl:98}],['Vomiting',{ph:7.52,co2:47,hco3:36,na:136,cl:88}],['Panic attack',{ph:7.53,co2:26,hco3:22,na:140,cl:104}],['Diarrhoea',{ph:7.29,co2:31,hco3:15,na:139,cl:115}]];
  return `<div class="tool"><div class="tt">ABG interpreter</div><div class="ts">Change the values or load a classic ED case. pH, PaCO₂ in mmHg, HCO₃⁻/Na/Cl in mmol/L.</div><div class="presets">${P.map((p,i)=>`<button data-act="abgp" data-k="${k}" data-i="${i}">${p[0]}</button>`).join('')}</div><div class="fld">${f('pH','ph','0.01')}${f('PaCO₂','co2','1')}${f('HCO₃⁻','hco3','1')}${f('Na⁺','na','1')}${f('Cl⁻','cl','1')}</div><!--SPLIT--><div class="out" id="abgout-${k}">${this.calc(s)}</div></div>`;},
  P:[{ph:7.12,co2:20,hco3:8,na:134,cl:98},{ph:7.28,co2:68,hco3:31,na:140,cl:98},{ph:7.52,co2:47,hco3:36,na:136,cl:88},{ph:7.53,co2:26,hco3:22,na:140,cl:104},{ph:7.29,co2:31,hco3:15,na:139,cl:115}],
  calc(s){const ph=+s.ph,co2=+s.co2,h=+s.hco3,na=+s.na,cl=+s.cl;let prim='',comp='',ag='';
    if(!ph||!co2||!h)return '<p>Enter pH, PaCO₂ and HCO₃⁻.</p>';
    const gap=na&&cl?Math.round(na-(cl+h)):null;
    if(ph<7.35){if(h<22){prim='Metabolic acidosis';const exp=1.5*h+8;comp=`Winter’s: expected PaCO₂ ${(exp-2).toFixed(0)}–${(exp+2).toFixed(0)}. Measured ${co2}: `+(co2>exp+2?'<b>higher → added respiratory acidosis</b> (tiring patient?)':co2<exp-2?'<b>lower → added respiratory alkalosis</b>':'appropriately compensated.');}
      else if(co2>45){prim='Respiratory acidosis';comp=h>26?'HCO₃⁻ raised → chronic / partly compensated (think COPD).':'HCO₃⁻ near normal → acute (sedation, exhaustion, opioids).';}else prim='Acidaemia — check the numbers';}
    else if(ph>7.45){if(h>26){prim='Metabolic alkalosis';comp='Expected PaCO₂ ≈ 0.7×HCO₃⁻+20 = '+(0.7*h+20).toFixed(0)+'. Think vomiting, NG losses, diuretics. Check K⁺ and Cl⁻.';}
      else if(co2<35){prim='Respiratory alkalosis';comp='Pain, anxiety, sepsis, PE, early aspirin toxicity, pregnancy. Never label “anxiety” before excluding the dangerous causes.';}else prim='Alkalaemia — check the numbers';}
    else{prim='pH normal';comp=(co2>45||co2<35||h<22||h>26)?'But PaCO₂/HCO₃⁻ abnormal → mixed disorder or full compensation.':'Normal acid–base status.';}
    if(gap!==null)ag=`<p>Anion gap = Na − (Cl + HCO₃) = <b>${gap}</b> ${gap>12?'→ <b>raised</b>. Think MUDPILES / CAT MUD: ketones (DKA), lactate (sepsis, shock), toxins (methanol, ethylene glycol, salicylates), uraemia.':'→ normal. If acidotic: GI bicarbonate loss (diarrhoea), renal tubular acidosis, large volumes of saline.'} Correct for low albumin: add ~2.5 per 10 g/L drop.</p>`;
    return `<div class="big" style="font-size:24px">${prim}</div><p>${comp}</p>${ag}`;}};
TOOLS.peds={r(k){const s=TMP[k]||(TMP[k]={y:3,m:0});const age=s.y+s.m/12;let w;
  if(age<1)w=0.5*Math.max(s.m,0)+4;else if(age<=5)w=2*Math.floor(age)+8;else w=3*Math.floor(Math.min(age,12))+7;w=Math.round(w*10)/10;
  const vit=age<1?['110–160','30–40','70–90']:age<2?['100–150','25–35','80–95']:age<5?['95–140','25–30','80–100']:age<12?['80–120','20–25','90–110']:['60–100','15–20','100–120'];
  const adrIM=age<6?'150 micrograms (0.15 mL of 1 mg/mL)':age<12?'300 micrograms (0.3 mL)':'500 micrograms (0.5 mL)';
  const r1=x=>Math.round(x*10)/10;
  return `<div class="tool"><div class="tt">Paeds weight & dose helper</div><div class="ts">APLS weight estimate. Use a <b>measured</b> weight whenever you can, and double-check every dose with the nurse or pharmacist.</div>
  <div class="fld"><label>Age (years)<input type="number" min="0" max="12" value="${s.y}" data-act="pedin" data-k="${k}" data-f="y"></label><label>+ months<input type="number" min="0" max="11" value="${s.m}" data-act="pedin" data-k="${k}" data-f="m"></label></div>
  <!--SPLIT--><div class="out"><div class="big">${w} kg<small>estimated</small></div><table>
  <tr><td>Normal heart rate</td><td>${vit[0]}</td></tr><tr><td>Normal resp. rate</td><td>${vit[1]}</td></tr><tr><td>Normal systolic BP</td><td>${vit[2]}</td></tr>
  <tr><td>Fluid bolus 10 mL/kg (reassess after each)</td><td>${Math.round(w*10)} mL</td></tr>
  <tr><td>Glucose 10% for hypoglycaemia 2 mL/kg</td><td>${Math.round(w*2)} mL</td></tr>
  <tr><td>Cardiac arrest adrenaline 10 mcg/kg IV/IO</td><td>${Math.round(w*10)} mcg</td></tr>
  <tr><td>Defibrillation 4 J/kg</td><td>${Math.round(w*4)} J</td></tr>
  <tr><td>Anaphylaxis IM adrenaline (by age)</td><td style="white-space:normal">${adrIM}</td></tr>
  <tr><td>Seizure: IV lorazepam 0.1 mg/kg (max 4 mg)</td><td>${r1(Math.min(w*0.1,4))} mg</td></tr>
  <tr><td>Seizure: buccal midazolam 0.3 mg/kg (max 10 mg)</td><td>${r1(Math.min(w*0.3,10))} mg</td></tr>
  <tr><td>Paracetamol 15 mg/kg</td><td>${Math.round(w*15)} mg</td></tr>
  <tr><td>Ibuprofen 10 mg/kg (NOT if dengue suspected)</td><td>${Math.round(w*10)} mg</td></tr></table></div></div>`;}};
TOOLS.burns={parts:[['Head & neck',9],['Chest & abdomen',18],['Back',18],['Right arm',9],['Left arm',9],['Right leg',18],['Left leg',18],['Perineum',1]],
  r(k){const s=TMP[k]||(TMP[k]={w:70,on:{},f:2});let tb=0;this.parts.forEach((p,i)=>{if(s.on[i])tb+=p[1];});
  const tot=s.f*s.w*tb;const half=tot/2;
  return `<div class="tool"><div class="tt">Burns fluid calculator</div><div class="ts">Adult rule of 9s. Count only partial- and full-thickness burns — not simple redness. Tap the areas burned.</div>
  <div class="seg">${this.parts.map((p,i)=>`<button class="${s.on[i]?'on':''}" data-act="burnp" data-k="${k}" data-i="${i}"><b>${p[1]}%</b>${p[0]}</button>`).join('')}</div>
  <div class="fld"><label>Weight (kg)<input type="number" value="${s.w}" data-act="burnw" data-k="${k}"></label><label>Formula<select data-act="burnf" data-k="${k}"><option value="2" ${s.f==2?'selected':''}>2 mL/kg/% (ATLS 10th, adults)</option><option value="3" ${s.f==3?'selected':''}>3 mL/kg/% (children)</option><option value="4" ${s.f==4?'selected':''}>4 mL/kg/% (classic Parkland)</option></select></label></div>
  <!--SPLIT--><div class="out"><div class="big">${tb}%<small>TBSA</small></div><table><tr><td>Crystalloid in first 24 h</td><td>${Math.round(tot)} mL</td></tr><tr><td>First half — over 8 h <b>from time of burn</b></td><td>${Math.round(half)} mL</td></tr><tr><td>Starting rate for first 8 h</td><td>${Math.round(half/8)} mL/h</td></tr></table><p>The formula only gives a <b>starting</b> rate. Titrate to urine output: 0.5 mL/kg/h in adults (≈${Math.round(s.w*0.5)} mL/h here), 1 mL/kg/h in children under 30 kg.${tb>=20?' ≥20% TBSA → formal fluid resuscitation and burns-centre discussion.':''}</p></div></div>`;}};

/* ---------- explorables: learn by moving things ---------- */
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
function rng_(k,f,lab,min,max,step,val,unit){return `<label class="rg"><span>${lab}<b id="v-${k}-${f}">${val}${unit||''}</b></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-act="rng" data-k="${k}" data-f="${f}" data-u="${unit||''}"></label>`;}
function setV(k,f,v){const el=document.getElementById('v-'+k+'-'+f);if(el)el.textContent=v;}

/* 1. ED map */
TOOLS.edmap={Z:[
 ['Ambulance bay',8,8,104,44,'#CBD5E1','Red Crescent and private ambulances arrive here. Critical patients are taken straight to Resus — they never sit in the waiting room.'],
 ['Triage',118,8,86,44,'#F6C99A','Every walk-in patient starts here. A nurse takes vitals and a short history and gives a <b>CTAS level (1–5)</b>. You may be called here to look at a worrying patient.'],
 ['Waiting area',210,8,142,44,'#EFE7DA','Where CTAS 3–5 patients wait. It is still part of your department: people get worse here. Walk through it whenever you pass.'],
 ['Resus',8,58,104,96,'#9DB8F4','CTAS 1 and unstable CTAS 2. Monitors, defibrillators, airway equipment. A senior always leads. You help: compressions, lines, bloods, documenting.'],
 ['Acute / Majors',118,58,152,96,'#F4A8B2','Most of your shift. Patients who need a bed, monitoring and a work-up: chest pain, abdominal pain, sepsis, the elderly.'],
 ['Isolation',276,58,76,45,'#C9BBFB','Negative-pressure rooms for suspected MERS-CoV, TB, measles, chickenpox. Put on N95 and PPE <b>before</b> you go in.'],
 ['Police office',276,109,76,45,'#E5E7EB','Handles medico-legal cases: accidents, assaults, burns, poisonings, unknown patients. You inform your senior; they inform this office.'],
 ['Urgent care',8,160,160,62,'#A6DDBF','Walking patients, CTAS 4–5: sprains, cuts, sore throats. High volume, great for learning — but red flags still hide here.'],
 ['Paediatric ED',174,160,96,62,'#FCE38A','Children under 14. Different normal vital signs, weight-based doses, a parent in the room.'],
 ['Observation',276,160,76,62,'#E9DAFB','6–24 hours of monitoring: chest pain rule-outs, renal colic, mild asthma. Reassess before you hand over.']],
 r(k){const s=TMP[k]||(TMP[k]={z:-1});const Z=this.Z;
  const svg=`<svg viewBox="0 0 360 230" class="edsvg">${Z.map((z,i)=>`<g data-act="edz" data-k="${k}" data-i="${i}" style="cursor:pointer"><rect x="${z[1]}" y="${z[2]}" width="${z[3]}" height="${z[4]}" rx="8" fill="${z[5]}" stroke="${s.z===i?'#0E1A2B':'rgba(14,26,43,.18)'}" stroke-width="${s.z===i?3:1}"/><text x="${z[1]+z[3]/2}" y="${z[2]+z[4]/2+4}" text-anchor="middle" font-size="${z[3]<90?9.5:11}" font-weight="700" fill="#0E1A2B" font-family="Inter,system-ui">${z[0]}</text></g>`).join('')}</svg>`;
  const info=s.z<0?`<p class="mute">Tap any zone on the map.</p>`:`<div class="zi"><b>${Z[s.z][0]}</b><p>${Z[s.z][6]}</p></div>`;
  return `<div class="tool"><div class="tt">Explore the department</div><div class="ts">A typical layout. Tap each zone to see who goes there and what it means for you.</div>${svg}<!--SPLIT-->${info}</div>`;}};

/* 2. CTAS explorer */
TOOLS.ctas={C:[['Chest pain — sounds cardiac','central',2],['Abdominal pain','central',0],['Headache','central',0],['Shortness of breath','central',3],['Ankle injury','peripheral',0]],
 st:{c:1,hr:88,sbp:128,sp:98,pain:5,gcs:15,t:37.0},
 calc(s){const C=this.C[s.c];const m=[];
  if(C[2])m.push([C[2],'The complaint itself: '+C[0].toLowerCase()]);
  if(s.gcs<=9)m.push([1,'GCS '+s.gcs+' — unconscious']);else if(s.gcs<=13)m.push([2,'GCS '+s.gcs+' — reduced consciousness']);
  if(s.sp<90)m.push([1,'SpO₂ '+s.sp+'% — severe hypoxia']);else if(s.sp<=92)m.push([2,'SpO₂ '+s.sp+'% — moderate hypoxia']);else if(s.sp<=94)m.push([3,'SpO₂ '+s.sp+'% — mild hypoxia']);
  if(s.sbp<70||s.hr>150||s.hr<40)m.push([1,'HR '+s.hr+' / SBP '+s.sbp+' — shock']);else if(s.sbp<=90||s.hr>130)m.push([2,'HR '+s.hr+' / SBP '+s.sbp+' — haemodynamic concern']);else if(s.hr>=110)m.push([3,'HR '+s.hr+' — tachycardia']);
  if(s.t>=38&&(s.hr>100||s.sbp<100||s.gcs<15))m.push([2,'Fever with abnormal vitals — looks septic']);else if(s.t>=38)m.push([3,'Fever, otherwise well']);
  const pl=C[1]==='central'?(s.pain>=8?2:s.pain>=4?3:s.pain>=1?4:5):(s.pain>=8?3:s.pain>=4?4:5);
  m.push([pl,`Pain ${s.pain}/10 (${C[1]})`]);
  const lv=Math.min(...m.map(x=>x[0]));return{lv,m};},
 out(k){const s=TMP[k];const {lv,m}=this.calc(s);const T=['','Immediately','15 min','30 min','60 min','120 min'];const N=['','Resuscitation','Emergent','Urgent','Less urgent','Non-urgent'];
  return `<div class="ctasout"><span class="ctas c${lv}" style="font-size:22px;height:44px;min-width:44px">${lv}</span><div><b>${N[lv]}</b><br><span class="mute">${lv===1?'Seen immediately':'Doctor within '+T[lv]}</span></div></div><div class="mods2">${m.sort((a,b)=>a[0]-b[0]).map(x=>`<div class="${x[0]===lv?'drv':''}"><span class="ctas c${x[0]}">${x[0]}</span> ${x[1]}</div>`).join('')}</div><p class="mute" style="margin-top:8px">The level is set by the <b>most urgent</b> finding — highlighted. One bad vital sign is enough.</p>`;},
 r(k){const s=TMP[k]||(TMP[k]=Object.assign({},this.st));
  return `<div class="tool"><div class="tt">Build a triage level</div><div class="ts">Pick a complaint, then move the sliders and watch the CTAS level change. (A simplified teaching model of CTAS.)</div>
  <div class="seg">${this.C.map((c,i)=>`<button class="${s.c===i?'on':''}" data-act="ctc" data-k="${k}" data-i="${i}">${c[0]}</button>`).join('')}</div>
  <div class="rgs">${rng_(k,'hr','Heart rate ',30,180,1,s.hr)}${rng_(k,'sbp','Systolic BP ',50,200,1,s.sbp)}${rng_(k,'sp','SpO₂ ',80,100,1,s.sp,'%')}${rng_(k,'t','Temperature ',35,41.5,0.1,(+s.t).toFixed(1),' °C')}${rng_(k,'gcs','GCS ',3,15,1,s.gcs)}${rng_(k,'pain','Pain ',0,10,1,s.pain,'/10')}</div>
  <!--SPLIT--><div class="out light" id="o-${k}">${this.out(k)}</div></div>`;},
 u(k){document.getElementById('o-'+k).innerHTML=this.out(k);}};

/* 3. Haemorrhage slider */
TOOLS.bleed={calc(l){let hr,sbp,dbp;
  hr=l<15?80+l:l<30?95+(l-15)*1.7:l<40?120+(l-30)*2:140+(l-40)*1.5;
  sbp=l<30?120-Math.max(0,l-15)*0.3:l<40?115-(l-30)*3:85-(l-40)*2.5;
  dbp=l<15?80:l<30?80+(l-15)*0.6:l<40?89-(l-30)*2.4:65-(l-40)*2;
  const rr=Math.round(14+l*0.5),cls=l<15?'I':l<30?'II':l<40?'III':'IV';
  const ms=l<15?'Normal':l<30?'Anxious':l<40?'Confused':'Drowsy, barely responsive';
  const uo=l<15?'Normal':l<30?'Reduced':l<40?'Very low':'Almost none';
  const msg=l<10?'Small losses are almost invisible. Everything looks normal.':l<15?'Still normal on the monitor — only the story (or the blood on the floor) tells you.':l<30?'<b>Over a litre gone — and the systolic BP has barely moved.</b> The clues: a rising heart rate, a rising diastolic, and a narrowing pulse pressure.':l<40?'<b>Now</b> the BP falls. This patient has lost 30–40% of their blood. Falling BP is a late sign, not an early one.':'Decompensated. Without blood and surgery now, cardiac arrest follows.';
  return{hr:Math.round(hr),sbp:Math.round(sbp),dbp:Math.round(dbp),rr,cls,ms,uo,msg,si:(hr/sbp).toFixed(2)};},
 out(k){const l=TMP[k].l;const c=this.calc(l);const ml=Math.round(l/100*4900);
  return `${monitor({hr:c.hr,bp:c.sbp+'/'+c.dbp,rr:c.rr,sp:l>35?'—':'98%'})}<div class="bstats"><div><small>Class</small><b>${c.cls}</b></div><div><small>Lost</small><b>${ml.toLocaleString()} mL</b></div><div><small>Shock index</small><b class="${c.si>=1?'red':''}">${c.si}</b></div><div><small>Pulse pressure</small><b>${c.sbp-c.dbp}</b></div></div><table class="mini"><tr><td>Mental state</td><td>${c.ms}</td></tr><tr><td>Urine output</td><td>${c.uo}</td></tr></table><p class="msg">${c.msg}</p>`;},
 r(k){const s=TMP[k]||(TMP[k]={l:0});return `<div class="tool"><div class="tt">Watch a patient bleed</div><div class="ts">A fit 70 kg young adult has about 4.9 L of blood. Drag the slider to see what the monitor shows as they lose it.</div>${rng_(k,'l','Blood lost ',0,50,1,s.l,'%')}<!--SPLIT--><div id="o-${k}">${this.out(k)}</div></div>`;},
 u(k){document.getElementById('o-'+k).innerHTML=this.out(k);}};

/* 4. CPR coach */
TOOLS.cpr={r(k){TMP[k]=TMP[k]||{t:[],n:0};return `<div class="tool"><div class="tt">Find the rhythm</div><div class="ts">Tap the button as if compressing a chest. Aim for <b>100–120 per minute</b>. Every 30, give 2 breaths.</div><button class="cprb" data-act="cpr" data-k="${k}">PUSH</button><!--SPLIT--><div id="o-${k}">${this.out(k)}</div></div>`;},
 out(k){const s=TMP[k];const t=s.t;let rate=0;if(t.length>=3){const d=[];for(let i=1;i<t.length;i++)d.push(t[i]-t[i-1]);rate=Math.round(60000/(d.reduce((a,b)=>a+b,0)/d.length));}
  const pos=clamp((rate-60)/(160-60)*100,0,100);const st=!rate?'Start tapping…':rate<100?'Too slow — push faster':rate>120?'Too fast — the heart can’t refill':'Perfect — keep that rhythm';const cls=!rate?'':rate<100||rate>120?'bad':'good';
  const brk=s.n>0&&s.n%30===0;
  return `<div class="gauge"><div class="gz"></div><i style="left:${pos}%"></i></div><div class="kticks" style="margin-left:0;margin-right:0"><span style="left:0">60</span><span style="left:40%">100</span><span style="left:60%">120</span><span style="left:100%">160</span></div><div class="cprs ${cls}"><b>${rate||'—'}</b>/min · ${st}</div><div class="cprn">${brk?'<b>30 — give 2 breaths</b>, then continue':'Compressions: '+(s.n%30)+' / 30'}</div>`;}};

/* 5. ECG leads explorer */
TOOLS.leads={A:{LAD:{up:['V1','V2','V3','V4'],dn:['II','III','aVF'],w:'Anterior wall',t:'The left anterior descending artery feeds the front of the left ventricle — the biggest muscle. Anterior STEMIs are often large and can go into VF.'},
 RCA:{up:['II','III','aVF'],dn:['I','aVL'],w:'Inferior wall',t:'The right coronary artery usually feeds the bottom of the heart and the AV node — so expect <b>bradycardia</b> and heart block. Check a right-sided ECG: if the right ventricle is involved, nitrates can crash the BP.'},
 Circumflex:{up:['I','aVL','V5','V6'],dn:['III','aVF'],w:'Lateral wall',t:'The circumflex wraps around the left side. Lateral STEMIs can be subtle — the ST elevation may be small.'},
 Posterior:{up:[],dn:['V1','V2','V3'],w:'Posterior wall',t:'No standard lead faces the back of the heart, so a posterior STEMI shows as its <b>mirror image</b>: ST depression in V1–V3. Add leads V7–V9 on the back to see the elevation.'}},
 G:[['I','aVR','V1','V4'],['II','aVL','V2','V5'],['III','aVF','V3','V6']],
 beat(st,col){const y=24-st*7;return `<svg viewBox="0 0 60 40" width="100%" height="34"><path d="M0 24 L12 24 Q15 20 18 24 L21 24 L23 27 L26 6 L29 30 L31 ${y} L40 ${y} Q46 ${y-7-(st>0?0:0)} 52 24 L60 24" fill="none" stroke="${col}" stroke-width="2" stroke-linejoin="round"/></svg>`;},
 r(k){const s=TMP[k]||(TMP[k]={a:'LAD'});const A=this.A[s.a];
  const cell=l=>{const up=A.up.includes(l),dn=A.dn.includes(l);return `<div class="lc ${up?'up':dn?'dn':''}"><span>${l}</span>${this.beat(up?1:dn?-0.8:0,up?'#D6293E':dn?'#1E5BD8':'#8a8f99')}</div>`;};
  return `<div class="tool"><div class="tt">Which artery? Which leads?</div><div class="ts">Each ECG lead is a camera looking at one wall of the heart. Block an artery and see which cameras show ST elevation (red) — and which see the mirror image (blue, ST depression).</div>
  <div class="seg">${Object.keys(this.A).map(a=>`<button class="${s.a===a?'on':''}" data-act="lda" data-k="${k}" data-a="${a}">${a==='Posterior'?'Posterior (Cx/RCA)':a}</button>`).join('')}</div>
  <div class="lgrid">${this.G.map(r=>r.map(cell).join('')).join('')}</div><div class="zi"><b>${A.w}</b><p>${A.t}</p></div></div>`;}};

/* 6. Acid–base seesaw */
TOOLS.seesaw={P:[['Normal',40,24],['Holding breath',70,26],['Panic breathing',24,22],['DKA',35,8],['DKA + lungs compensate',20,8],['Repeated vomiting',48,36]],
 ph(s){return 6.1+Math.log10(s.h/(0.03*s.c));},
 out(k){const s=TMP[k];const ph=this.ph(s);const ang=clamp((7.4-ph)*90,-22,22);const st=ph<7.35?'Acidaemia':ph>7.45?'Alkalaemia':'Normal pH';const col=ph<7.35?'#D6293E':ph>7.45?'#1E5BD8':'#0E7A6D';
  let why='';if(ph<7.35)why=s.c>45?'Too much CO₂ — the lungs aren’t clearing acid (<b>respiratory</b> acidosis).':'Bicarbonate is used up — the problem is in the body’s chemistry (<b>metabolic</b> acidosis).';else if(ph>7.45)why=s.c<35?'Breathing off too much CO₂ (<b>respiratory</b> alkalosis).':'Too much bicarbonate, e.g. lost stomach acid (<b>metabolic</b> alkalosis).';else why=(s.c<35&&s.h<22)||(s.c>45&&s.h>26)?'Both values are abnormal but they balance each other — <b>compensation</b>.':'Lungs and kidneys are in balance.';
  const rc=9+s.c/4.5,rh=9+s.h/2.2,L=105;
  const ball=(x,r,col,lab)=>`<circle cx="${x}" cy="${-r-3}" r="${r}" fill="${col}"/><text x="${x}" y="${-r+1}" text-anchor="middle" font-size="${r>17?11:r>13?8:6.5}" font-weight="700" fill="#fff">${lab}</text>`;
  return `<svg viewBox="0 0 320 175" class="ssvg"><text x="70" y="14" text-anchor="middle" font-size="10.5" fill="#687386">acid · lungs</text><text x="250" y="14" text-anchor="middle" font-size="10.5" fill="#687386">base · kidneys</text>
  <polygon points="160,128 146,152 174,152" fill="#0E1A2B"/><rect x="40" y="152" width="240" height="3" rx="1.5" fill="#E1DACB"/>
  <g transform="translate(160 126) rotate(${(-ang*0.8).toFixed(1)})"><rect x="${-L-12}" y="-3" width="${2*L+24}" height="6" rx="3" fill="#0E1A2B"/>${ball(-L+rc-8,rc,'#D6293E','CO₂')}${ball(L-rh+8,rh,'#1E5BD8','HCO₃⁻')}</g></svg>
  <div class="phbig" style="color:${col}">pH ${ph.toFixed(2)} <small>${st}</small></div><p class="msg">${why}</p>`;},
 r(k){const s=TMP[k]||(TMP[k]={c:40,h:24});return `<div class="tool"><div class="tt">The acid–base seesaw</div><div class="ts">pH depends on the <b>balance</b> between CO₂ (acid, cleared by the lungs in minutes) and bicarbonate (base, held by the kidneys over days). Try the scenarios, then move the sliders.</div>
  <div class="presets">${this.P.map((p,i)=>`<button data-act="ssp" data-k="${k}" data-i="${i}">${p[0]}</button>`).join('')}</div>
  ${rng_(k,'c','PaCO₂ ',15,90,1,s.c,' mmHg')}${rng_(k,'h','HCO₃⁻ ',5,45,1,s.h,' mmol/L')}<!--SPLIT--><div id="o-${k}">${this.out(k)}</div></div>`;},
 u(k){document.getElementById('o-'+k).innerHTML=this.out(k);}};

/* 7. Dengue timeline */
TOOLS.dengue={T:[39.6,40.1,39.7,38.4,37.1,36.9,36.9,36.8,36.8,36.8],H:[40,41,42,44,48,50,47,44,42,41],P:[210,175,140,95,48,32,45,80,125,165],
 D:['Day 1 — febrile phase. Sudden high fever, headache, pain behind the eyes, aching muscles and bones. Feels awful, but stable.','Day 2 — still febrile. A flushed rash may appear. Encourage fluids, paracetamol only.','Day 3 — fever continues. Platelets starting to fall. Teach the warning signs before sending home.','Day 4 — <b>the fever breaks.</b> Patients and families think it’s over. This is when leakage starts.','Day 5 — <b>critical phase.</b> Plasma leaks out of the vessels: haematocrit rises, platelets crash, abdominal pain, vomiting, bleeding gums. Shock can come fast.','Day 6 — still critical. Watch a narrowing pulse pressure, urine output and haematocrit every few hours.','Day 7 — leakage stopping. Fluid starts returning to the vessels.','Day 8 — recovery. Appetite returns, a rash may appear. Too much IV fluid now causes overload.','Day 9 — recovering. Platelets climbing.','Day 10 — back to normal.'],
 chart(d){const W=320,H=150,x=i=>16+i*(W-32)/9;const yT=v=>H-14-(v-36)/(41-36)*(H-34);const yH=v=>H-14-(v-36)/(54-36)*(H-34);const yP=v=>H-14-v/230*(H-34);
  const pl=(arr,f)=>arr.map((v,i)=>x(i).toFixed(1)+','+f(v).toFixed(1)).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" class="dsvg"><rect x="${x(3.5)}" y="6" width="${x(5.5)-x(3.5)}" height="${H-20}" fill="#FBE6E8"/><text x="${(x(3.5)+x(5.5))/2}" y="16" text-anchor="middle" font-size="9" fill="#D6293E" font-weight="700">CRITICAL</text>
  <polyline points="${pl(this.T,yT)}" fill="none" stroke="#A86400" stroke-width="2.5"/><polyline points="${pl(this.H,yH)}" fill="none" stroke="#D6293E" stroke-width="2.5"/><polyline points="${pl(this.P,yP)}" fill="none" stroke="#1E5BD8" stroke-width="2.5"/>
  <line x1="${x(d-1)}" x2="${x(d-1)}" y1="6" y2="${H-14}" stroke="#0E1A2B" stroke-width="1.5" stroke-dasharray="3 3"/>${[1,2,3,4,5,6,7,8,9,10].map(i=>`<text x="${x(i-1)}" y="${H-2}" text-anchor="middle" font-size="8.5" fill="#687386">${i}</text>`).join('')}</svg>
  <div class="leg"><span style="--c:#A86400">Temperature ${this.T[d-1]} °C</span><span style="--c:#D6293E">Haematocrit ${this.H[d-1]}%</span><span style="--c:#1E5BD8">Platelets ${this.P[d-1]}</span></div>`;},
 out(k){const d=TMP[k].d;return this.chart(d)+`<p class="msg">${this.D[d-1]}</p>`;},
 r(k){const s=TMP[k]||(TMP[k]={d:1});return `<div class="tool"><div class="tt">Ten days of dengue</div><div class="ts">Drag through the illness. Watch what happens to the blood tests just as the fever goes away.</div>${rng_(k,'d','Day ',1,10,1,s.d)}<div id="o-${k}">${this.out(k)}</div></div>`;},
 u(k){document.getElementById('o-'+k).innerHTML=this.out(k);}};

/* 8. Stroke clock */
TOOLS.stroke={out(k){const m=TMP[k].m;const neu=1.9e6*m;const nf=neu>=1e9?(neu/1e9).toFixed(2)+' billion':(neu/1e6).toFixed(0)+' million';const yrs=(m/60*3.6).toFixed(1);
  const lyse=m<=270,thromb=m<=1440,early=m<=360;const h=Math.floor(m/60),mm=m%60;
  return `<div class="bstats"><div><small>Time since onset</small><b>${h}h ${String(mm).padStart(2,'0')}m</b></div><div><small>Neurons lost (untreated)</small><b>${nf}</b></div><div><small>≈ brain ageing</small><b>${yrs} yrs</b></div></div>
  <div class="win"><div class="${lyse?'on':''}"><b>Thrombolysis</b>${lyse?'Still possible (≤4.5 h)':'Window closed'}</div><div class="${thromb?'on':''}"><b>Thrombectomy</b>${!thromb?'Window closed':early?'Possible for large-vessel occlusion (≤6 h)':'Selected patients with advanced imaging (6–24 h)'}</div></div><p class="msg">${m<=60?'The best outcomes happen in the first hour. Every step — glucose, CT, decision — is done in parallel, not one after another.':m<=270?'Still treatable. Every 15 minutes saved means more patients walk out independent.':'Most of the brain at risk is now lost. This is why “last known well” is the first question you ask.'}</p>`;},
 r(k){const s=TMP[k]||(TMP[k]={m:60});return `<div class="tool"><div class="tt">Time is brain</div><div class="ts">An untreated large stroke destroys about 1.9 million neurons every minute. Drag the clock.</div>${rng_(k,'m','Minutes since onset ',0,1440,15,s.m)}<!--SPLIT--><div id="o-${k}">${this.out(k)}</div></div>`;},
 u(k){document.getElementById('o-'+k).innerHTML=this.out(k);setV(k,'m',TMP[k].m);}};

/* 9. Potassium & insulin */
TOOLS.potassium={r(k){const s=TMP[k]||(TMP[k]={k:3.0,log:'Insulin pushes potassium (and glucose) from the blood <b>into the cells</b>. Try it.'});
  const pos=clamp((s.k-2)/(7.5-2)*100,0,100);const z=s.k<3?['Danger: arrhythmias','bad']:s.k<3.5?['Low: replace before insulin','warn']:s.k<=5.5?['Safe range','good']:s.k<6.5?['High','warn']:['Danger: arrhythmias','bad'];
  return `<div class="tool"><div class="tt">Insulin moves potassium</div><div class="ts">The same effect that makes insulin dangerous in a DKA patient with low potassium makes it a <b>treatment</b> for high potassium. (Numbers simplified for teaching.)</div>
  <div class="presets"><button data-act="kp" data-k="${k}" data-v="3.0">DKA, K⁺ 3.0</button><button data-act="kp" data-k="${k}" data-v="4.6">DKA, K⁺ 4.6</button><button data-act="kp" data-k="${k}" data-v="6.8">Kidney failure, K⁺ 6.8</button></div>
  <div class="kbar"><div class="kz"></div><i style="left:${pos}%"><b>${s.k.toFixed(1)}</b></i></div><div class="kticks"><span style="left:0">2.0</span><span style="left:27.3%">3.5</span><span style="left:63.6%">5.5</span><span style="left:100%">7.5</span></div>
  <div class="kst ${z[1]}">${z[0]}</div>
  <div class="qact"><button class="btn dark" data-act="kins" data-k="${k}">Give insulin</button><button class="btn ghost" data-act="kadd" data-k="${k}">Give IV potassium</button></div><p class="msg">${s.log}</p></div>`;}};

/* 10. Capacity */
TOOLS.capacity={Q:[['Understand','Can he understand what you’ve told him about the diagnosis, the treatment and the risks?'],['Retain','Can he hold on to that information long enough to decide?'],['Weigh','Can he weigh up the options — even if he chooses differently from you?'],['Communicate','Can he tell you his decision, in any way?']],
 r(k){const s=TMP[k]||(TMP[k]={v:[1,1,1,1]});const ok=s.v.every(x=>x);
  return `<div class="tool"><div class="tt">Does he have capacity?</div><div class="ts">All four must be “yes” — for <b>this</b> decision, at <b>this</b> moment. Tap to switch.</div>
  ${this.Q.map((q,i)=>`<button class="capq ${s.v[i]?'y':'n'}" data-act="capt" data-k="${k}" data-i="${i}"><span>${s.v[i]?'YES':'NO'}</span><div><b>${q[0]}</b><br>${q[1]}</div></button>`).join('')}
  <!--SPLIT--><div class="out ${ok?'okb':'nob'}"><div class="big" style="font-size:22px">${ok?'Has capacity':'Lacks capacity for this decision'}</div><p>${ok?'He can refuse — even if the choice seems unwise. Your job: make sure he truly understands, keep the door open, document.':'Act in his best interests with your senior. Look for a reversible cause (pain, hypoxia, low glucose, drugs) — capacity can come back.'}</p></div></div>`;}};

/* 11. Shock plumbing */
TOOLS.shock={T:{Normal:{d:'A strong pump, full tank, pipes the right size.',f:['Warm','Normal','Normal','—']},
 Hypovolaemic:{d:'The tank is empty: bleeding, vomiting, diarrhoea, burns. The pump races to make up for it.',f:['Cold, pale','Flat','Fast','Stop the loss; fluids or blood']},
 Distributive:{d:'The pipes are too wide — sepsis or anaphylaxis. The same blood fills a much bigger space, so pressure drops.',f:['Often warm, flushed (early)','Flat','Fast','Sepsis: antibiotics + fluids. Anaphylaxis: IM adrenaline']},
 Cardiogenic:{d:'The pump is failing — a big MI, arrhythmia, heart failure. Blood backs up behind it.',f:['Cold, clammy','<b>Raised</b>','Fast or slow','Careful fluids; senior; treat the cause (cath lab)']},
 Obstructive:{d:'Something is blocking or squeezing the circuit — tension pneumothorax, tamponade, massive PE.',f:['Cold','<b>Raised</b>','Fast','Remove the block: decompress, drain, thrombolyse']}},
 r(k){const s=TMP[k]||(TMP[k]={t:'Hypovolaemic'});const t=s.t;const T=this.T[t];
  const pw=t==='Distributive'?16:8;const tank=t==='Hypovolaemic'?18:52;const pump=t==='Cardiogenic'?'#F4A8B2':'#D6293E';const beat=t==='Cardiogenic'?'3s':t==='Normal'?'1.1s':'.55s';
  const svg=`<svg viewBox="0 0 320 130" class="shsvg"><rect x="70" y="30" width="200" height="70" rx="34" fill="none" stroke="#F4A8B2" stroke-width="${pw}"/>
   <g style="transform-origin:70px 65px;animation:pump ${beat} ease-in-out infinite"><circle cx="70" cy="65" r="24" fill="${pump}"/><text x="70" y="69" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">PUMP</text></g>
   <rect x="232" y="44" width="36" height="58" rx="5" fill="#fff" stroke="#0E1A2B"/><rect x="234" y="${102-tank}" width="32" height="${tank-2}" rx="3" fill="#D6293E" opacity=".75"/><text x="250" y="40" text-anchor="middle" font-size="9" fill="#687386">VOLUME</text>
   <text x="170" y="22" text-anchor="middle" font-size="9" fill="#687386">PIPES</text>${t==='Obstructive'?'<rect x="160" y="88" width="16" height="26" rx="3" fill="#0E1A2B"/><text x="168" y="124" text-anchor="middle" font-size="9" fill="#0E1A2B" font-weight="700">BLOCK</text>':''}</svg>`;
  return `<div class="tool"><div class="tt">Shock is a plumbing problem</div><div class="ts">Blood pressure needs three things: a pump (heart), enough fluid (blood volume), and pipes of the right size (vessels). Shock = one of them fails.</div>
  <div class="seg">${Object.keys(this.T).map(x=>`<button class="${t===x?'on':''}" data-act="sht" data-k="${k}" data-t="${x}">${x}</button>`).join('')}</div>${svg}<!--SPLIT--><p class="msg">${T.d}</p>
  <table class="mini"><tr><td>Skin</td><td>${T.f[0]}</td></tr><tr><td>Neck veins</td><td>${T.f[1]}</td></tr><tr><td>Heart rate</td><td>${T.f[2]}</td></tr><tr><td>First move</td><td>${T.f[3]}</td></tr></table></div>`;}};

/* ---------- glossary ---------- */
const GLOSS={'CTAS':'Canadian Triage and Acuity Scale — 5 levels of urgency used at triage.','ECG':'Electrocardiogram — a recording of the heart’s electrical activity (12 leads).','STEMI':'ST-elevation myocardial infarction — a fully blocked coronary artery. Needs the cath lab now.','NSTEMI':'Heart attack without ST elevation — troponin raised, artery not fully blocked.','ACS':'Acute coronary syndrome — unstable angina, NSTEMI or STEMI.','ABG':'Arterial blood gas — pH, oxygen, CO₂ and bicarbonate from an artery.','GCS':'Glasgow Coma Scale — consciousness score from 3 (none) to 15 (fully alert).','DKA':'Diabetic ketoacidosis — high sugar + ketones + acidosis, from lack of insulin.','ROSC':'Return of spontaneous circulation — the heart beats with a pulse again after arrest.','PEA':'Pulseless electrical activity — the monitor shows a rhythm, but there is no pulse.','TXA':'Tranexamic acid — a drug that helps blood clots hold. Given early in major bleeding.','FAST':'Focused Assessment with Sonography in Trauma — bedside ultrasound looking for free blood.','eFAST':'Extended FAST — adds the chest, to look for pneumothorax.','MAP':'Mean arterial pressure — the average pressure pushing blood into organs. Target ≥65.','qSOFA':'Quick sepsis screen: RR ≥22, new confusion, systolic BP ≤100.','DAMA':'Discharge against medical advice — a patient leaving before the team advises.','MLC':'Medico-legal case — has a legal side (accident, assault, poisoning…). Police are informed.','SBAR':'Situation, Background, Assessment, Recommendation — a structure for calling for help.','I-PASS':'Handover structure: Illness severity, Patient, Action list, Situation awareness, Synthesis.','DNR':'Do not resuscitate — no CPR if the heart stops. Decided by three physicians in Saudi policy.','TBSA':'Total body surface area — the % of skin burned.','CPR':'Cardiopulmonary resuscitation — chest compressions and breaths.','RSI':'Rapid sequence intubation — drugs to sedate and paralyse for putting in a breathing tube.','IO':'Intraosseous — a needle into the bone marrow, used when veins can’t be found.','BVM':'Bag-valve-mask — hand-squeezed bag to breathe for a patient.','PPE':'Personal protective equipment — gloves, gown, mask, eye protection.','SAH':'Subarachnoid haemorrhage — bleeding around the brain, often from a burst aneurysm.','AAA':'Abdominal aortic aneurysm — a ballooned aorta that can rupture.','CSF':'Cerebrospinal fluid — the fluid around the brain and spinal cord, taken by lumbar puncture.','LP':'Lumbar puncture — a needle into the lower back to take CSF.','β-hCG':'Pregnancy hormone — a positive test means pregnancy.','SpO₂':'Oxygen saturation measured by a finger probe.','NIV':'Non-invasive ventilation (BiPAP/CPAP) — breathing support through a tight mask.','Seha':'The Saudi health platform used to issue sick leaves electronically.','SCFHS':'Saudi Commission for Health Specialties — licenses health practitioners.','MERS-CoV':'Middle East respiratory syndrome coronavirus — screened for at triage.'};
const GRX=new RegExp('(^|[^A-Za-z0-9-])('+Object.keys(GLOSS).sort((a,b)=>b.length-a.length).map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![A-Za-z0-9])');
function gloss(root){if(!root)return;const seen=new Set();const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||p.closest('button,svg,.ar,.gl,h3,h4,.tt,.case-h,.mon,.strip,label,select,.lgrid,.q-q,.who'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});
  const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
  nodes.forEach(n=>{let txt=n.nodeValue;const m=txt.match(GRX);if(!m)return;const term=m[2];if(seen.has(term))return;seen.add(term);const i=m.index+m[1].length;
    const span=document.createElement('span');span.className='gl';span.dataset.t=term;span.textContent=term;const after=n.splitText(i);after.nodeValue=after.nodeValue.slice(term.length);n.parentNode.insertBefore(span,after);});}
document.addEventListener('click',e=>{const g=e.target.closest('.gl');let pop=document.getElementById('glpop');
  if(g){if(!pop){pop=document.createElement('div');pop.id='glpop';document.body.appendChild(pop);}pop.innerHTML=`<b>${g.dataset.t}</b>${GLOSS[g.dataset.t]}`;pop.classList.add('on');e.stopPropagation();return;}
  if(pop)pop.classList.remove('on');},true);

/* ---------- views ---------- */
function modStats(m){let pts=0,max=0,need=0,got=0;
  m.s.forEach((scr,si)=>scr.forEach((b,bi)=>{const k=m.id+':'+si+':'+bi;if(['mcq','multi','order','sort','case'].includes(b.t)){need++;const a=S.ans[k];if(a&&(b.t!=='case'||!(b.n[a.cur].ch||[]).length)){got++;pts+=a.pts;max+=a.max;}}}));
  return {pts,max,need,got,pct:max?Math.round(pts/max*100):0};}
function allStats(){let pts=0,max=0,done=0;window.MODULES.forEach(m=>{const s=modStats(m);pts+=s.pts;max+=s.max;if(S.done[m.id])done++;});return{pts,max,done,pct:max?Math.round(pts/max*100):0,n:window.MODULES.length};}


function sideHTML(){const mods=window.MODULES;const st=allStats();let h='',lp='';const act=VIEW.v==='mod'?VIEW.m:null;
  mods.forEach(m=>{if(m.part!==lp){h+=`<div class="spart">${m.part.replace(/^Part [A-Z] · /,'').replace('Final · ','Final')}</div>`;lp=m.part;}
    const done=S.done[m.id];const prog=!done&&(S.pos[m.id]||0)>0;
    h+=`<button class="sitem ${act===m.id?'act':''} ${done?'done':''}" data-act="open" data-m="${m.id}"><span class="sn">${done?'✓':m.n}</span><span class="stt">${m.title}</span>${prog?'<i class="sdot"></i>':''}</button>`;});
  return `<aside class="side"><button class="brand" data-act="home"><i><svg viewBox="0 0 24 24"><path d="M2 13h4l2-5 3 10 3-13 2 8h6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></i>First Shift</button>
  <div class="sprog"><div class="bar"><i style="width:${st.done/st.n*100}%"></i></div><span>${st.done} of ${st.n} modules</span></div>
  <nav class="snav"><button class="sitem ${VIEW.v==='home'?'act':''}" data-act="home"><span class="sn">⌂</span><span class="stt">Overview</span></button>${h}</nav>
  <div class="sfoot"><button data-act="pocket" class="${VIEW.v==='pocket'?'act':''}">Pocket card</button><button data-act="cert" class="${VIEW.v==='cert'?'act':''}">Certificate</button></div></aside>`;}
function shell(){const main=document.createElement('div');main.className='mainc';while(APP.firstChild)main.appendChild(APP.firstChild);const t=document.createElement('div');t.innerHTML=sideHTML();APP.appendChild(t.firstChild);APP.appendChild(main);}
const FINE=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
function setDev(){const w=window.innerWidth;document.documentElement.dataset.dev=w>=1100?'desktop':w>=700?'tablet':'phone';}
setDev();window.addEventListener('resize',setDev);

function top(right){return `<div class="top"><div class="wrap"><button class="brand" data-act="home"><i><svg viewBox="0 0 24 24"><path d="M2 13h4l2-5 3 10 3-13 2 8h6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></i>First Shift</button><div class="sp"></div>${right||''}</div></div>`;}

function home(){
  const st=allStats();const mods=window.MODULES;let parts='';let lastPart='';
  const mins=mods.reduce((a,m)=>a+m.mins,0);
  mods.forEach(m=>{if(m.part!==lastPart){parts+=(lastPart?'</div>':'')+`<div class="part"><b>${m.part}</b><span>${m.partSub||''}</span></div><div class="mods">`;lastPart=m.part;}
    const s=modStats(m);const done=S.done[m.id];const prog=!done&&(S.pos[m.id]||0)>0;
    parts+=`<button class="mod ${done?'done':''} ${prog?'prog':''} ${m.final?'final':''}" data-act="open" data-m="${m.id}"><div class="num">${done?'✓':m.n}</div><div><h3>${m.title}</h3><div class="ms">${m.sub}</div></div><div class="st">${done?`<em>${s.pct}%</em>score`:prog?`<em>${Math.round((S.pos[m.id]||0)/m.s.length*100)}%</em>in progress`:`<em>${m.mins}</em>min`}</div></button>`;});
  parts+='</div>';
  const next=mods.find(m=>!S.done[m.id]);
  const ecg='M0 30 L120 30 L135 30 L142 22 L150 30 L170 30 L178 34 L188 4 L198 50 L206 30 L230 30 L246 20 L262 30 L380 30 L395 30 L402 22 L410 30 L430 30 L438 34 L448 4 L458 50 L466 30 L490 30 L506 20 L522 30 L640 30 L655 30 L662 22 L670 30 L690 30 L698 34 L708 4 L718 50 L726 30 L750 30 L766 20 L782 30 L900 30';
  APP.innerHTML=top(`<span class="pill">${st.done}/${st.n} modules</span>`)+`<div class="wrap">
  <div class="homehead"><section class="hero"><div class="kick">Corniche Medical City · Jeddah · Department of Emergency Medicine</div>
  <h1>First <span>Shift</span>.</h1><p class="lead">The induction program for interns starting their Emergency Medicine rotation. What the ER is really like, the rules that protect you and your patients, and the cases you will meet in your first weeks.</p>
  <svg class="ecg" viewBox="0 0 900 56" preserveAspectRatio="none"><path d="${ecg}"/></svg>
  <div class="meta"><span>${mods.length} modules</span><span>≈ ${Math.round(mins/60*10)/10} hours</span><span>55+ interactive checks</span><span>22 branching cases</span><span>Works offline</span></div></section>
  <div class="namecard"><label>Your name — for your certificate</label><div class="row"><span class="dr">Dr.</span><input id="nm" placeholder="e.g. Lama Al-Ghamdi" value="${esc(S.name)}" autocomplete="name"></div>
  <div class="gen"><span>In Arabic, patients will call you</span><button class="${S.g!=='f'?'on':''}" data-act="gen" data-g="m">دكتور</button><button class="${S.g==='f'?'on':''}" data-act="gen" data-g="f">دكتورة</button></div>
  <div class="overall"><div class="bar"><i style="width:${st.done/st.n*100}%"></i></div><span style="font:700 13px var(--fm)">${Math.round(st.done/st.n*100)}%</span></div>
  ${next?`<button class="btn wide" data-act="open" data-m="${next.id}">${Object.keys(S.pos).length?'Continue':'Start'}: ${next.n}. ${next.title} →</button>`:`<button class="btn wide" data-act="cert">View your certificate →</button>`}</div></div>
  ${parts}
  <div class="tiles"><button class="tile" data-act="pocket"><h4>Pocket card</h4><p>Key numbers, doses and phone-worthy checklists for the floor.</p></button><button class="tile" data-act="cert"><h4>Certificate</h4><p>${st.done===st.n?'Ready — print or save as PDF.':'Unlocks when all modules are complete.'}</p></button></div>
  <div class="foot"><b>For program directors.</b> This induction program reflects common Saudi practice and international guidelines (CTAS, ACLS/ATLS/APLS, Surviving Sepsis, WHO dengue). Hospital-specific items are marked “CMC policy” and must be aligned with your own policies and reviewed by your EM faculty before use. It does not replace BLS/ACLS certification, departmental orientation or supervision.<br><br>© 2026 First Shift. All rights reserved. Not to be copied or redistributed without permission.<br><br><button class="iconbtn" data-act="reset">Reset my progress</button></div></div>`;shell();
  const nm=document.getElementById('nm');nm.addEventListener('input',()=>{S.name=nm.value.trim();save();});
  window.scrollTo(0,0);
}
function openMod(id,pos){VIEW={v:'mod',m:id};const m=M();let p=pos!==undefined?pos:(S.pos[id]||0);if(p>m.s.length)p=0;if(S.done[id]&&pos===undefined)p=0;VIEW.i=p;renderMod();}
function renderMod(){
  const m=M();const i=VIEW.i;const endScr=i>=m.s.length;
  let steps='';for(let j=0;j<=m.s.length;j++)steps+=`<i class="${j<i?'on':j===i?'cur':''}"></i>`;
  let body='';
  if(!endScr){m.s[i].forEach((b,bi)=>{body+=rb(b,m.id+':'+i+':'+bi);});}
  else{const s=modStats(m);S.done[m.id]=true;save();const nx=window.MODULES[window.MODULES.indexOf(m)+1];const C=2*Math.PI*64;
    body=`<div class="end"><div class="ring"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="64" stroke="var(--line)" stroke-width="12" fill="none"/><circle cx="75" cy="75" r="64" stroke="${s.pct>=80?'var(--teal)':s.pct>=60?'var(--amber)':'var(--red)'}" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-s.pct/100)}"/></svg><b>${s.pct}%</b></div><h3>${m.final?'Shift over.':'Module complete'}</h3><p style="color:var(--mute);margin-top:6px">${Math.round(s.pts*10)/10} of ${s.max} points · ${m.title}</p></div>
    <div class="take"><h4>Take these to the floor</h4><ol>${m.take.map(x=>`<li>${fill(x)}</li>`).join('')}</ol></div>
    ${nx?`<button class="btn wide" data-act="open" data-m="${nx.id}" data-p="0">Next: ${nx.n}. ${nx.title} →</button>`:`<button class="btn wide" data-act="cert">See your certificate →</button>`}
    <div style="height:10px"></div><button class="btn ghost wide" data-act="home">Back to all modules</button>`;}
  APP.innerHTML=top(`<button class="iconbtn" data-act="home">All modules</button>`)+`<div class="wrap"><div class="mhead"><div class="k">${m.final?'Final simulation':'Module '+m.n} · ${m.mins} min</div><h2>${m.title}</h2><div class="steps">${steps}</div></div><div class="scr" id="scr">${body}</div></div>`+
   (endScr?'':`<div class="navbar"><div class="wrap"><button class="btn ghost" data-act="prev" ${i===0?'disabled':''}>←</button><div class="hint" id="hint"></div><button class="btn" id="nextb" data-act="next">${i===m.s.length-1?'Finish module':'Continue'} →</button></div></div>`);shell();
  gate();gloss(document.getElementById('scr'));window.scrollTo(0,0);
}
function gate(){const m=M();if(!m||VIEW.i>=m.s.length)return;const keys=m.s[VIEW.i].map((b,bi)=>m.id+':'+VIEW.i+':'+bi);const left=keys.filter(k=>!answered(k)).length;
  const nb=document.getElementById('nextb'),h=document.getElementById('hint');if(!nb)return;nb.disabled=left>0;h.textContent=left?`Answer the ${left>1?left+' activities':'activity'} on this screen to continue`+(FINE?' · A–D to answer':''):(FINE?'Press → or Enter to continue':'');}
function rerender(k){const el=document.getElementById('b-'+k);if(!el)return;const t=document.createElement('div');t.innerHTML=rb(BLK[k],k);const nn=t.firstChild;el.replaceWith(nn);gate();if(!['tool'].includes(BLK[k].t))gloss(nn);}

function pocket(){
  APP.innerHTML=top(`<button class="iconbtn" data-act="home">All modules</button>`)+`<div class="wrap"><div class="mhead"><div class="k">Quick reference</div><h2>Pocket card</h2><p style="color:var(--mute);margin:8px 0 0">Screenshot what you need. Always confirm doses against the CMC formulary and your senior.</p></div><div class="pkgrid">${window.POCKET.map(p=>`<div class="pk"><h3>${p[0]}</h3><dl>${p[1].map(r=>`<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join('')}</dl></div>`).join('')}</div><div style="height:60px"></div></div>`;shell();window.scrollTo(0,0);}
function cert(){
  const st=allStats();const ok=st.done===st.n;const d=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  const fin=window.MODULES.find(m=>m.final);const fs=fin?modStats(fin):{pct:0};
  APP.innerHTML=top(`<button class="iconbtn" data-act="home">All modules</button>`)+`<div class="wrap">${ok?`<div class="cert"><div class="ck">Corniche Medical City · Department of Emergency Medicine</div><h2>Certificate of Completion</h2><div style="font-size:15px;color:var(--ink2)">First Shift — ER Intern Induction Program</div><div class="to">This certifies that</div><div class="nm">${esc(drName())}</div><div class="det">has completed all ${st.n} modules of the induction program, including the simulated night shift, and is ready to begin supervised clinical work in the Emergency Department.</div><div class="sc"><div><b>${st.pct}%</b>Overall score</div><div><b>${fs.pct}%</b>Night shift</div><div><b class="d">${d}</b>Date</div></div><div class="sig"><div>Intern Program Director</div><div>Chair, Emergency Medicine</div></div></div><div class="noprint" style="display:grid;gap:10px;margin-bottom:60px">${S.name?'':'<p style="color:var(--red);font-size:14px">Add your name on the home screen first.</p>'}<button class="btn wide" onclick="window.print()">Print / save as PDF</button></div>`:
   `<div class="mhead"><h2>Certificate locked</h2><p style="color:var(--mute)">Complete all ${st.n} modules to unlock it. You have finished ${st.done}.</p></div><button class="btn" data-act="home">Back to modules</button>`}</div>`;shell();window.scrollTo(0,0);}

/* ---------- events ---------- */
APP.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const act=el.dataset.act,k=el.dataset.k;const b=k?BLK[k]:null;
  switch(act){
    case 'home':VIEW={v:'home'};home();break;
    case 'open':openMod(el.dataset.m,el.dataset.p!==undefined?+el.dataset.p:undefined);break;
    case 'next':{const m=M();VIEW.i++;S.pos[m.id]=Math.max(S.pos[m.id]||0,VIEW.i);save();renderMod();break;}
    case 'prev':VIEW.i=Math.max(0,VIEW.i-1);renderMod();break;
    case 'pocket':VIEW={v:'pocket'};pocket();break;
    case 'gen':S.g=el.dataset.g;save();home();break;
    case 'cert':VIEW={v:'cert'};cert();break;
    case 'reset':if(confirmReset()){S={name:S.name,pos:{},ans:{},done:{}};save();home();}break;
    case 'flip':el.classList.toggle('on');break;
    case 'reveal':el.classList.add('on');break;
    case 'mcq':{if(S.ans[k])break;const i=+el.dataset.i;S.tr=S.tr||{};const tr=S.tr[k]||[];const ok=i===b.a;
      if(ok){S.ans[k]={v:i,ok:true,pts:tr.length?0.5:1,max:1,tries:tr.slice()};}
      else if(!tr.length&&b.o.length>2){S.tr[k]=[i];}
      else{S.ans[k]={v:i,ok:false,pts:0,max:1,tries:tr.slice()};}
      save();rerender(k);break;}
    case 'hint':{const x=document.getElementById('h-'+k);if(x)x.classList.add('on');el.style.display='none';break;}
    case 'multi':{if(S.ans[k])break;const s=TMP[k]||(TMP[k]=new Set());const i=+el.dataset.i;s.has(i)?s.delete(i):s.add(i);rerender(k);break;}
    case 'multichk':{const s=TMP[k]||new Set();const A=new Set(b.a);let hit=0,fp=0;s.forEach(x=>A.has(x)?hit++:fp++);const ok=hit===A.size&&fp===0;const pts=Math.max(0,Math.round((hit-fp)/A.size*2)/2);S.ans[k]={v:[...s],ok,pts:ok?1:Math.min(pts,0.5),max:1};save();rerender(k);break;}
    case 'ordadd':{const s=TMP[k]||(TMP[k]=[]);s.push(+el.dataset.i);rerender(k);break;}
    case 'ordrm':{const s=TMP[k]||[];s.splice(+el.dataset.p,1);rerender(k);break;}
    case 'ordreset':TMP[k]=[];rerender(k);break;
    case 'ordchk':{const s=TMP[k];const ok=s.every((x,i)=>x===i);S.ans[k]={v:s.slice(),ok,pts:ok?1:0,max:1};save();rerender(k);break;}
    case 'sort':{if(S.ans[k])break;const s=TMP[k]||(TMP[k]={});s[+el.dataset.i]=+el.dataset.b;rerender(k);break;}
    case 'sortchk':{const s=TMP[k];let p=0;b.i.forEach((it,ix)=>{if(s[ix]===it.b)p++;});S.ans[k]={v:Object.assign({},s),pts:p,max:b.i.length,ok:p===b.i.length};save();rerender(k);break;}
    case 'case':{const a=S.ans[k]||(S.ans[k]={path:[],cur:b.start||'start',pts:0,max:0});const n=b.n[a.cur];const c=n.ch[+el.dataset.i];a.path.push({n:a.cur,c:+el.dataset.i});a.pts+=c.s;a.max+=2;a.cur=c.go;save();
      rerender(k);setTimeout(()=>{const nodes=document.querySelectorAll('#b-'+CSS.escape(k)+' .node');const last=nodes[nodes.length-1];if(last&&last.previousElementSibling)last.previousElementSibling.scrollIntoView({behavior:'smooth',block:'start'});},30);break;}
    case 'caseredo':delete S.ans[k];save();rerender(k);break;
    case 'gcs':TMP[k][el.dataset.f]=+el.dataset.v;rerender(k);break;
    case 'abgp':{TMP[k]=Object.assign({},TOOLS.abg.P[+el.dataset.i]);rerender(k);break;}
    case 'edz':TMP[k].z=+el.dataset.i;rerender(k);break;
    case 'ctc':TMP[k].c=+el.dataset.i;TOOLS.ctas.u(k);rerender(k);break;
    case 'lda':TMP[k].a=el.dataset.a;rerender(k);break;
    case 'ssp':{const p=TOOLS.seesaw.P[+el.dataset.i];TMP[k].c=p[1];TMP[k].h=p[2];rerender(k);break;}
    case 'sht':TMP[k].t=el.dataset.t;rerender(k);break;
    case 'capt':{const i=+el.dataset.i;TMP[k].v[i]=TMP[k].v[i]?0:1;rerender(k);break;}
    case 'kp':TMP[k].k=+el.dataset.v;TMP[k].log=TMP[k].k<3.5?'Low to start with. What happens if you give insulin now?':TMP[k].k>5.5?'Dangerously high. Insulin (with glucose) is one of the treatments — try it.':'A safe level. Insulin can start, with potassium added to the fluids.';rerender(k);break;
    case 'kins':{const s=TMP[k];const b4=s.k;s.k=Math.max(1.8,Math.round((s.k-1.0)*10)/10);s.log=b4<3.5?`K⁺ fell from ${b4.toFixed(1)} to <b>${s.k.toFixed(1)}</b> — into the zone where the heart can stop. That’s why DKA protocols replace potassium <b>before</b> insulin when it is low.`:b4>5.5?`K⁺ fell from ${b4.toFixed(1)} to <b>${s.k.toFixed(1)}</b>. In hyperkalaemia this is the treatment (insulin 10 units + glucose) — it buys time while the potassium is removed.`:`K⁺ fell from ${b4.toFixed(1)} to ${s.k.toFixed(1)}. Still safe — which is why we add potassium to the drip once insulin is running.`;rerender(k);break;}
    case 'kadd':{const s=TMP[k];s.k=Math.min(7.5,Math.round((s.k+0.4)*10)/10);s.log=`IV potassium given slowly. K⁺ now ${s.k.toFixed(1)}.`+(s.k>=3.5&&s.k<=5.5?' Safe to start insulin now.':'');rerender(k);break;}
    case 'cpr':{const s=TMP[k];const now=performance.now();if(s.t.length&&now-s.t[s.t.length-1]>2500)s.t=[];s.t.push(now);if(s.t.length>8)s.t.shift();s.n++;const o=document.getElementById('o-'+k);if(o)o.innerHTML=TOOLS.cpr.out(k);el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit');break;}
    case 'burnp':{const s=TMP[k];const i=+el.dataset.i;s.on[i]=!s.on[i];rerender(k);break;}
  }
});
function confirmReset(){try{return window.confirm('Reset all progress and answers?');}catch(e){return true;}}
APP.addEventListener('input',e=>{const el=e.target;const act=el.dataset&&el.dataset.act;if(!act)return;const k=el.dataset.k;
  if(act==='rng'){const v=+el.value;TMP[k][el.dataset.f]=v;setV(k,el.dataset.f,(el.dataset.f==='t'?v.toFixed(1):v)+el.dataset.u);const T=TOOLS[BLK[k].name];if(T&&T.u)T.u(k);return;}
  if(act==='abgin'){TMP[k][el.dataset.f]=el.value;const o=document.getElementById('abgout-'+k);if(o)o.innerHTML=TOOLS.abg.calc(TMP[k]);}
  if(act==='pedin'){let v=parseInt(el.value,10);if(isNaN(v))return;TMP[k][el.dataset.f]=Math.max(0,Math.min(el.dataset.f==='y'?12:11,v));rerenderKeepFocus(k,el);}
  if(act==='burnw'){const v=parseFloat(el.value);if(!v)return;TMP[k].w=v;rerenderKeepFocus(k,el);}
});
APP.addEventListener('change',e=>{const el=e.target;if(el.dataset&&el.dataset.act==='burnf'){TMP[el.dataset.k].f=+el.value;rerender(el.dataset.k);}});
function rerenderKeepFocus(k,el){const f=el.dataset.f||el.dataset.act;rerender(k);const n=document.querySelector(`#b-${CSS.escape(k)} input[data-act="${el.dataset.act}"]${el.dataset.f?`[data-f="${f}"]`:''}`);if(n){n.focus();const v=n.value;try{n.setSelectionRange(v.length,v.length);}catch(_){}}}


document.addEventListener('keydown',ev=>{if(VIEW.v!=='mod')return;const t=ev.target;if(t&&(t.tagName==='INPUT'||t.tagName==='SELECT'||t.tagName==='TEXTAREA'))return;if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
  const key=ev.key;
  if(key==='ArrowRight'||key==='Enter'){const nb=document.getElementById('nextb');if(nb&&!nb.disabled){ev.preventDefault();nb.click();}else if(!nb&&key==='Enter'){const b=document.querySelector('.end .btn');if(b)b.click();}return;}
  if(key==='ArrowLeft'){const pb=document.querySelector('.navbar [data-act=prev]');if(pb&&!pb.disabled){ev.preventDefault();pb.click();}return;}
  const idx='abcdefg'.indexOf(key.toLowerCase())>-1?'abcdefg'.indexOf(key.toLowerCase()):('1234567'.indexOf(key));if(idx<0)return;
  const qs=[...document.querySelectorAll('#scr .q, #scr .case')];
  for(const q of qs){const btns=[...q.querySelectorAll('button[data-act=mcq]:not([disabled]), button[data-act=multi]:not([disabled]), .chs button[data-act=case]')];if(!btns.length)continue;
    const all=[...q.querySelectorAll('button[data-act=mcq], button[data-act=multi], .chs button[data-act=case]')];const b=all[idx];if(b&&!b.disabled){ev.preventDefault();b.click();}break;}
});
home();
})();
