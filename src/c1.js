window.MODULES=window.MODULES||[];
const CT=[{l:'CTAS 1',c:'#1E5BD8'},{l:'CTAS 2',c:'#D6293E'},{l:'CTAS 3',c:'#E2AC00'},{l:'CTAS 4',c:'#1E9E5A'},{l:'CTAS 5',c:'#FFFFFF'}];

/* ================= MODULE 1 ================= */
MODULES.push({id:'m01',n:1,part:'Part A · Arrive',partSub:'Know the place before you touch a patient',title:'Welcome to the ED',sub:'What the ER really is, the map, the team, and what you can and cannot do as an intern',mins:20,
take:[
`The ED does not ask “what is the diagnosis?” first. It asks <b>“what could kill this patient in the next hour?”</b>`,
`Interns are not licensed by SCFHS. Every order, discharge, report and certificate goes through a licensed doctor. Know your limits and say them out loud.`,
`Take the next patient on the board by acuity and time. <b>Never cherry-pick.</b>`,
`The charge nurse runs the floor. Make them your ally on day one.`,
`If you are worried, your senior wants to know — now, not at handover.`],
s:[
[
{t:'mentor',x:`<p>Welcome to the Emergency Department, {DR}. I’m Hanan — I run the intern program here at Corniche Medical City. I have trained interns for twelve years, and every group asks me the same thing on day one: <i>“What will you actually expect from me?”</i></p><p style="margin-top:8px">This program is my answer. Over the next few hours I’ll show you the floor, the rules that protect you and your patients, and the cases that will walk through our doors this month. You will make decisions, some will be wrong, and that is exactly the point — better here than in Resus at 3 a.m.</p>`},
{t:'nums',i:[['≈ 300','patients a day through our ED'],['12 h','shift length — days and nights'],['4–8 wk','your ER rotation'],['24/7','senior EM cover on the floor']]},
{t:'call',k:'local',x:`Corniche Medical City (CMC) is a fictional 600-bed tertiary hospital in Jeddah used for this program. Where you see <b>CMC policy</b>, check what your own hospital does — the principle stays the same, the details may not.`},
],
[
{t:'h',x:`What the ER actually is`},
{t:'p',x:`On the wards, a patient arrives with a diagnosis and a plan. In the ED, they arrive with a <b>complaint</b> — “chest pain”, “dizzy”, “my son is not himself” — and nobody has thought about them yet. You are the first.`},
{t:'p',x:`That changes how you think. Emergency medicine runs on three questions, in this order:`},
{t:'list',o:1,i:[`<b>Is this patient sick or not sick?</b> (decided in seconds, from the doorway)`,`<b>What is the worst thing this could be</b> — and have I ruled it out?`,`<b>Where does this patient go next?</b> Admit, observe, or home safely — this is called <i>disposition</i>.`]},
{t:'p',x:`Notice what is missing: “What is the exact diagnosis?” Often you won’t know. That is acceptable. Sending home a missed heart attack is not.`},
{t:'cards',i:[
[`Myth: The ER is a fast clinic.`,`Reality: It is a risk-sorting machine. Speed matters only after safety. A slow, safe intern is worth more than a fast, careless one.`],
[`Myth: Interns just do cannulas and paperwork.`,`Reality: You will clerk, examine, present, plan and reassess real patients. Your history is often the one the whole team relies on.`],
[`Myth: If the tests are normal, the patient is fine.`,`Reality: Normal tests in a patient who looks unwell mean you haven’t found it yet. Treat the patient, not the paper.`],
[`Myth: Asking for help looks weak.`,`Reality: Interns who never call are the ones who worry us. Calling early is a skill we grade you on.`]]},
],
[
{t:'h',x:`The map of the department`},
{t:'p',x:`Learn the zones on your first shift. Patients are placed by how sick they are, not by what they have.`},
{t:'tool',name:'edmap'},
{t:'sort',q:`Where does each patient belong?`,bins:[{l:'Resus'},{l:'Acute'},{l:'Urgent care'},{l:'Isolation'}],i:[
{x:`67-year-old, unresponsive after collapsing at home, BP 70/40`,b:0,w:`Shocked and unresponsive = Resus, whatever the cause.`},
{x:`31-year-old nurse from another hospital, fever and cough for 4 days. A patient on her ward was confirmed with MERS last week.`,b:3,w:`Fever + cough + contact with a confirmed MERS case (and healthcare work) meets the MERS-CoV screening definition. Isolate first, then assess.`},
{x:`22-year-old with a sprained ankle, walking with a limp`,b:2,w:`Stable, walking, single minor injury — Urgent care.`},
{x:`55-year-old diabetic with abdominal pain and vomiting, vitals stable`,b:1,w:`Needs a bed, bloods and observation. Not unstable, but not minor either.`},
{x:`35-year-old with a 3 cm forearm laceration, bleeding controlled`,b:2,w:`Minor procedure — Urgent care.`},
{x:`40-year-old, chest pain and sweating, HR 110`,b:0,w:`Possible ACS with tachycardia and diaphoresis. Resus or a monitored acute bed with immediate ECG — at CMC, Resus.`}]},
],
[
{t:'h',x:`The team — who is who`},
{t:'table',head:['Role','What they do','Call them when'],rows:[
['Attending consultant','Final responsibility for every patient on shift','Your senior escalates; you join the conversation'],
['Senior registrar / resident','Runs the floor with the consultant; your direct supervisor','<b>Any time you are worried.</b> Before every discharge. Every abnormal ECG.'],
['Charge nurse','Runs the beds, the staff, the flow','Bed allocation, a nurse for a procedure, a patient who disappeared'],
['Bedside / triage nurses','Vitals, meds, monitoring — they see the patient more than you do','Listen when a nurse says “I’m worried about bed 7”'],
['Respiratory therapist (RT)','Oxygen, NIV, ventilators, ABGs in many hospitals','Patient on BiPAP, intubation setup'],
['Clinical pharmacist','Doses, interactions, antidotes, infusions','Any infusion, any paediatric dose, any doubt'],
['Patient relations','Complaints, requests, family conflict','A family wants to complain or escalate'],
['Social worker','Abuse, homelessness, no family, unsafe discharge','Suspected abuse; elderly patient with nobody at home'],
['Security','Safety of staff and patients','Aggression, threats, a patient trying to leave while confused']]},
{t:'mentor',x:`<p>A secret every senior knows: our nurses have seen ten thousand patients. When Maricel, our charge nurse, says a patient “doesn’t look right”, I walk over. So should you.</p>`},
{t:'say',who:'Maricel · Charge nurse (to you, on day one)',ar:`{دكتور، أهلاً فيك|دكتورة، أهلاً فيكي}. أي مريض {تحس|تحسّي} إنه مو مزبوط، {قول|قولي} لي على طول. {لا تستنى|لا تستنّي}.`,en:`Doctor, welcome. Any patient you feel isn’t right, tell me straight away. Don’t wait.`},
{t:'sort',q:`Who do you call first?`,bins:[{l:'My senior'},{l:'Charge nurse'},{l:'Pharmacist'},{l:'Social worker'},{l:'Security'}],i:[
{x:`Your patient’s new ECG shows ST elevation in II, III, aVF`,b:0,w:`STEMI. Senior immediately — this is a cath lab activation.`},
{x:`You need a nurse to stay with a confused patient while you do a procedure in another bed`,b:1,w:`Staffing and beds belong to the charge nurse.`},
{x:`You are unsure of the gentamicin dose for a 48 kg patient with a creatinine of 160`,b:2,w:`Renally adjusted doses — pharmacist (and your senior signs the order).`},
{x:`A 78-year-old woman is medically fit to go home but says nobody is at home to look after her`,b:3,w:`Unsafe discharge — social work, with your senior aware.`},
{x:`A relative is shouting and has pushed a nurse`,b:4,w:`Staff safety first. Step back, call security, then your senior.`}]},
],
[
{t:'h',x:`Your role as an intern`},
{t:'p',x:`In Saudi Arabia, an intern has finished medical school but is <b>not yet licensed by the Saudi Commission for Health Specialties (SCFHS)</b>. You work under supervision. That is not a formality — it decides what you may sign.`},
{t:'table',head:['You CAN (under supervision)','You CANNOT do alone'],rows:[
['Take histories, examine, present, suggest a plan','Discharge a patient'],
['Write notes and suggest orders for countersignature','Sign a death certificate or pronounce death alone'],
['Do basic procedures you are signed off for: cannula, bloods, ABG, ECG, catheter, simple suturing','Issue sick leave or a medical report'],
['Talk to patients and families about the plan your senior agreed','Break bad news or discuss DNR / code status'],
['Do CPR, bag-mask ventilate, help in Resus','Take consent as the doctor performing a procedure'],
['Call consultations when your senior asks you to','Prescribe controlled drugs (opioids, benzodiazepines) alone']]},
{t:'call',k:'rule',title:'The golden rule',x:`If you are about to do something you have never done, or never done here — stop and ask. “I haven’t done this before, can you supervise me?” is a sentence I want to hear every day.`},
{t:'multi',q:`Which of these can an intern do <b>without</b> a senior countersigning or being present?`,o:[`Take a history and examine a CTAS 3 patient`,`Discharge a patient with a sprained ankle`,`Do a 12-lead ECG and show it to the senior`,`Write a sick leave for a patient who asks`,`Start chest compressions on a patient in arrest`,`Tell a family their father has died`],a:[0,2,4],e:`Assessing, getting ECGs and starting CPR are your job. Discharges, sick leave and breaking news of a death need a licensed doctor — you may be beside them, and that is how you learn.`},
],
[
{t:'h',x:`A 12-hour shift, hour by hour`},
{t:'list',i:[
`<b>06:45 — Arrive early.</b> Change, find your senior, check the board.`,
`<b>07:00 — Handover.</b> The night team hands over every patient still in the department. Write it down.`,
`<b>07:30 — Board round.</b> Senior assigns or you pick patients. Highest acuity and longest waiting first.`,
`<b>All shift — the cycle:</b> see → present → plan → order → <b>reassess</b> → disposition. Then the next patient.`,
`<b>Breaks.</b> Eat, drink, pray. Tell your senior and the charge nurse before you go. Never leave a sick patient mid-plan.`,
`<b>18:30 — Prepare handover.</b> Results chased, plans written, nothing “pending” without a name next to it.`,
`<b>19:00 — Hand over</b> in person, at the board. Then go home.`]},
{t:'order',q:`Put your workflow for one new patient in the right order.`,i:[`Look at the triage note and vitals`,`See and examine the patient`,`Present to your senior with a plan`,`Write the orders for countersignature`,`Reassess after treatment and results`,`Agree disposition with your senior`],e:`The step interns skip most is <b>reassess</b>. A patient who got morphine and fluids is a different patient 40 minutes later.`},
{t:'mcq',q:`The board has four waiting patients. Which do you pick up first?`,o:[`A CTAS 4 ankle injury — quick, you can clear it in 10 minutes`,`A CTAS 3 abdominal pain waiting 50 minutes`,`A CTAS 3 headache waiting 20 minutes`,`A CTAS 5 prescription refill waiting 2 hours`],a:1,e:`Pick by <b>acuity first, then waiting time</b>. Choosing the quick ones (“cherry-picking”) leaves sick patients waiting and is the fastest way to lose your senior’s trust.`},
],
[
{t:'case',title:'Your first hour',pt:'Day 1 · 07:40',nomon:1,start:'a',n:{
a:{x:`<p>You have just finished handover. As you walk to the board, a man in his forties stops you in the corridor. He looks exhausted and angry.</p>`,say:{who:'Relative in the corridor',ar:`يا {دكتور|دكتورة} الله {يخليك|يخليكي}، أبويا له ساعتين قاعد هنا وما في أحد شافه! إيش الحكاية؟`,en:`Doctor, please — my father has been sitting here for two hours and nobody has seen him! What is going on?`},
ch:[{x:`Tell him the ER is busy and he has to wait like everyone else`,s:0,go:'b',f:`True, but it shuts him down and you learned nothing about his father, who may be getting worse.`},
{x:`Introduce yourself, ask his father’s name and what he came in with, and say you will check where he is on the list`,s:2,go:'c',f:`Name, empathy, action. Most anger in the ED is fear plus waiting. A two-minute conversation prevents a complaint.`},
{x:`Take the father straight into a bed and see him now`,s:0,go:'b',f:`You just skipped every patient triaged as sicker. Triage protects the sickest — including from you.`}]},
b:{x:`<p>The son raises his voice. Maricel looks over. You take a breath and start again: you introduce yourself and ask about his father.</p>`,ch:[{x:`Continue`,s:1,go:'c',f:`Recovering is fine. Next time, lead with the name and the question.`}]},
c:{x:`<p>His father is 71, diabetic, triaged CTAS 3 for “weakness since yesterday”. The triage vitals two hours ago were normal. You look over at him in the waiting area: he is pale and leaning against the wall.</p>`,
ch:[{x:`Ask the triage nurse to repeat his vitals now and tell her he looks worse`,s:2,go:'d',f:`Exactly. Triage is a snapshot. When a waiting patient looks different, re-triage.`},
{x:`Reassure the son that CTAS 3 means he is stable`,s:0,go:'d',f:`CTAS was right two hours ago. “Weakness” in an elderly diabetic can be sepsis, hypoglycaemia, a silent MI or a stroke.`}]},
d:{x:`<p>Repeat vitals: HR 118, BP 92/58, glucose 3.1 mmol/L (56 mg/dL). He is moved to Acute and you tell your senior. He is treated within minutes.</p><p>The son comes to find you later and says <i>“{الله يجزاك خير يا دكتور|الله يجزاكي خير يا دكتورة}”</i> — may God reward you.</p>`}},
debrief:`Two lessons from your first hour: <b>treat anger as information</b>, and <b>the waiting room is part of your department</b>. Patients deteriorate there.`},
]]});

/* ================= MODULE 2 ================= */
MODULES.push({id:'m02',n:2,part:'Part A · Arrive',title:'Triage with CTAS',sub:'How the ED decides who is seen first — and how to spot the patient who was under-triaged',mins:25,
take:[
`CTAS 1 immediately · 2 within 15 min · 3 within 30 · 4 within 60 · 5 within 120.`,
`Triage is a snapshot. Every patient can be <b>re-triaged</b> — and you should ask for it when someone looks worse.`,
`Abnormal vital signs, severe pain and a high-risk mechanism all push the level up.`,
`The elderly, diabetics, the immunocompromised, pregnant women and small children hide how sick they are.`,
`Status, wasta and volume of complaint never change the CTAS level. Only clinical findings do.`],
s:[
[
{t:'mentor',x:`<p>Most Saudi hospitals, including ours, use the <b>Canadian Triage and Acuity Scale — CTAS</b>. Triage nurses do it, but you must understand it: you will read it on every patient, and you will be the one who notices when it was wrong.</p>`},
{t:'table',head:['Level','Name','See doctor within','Typical examples'],rows:[
['<span class="ctas c1">1</span>','Resuscitation','Immediately','Cardiac arrest, major trauma in shock, severe respiratory distress, GCS 3–9'],
['<span class="ctas c2">2</span>','Emergent','15 minutes','Chest pain that could be cardiac, stroke symptoms, GCS 10–13, severe pain 8–10/10, suspected sepsis, overdose'],
['<span class="ctas c3">3</span>','Urgent','30 minutes','Moderate breathlessness, moderate pain 4–7/10, vomiting with mild dehydration, mild head injury awake'],
['<span class="ctas c4">4</span>','Less urgent','60 minutes','Minor laceration, sprain, UTI symptoms, chronic back pain without red flags'],
['<span class="ctas c5">5</span>','Non-urgent','120 minutes','Sore throat without distress, dressing change, medication refill']]},
{t:'call',k:'pearl',x:`The colours are not decoration. At CMC the triage band and the board use them: <span class="ctas c1">1</span> blue, <span class="ctas c2">2</span> red, <span class="ctas c3">3</span> yellow, <span class="ctas c4">4</span> green, <span class="ctas c5">5</span> white. Learn to read the board at a glance.`},
],
[
{t:'h',x:`How a level is decided`},
{t:'p',x:`The nurse starts with the <b>complaint</b> (e.g. “chest pain”), then applies <b>modifiers</b> that can push the level up:`},
{t:'list',i:[`<b>Vital signs</b> — shock, hypoxia, fever with signs of sepsis, altered consciousness.`,`<b>Pain</b> — severe acute central pain (chest, abdomen, head) goes higher than peripheral pain.`,`<b>Mechanism of injury</b> — high-speed RTA, ejection, fall from height, pedestrian hit.`,`<b>Specific risks</b> — immunocompromised with fever, anticoagulated with head injury, pregnant with abdominal pain.`]},
{t:'call',k:'idea',x:`Triage doesn’t ask <i>“what is wrong with this patient?”</i> It asks <b>“who can safely wait — and for how long?”</b> That’s why one bad vital sign can move someone to the front, even with a “minor” complaint.`},
{t:'tool',name:'ctas'},
{t:'call',k:'danger',title:'Under-triage traps',x:`These patients look better than they are:<ul><li><b>Elderly</b> — sepsis without fever, MI without pain, fractures from a “simple fall”.</li><li><b>Diabetics</b> — silent MI presenting as “tiredness” or “indigestion”. Very common in our population.</li><li><b>Young women</b> — abdominal pain + late period = ectopic until proven otherwise.</li><li><b>Children</b> — compensate until they suddenly crash.</li><li><b>Patients on beta-blockers</b> — no tachycardia even when bleeding.</li></ul>`},
{t:'mcq',q:`A 74-year-old woman is triaged CTAS 4 for “generally unwell”. Temperature 36.4 °C, HR 96, BP 104/60, RR 24, confused according to her daughter. What do you do?`,o:[`Nothing — the CTAS level is the nurse’s decision`,`Ask for re-triage: new confusion with RR 24 and soft BP suggests sepsis — CTAS 2`,`Wait for her turn, then order a urine test`,`Ask the daughter if the confusion is normal for her, and if so, leave her as CTAS 4`],a:1,e:`New confusion + fast breathing + soft BP = qSOFA 3 even without fever. Elderly septic patients are often afebrile. Speak up politely: “I’m worried she may be septic — could we re-triage?”`},
],
[
{t:'h',x:`Triage challenge — you are the triage doctor`},
{t:'p',x:`It is a Thursday evening in late summer. Ten patients are in the waiting area. Assign each a CTAS level.`},
{t:'sort',tag:'Triage 10 patients',q:`Assign a CTAS level to each patient.`,bins:CT,i:[
{x:`58M, central chest tightness for 40 min, sweaty. HR 98, BP 150/90, SpO₂ 97%.`,b:1,w:`Chest pain with cardiac features = CTAS 2, ECG within 10 minutes. If unstable, it becomes CTAS 1.`},
{x:`24M brought by friends, collapsed at the Corniche after jogging in 44 °C heat, confused, hot dry skin. Temp 41.2 °C.`,b:0,w:`Heat stroke: core temp >40 °C with altered mental state. Life-threatening — CTAS 1, cool immediately.`},
{x:`31F, sore throat for 2 days, eating and drinking, normal vitals.`,b:4,w:`CTAS 5. Still check for drooling, stridor or trismus.`},
{x:`45M, left-sided weakness and slurred speech that started 50 minutes ago.`,b:1,w:`Possible stroke inside the treatment window. CTAS 2 at minimum; most hospitals activate a stroke code from triage.`},
{x:`19M, 2 cm cut on his finger from a kitchen knife, bleeding controlled.`,b:3,w:`Minor laceration, controlled — CTAS 4.`},
{x:`3-year-old, fever 39.5 °C for 1 day, playful, drinking well, normal work of breathing.`,b:2,w:`Febrile child who looks well — CTAS 3. (A febrile infant under 3 months would be CTAS 2.)`},
{x:`66F, cannot finish a sentence, RR 34, SpO₂ 84% on air, known COPD.`,b:0,w:`Severe respiratory distress with hypoxia — CTAS 1.`},
{x:`37M, lower back pain for 3 weeks, no trauma, no fever, no numbness, walking.`,b:3,w:`Chronic, no red flags — CTAS 4. Red flags (saddle numbness, urinary retention, fever, cancer history) would push it up.`},
{x:`28F, lower abdominal pain, period “a week late”, HR 112, BP 98/62.`,b:1,w:`Possible ruptured ectopic with early shock. CTAS 2 — and a pregnancy test now.`},
{x:`52M, needs a refill of his blood pressure tablets, ran out yesterday, BP 142/88.`,b:4,w:`CTAS 5. Still check his BP is not dangerously high and he has no symptoms.`}]},
],
[
{t:'h',x:`Re-triage and the waiting room`},
{t:'p',x:`A CTAS level describes the patient <b>at the moment of triage</b>. Waiting times at a busy Jeddah ED can be long, especially on weekend nights and in Ramadan after iftar. People change.`},
{t:'list',i:[`Vitals should be repeated at intervals set by the CTAS level (CMC policy: at least every 30 min for CTAS 3 who are still waiting).`,`Any patient or relative who says “he is getting worse” gets a nurse looking at them — not a promise.`,`If you walk through the waiting area and someone looks grey, sweaty, confused or breathless: <b>tell the triage nurse and stay until they are reassessed</b>.`]},
{t:'case',title:'The waiting room',pt:'Thursday · 22:15',start:'a',mon:{hr:88,bp:'128/76',sp:'98%',rr:18,t:'37.0'},n:{
a:{x:`<p>A 33-year-old man was triaged CTAS 4 an hour ago: “headache since this afternoon, took paracetamol”. His wife comes to the triage desk.</p>`,say:{who:'His wife',ar:`لو سمحتوا، زوجي يقول الصداع مرة قوي وصار يرجّع، وقال إنه جاه فجأة كأن أحد ضربه على راسه.`,en:`Excuse me, my husband says the headache is really bad and he’s started vomiting. He said it came suddenly, like someone hit him on the head.`},
ch:[{x:`Tell her headaches often cause vomiting and he will be seen soon`,s:0,go:'b',f:`“Sudden, like being hit on the head” is a thunderclap headache — subarachnoid haemorrhage until proven otherwise.`},
{x:`Go and see him now, ask about the onset, and ask the nurse to re-triage`,s:2,go:'c',f:`The history the wife just gave changes everything. A <b>sudden, worst-ever headache</b> is CTAS 2.`}]},
b:{x:`<p>Ten minutes later he vomits again in the waiting area and seems drowsy.</p>`,mon:{hr:62,bp:'168/96',gcs:13},ch:[{x:`Now get him re-triaged and call your senior`,s:1,go:'c',f:`Better late than never — but drowsiness means bleeding may be worsening. The earlier signal was enough.`}]},
c:{x:`<p>He describes the headache as “the worst of my life”, maximum within a minute. Neck slightly stiff. GCS 15 but photophobic.</p>`,mon:{hr:70,bp:'158/94',gcs:15},ch:[{x:`CTAS 2, tell your senior, urgent non-contrast CT head`,s:2,go:'d',f:`Right. A CT within 6 hours of onset is very sensitive for SAH. Keep him lying quietly, control pain and nausea.`},
{x:`Give metoclopramide and paracetamol and see if it settles`,s:0,go:'d',f:`Response to painkillers does <b>not</b> rule out SAH. A “sentinel bleed” can improve before it rebleeds.`}]},
d:{x:`<p>CT shows subarachnoid blood. Neurosurgery is called. Your senior thanks the wife — and you.</p>`}},
debrief:`Relatives give you history the triage note does not have. <b>Onset</b> is the key word in headache: sudden = dangerous.`},
],
[
{t:'h',x:`Status, wasta and the queue`},
{t:'say',who:'A visitor on the phone, handing it to you',ar:`الدكتور فلان يبغى يكلمك، هذا قريبنا، يبغاكم تشوفون أمي دحين {لو سمحت|لو سمحتي}.`,en:`Dr. so-and-so wants to talk to you — he’s our relative. He’d like you to see my mother now, please.`},
{t:'p',x:`This will happen. Someone knows someone. The answer is always the same, and always polite: <b>the order is decided by how sick the patient is</b>. If the mother is sicker than triage thinks, she will be moved up — for clinical reasons.`},
{t:'call',k:'pearl',title:'A script that works',x:`“I understand you’re worried. Everyone here is seen in order of how urgent their condition is — that’s what protects your mother if she becomes sicker. Let me ask the nurse to check her again now.”<br>Then actually ask for her vitals. You have helped, and nobody jumped the queue.`},
{t:'mcq',q:`A well-known businessman with a CTAS 4 wrist sprain asks to be seen before a CTAS 3 elderly man. The hospital director’s office calls asking you to “take care of him”. What is right?`,o:[`See the businessman first — the call came from the director’s office`,`Explain politely that patients are seen by clinical priority, inform your senior, and see the CTAS 3 patient first`,`Ask the elderly man if he minds waiting`,`Discharge the businessman with a sling without examining him`],a:1,e:`Clinical priority protects everyone, including you. Let your senior deal with the administrative side — that is their job. Never skip an examination to “get rid of” someone.`},
]]});
