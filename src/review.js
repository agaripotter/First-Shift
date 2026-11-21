/* ===== First Shift — REVIEW COPY layer =====
   Bottom toolbar: Edit text · Highlight · Comment · Notes · Export.
   Notes live in localStorage (per device/browser) and export as one JSON file.
   Each item records where it is (module, screen, block key, element path / text offsets)
   and the original wording, so edits can be applied back to src/ precisely. */
(function(){
if(!window.REVIEW)return;
const RK='firstshift.review.v1';
let R=load();
function load(){try{const r=JSON.parse(localStorage.getItem(RK));if(r&&Array.isArray(r.items))return r;}catch(e){}return{name:'',items:[],intro:false};}
function save(){try{localStorage.setItem(RK,JSON.stringify(R));}catch(e){}badge();}
let editOn=false,lastRange=null,lastRangeT=0,seq=Date.now();
const uid=()=>'n'+(seq++).toString(36);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MODS=()=>window.MODULES;
const view=()=>window.__fs.view();
const CONTENT='#scr, .mhead h2, .pkgrid';

/* ---------- where am I ---------- */
function screenLoc(){const v=view();return v.v==='mod'?{v:'mod',m:v.m,i:v.i}:{v:v.v};}
function rootOf(node){const el=node.nodeType===1?node:node.parentElement;if(!el)return null;
  const b=el.closest('.blk');if(b)return{el:b,k:b.id.slice(2)};
  const h=el.closest('.mhead h2');if(h)return{el:h,k:'title'};
  const p=el.closest('.pk');if(p){const all=[...document.querySelectorAll('.pk')];return{el:p,k:'pk'+all.indexOf(p)};}
  return null;}
function rootByKey(k){if(k==='title')return document.querySelector('.mhead h2');if(/^pk\d+$/.test(k))return document.querySelectorAll('.pk')[+k.slice(2)]||null;return document.getElementById('b-'+k);}
function sameScreen(loc){const c=screenLoc();return loc.v===c.v&&(c.v!=='mod'||(loc.m===c.m&&loc.i===c.i));}
function modOf(id){return MODS().find(m=>m.id===id);}
function locLabel(loc){if(loc.v==='pocket')return'Pocket card';if(loc.v!=='mod')return'Home';const m=modOf(loc.m);if(!m)return loc.m;
  return `${m.final?'Night Shift':'Module '+m.n} · ${m.title} · screen ${Math.min(loc.i+1,m.s.length)}/${m.s.length}`;}

/* ---------- text helpers ---------- */
function cleanClone(el){const c=el.cloneNode(true);c.querySelectorAll('mark.rv-hl,span.gl').forEach(x=>x.replaceWith(document.createTextNode(x.textContent)));c.querySelectorAll('.rv-ico').forEach(x=>x.remove());c.removeAttribute&&c.removeAttribute('contenteditable');return c;}
const cleanText=el=>cleanClone(el).textContent.replace(/\s+/g,' ').trim();
const cleanHTML=el=>cleanClone(el).innerHTML.replace(/ class="rv-edited"/g,'').trim();
function pathOf(root,el){const p=[];let n=el;while(n&&n!==root){const par=n.parentElement;if(!par)return null;const kids=[...par.children].filter(x=>!x.matches('mark.rv-hl,span.gl,.rv-ico'));p.unshift(kids.indexOf(n));n=par;}return n===root?p:null;}
function byPath(root,p){let n=root;for(const i of p){if(!n)return null;const kids=[...n.children].filter(x=>!x.matches('mark.rv-hl,span.gl,.rv-ico'));n=kids[i];}return n||null;}
function textNodes(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const a=[];while(w.nextNode())a.push(w.currentNode);return a;}
function offsets(root,range){const pre=document.createRange();pre.selectNodeContents(root);pre.setEnd(range.startContainer,range.startOffset);const s=pre.toString().length;return[s,s+range.toString().length];}
function wrap(root,start,end,id,hasNote){let pos=0;const made=[];
  textNodes(root).forEach(t=>{const len=t.data.length,a=pos,b=pos+len;pos=b;if(b<=start||a>=end||!len)return;if(t.parentElement.closest('svg,.rv-ui'))return;
    const s=Math.max(0,start-a),e=Math.min(len,end-a);let mid=t;if(s>0)mid=t.splitText(s);if(e-s<mid.data.length)mid.splitText(e-s);
    const m=document.createElement('mark');m.className='rv-hl'+(hasNote?' note':'');m.dataset.rv=id;mid.parentNode.insertBefore(m,mid);m.appendChild(mid);made.push(m);});
  if(hasNote&&made.length){const i=document.createElement('span');i.className='rv-ico';i.textContent='💬';i.dataset.rv=id;made[made.length-1].after(i);}
  return made.length;}

/* ---------- apply saved notes to whatever is on screen ---------- */
function apply(scope){
  const items=R.items.filter(it=>it.loc&&sameScreen(it.loc));
  items.filter(it=>it.type==='edit').forEach(it=>{const root=rootByKey(it.loc.k);if(!root||(scope&&!scope.contains(root)&&scope!==root&&!root.contains(scope)))return;
    const el=byPath(root,it.loc.path);if(!el)return;const cur=cleanText(el);
    if(cur===it.before){el.innerHTML=it.afterHTML;el.classList.add('rv-edited');}else if(cur===it.after)el.classList.add('rv-edited');});
  items.filter(it=>it.type==='highlight').forEach(it=>{const root=rootByKey(it.loc.k);if(!root||(scope&&!scope.contains(root)&&scope!==root&&!root.contains(scope)))return;
    if(root.querySelector(`mark[data-rv="${it.id}"]`))return;
    const txt=root.textContent;let s=it.loc.start,e=it.loc.end;
    if(txt.slice(s,e)!==it.quote){const f=txt.indexOf(it.quote);if(f<0)return;s=f;e=f+it.quote.length;}
    wrap(root,s,e,it.id,!!it.comment);});
}
window.__afterRender=function(scope){apply(scope&&scope.id==='app'?null:scope);};

/* ---------- UI shell ---------- */
document.body.classList.add('rv-on');
const dock=document.createElement('div');dock.className='rv-dock rv-ui';
dock.innerHTML=`<div class="rv-in"><span class="rv-tag">REVIEW COPY</span>
<button data-rv-act="edit" class="rv-b"><b>✎</b><span>Edit text</span></button>
<button data-rv-act="hl" class="rv-b"><b>▮</b><span>Highlight</span></button>
<button data-rv-act="cm" class="rv-b"><b>💬</b><span>Comment</span></button>
<button data-rv-act="list" class="rv-b"><b>☰</b><span>Notes <i class="rv-n">0</i></span></button>
<button data-rv-act="export" class="rv-b"><b>⇩</b><span>Export</span></button>
<button data-rv-act="help" class="rv-b rv-q" aria-label="How to review"><b>?</b></button></div>`;
document.body.appendChild(dock);
const fitDock=()=>document.body.style.setProperty('--rvh',dock.offsetHeight+'px');fitDock();addEventListener('resize',fitDock);setTimeout(fitDock,500);
const pop=document.createElement('div');pop.className='rv-pop rv-ui';pop.innerHTML='<button data-rv-act="hl">Highlight</button><button data-rv-act="cm">Comment</button>';document.body.appendChild(pop);
const toastEl=document.createElement('div');toastEl.className='rv-toast rv-ui';document.body.appendChild(toastEl);
let tt;function toast(m){toastEl.innerHTML=m;toastEl.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toastEl.classList.remove('on'),2600);}
function badge(){const n=dock.querySelector('.rv-n');if(n)n.textContent=R.items.length;}
badge();
function modal(html,onMount){closeModal();const w=document.createElement('div');w.className='rv-modal rv-ui';w.innerHTML=`<div class="rv-card">${html}</div>`;document.body.appendChild(w);
  w.addEventListener('click',e=>{if(e.target===w)closeModal();});if(onMount)onMount(w.querySelector('.rv-card'));return w;}
function closeModal(){document.querySelectorAll('.rv-modal').forEach(m=>m.remove());}

/* keep the selection even after the tap clears it (iPhone/iPad) */
document.addEventListener('selectionchange',()=>{if(editOn)return;const s=getSelection();
  if(s&&s.rangeCount&&!s.isCollapsed){const r=s.getRangeAt(0);const a=r.commonAncestorContainer;const el=a.nodeType===1?a:a.parentElement;
    if(el&&el.closest(CONTENT)&&!el.closest('.rv-ui')&&r.toString().trim()){lastRange=r.cloneRange();lastRangeT=Date.now();showPop(r);return;}}
  setTimeout(()=>{const s2=getSelection();if(!s2||s2.isCollapsed)pop.classList.remove('on');},150);});
function showPop(r){const b=r.getBoundingClientRect();if(!b.width&&!b.height)return;pop.style.left=Math.max(8,Math.min(innerWidth-200,b.left+b.width/2-90))+'px';
  const below=b.bottom+10+44<innerHeight-120;pop.style.top=(below?b.bottom+10:Math.max(64,b.top-52))+'px';pop.classList.add('on');}
pop.addEventListener('pointerdown',e=>e.preventDefault());
function validRange(){if(lastRange&&Date.now()-lastRangeT<60000&&lastRange.toString().trim())return lastRange;return null;}

/* ---------- actions ---------- */
function addHighlight(comment){const r=validRange();if(!r){toast('Select some text first, then tap <b>Highlight</b>.');return null;}
  const ra=rootOf(r.startContainer),rb=rootOf(r.endContainer);if(!ra||!rb||ra.el!==rb.el){toast('Please select text inside one box or paragraph.');return null;}
  const [s,e]=offsets(ra.el,r);const quote=ra.el.textContent.slice(s,e);
  const it={id:uid(),type:'highlight',loc:Object.assign(screenLoc(),{k:ra.k,start:s,end:e}),quote:quote.trim()?quote:r.toString(),comment:comment||'',t:Date.now()};
  R.items.push(it);save();getSelection().removeAllRanges();pop.classList.remove('on');lastRange=null;wrap(ra.el,s,e,it.id,!!it.comment);return it;}
function commentDialog(){const r=validRange();const q=r?r.toString().trim():'';
  modal(`<h3>Add a comment</h3><div class="rv-seg"><button data-sc="screen" class="${q?'':'on'}">On this screen</button><button data-sc="text" class="${q?'on':''}" ${q?'':'disabled'}>On the selected text</button></div>
  ${q?`<blockquote class="rv-quote">“${esc(q.slice(0,220))}${q.length>220?'…':''}”</blockquote>`:'<p class="rv-mute">Tip: select text first to comment on a specific phrase.</p>'}
  <p class="rv-mute" style="margin:6px 0 4px">${esc(locLabel(screenLoc()))}</p>
  <textarea class="rv-ta" rows="5" placeholder="What should change, and why?"></textarea>
  <div class="rv-row"><button class="rv-btn ghost" data-x="cancel">Cancel</button><button class="rv-btn" data-x="save">Save comment</button></div>`,card=>{
    let sc=q?'text':'screen';card.querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>{if(b.disabled)return;sc=b.dataset.sc;card.querySelectorAll('[data-sc]').forEach(x=>x.classList.toggle('on',x===b));});
    const ta=card.querySelector('textarea');setTimeout(()=>ta.focus(),50);
    card.querySelector('[data-x=cancel]').onclick=closeModal;
    card.querySelector('[data-x=save]').onclick=()=>{const c=ta.value.trim();if(!c){ta.focus();return;}
      if(sc==='text'){lastRange=r;lastRangeT=Date.now();const it=addHighlight(c);if(!it)return;}
      else{R.items.push({id:uid(),type:'comment',loc:screenLoc(),comment:c,t:Date.now()});save();}
      closeModal();toast('Comment saved.');};});}
function markDialog(id){const it=R.items.find(x=>x.id===id);if(!it)return;
  modal(`<h3>${it.comment?'Comment on text':'Highlight'}</h3><blockquote class="rv-quote">“${esc(it.quote)}”</blockquote><textarea class="rv-ta" rows="4" placeholder="Add a comment (optional)">${esc(it.comment||'')}</textarea>
  <div class="rv-row"><button class="rv-btn danger" data-x="del">Remove</button><span style="flex:1"></span><button class="rv-btn ghost" data-x="cancel">Close</button><button class="rv-btn" data-x="save">Save</button></div>`,card=>{
    card.querySelector('[data-x=cancel]').onclick=closeModal;
    card.querySelector('[data-x=del]').onclick=()=>{removeItem(id);closeModal();};
    card.querySelector('[data-x=save]').onclick=()=>{it.comment=card.querySelector('textarea').value.trim();save();unwrapMarks(id);apply();closeModal();toast('Saved.');};});}
function unwrapMarks(id){document.querySelectorAll(`mark[data-rv="${id}"]`).forEach(m=>{const p=m.parentNode;while(m.firstChild)p.insertBefore(m.firstChild,m);m.remove();p.normalize();});document.querySelectorAll(`.rv-ico[data-rv="${id}"]`).forEach(x=>x.remove());}
function removeItem(id){const it=R.items.find(x=>x.id===id);if(!it)return;R.items=R.items.filter(x=>x.id!==id);save();
  if(it.type==='highlight')unwrapMarks(id);
  if(it.type==='edit'&&sameScreen(it.loc)){const root=rootByKey(it.loc.k);const el=root&&byPath(root,it.loc.path);if(el&&cleanText(el)===it.after){el.innerHTML=it.beforeHTML;el.classList.remove('rv-edited');}}
  toast('Removed.');}

/* ---------- edit text ---------- */
function setEdit(on){editOn=on;document.body.classList.toggle('rv-edit',on);dock.querySelector('[data-rv-act=edit]').classList.toggle('on',on);pop.classList.remove('on');
  if(!on){const a=document.activeElement;if(a&&a.isContentEditable)a.blur();}
  toast(on?'<b>Edit mode on.</b> Tap any text to change it. Turn it off to use the course normally.':'Edit mode off.');}
function editTarget(t){let el=t.nodeType===1?t:t.parentElement;if(!el)return null;
  if(el.closest('.rv-ui')||!el.closest(CONTENT))return null;
  if(el.closest('svg'))return{svg:true};
  if(el.matches('mark.rv-hl,span.gl,.rv-ico,b,i,em,strong,u,small,sup,sub,a,span')&&!el.matches('.opt span:last-child,.ol')) {
    let p=el;while(p&&p.matches('mark.rv-hl,span.gl,.rv-ico,b,i,em,strong,u,small,sup,sub,a')&&!p.matches('.blk'))p=p.parentElement;el=p;}
  const has=n=>[...n.childNodes].some(c=>c.nodeType===3&&c.data.trim());
  let n=el;while(n&&!has(n)&&!n.matches('.blk,.mhead h2,.pk')){n=n.parentElement;}
  if(!n||n.matches('.blk,.pk')&&!has(n))return null;
  const root=rootOf(n);if(!root)return null;return{el:n,root};}
function beginEdit(target){const {el,root}=target;const path=pathOf(root.el,el);if(!path)return;
  const before=cleanText(el),beforeHTML=cleanHTML(el);
  const existing=R.items.find(x=>x.type==='edit'&&sameScreen(x.loc)&&x.loc.k===root.k&&JSON.stringify(x.loc.path)===JSON.stringify(path));
  const orig=existing?{t:existing.before,h:existing.beforeHTML}:{t:before,h:beforeHTML};
  const commit=(afterText,afterHTML)=>{if(afterText===orig.t){if(existing){R.items=R.items.filter(x=>x!==existing);save();}el.classList.remove('rv-edited');return;}
    if(existing){existing.after=afterText;existing.afterHTML=afterHTML;existing.t=Date.now();}
    else R.items.push({id:uid(),type:'edit',loc:Object.assign(screenLoc(),{k:root.k,path}),before:orig.t,beforeHTML:orig.h,after:afterText,afterHTML,t:Date.now()});
    save();el.classList.add('rv-edited');toast('Edit saved.');};
  const inControl=el.closest('button,label,select,.chip,.ord-it,.capq,.seg');
  if(inControl){modal(`<h3>Edit text</h3><p class="rv-mute">${esc(locLabel(screenLoc()))}</p><textarea class="rv-ta" rows="4">${esc(before)}</textarea><div class="rv-row"><button class="rv-btn ghost" data-x="cancel">Cancel</button><button class="rv-btn" data-x="save">Save edit</button></div>`,card=>{
      const ta=card.querySelector('textarea');setTimeout(()=>{ta.focus();ta.select();},50);card.querySelector('[data-x=cancel]').onclick=closeModal;
      card.querySelector('[data-x=save]').onclick=()=>{const v=ta.value.replace(/\s+/g,' ').trim();if(!v){ta.focus();return;}el.textContent=v;commit(v,esc(v));closeModal();};});return;}
  el.contentEditable='true';el.classList.add('rv-editing');el.focus();
  const done=()=>{el.removeEventListener('blur',done);el.removeAttribute('contenteditable');el.classList.remove('rv-editing');commit(cleanText(el),cleanHTML(el));};
  el.addEventListener('blur',done);
  el.addEventListener('keydown',ev=>{if(ev.key==='Escape'){el.innerHTML=orig.h;el.blur();}if(ev.key==='Enter'&&!ev.shiftKey){ev.preventDefault();el.blur();}});}
window.addEventListener('click',e=>{
  if(e.target.closest&&e.target.closest('.rv-ui'))return;
  if(editOn){const t=editTarget(e.target);if(!t)return;if(e.target.closest&&e.target.closest('[contenteditable=true]'))return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    if(t.svg){toast('Diagram labels can’t be edited here — select nearby text and add a comment instead.');return;}
    beginEdit(t);return;}
  const m=e.target.closest&&e.target.closest('mark.rv-hl,.rv-ico');if(m){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();markDialog(m.dataset.rv);}
},true);

/* ---------- notes list ---------- */
function order(it){const ms=MODS();const mi=it.loc.v==='mod'?ms.findIndex(m=>m.id===it.loc.m):(it.loc.v==='pocket'?999:-1);return [mi,it.loc.i||0,it.t];}
function sorted(){return R.items.slice().sort((a,b)=>{const x=order(a),y=order(b);return x[0]-y[0]||x[1]-y[1]||x[2]-y[2];});}
function itemHTML(it){const lab={edit:'Edit',highlight:it.comment?'Comment on text':'Highlight',comment:'Comment'}[it.type];
  let body='';if(it.type==='edit')body=`<div class="rv-del">${esc(it.before)}</div><div class="rv-ins">${esc(it.after)}</div>`;
  else if(it.type==='highlight')body=`<div class="rv-quote sm">“${esc(it.quote)}”</div>${it.comment?`<div class="rv-c">${esc(it.comment)}</div>`:''}`;
  else body=`<div class="rv-c">${esc(it.comment)}</div>`;
  return `<div class="rv-item"><div class="rv-ih"><span class="rv-type ${it.type}">${lab}</span><span class="rv-loc">${esc(locLabel(it.loc))}</span></div>${body}<div class="rv-row sm"><button class="rv-btn ghost" data-go="${it.id}">Go to</button><button class="rv-btn ghost danger" data-rm="${it.id}">Delete</button></div></div>`;}
function listDialog(){const its=sorted();
  modal(`<div class="rv-lh"><h3>Review notes <span class="rv-mute">(${its.length})</span></h3><button class="rv-x" data-x="cancel" aria-label="Close">×</button></div>
  <label class="rv-name">Your name <input value="${esc(R.name)}" placeholder="So we know who reviewed"></label>
  <div class="rv-row"><button class="rv-btn" data-x="export">Export file</button><button class="rv-btn ghost" data-x="copy">Copy as text</button></div>
  <div class="rv-list">${its.length?its.map(itemHTML).join(''):'<p class="rv-mute">No notes yet. Select text to highlight or comment, or turn on <b>Edit text</b> and tap any text.</p>'}</div>`,card=>{
    card.parentElement.classList.add('rv-side');
    const nm=card.querySelector('.rv-name input');nm.oninput=()=>{R.name=nm.value;save();};
    card.querySelector('[data-x=cancel]').onclick=closeModal;card.querySelector('[data-x=export]').onclick=exportFile;card.querySelector('[data-x=copy]').onclick=copyText;
    card.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{removeItem(b.dataset.rm);listDialog();});
    card.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>goTo(b.dataset.go));});}
function goTo(id){const it=R.items.find(x=>x.id===id);if(!it)return;closeModal();
  if(it.loc.v==='mod')window.__fs.openMod(it.loc.m,it.loc.i);else if(it.loc.v==='pocket'){const b=document.querySelector('[data-act=pocket]');b&&b.click();}else window.__fs.home();
  setTimeout(()=>{const root=it.loc.k?rootByKey(it.loc.k):null;const t=(it.type==='highlight'&&document.querySelector(`mark[data-rv="${id}"]`))||(it.type==='edit'&&root&&byPath(root,it.loc.path))||root;
    if(t){t.scrollIntoView({behavior:'smooth',block:'center'});t.classList.add('rv-flash');setTimeout(()=>t.classList.remove('rv-flash'),1800);}},120);}

/* ---------- export ---------- */
function payload(){return{program:'First Shift — ER Intern Induction Program',kind:'review',build:window.__BUILD||'',reviewer:R.name||'',exported:new Date().toISOString(),count:R.items.length,
  items:sorted().map(it=>{const o={type:it.type==='highlight'&&it.comment?'comment-on-text':it.type,where:locLabel(it.loc),loc:it.loc};
    if(it.type==='edit'){o.before=it.before;o.after=it.after;o.beforeHTML=it.beforeHTML;o.afterHTML=it.afterHTML;}
    if(it.type==='highlight'){o.quote=it.quote;if(it.comment)o.comment=it.comment;}
    if(it.type==='comment')o.comment=it.comment;o.time=new Date(it.t).toISOString();return o;})};}
function fname(){const d=new Date().toISOString().slice(0,10);const n=(R.name||'').trim().replace(/[^A-Za-z0-9؀-ۿ]+/g,'-').replace(/^-|-$/g,'');return `FirstShift_review_${n?n+'_':''}${d}.json`;}
async function exportFile(){if(!R.items.length){toast('No notes to export yet.');return;}
  if(!R.name){const n=prompt0();if(n===null)return;}
  const json=JSON.stringify(payload(),null,2);const name=fname();
  try{const f=new File([json],name,{type:'application/json'});if(navigator.canShare&&navigator.canShare({files:[f]})&&matchMedia('(pointer:coarse)').matches){await navigator.share({files:[f],title:'First Shift review'});toast('Shared.');return;}}catch(e){if(e&&e.name==='AbortError')return;}
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([json],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);
  toast(`Saved <b>${esc(name)}</b> — send this file back.`);}
function prompt0(){const n=(window.prompt&&window.prompt('Your name (so we know who reviewed):',''))||'';R.name=n.trim();save();return n;}
function asText(){const p=payload();let s=`First Shift — review notes\nReviewer: ${p.reviewer||'—'}\nDate: ${p.exported.slice(0,10)}\nNotes: ${p.count}\n`;
  p.items.forEach((it,i)=>{s+=`\n${i+1}. [${it.type}] ${it.where}\n`;if(it.before!==undefined)s+=`   WAS: ${it.before}\n   NOW: ${it.after}\n`;if(it.quote)s+=`   TEXT: “${it.quote}”\n`;if(it.comment)s+=`   COMMENT: ${it.comment}\n`;});return s;}
async function copyText(){try{await navigator.clipboard.writeText(asText());toast('Copied — paste it into WhatsApp or email.');}catch(e){modal(`<h3>Copy your notes</h3><textarea class="rv-ta" rows="12">${esc(asText())}</textarea><div class="rv-row"><button class="rv-btn" data-x="cancel">Done</button></div>`,c=>{c.querySelector('[data-x=cancel]').onclick=closeModal;const t=c.querySelector('textarea');t.focus();t.select();});}}

/* ---------- help / intro ---------- */
function help(first){modal(`<h3>${first?'Welcome — this is a review copy':'How to review'}</h3>
  <p>Thank you for reviewing <b>First Shift</b>. Please flag anything that is wrong, unclear or doesn’t match how things are done in your ER — clinical content, Saudi rules, wording, or the Arabic patient lines.</p>
  <ul class="rv-howto"><li><b>Highlight</b> — select any text, then tap <i>Highlight</i>.</li><li><b>Comment</b> — on the whole screen, or on text you selected.</li><li><b>Edit text</b> — switch it on, tap any text and type the correction. Switch it off to use the course again.</li><li><b>Notes</b> — see, jump to or delete everything you’ve flagged.</li><li><b>Export</b> — when you’re done, export and send the file back.</li></ul>
  <p class="rv-mute">Continue is unlocked, so you can move freely without answering. Your notes save automatically on this device and browser — come back any time on the same one.</p>
  <label class="rv-name">Your name <input value="${esc(R.name)}" placeholder="e.g. Dr. Sara"></label>
  <div class="rv-row"><button class="rv-btn" data-x="go">${first?'Start reviewing':'Got it'}</button></div>`,card=>{
    const nm=card.querySelector('input');nm.oninput=()=>{R.name=nm.value;save();};card.querySelector('[data-x=go]').onclick=()=>{R.intro=true;save();closeModal();};});}
if(!R.intro)setTimeout(()=>help(true),400);

/* ---------- dock clicks ---------- */
dock.addEventListener('pointerdown',e=>{if(e.target.closest('button'))e.preventDefault();});
pop.addEventListener('click',e=>{const b=e.target.closest('[data-rv-act]');if(!b)return;b.dataset.rvAct==='hl'?addHighlight():commentDialog();pop.classList.remove('on');});
dock.addEventListener('click',e=>{const b=e.target.closest('[data-rv-act]');if(!b)return;const a=b.dataset.rvAct;
  if(a==='edit')setEdit(!editOn);else if(a==='hl'){if(editOn)setEdit(false);addHighlight()&&toast('Highlighted. Tap it to add a comment.');}
  else if(a==='cm'){if(editOn)setEdit(false);commentDialog();}else if(a==='list')listDialog();else if(a==='export')exportFile();else if(a==='help')help(false);});
})();
