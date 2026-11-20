/* ================= MODULE 15 — THE NIGHT SHIFT ================= */
MODULES.push({id:'m15',n:15,final:1,part:'Final · The Night Shift',partSub:'Everything, all at once',title:'The Night Shift',sub:'A simulated Wednesday night at CMC: seven patients, one registrar, and you',mins:35,
take:[
`Sickest first — and re-check the waiting room. The quiet patient from triage is often the one who deteriorates.`,
`Time-critical pathways (STEMI, stroke, sepsis, status epilepticus, anaphylaxis) have the treatment ready before the diagnosis is perfect.`,
`In a medico-legal case: treat first, describe precisely, and never write conclusions.`,
`No valid DNR = full code. Family wishes go to the senior and the three-physician process.`,
`Hand over sickest first, with every pending item owned by a name.`],
s:[
[
{t:'mentor',x:`<p>It’s Wednesday night, 00:30. Weekend traffic has started on the Corniche, there are two weddings in halls nearby, and the waiting room is full. Your registrar tonight is <b>Dr. Fahad Bakr</b>. I’m the consultant on call from home.</p><p style="margin-top:8px">Everything you’ve learned is about to happen at once. There’s no pause button in a real shift — but here you can take your time. Think like you will on the floor.</p>`},
{t:'mentor',av:'FB',c:'s',who:'Dr. Fahad Bakr · Senior registrar',x:`<p>Welcome, {DR}. Rules for tonight: tell me early, don’t cherry-pick, and nobody goes home without me seeing them. Let’s look at the board.</p>`},
{t:'sort',tag:'00:30 — the waiting room',q:`Six new patients. Assign each a CTAS level.`,bins:CT,i:[
{x:`56M, central chest pressure for 30 min, grey and sweaty`,b:1,w:`Cardiac chest pain — CTAS 2, ECG in 10 minutes.`},
{x:`2-year-old girl, fever, now jerking all four limbs — mother says it started 4 minutes ago`,b:0,w:`Active seizure — CTAS 1.`},
{x:`34M, brought by police, bleeding scalp laceration and cuts on his forearm after a fight, GCS 15`,b:2,w:`Stable but needs assessment, head injury and wound care. CTAS 3, and medico-legal.`},
{x:`81F, confused, fever, from home with her daughters, HR 116, BP 92/50`,b:1,w:`Suspected sepsis with soft BP — CTAS 2.`},
{x:`38M, low back pain for 4 days after lifting, walking`,b:3,w:`CTAS 4 — for now. Remember him.`},
{x:`45M, wants a sick leave for yesterday, feels fine now`,b:4,w:`CTAS 5.`}]},
],
[
{t:'case',title:'01:05 · Bed R2 — chest pain',pt:'56M · smoker, hypertensive',mon:{hr:102,bp:'148/92',sp:'95%',rr:20,t:'36.8'},start:'a',n:{
a:{x:`<p>He came straight from a dinner with friends. Central chest pressure radiating to his left arm for 35 minutes. His ECG was done 6 minutes after arrival.</p>`,strip:'stemi',stripl:'V2 — ST elevation (also V1–V4 on the 12-lead)',
ch:[{x:`Tell Dr. Fahad now: anterior STEMI — suggest cath lab activation, aspirin 300 mg chewed`,s:2,go:'b',f:`ECG in 6 minutes, STEMI recognised. The cath lab call is made by your senior per CMC protocol.`},
{x:`Wait for the troponin to confirm`,s:0,go:'b',f:`STEMI is an ECG diagnosis. Troponin may still be normal this early.`}]},
b:{x:`<p>The cath lab team is on the way (20 minutes). He asks you something.</p>`,say:{who:'Patient',ar:`يا {دكتور|دكتورة}، أقدر أكلم ولدي؟ هو في الرياض. وبعدين... أنا بموت؟`,en:`Doctor, can I call my son? He’s in Riyadh. And… am I going to die?`},
ch:[{x:`Let him call. Tell him honestly that this is a heart attack, the team is opening the artery very soon, and that this is the best treatment there is`,s:2,go:'c',f:`Honest, hopeful, and specific. Fear raises heart rate and pain — information helps.`},
{x:`Tell him not to worry, it’s nothing serious`,s:0,go:'c',f:`False reassurance breaks trust. He knows something serious is happening.`}]},
c:{x:`<p>While waiting, he becomes pale. The monitor alarms.</p>`,mon:{hr:'--',bp:'--',sp:'--',r:'vf'},strip:'vf',stripl:'Monitor',
ch:[{x:`Shout for help, check for a pulse (none) — defibrillate immediately with the pads already on, then CPR`,s:2,go:'d',f:`Monitored, witnessed VF: shock as fast as possible. Pads should already be on every STEMI patient.`},
{x:`Give amiodarone first`,s:0,go:'d',f:`Shock first.`}]},
d:{x:`<p>After one shock he has a pulse and opens his eyes. He goes to the cath lab at 01:42 — door-to-balloon time 47 minutes.</p>`,mon:{hr:96,bp:'118/74',sp:'97%',rr:18,r:'sinus'}}},
debrief:`STEMI patients can go into VF at any time before reperfusion. Pads on, defibrillator at the bedside, never alone in a corridor.`},
],
[
{t:'case',title:'01:40 · Paeds resus — the seizing toddler',pt:'2-year-old girl · ~12 kg',mon:{hr:168,bp:'—',sp:'91%',rr:40,t:'39.6'},start:'a',n:{
a:{x:`<p>She is jerking all four limbs. The mother is crying. The seizure started about 7 minutes ago at home.</p>`,say:{who:'Mother',ar:`بنتي! سوّوا لها شي الله يخليكم! من شوية وهي كدا!`,en:`My daughter! Please do something for her! She’s been like this for a while!`},
ch:[{x:`Oxygen, recovery position, check glucose, and give buccal (or IV/IO) midazolam now per the paediatric dose chart — it’s already over 5 minutes`,s:2,go:'b',f:`Seizure >5 minutes = status. First benzodiazepine now; don’t wait for IV access. Glucose is part of the first minute.`},
{x:`Wait — febrile seizures usually stop on their own`,s:0,go:'b',f:`Most do — within 5 minutes. This one hasn’t.`},
{x:`Give the adult dose of 10 mg midazolam to be sure it works`,s:0,go:'b',f:`Weight-based or age-banded dosing only. Overdose causes respiratory depression.`}]},
b:{x:`<p>Glucose 5.8 mmol/L. The seizure stops 3 minutes after the midazolam. She is drowsy but breathing well. The mother asks what happened.</p>`,mon:{hr:150,sp:'97%',rr:30},
ch:[{x:`Explain calmly that it looks like a febrile seizure, that the medicine stopped it, and that the team will look for the cause of the fever and keep her under observation`,s:2,go:'c',f:`Simple, honest and reassuring — and you haven’t closed the diagnosis. A seizure lasting longer than 15 minutes is a complex febrile seizure and needs paediatric review.`},
{x:`Tell her it was epilepsy`,s:0,go:'c',f:`Don’t label. This needs assessment by the paediatric team.`}]},
c:{x:`<p>She wakes up fully over the next hour. The source is an ear infection. Because the seizure was prolonged, she is admitted under paediatrics for observation.</p>`}},
debrief:`Status epilepticus in children follows the same clock as adults — 5 minutes, first dose; 10 minutes, second; then second-line — with weight-based doses checked by two people.`},
],
[
{t:'case',title:'02:30 · Urgent care — the police case',pt:'34M · brought by police',nomon:1,start:'a',n:{
a:{x:`<p>A police officer waits outside the cubicle. The patient has a 5 cm scalp laceration and several cuts on the back of his left forearm. He smells of nothing in particular and is fully alert.</p>`,say:{who:'Patient (quietly)',ar:`يا {دكتور لا تكتب|دكتورة لا تكتبي} إني تضاربت، الله {يخليك|يخليكي}، ما أبغى مشاكل.`,en:`Doctor, please don’t write that I was in a fight. I don’t want any trouble.`},
ch:[{x:`Explain that you will write down exactly what he tells you and what you see — nothing more, nothing less — and that you must inform your senior`,s:2,go:'b',f:`Honest and neutral. You don’t hide findings, and you don’t add conclusions.`},
{x:`Agree to leave it out of the notes`,s:0,go:'b',f:`Falsifying records is a serious breach. Your notes must be accurate.`}]},
b:{x:`<p>You examine him. Which documentation is best?</p>`,
ch:[{x:`“Pt states he was ‘hit with something’. 5 cm linear laceration, left parietal scalp, clean edges. Three linear lacerations 1–3 cm on the dorsal left forearm. GCS 15, no neuro deficit.”`,s:2,go:'c',f:`Precise, factual, measurable. A forensic reviewer can work with this.`},
{x:`“Stab wounds from an assault, defensive injuries on the arm.”`,s:0,go:'c',f:`“Stab”, “assault” and “defensive” are interpretations. Describe; don’t conclude.`},
{x:`“Multiple cuts. Fight.”`,s:0,go:'c',f:`Too vague, and states a conclusion.`}]},
c:{x:`<p>The officer asks you directly how dangerous the injuries are and whether the patient was drunk.</p>`,
ch:[{x:`Politely say the treating team will provide an official medical report through the hospital, and inform your senior and the police office`,s:2,go:'d',f:`Information to the police goes through the official channel and a licensed doctor.`},
{x:`Answer his questions — he’s the police`,s:0,go:'d',f:`Even with the police, there’s a process. Interns don’t give medico-legal opinions.`}]},
d:{x:`<p>Your senior reviews, the wounds are washed and closed, a tetanus booster is given, and the medical report is written by the registrar the next morning.</p>`}},
debrief:`In medico-legal cases, your notes may be read in court years later. Measure, describe, quote — and keep your opinion out.`},
],
[
{t:'case',title:'03:20 · Acute bed 9 — the frail grandmother',pt:'81F · diabetic, CKD',mon:{hr:118,bp:'88/50',sp:'93%',rr:26,t:'38.9',gcs:13},start:'a',n:{
a:{x:`<p>Her daughters say she has had a cough for 3 days and has been “sleepy” since the afternoon.</p>`,
ch:[{x:`Sepsis bundle now with Dr. Fahad aware: lactate, cultures, antibiotics, fluids in careful boluses (CKD), oxygen`,s:2,go:'b',f:`Same bundle, with careful fluid boluses and reassessment because of her kidneys and age.`},
{x:`Wait for the chest X-ray to confirm pneumonia before antibiotics`,s:0,go:'b',f:`Never delay antibiotics in septic shock for imaging.`}]},
b:{x:`<p>Lactate 5.2. After two boluses, her BP is 84/48. The registrar plans noradrenaline and calls ICU. One daughter takes you aside.</p>`,say:{who:'Her daughter',ar:`يا {دكتور|دكتورة}، أمي قالت لنا قبل كدا إنها ما تبغى أجهزة ولا إنعاش. لا تسوون لها كدا.`,en:`Doctor, my mother told us before that she doesn’t want machines or resuscitation. Please don’t do that to her.`},
ch:[{x:`Thank her, tell her this is important, and bring Dr. Fahad straight away — until a decision is made through the proper process, she remains full code`,s:2,go:'c',f:`Her previously expressed wishes matter a lot. But a DNR is a senior, three-physician decision and must be documented.`},
{x:`Write “DNR” on her chart since the family agrees`,s:0,go:'c',f:`Interns never write DNR, and family wishes alone don’t create one.`},
{x:`Tell the daughter that families can’t make that decision, and walk away`,s:0,go:'c',f:`Technically true, cold in practice. This is the start of an important conversation — escalate it.`}]},
c:{x:`<p>The consultant joins by phone, the ICU consultant and Dr. Fahad assess her. After discussion with the family, a DNR is documented by three physicians. She continues antibiotics, oxygen and noradrenaline on the ward, and comfort is prioritised.</p>`}},
debrief:`DNR doesn’t mean “stop treating”. She still gets antibiotics, fluids, oxygen, pain relief and dignity.`},
],
[
{t:'case',title:'04:30 · Resus — the wedding guest',pt:'19F · brought from a wedding hall',mon:{hr:128,bp:'82/50',sp:'91%',rr:28,t:'37.0'},start:'a',n:{
a:{x:`<p>She ate dessert at a wedding 20 minutes ago. Her lips are swollen, she has hives, and she is wheezing. Her cousin says she has a “nut allergy”.</p>`,say:{who:'Her cousin',ar:`أكلت حلا فيه مكسرات يمكن، وبعدين وجهها انتفخ وصارت تكح ومو قادرة تتنفس!`,en:`She ate a dessert that maybe had nuts in it, then her face swelled up, she started coughing and can’t breathe!`},
ch:[{x:`Adrenaline 0.5 mg IM into the outer thigh now, call Dr. Fahad, high-flow oxygen, lie her flat with legs raised (or sitting if breathing is worse), IV fluids`,s:2,go:'b',f:`Anaphylaxis with shock and wheeze. IM adrenaline is the treatment.`},
{x:`IV chlorphenamine and hydrocortisone first`,s:0,go:'b',f:`Antihistamines and steroids don’t treat airway swelling or shock. Adrenaline first.`},
{x:`Adrenaline 1 mg IV push`,s:0,go:'b',f:`IV bolus adrenaline is for cardiac arrest. In anaphylaxis it can cause arrhythmias and MI. IM — or a senior-run infusion if refractory.`}]},
b:{x:`<p>Five minutes later she is still wheezy, BP 88/54.</p>`,mon:{hr:120,bp:'88/54',sp:'94%'},
ch:[{x:`Repeat IM adrenaline 0.5 mg, fluid bolus, salbutamol nebuliser, and tell Dr. Fahad she isn’t responding`,s:2,go:'c',f:`Repeat every 5 minutes if needed. After two doses with ongoing shock, a senior starts an adrenaline infusion.`},
{x:`Wait — it can take time`,s:0,go:'c',f:`Five minutes is the interval to repeat.`}]},
c:{x:`<p>After the second dose she improves: BP 112/70, lips less swollen. The cousin asks if she can go back to the wedding.</p>`,mon:{hr:104,bp:'112/70',sp:'98%',rr:18},
ch:[{x:`Explain she must be observed for several hours because symptoms can return, and that the senior will decide on discharge with an adrenaline auto-injector, training and an allergy referral`,s:2,go:'d',f:`Observation (often 6–12 hours after severe reactions), auto-injector training before she leaves, allergy clinic follow-up.`},
{x:`Yes, she looks fine now`,s:0,go:'d',f:`Biphasic reactions can happen hours later.`}]},
d:{x:`<p>She is observed until morning and discharged by Dr. Fahad with two adrenaline auto-injectors and an allergy clinic appointment.</p>`}},
debrief:`IM adrenaline 0.5 mg, repeat every 5 minutes. Observe. Discharge with an auto-injector and a plan.`},
],
[
{t:'case',title:'05:50 · The waiting room again',pt:'38M · back pain · CTAS 4 at 00:30',nomon:1,start:'a',n:{
a:{x:`<p>The back-pain patient from 00:30 is still waiting. On your way past, you see him walking oddly to the bathroom. He comes back and stops you.</p>`,say:{who:'Patient',ar:`يا {دكتور|دكتورة}، صار لي ساعتين أحاول أسوي حمام وما أقدر، وحاس إن تحت عندي خدران، زي ما يكون مو حاس بشي.`,en:`Doctor, for two hours I’ve been trying to pass urine and I can’t, and I feel numb down below, like I can’t feel anything.`},
ch:[{x:`Red flags for cauda equina syndrome: re-triage, tell Dr. Fahad, bladder scan, examine perineal sensation and anal tone with a chaperone, urgent MRI`,s:2,go:'b',f:`Urinary retention + saddle anaesthesia after back pain = cauda equina until proven otherwise. It’s a surgical emergency.`},
{x:`Tell him the urine problem is from the painkillers and he will be seen soon`,s:0,go:'b',f:`Painkillers can cause retention, but with saddle numbness you must assume cauda equina.`}]},
b:{x:`<p>Bladder scan: 900 mL. Reduced sensation around the perineum. MRI confirms a large central disc prolapse compressing the cauda equina. Neurosurgery operates that morning.</p>`}},
debrief:`He was correctly triaged at 00:30. He changed. The waiting room is part of your department — every patient, every time you walk through.`},
],
[
{t:'h',x:`06:50 — Handover`},
{t:'p',x:`The day team has arrived. Still in the department: the grandmother (bed 9, waiting for an ICU bed), the toddler (waiting for a paediatric bed), the allergy patient (under observation), and the police case (sutured, waiting for the CT head report). The patient wanting sick leave has been seen by Dr. Fahad and has gone.`},
{t:'mcq',q:`Who do you hand over first?`,o:[`The police case — the police are waiting`,`The grandmother in septic shock on noradrenaline`,`The allergy patient — she wants to go home`,`The toddler — the mother is anxious`],a:1,e:`Sickest first. The unstable patient gets the most attention from the incoming team.`},
{t:'order',q:`Put your I-PASS handover of the grandmother in order.`,i:[`“Unstable.”`,`“Bed 9, 81F, CKD, pneumonia with septic shock — antibiotics at 03:35, 2 boluses, noradrenaline 0.1 mcg/kg/min, DNR documented by three physicians.”`,`“To do: repeat lactate at 07:30 — the nurse knows; ICU bed expected around 09:00.”`,`“If MAP falls below 65 despite the current dose, call the ICU registrar — the plan is to increase noradrenaline, no CPR.”`,`Receiver repeats back: “Unstable, lactate at 07:30, ICU at 9, escalate if MAP drops.”`],e:`Illness severity → Patient summary → Action list → Situation awareness → Synthesis.`},
],
[
{t:'mentor',x:`<p>07:15. You walk out into the Jeddah morning. Tonight you recognised a STEMI and a VF arrest, stopped a seizure, documented a police case properly, helped a family with an end-of-life decision, treated anaphylaxis, and caught a cauda equina in the waiting room.</p><p style="margin-top:8px">That is what an ER intern does. Go home, eat, and sleep. See you tomorrow night, {DR}.</p>`},
{t:'mentor',av:'FB',c:'s',who:'Dr. Fahad Bakr · Senior registrar',x:`<p class="ar">{يعطيك العافية يا دكتور|يعطيكي العافية يا دكتورة}</p><p>Good shift.</p>`},
]]});

/* ================= POCKET CARD ================= */
window.POCKET=[
['CTAS — time to doctor',[['1','Resuscitation — immediately'],['2','Emergent — 15 min'],['3','Urgent — 30 min'],['4','Less urgent — 60 min'],['5','Non-urgent — 120 min']]],
['Call your senior — always',[['Now','CTAS 1–2 · abnormal vitals · abnormal ECG · GCS drop · any worry'],['Before','every discharge · any DAMA · any medico-legal case'],['Always','deaths · complaints · aggression · suspected abuse']]],
['Cardiac arrest (adult)',[['CPR','100–120/min · 5–6 cm · full recoil · pause <10 s · 30:2'],['VF/pVT','Shock → CPR 2 min. Adrenaline 1 mg after 2nd shock, then q3–5 min. Amiodarone 300 mg after 3rd, 150 mg after 5th'],['Asystole/PEA','CPR + adrenaline 1 mg ASAP, then q3–5 min'],['Hs','Hypoxia · Hypovolaemia · H⁺ · K⁺ · Hypothermia'],['Ts','Tension · Tamponade · Toxins · Thrombosis (PE / coronary)'],['Post-ROSC','SpO₂ 92–98% · MAP ≥65 · 12-lead · glucose · avoid fever']]],
['Time-critical numbers',[['10 min','Door-to-ECG in chest pain'],['≤90 min','Door-to-balloon in STEMI'],['≤60 min','Door-to-needle in stroke'],['4.5 h','Thrombolysis window from last known well'],['1 h','Sepsis bundle'],['3 h','TXA window in trauma'],['5 min','Seizure = status epilepticus'],['6 h','Testicular torsion salvage window']]],
['Key adult doses — confirm with CMC formulary',[['Aspirin','300 mg chewed (ACS)'],['Adrenaline IM','0.5 mg (0.5 mL of 1 mg/mL) — anaphylaxis, repeat q5 min'],['Lorazepam','4 mg IV (0.1 mg/kg) · or midazolam 10 mg IM/buccal'],['Levetiracetam','60 mg/kg IV, max 4.5 g'],['Salbutamol','5 mg nebulised · ipratropium 0.5 mg'],['MgSO₄','2 g IV over 20 min (asthma) · 4 g load then 1 g/h (eclampsia)'],['TXA','1 g over 10 min, then 1 g over 8 h'],['Ceftriaxone','2 g IV — suspected meningococcal disease'],['Calcium gluconate 10%','30 mL IV over 5–10 min — hyperkalaemia with ECG changes'],['Insulin + dextrose','10 units + 25 g glucose — hyperkalaemia'],['DKA insulin','0.1 units/kg/h fixed rate — check K⁺ first'],['Atropine (OP)','1–2 mg IV, double q5 min to a dry chest']]],
['Children',[['Weight','<1 y: 0.5×months+4 · 1–5 y: 2×age+8 · 6–12 y: 3×age+7'],['Bolus','10 mL/kg crystalloid, reassess'],['Glucose','10% dextrose 2 mL/kg'],['Arrest','Adrenaline 10 mcg/kg · shock 4 J/kg'],['Febrile infant','<28 days: full septic workup + IV antibiotics · <3 months: senior'],['Safeguarding','TEN-4: bruising Torso, Ears, Neck under 4 y, or anywhere under 4 months']]],
['Sepsis & fever',[['qSOFA','RR ≥22 · new confusion · SBP ≤100 (any 2 = red flag)'],['Bundle','Lactate · cultures · antibiotics · 30 mL/kg if SBP low or lactate ≥4 · noradrenaline for MAP <65'],['Dengue','Paracetamol only · no NSAIDs/aspirin/IM · danger as fever settles · narrow pulse pressure = shock'],['Rash + fever','Non-blanching → ceftriaxone now'],['Heat stroke','>40 °C + CNS change → cool first, stop ~38.5–39 °C'],['MERS screen','Contact with a confirmed case · healthcare exposure · camel contact → isolate, N95']]],
['Law & ethics — Saudi',[['Consent','Competent adult (man or woman) consents for themselves · guardian for under 18 · emergency exception'],['DNR','Three physicians · no valid form = full code · interns never write DNR'],['MLC','RTA · assault · burns · poisoning · firearms · work injury · unknown patient · unexpected death'],['Abuse','Report suspicion via senior / Child Protection team · 1919 line'],['Not for interns','Discharge · death certificate · sick leave (Seha) · medical reports · consent for procedures']]],
['Communication',[['SBAR','Situation · Background · Assessment · Recommendation'],['I-PASS','Illness severity · Patient · Action list · Situation awareness · Synthesis'],['SPIKES','Setting · Perception · Invitation · Knowledge · Emotion · Strategy'],['One-liner','Age, sex, background, complaint, duration, key finding, concern, plan']]],
['Useful numbers in Saudi Arabia',[['997','Red Crescent ambulance'],['911','Unified emergency number (Makkah region incl. Jeddah)'],['999','Police'],['1919','Domestic violence and child abuse reporting'],['937','MOH call centre']]]
];
