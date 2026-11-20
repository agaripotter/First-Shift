/* ================= MODULE 9 ================= */
MODULES.push({id:'m09',n:9,part:'Part D · Core presentations',title:'Neuro emergencies',sub:'Stroke codes, seizures, the confused patient, dangerous headaches, syncope and the GCS',mins:20,
take:[
`Stroke: <b>time last known well</b> is the most important fact. Check glucose, activate the stroke code, CT within minutes. Thrombolysis up to 4.5 h; thrombectomy for large-vessel occlusion in selected patients up to 24 h.`,
`A seizure lasting ≥5 minutes is status epilepticus: benzodiazepine now, repeat once, then a second-line drug by 20 minutes.`,
`In every confused or unconscious patient: <b>glucose first</b>.`,
`Sudden “worst ever” headache, fever with neck stiffness, a focal deficit, pregnancy, anticoagulation, age >50 with a new headache → investigate.`,
`Report GCS as E–V–M. GCS ≤8 = the airway is at risk.`],
s:[
[
{t:'mentor',x:`<p>In a stroke, about 1.9 million neurons die every minute. Your job is not to read the CT. It is to get an accurate <b>time of onset</b>, a glucose, and the patient through the scanner door fast.</p>`},
{t:'h',x:`Recognise it: BE-FAST`},
{t:'table',head:['','Look for'],rows:[['<b>B</b>alance','Sudden loss of balance or coordination'],['<b>E</b>yes','Sudden loss of vision or double vision'],['<b>F</b>ace','Facial droop — ask them to smile'],['<b>A</b>rm','Arm drift — arms out, eyes closed'],['<b>S</b>peech','Slurred, wrong words, can’t understand'],['<b>T</b>ime','When were they last known to be normal? Call the code.']]},
{t:'nums',i:[['≤ 60 min','door-to-needle for thrombolysis'],['4.5 h','thrombolysis window from last known well'],['185/110','BP must be below this before thrombolysis'],['24 h','thrombectomy window in selected patients']]},
{t:'tool',name:'stroke'},
{t:'call',k:'pearl',title:'Last known well ≠ when they were found',x:`If he went to sleep at midnight and woke at 06:00 with weakness, his last known well is <b>midnight</b>. Ask the family exact questions: “When did you last see him completely normal?”`},
],
[
{t:'case',title:'“His mouth turned”',pt:'Triage · 14:10',mon:{hr:84,bp:'196/108',sp:'97%',rr:16,t:'36.8',gcs:15},start:'a',n:{
a:{x:`<p>A 66-year-old man is brought by his wife. He has slurred speech and a weak right arm.</p>`,say:{who:'His wife',ar:`كنا نتغدى الساعة وحدة، وفجأة فمه مال وكلامه صار ثقيل، وما قدر يمسك الملعقة بيده اليمين.`,en:`We were having lunch at one o’clock, and suddenly his mouth drooped, his speech became heavy, and he couldn’t hold the spoon in his right hand.`},
ch:[{x:`Last known well 13:00. Check glucose, call the stroke code, straight to CT`,s:2,go:'b',f:`One hour and ten minutes since onset — well within the window. Glucose takes 30 seconds and rules out the most common mimic.`},
{x:`Admit under medicine for an MRI tomorrow`,s:0,go:'b',f:`An MRI tomorrow means the window is gone. This is an emergency.`}]},
b:{x:`<p>Glucose 7.8 mmol/L (140 mg/dL). CT head shows no bleeding. The neurologist is on the way. His BP is still 196/108.</p>`,
ch:[{x:`Tell your senior: BP must be below 185/110 before thrombolysis — IV labetalol per protocol`,s:2,go:'c',f:`Correct. Lower it carefully to just under the threshold. If it can’t be controlled, thrombolysis can’t be given.`},
{x:`Give sublingual nifedipine to drop it quickly`,s:0,go:'c',f:`Sudden large drops in BP can extend the stroke. Use titratable IV drugs per protocol.`},
{x:`Leave the BP — it’s protective in stroke`,s:1,go:'c',f:`True for patients <b>not</b> getting thrombolysis (we usually tolerate up to 220/120). This one may get it.`}]},
c:{x:`<p>After labetalol, BP 176/98. The neurologist confirms an ischaemic stroke and gives thrombolysis at 14:48. CT angiography shows a left middle cerebral artery occlusion and he goes for thrombectomy.</p>`,mon:{bp:'176/98'}}},
debrief:`Door-to-needle: 38 minutes. That only happened because the wife was asked an exact question and the glucose was checked at triage.`},
{t:'order',q:`Put the stroke code steps in order.`,i:[`Recognise BE-FAST signs and establish last known well`,`Check capillary glucose`,`Activate the stroke code`,`Non-contrast CT head (± CT angiography)`,`Neurology decision on thrombolysis / thrombectomy`],e:`Glucose comes before the code because hypoglycaemia can look exactly like a stroke.`},
],
[
{t:'h',x:`Seizures and status epilepticus`},
{t:'p',x:`Most seizures stop on their own within 2–3 minutes. Your first job is safety: lay them on their side, protect the head, nothing in the mouth, oxygen, <b>check glucose</b>, time it.`},
{t:'table',head:['Time','Action (adult)'],rows:[['0–5 min','ABC, oxygen, glucose, IV access, time the seizure'],['5 min — status','<b>Benzodiazepine</b>: IV lorazepam 4 mg (0.1 mg/kg), or IM midazolam 10 mg, or buccal midazolam 10 mg'],['10 min','Repeat the benzodiazepine <b>once</b>'],['20 min','<b>Second-line</b>: levetiracetam 60 mg/kg (max 4.5 g) or valproate 40 mg/kg (max 3 g) or fosphenytoin — per CMC protocol'],['40 min+','Refractory: anaesthesia, intubation, ICU']]},
{t:'call',k:'danger',x:`A pregnant woman (or up to 6 weeks after delivery) who seizes has <b>eclampsia</b> until proven otherwise: <b>magnesium sulphate</b> is the drug, and obstetrics must be called immediately.`},
{t:'mcq',q:`A 34-year-old has been seizing for 6 minutes. No IV access yet. Glucose 5.4 mmol/L. What next?`,o:[`Wait for IV access, then lorazepam`,`IM or buccal midazolam 10 mg now`,`Phenytoin IV`,`Put a tongue depressor in her mouth`],a:1,e:`Don’t lose minutes hunting for a vein. IM midazolam works as well as IV lorazepam.`},
],
[
{t:'h',x:`The confused or unconscious patient`},
{t:'list',i:[`<b>Glucose</b> — always, first.`,`Oxygen and airway — GCS ≤8 means the airway is at risk.`,`<b>Naloxone</b> if opioid toxicity is possible (small pupils, slow breathing).`,`<b>Thiamine</b> in malnourished patients or those with alcohol use — but never delay glucose for it.`,`Then the causes: infection (sepsis, meningitis), stroke/bleed, seizure, toxins, metabolic (Na, Ca, uraemia, liver), hypoxia/CO₂, temperature (heat stroke).`]},
{t:'tool',name:'gcs'},
{t:'mcq',q:`A man opens his eyes to pain, makes groaning sounds, and withdraws his hand from a painful stimulus. GCS?`,o:[`E2 V2 M4 = 8`,`E2 V3 M5 = 10`,`E1 V2 M4 = 7`,`E3 V2 M4 = 9`],a:0,e:`Eyes to pain = 2, sounds only = 2, withdraws = 4. Total 8 — the airway is at risk. Call your senior.`},
],
[
{t:'h',x:`Headache and syncope — the red flags`},
{t:'table',head:['Headache red flag','Think of'],rows:[['Sudden, maximal within a minute (“thunderclap”)','Subarachnoid haemorrhage'],['Fever, neck stiffness, rash','Meningitis'],['New focal deficit, seizure, confusion','Bleed, tumour, abscess, venous thrombosis'],['New headache over 50, jaw pain, scalp tenderness','Giant cell arteritis'],['Pregnancy or postpartum','Pre-eclampsia, venous sinus thrombosis'],['On anticoagulants, or after trauma','Intracranial bleeding'],['Several people at home with headache, winter, heater','Carbon monoxide']]},
{t:'table',head:['High-risk syncope','Why'],rows:[['Fainting during exertion','Aortic stenosis, HCM, arrhythmia'],['Palpitations before it, or no warning at all','Arrhythmia'],['Family history of sudden death under 40','Inherited channelopathy'],['Abnormal ECG (long QT, Brugada, heart block, WPW)','Arrhythmia'],['Chest pain, breathlessness, or shock','MI, PE, dissection, GI bleed, ectopic']]},
{t:'mcq',q:`A 17-year-old footballer collapsed during a match at a Jeddah academy and recovered in a minute. His uncle died suddenly at 35. ECG shows a QTc of 520 ms. What now?`,o:[`Reassure — it was a simple faint from the heat`,`High-risk syncope: monitor, tell your senior, cardiology review, no sport until cleared`,`Discharge with advice to drink more water`,`Order an EEG`],a:1,e:`Exertional syncope + family history of sudden death + long QT. This is a potentially fatal arrhythmia syndrome.`},
]]});

/* ================= MODULE 10 ================= */
MODULES.push({id:'m10',n:10,part:'Part D · Core presentations',title:'Trauma',sub:'The primary survey, road traffic accidents, bleeding, chest injuries, head and C-spine rules, and burns',mins:25,
take:[
`<b>&lt;C&gt;ABCDE</b>: catastrophic bleeding first, then airway with C-spine protection, breathing, circulation, disability, exposure.`,
`Look for bleeding in five places: on the floor, chest, abdomen, pelvis, long bones.`,
`Tranexamic acid within 3 hours of injury in significant bleeding: 1 g over 10 min, then 1 g over 8 h.`,
`Head injury on anticoagulants → CT. Use the Canadian CT head and C-spine rules.`,
`Burns: cool running water for 20 minutes, cover with cling film, count only partial- and full-thickness burns, think of the airway.`],
s:[
[
{t:'mentor',x:`<p>Road traffic accidents are a leading cause of death among young people in Saudi Arabia. On a Thursday night you will see several. The trauma team leader is your senior — your job is to do your part of the primary survey well and to <b>say out loud what you find</b>.</p>`},
{t:'h',x:`The primary survey`},
{t:'table',head:['','Find','Fix'],rows:[
['<b>&lt;C&gt;</b> Catastrophic haemorrhage','Spurting, pooling blood from a limb or junction','Direct pressure, tourniquet, wound packing'],
['<b>A</b> Airway + C-spine','Talking? Obstruction, facial trauma, burns','Jaw thrust (not head tilt), suction, collar/manual stabilisation'],
['<b>B</b> Breathing','RR, SpO₂, chest movement, breath sounds, trachea','Oxygen; decompress tension pneumothorax; seal open wounds'],
['<b>C</b> Circulation','HR, BP, cap refill, FAST, pelvis','Two large-bore IVs, bloods + crossmatch, blood not saline, pelvic binder'],
['<b>D</b> Disability','GCS, pupils, glucose, limb movement','Prevent hypoxia and hypotension (they worsen brain injury)'],
['<b>E</b> Exposure','Full undress, log roll, the back, perineum','Keep warm — hypothermia worsens bleeding']]},
{t:'call',k:'idea',x:`The order is simply <b>what kills fastest</b>. Someone can bleed to death from a leg artery in about 3 minutes, die from a blocked airway in about 4, and from failed breathing soon after. Fix the fastest killer first, then move down the list.`},
{t:'order',q:`A motorcyclist arrives with a spurting thigh wound, gurgling breathing and a GCS of 9. Order your priorities.`,i:[`Tourniquet on the thigh`,`Jaw thrust and suction with C-spine control`,`Oxygen and check breath sounds`,`IV access, bloods, blood products`,`Check GCS and pupils`,`Expose fully and log roll`],e:`&lt;C&gt; first — someone can die from limb bleeding in 3 minutes.`},
],
[
{t:'h',x:`Haemorrhagic shock`},
{t:'tool',name:'bleed'},
{t:'call',k:'danger',x:`By the time a young trauma patient’s BP falls, they have lost <b>30–40%</b> of their blood volume. Tachycardia and anxiety come first. A normal BP does not mean “stable”.`},
{t:'list',i:[`Give <b>blood</b>, not litres of saline. Activate the <b>massive transfusion protocol</b> early (balanced red cells : plasma : platelets).`,`<b>Tranexamic acid</b> within 3 hours: 1 g IV over 10 min, then 1 g over 8 h.`,`Permissive hypotension (systolic ~80–90) until bleeding is controlled — <b>but not</b> in head injury, where we keep the BP higher.`,`The answer to haemorrhage is to stop the bleeding: theatre, interventional radiology, pelvic binder.`]},
{t:'mcq',q:`A 28-year-old after an RTA: HR 132, BP 86/58, confused, FAST positive in the right upper quadrant. Best plan?`,o:[`2 L of saline and repeat FAST in an hour`,`CT abdomen to define the injury`,`Blood products (massive transfusion), TXA, and straight to theatre with the surgeons`,`Wait for the haemoglobin result`],a:2,e:`An unstable patient with a positive FAST goes to theatre, not to the CT scanner. The haemoglobin can be normal early in bleeding.`},
],
[
{t:'case',title:'Rollover on Madinah Road',pt:'Resus · Thursday 23:50',mon:{hr:128,bp:'92/60',sp:'90%',rr:30,gcs:14},start:'a',n:{
a:{x:`<p>Red Crescent brings a 23-year-old driver, unrestrained, car rolled at high speed. He is collared, on a board. Your senior leads. You are assigned to <b>Breathing</b>.</p>`,
ch:[{x:`Expose the chest, look, feel, listen: RR, chest movement, trachea, breath sounds on both sides, percussion`,s:2,go:'b',f:`Systematic. Say what you find out loud to the team leader.`},
{x:`Order a chest X-ray and wait`,s:0,go:'b',f:`Clinical examination first. Life-threatening chest injuries are diagnosed at the bedside.`}]},
b:{x:`<p>Right side: reduced movement, absent breath sounds, hyper-resonant. Trachea deviated to the left. Neck veins distended. BP falling.</p>`,mon:{bp:'78/50',sp:'86%'},
ch:[{x:`Call out “tension pneumothorax, right” — your senior decompresses immediately (4th/5th intercostal space, mid-axillary line), then a chest drain`,s:2,go:'c',f:`Tension pneumothorax is a clinical diagnosis. Don’t wait for imaging.`},
{x:`Increase the oxygen and wait for the X-ray`,s:0,go:'c',f:`This patient will arrest before the X-ray is developed.`}]},
c:{x:`<p>There is a rush of air on decompression. SpO₂ rises. But HR is still 130 and BP 88/56. FAST: free fluid around the spleen. The pelvis is stable.</p>`,mon:{hr:130,bp:'88/56',sp:'95%',rr:24},
ch:[{x:`Suggest massive transfusion protocol, TXA 1 g, warm products, and call general surgery for theatre`,s:2,go:'d',f:`Ongoing haemorrhage from the spleen. Blood, TXA, and surgical control.`},
{x:`Suggest 3 litres of normal saline first`,s:0,go:'d',f:`Large volumes of saline dilute clotting factors, cause acidosis and worsen bleeding.`}]},
d:{x:`<p>He goes to theatre for a splenectomy. Afterwards, the police office calls asking for “the doctor who treated him” to give details.</p>`,mon:{hr:110,bp:'104/68'},
ch:[{x:`Refer them to your senior and the medical reports process; make sure your notes are complete and timed`,s:2,go:'e',f:`RTAs are medico-legal. You document facts; the licensed doctor provides official reports.`},
{x:`Tell the police officer he smelled of alcohol`,s:0,go:'e',f:`Not your role, not through the corridor, and not without a documented clinical finding. Write facts in the notes.`}]},
e:{x:`<p>He survives. Your senior asks you to present the case at morning teaching.</p>`}},
debrief:`Primary survey roles: when you are given a letter (A, B, C…), own it completely and report out loud. The team leader needs your findings, not your silence.`},
],
[
{t:'h',x:`Head and C-spine — who needs imaging?`},
{t:'cards',i:[['Canadian CT head rule — high risk','GCS <15 at 2 h after injury · suspected open/depressed skull fracture · signs of base-of-skull fracture (panda eyes, Battle’s sign, CSF leak, haemotympanum) · vomiting ≥2 times · age ≥65'],['Canadian CT head rule — medium risk','Amnesia for events ≥30 min before impact · dangerous mechanism (pedestrian hit, ejected, fall >1 m or 5 stairs)'],['Anticoagulants','Any head injury on warfarin, a DOAC or antiplatelets with any symptoms → CT. Many protocols scan all of them.'],['Canadian C-spine rule','High risk (age ≥65, dangerous mechanism, limb paraesthesia) → image. If low-risk features allow it and they can rotate the neck 45° left and right → no imaging needed.'],['NEXUS — image unless all absent','Midline tenderness · focal neuro deficit · reduced alertness · intoxication · painful distracting injury']]},
{t:'mcq',q:`A 72-year-old on apixaban slipped in the bathroom, hit her head, GCS 15, no vomiting. Best plan?`,o:[`Discharge — GCS 15`,`CT head`,`Observe for 1 hour then discharge`,`Skull X-ray`],a:1,e:`Age ≥65 and anticoagulation: both point to CT.`},
],
[
{t:'h',x:`Burns`},
{t:'list',i:[`<b>First aid</b>: cool running water for 20 minutes (useful up to 3 hours after the burn). No ice. Then cover with cling film.`,`<b>Airway</b>: burns to the face, singed nasal hair, soot in the mouth, hoarse voice or stridor → senior and anaesthesia early. Airways swell fast.`,`Think <b>carbon monoxide</b> in enclosed-space fires.`,`<b>Circumferential</b> burns of the chest or limbs may need escharotomy.`,`Burns that don’t fit the story — especially in children — need a safeguarding review.`]},
{t:'tool',name:'burns'},
{t:'mcq',q:`A 70 kg man has partial-thickness burns to his whole back and both arms. Using 2 mL/kg/%TBSA, how much fluid in the first 8 hours?`,o:[`1,008 mL`,`2,520 mL`,`5,040 mL`,`10,080 mL`],a:1,e:`Back 18% + arms 9% + 9% = 36%. 2 × 70 × 36 = 5,040 mL in 24 h; half — <b>2,520 mL</b> — in the first 8 h from the time of the burn. Then titrate to urine output.`},
]]});
