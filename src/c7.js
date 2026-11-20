/* ================= MODULE 13 ================= */
MODULES.push({id:'m13',n:13,part:'Part D · Core presentations',title:'Poisons, bites, the sea & sugar',sub:'Overdose, organophosphates, scorpions and snakes, Red Sea injuries, drowning, carbon monoxide, DKA, hypoglycaemia and high potassium',mins:25,
take:[
`Every poisoned patient: ABCDE, glucose, ECG, time of ingestion. Every intentional overdose: paracetamol and salicylate levels, a safe observed space, and psychiatric assessment before discharge.`,
`Organophosphates: protect yourself, decontaminate, then <b>atropine</b> — doubling doses until the chest is dry.`,
`Snakebite: immobilise, no tourniquet or cutting, 20-minute whole blood clotting test, antivenom for systemic envenomation.`,
`Stonefish or stingray sting: hot water (as hot as tolerated, ~40–45 °C) for 30–90 minutes.`,
`DKA: fluids first, fixed-rate insulin 0.1 units/kg/h, <b>check potassium before insulin</b>, add dextrose when glucose falls below 14 mmol/L.`],
s:[
[
{t:'mentor',x:`<p>Toxicology scares interns because there are thousands of toxins. Relax: the first hour is almost always the same — support the ABCs, check the glucose and ECG, find out what, how much and when, and call the poison centre. The antidotes are a short list.</p>`},
{t:'list',title:'The poisoned patient — first steps',i:[`ABCDE and <b>glucose</b>`,`12-lead ECG: QRS width (tricyclics, sodium-channel blockers), QTc, heart block`,`What, how much, when, and was anything else taken? Ask for the packets.`,`<b>Paracetamol and salicylate levels</b> in every intentional overdose — paracetamol is silent for the first day.`,`Call the regional poison control centre for advice — your senior knows the number.`,`Never leave a patient with an intentional overdose alone, and never discharge without a psychiatric assessment.`]},
{t:'sort',q:`Match the poison to its antidote or key treatment.`,bins:[{l:'N-acetylcysteine'},{l:'Naloxone'},{l:'Atropine'},{l:'100% oxygen'},{l:'Sodium bicarbonate'},{l:'Flumazenil — rarely'}],i:[
{x:`Paracetamol`,b:0},
{x:`Opioids (heroin, tramadol, morphine)`,b:1,w:`Small pupils + slow breathing + drowsiness. Titrate to breathing, not full alertness.`},
{x:`Organophosphate pesticides`,b:2},
{x:`Carbon monoxide`,b:3},
{x:`Tricyclic antidepressants with a wide QRS`,b:4},
{x:`Benzodiazepines`,b:5,w:`Usually just supportive care. Flumazenil can trigger seizures, especially in mixed overdoses or chronic users.`}]},
{t:'call',k:'pearl',title:'Paracetamol',x:`Take a level <b>4 hours</b> after ingestion (or on arrival if later) and plot it on the CMC nomogram. Start N-acetylcysteine without waiting if: the time of ingestion is unknown, the overdose was staggered over hours, the patient presents more than 8 hours after, or they are already jaundiced.`},
],
[
{t:'h',x:`Organophosphates — farms around Jeddah`},
{t:'p',x:`Pesticide exposure is seen in agricultural workers in the farms around Jeddah and the wider Makkah region. Organophosphates block acetylcholinesterase, flooding the body with acetylcholine.`},
{t:'table',head:['Muscarinic (“wet”)','Nicotinic','CNS'],rows:[['Salivation, lacrimation, urination, diarrhoea, vomiting, <b>bronchorrhoea</b>, bronchospasm, bradycardia, small pupils','Muscle twitching, weakness, paralysis (including breathing muscles), tachycardia','Confusion, seizures, coma']]},
{t:'case',title:'The farm worker',pt:'Resus · 11:30',mon:{hr:48,bp:'96/60',sp:'86%',rr:28,t:'36.9'},start:'a',n:{
a:{x:`<p>A 30-year-old farm worker is brought in by his co-worker after spraying crops. He is drooling, sweating, has vomited and his clothes are wet. The co-worker speaks a little Arabic.</p>`,say:{who:'Co-worker',ar:`هو يرش دوا في المزرعة... بعدين طاح... ريحة قوية`,en:`He was spraying medicine on the farm… then he fell… a strong smell`},
ch:[{x:`PPE on, remove his clothes into a sealed bag, wash his skin, and tell your senior — then ABC`,s:2,go:'b',f:`Staff can be poisoned by contaminated clothes and vomit. Decontamination is part of the resuscitation.`},
{x:`Start examining him straight away with gloves only`,s:1,go:'b',f:`Gloves alone aren’t enough with heavily contaminated clothing. Protect the team, then treat.`}]},
b:{x:`<p>His chest is full of crackles and wheeze, pupils pinpoint, HR 48. Your senior asks what you want to give.</p>`,
ch:[{x:`Atropine 1–2 mg IV, doubling the dose every 5 minutes until the chest is clear, HR >80 and systolic BP >80`,s:2,go:'c',f:`Correct. Some patients need tens of milligrams. The target is a dry chest — not the pupil size.`},
{x:`Furosemide for the “pulmonary oedema”`,s:0,go:'c',f:`The fluid is bronchial secretions from muscarinic excess. Atropine dries them.`},
{x:`A single 0.5 mg dose of atropine and observe`,s:0,go:'c',f:`Far too little. Doses are escalated quickly.`}]},
c:{x:`<p>After 2, 4, then 8 mg his chest clears, HR 92, SpO₂ 94%. Pralidoxime is started per protocol. Your senior asks about intubating if he tires.</p>`,mon:{hr:92,bp:'110/70',sp:'94%',rr:20},
ch:[{x:`Mention that suxamethonium should be avoided — its effect can be greatly prolonged in organophosphate poisoning`,s:2,go:'d',f:`Exactly — a rocuronium-based RSI is preferred.`},
{x:`No difference — any RSI drug is fine`,s:0,go:'d',f:`Suxamethonium is broken down by cholinesterases, which are blocked. Paralysis can last hours.`}]},
d:{x:`<p>He is admitted to the ICU and recovers over several days. Because it was a workplace exposure, your senior informs the police office as a medico-legal case.</p>`}},
debrief:`Use a proper interpreter for the history as soon as he can talk — the co-worker can’t tell you the product name or how much exposure there was.`},
],
[
{t:'h',x:`Scorpions, snakes and the Red Sea`},
{t:'cards',i:[['Scorpion sting','Very common in Saudi Arabia. Most adults: severe local pain → analgesia, local anaesthetic infiltration, observe. Systemic signs (sweating, vomiting, agitation, hypertension, breathing difficulty, abnormal movements) — especially in <b>children</b> → senior, scorpion antivenom per protocol, monitored bed.'],['Snakebite','Saudi vipers (e.g. <i>Echis</i>, <i>Cerastes</i>) cause swelling and bleeding disorders. Immobilise, remove rings, mark the swelling edge with time. <b>20-minute whole blood clotting test</b>: if the blood doesn’t clot → coagulopathy → antivenom. No tourniquet, no cutting, no suction, no ice.'],['Stonefish / stingray','Excruciating pain, puncture wound after stepping on something in the sea. <b>Hot water immersion</b> (as hot as tolerated, ~40–45 °C — test with your own hand) for 30–90 min, analgesia, X-ray for spine fragments, tetanus, wound care.'],['Jellyfish','Rinse with <b>sea water</b> (fresh water can trigger more stings), remove tentacles with tweezers, analgesia. Vinegar for box-jellyfish-type stings.'],['Drowning (Obhur, the Corniche)','The problem is hypoxia. Oxygen, ABCDE, watch for delayed breathing problems over 6–8 hours. C-spine precautions only if diving injury or trauma is suspected.'],['Carbon monoxide','Headache, nausea, confusion — often several family members, generators or charcoal heaters in an enclosed space. <b>Pulse oximetry is falsely normal.</b> 100% oxygen via non-rebreather; COHb on a blood gas.']]},
{t:'mcq',q:`A child was stung by a scorpion an hour ago at home. He is now sweating, vomiting, restless and has BP 150/100. What is the right step?`,o:[`Ice on the sting site and discharge`,`Systemic envenomation: senior, antivenom per protocol, monitored bed`,`Antibiotics`,`Observe for 24 hours without treatment`],a:1,e:`Children are at highest risk from scorpion envenomation. Systemic signs need antivenom and close monitoring for cardiac and respiratory complications.`},
],
[
{t:'h',x:`Sugar, ketones and potassium`},
{t:'table',head:['','Recognise','Treat (adult — follow CMC protocol)'],rows:[
['DKA','Glucose >11 mmol/L (200 mg/dL) or known diabetic, ketones ≥3 mmol/L, pH <7.3 or HCO₃⁻ <15. Abdominal pain, vomiting, Kussmaul breathing','1 L 0.9% saline over 1 h, then by protocol · Check K⁺ <b>before</b> insulin · Fixed-rate IV insulin 0.1 units/kg/h · Add K⁺ to fluids if 3.5–5.5 · If K⁺ <3.3–3.5: replace first, senior · Add 10% dextrose when glucose <14 mmol/L (250 mg/dL) · Find the trigger'],
['Hypoglycaemia','Glucose <4 mmol/L (70 mg/dL); sweating, confusion, seizures, “stroke”','Awake: 15–20 g fast-acting sugar by mouth · Not safe to swallow: 10% dextrose 150–200 mL IV (or glucagon 1 mg IM) · Then a meal. Sulfonylurea overdose → admit (it recurs).'],
['Hyperkalaemia','K⁺ ≥6.5 or any ECG changes: peaked T, wide QRS, loss of P waves, sine wave','<b>Calcium gluconate 10% 30 mL IV</b> over 5–10 min (protects the heart, repeat if needed) · Insulin 10 units + 25 g glucose IV · Salbutamol 10–20 mg nebulised · Then remove K⁺: dialysis, binders']]},
{t:'call',k:'idea',x:`Insulin is the key that opens the cell door. Sugar goes in — and potassium goes in with it. Useful when potassium is dangerously high; dangerous when it is already low.`},
{t:'tool',name:'potassium'},
{t:'call',k:'saudi',title:'Ramadan',x:`During Ramadan, expect more hypoglycaemia in fasting diabetics before iftar, DKA in type 1 patients who reduced or stopped insulin, and dehydration and renal colic in the summer. The ED often peaks after iftar and taraweeh. Many patients will ask whether a treatment breaks their fast: answer simply, and remember that Islam excuses the sick from fasting.`},
{t:'mcq',q:`A 21-year-old with type 1 diabetes in DKA has a potassium of 3.0 mmol/L. When do you start the insulin infusion?`,o:[`Immediately — insulin is the most important treatment`,`After potassium replacement has brought K⁺ above about 3.3–3.5, with your senior`,`Never — use oral hypoglycaemics instead`,`Only after the pH is normal`],a:1,e:`Insulin drives potassium into cells. Starting it with a low K⁺ can cause fatal arrhythmias. Fluids and potassium first.`},
]]});

/* ================= MODULE 14 ================= */
MODULES.push({id:'m14',n:14,part:'Part E · People & you',partSub:'The skills that decide how your patients — and you — experience the ED',title:'Communication, mistakes & looking after yourself',sub:'Bad news with Saudi families, interpreters, angry relatives, consulting specialists, errors, burnout and getting the most from the rotation',mins:20,
take:[
`Bad news is given by your senior, in a private room, with the patient’s wishes about family respected. You can be there and learn.`,
`Ask the competent patient how much they want to know and who should be involved — before the family decides for them.`,
`Professional interpreters for anything important. Never children, and avoid fellow patients.`,
`Consults: be specific — “I am calling to ask you to see…, because…, and I need…”.`,
`Mistakes happen to everyone. Tell your senior immediately, file the incident report, learn. Hiding a mistake is the real failure.`],
s:[
[
{t:'mentor',x:`<p>Patients rarely complain about the medicine. They complain that nobody explained, nobody introduced themselves, nobody said sorry for the wait. Communication is the part of the job your patients will remember.</p>`},
{t:'h',x:`Breaking bad news — SPIKES`},
{t:'table',head:['','Step'],rows:[['<b>S</b>etting','Private room, sit down, phone on silent, tissues, the right people present'],['<b>P</b>erception','“What have you been told so far?”'],['<b>I</b>nvitation','“How much detail would you like me to go into?”'],['<b>K</b>nowledge','Warn first (“I’m afraid I have difficult news”), plain words, no jargon, pause'],['<b>E</b>motion','Silence is fine. Name the feeling. “إن شاء الله خير” is not a plan — but faith is a comfort for many families; respect it.'],['<b>S</b>trategy','What happens next, who they will see, when']]},
{t:'call',k:'saudi',title:'“Please don’t tell my mother”',x:`Families in Saudi Arabia sometimes ask doctors to keep a serious diagnosis from the patient, out of love. The competent patient has the right to know, but they also have the right to <b>choose not to know</b> or to let family lead. Ask the patient, privately and gently: <i>“بعض الناس يحبون يعرفون كل التفاصيل، وبعضهم يفضّلون إن العائلة تتكلم مع الدكتور. إنتي إيش تفضّلي؟”</i> — “Some people like to know every detail, others prefer the family to talk to the doctor. What would you prefer?” This is a senior-led conversation.`},
{t:'mcq',q:`A 60-year-old man’s CT shows a likely pancreatic cancer. His sons stop you in the corridor: “Don’t tell him anything, he won’t cope.” What do you do?`,o:[`Agree and tell the patient it is gastritis`,`Tell the patient everything immediately because it is his right`,`Acknowledge their concern, say you understand they want to protect him, and tell your senior, who will find out how the patient himself wants to receive information`,`Tell the sons the full results instead of the patient`],a:2,e:`Lying to the patient is not acceptable, and neither is forcing information on him. The patient’s own preference decides — and a senior leads that conversation.`},
],
[
{t:'h',x:`Interpreters`},
{t:'p',x:`Jeddah is one of the most multilingual cities in the region: residents from South and Southeast Asia, Africa and the wider Arab world, plus pilgrims all year. Use the hospital interpreter service or telephone line for history, consent, bad news and discharge advice.`},
{t:'list',i:[`Speak to the patient, not the interpreter. Short sentences.`,`<b>Never use children</b> as interpreters, and avoid other patients or a sponsor/employer for sensitive topics.`,`Ask the patient to repeat back the plan.`,`Write in the notes that an interpreter was used, and which language.`]},
{t:'mcq',q:`A Filipino domestic worker has abdominal pain. Her employer, who brought her, offers to translate and says “she’s fine, just give her something.” What is best?`,o:[`Let the employer translate — it’s quicker`,`Use a professional interpreter (many of our nurses speak Tagalog, or the phone service) and see her privately for part of the consultation`,`Discharge with painkillers`,`Speak to her in English only, loudly`],a:1,e:`Employers may not translate accurately and may affect what she feels safe saying — about pregnancy, injury or abuse. Give her a private, interpreted conversation.`},
],
[
{t:'case',title:'The angry son',pt:'Acute · 01:30',nomon:1,start:'a',n:{
a:{x:`<p>A son storms up to the nurses’ station. His father, 80, has been on a trolley for five hours waiting for a medical bed.</p>`,say:{who:'The son',ar:`إيش هذا المستشفى؟! أبويا له خمس ساعات على السرير هذا ولا أحد عطانا خبر! أنا بشتكي عليكم كلكم!`,en:`What kind of hospital is this?! My father has been on this bed for five hours and nobody has told us anything! I’m going to complain about all of you!`},
ch:[{x:`Tell him to lower his voice or you will call security`,s:0,go:'b',f:`Threats escalate. Security is for danger, not frustration.`},
{x:`Stay calm, step aside with him, introduce yourself, and let him finish without interrupting`,s:2,go:'c',f:`Listen first. Angry people need to feel heard before they can hear you.`},
{x:`Explain that the bed shortage is the ward’s fault, not the ED’s`,s:0,go:'b',f:`Blaming colleagues makes the hospital look worse and doesn’t help his father.`}]},
b:{x:`<p>He gets louder. Other families are watching.</p>`,ch:[{x:`Change approach: lower your own voice, move him somewhere quieter, and listen`,s:1,go:'c',f:`Good recovery.`}]},
c:{x:`<p>He finishes. He is mainly scared: his father hasn’t eaten, and nobody explained why he is still here.</p>`,
ch:[{x:`Acknowledge, apologise for the wait and lack of updates, explain the plan honestly, and fix one concrete thing now`,s:2,go:'d',f:`“أعتذر عن التأخير، ومعك حق إنه ولا أحد شرح لكم.” Then: check if his father can eat, check his pressure areas, give a realistic time.`},
{x:`Promise a bed within 30 minutes`,s:0,go:'d',f:`Don’t promise what you don’t control. Broken promises make it worse.`}]},
d:{x:`<p>You find that his father is allowed to eat, and the nurse brings a meal tray. You tell the son the admitting team will update him. He shakes your hand.</p>`,say:{who:'The son',ar:`{مشكور يا دكتور|مشكورة يا دكتورة}، والله ما كنت أبغى أرفع صوتي، بس خفت عليه.`,en:`Thank you, doctor. Honestly I didn’t want to raise my voice, I was just scared for him.`}}},
debrief:`Listen → acknowledge → apologise for the experience → explain → act on one thing. And if anyone becomes threatening or physical: step back and call security.`},
],
[
{t:'h',x:`Calling a consultation`},
{t:'p',x:`Specialists are busy too. A clear request gets a faster, kinder answer.`},
{t:'call',k:'pearl',title:'A good consult call',x:`“Hello, I’m {DR}, ER intern, calling on behalf of Dr. Fahad. I’d like you to <b>see a patient for possible admission</b>: a 68-year-old with a new upper GI bleed — melaena, Hb 72 down from 120, HR 108. He’s had 2 units, a PPI, and his Glasgow-Blatchford score is 12. <b>Could you see him within the next hour for endoscopy?</b>”`},
{t:'order',q:`Order the parts of a good consult call.`,i:[`Who you are and who your senior is`,`What you are asking for (see, admit, advise, procedure)`,`The one-liner and key findings`,`What has been done so far`,`The specific question and the time frame`],e:`Lead with the request so they know why you are calling. If there’s disagreement about admission, it is a senior-to-senior conversation — escalate, don’t argue.`},
],
[
{t:'h',x:`When you make a mistake`},
{t:'p',x:`You will make mistakes. So did every consultant in this department. What matters is what you do next.`},
{t:'list',o:1,i:[`<b>Make the patient safe</b> — fix what you can now.`,`<b>Tell your senior immediately.</b>`,`File an <b>incident report</b> (often called an OVR — occurrence variance report) — it’s for system learning, not punishment.`,`Disclosure to the patient is led by your senior: honest, with an apology.`,`Debrief and learn. Talk to someone.`]},
{t:'mcq',q:`You realise you gave a patient paracetamol 1 g 2 hours after the nurse gave 1 g. The patient is well. What should you do?`,o:[`Nothing — 2 g is a safe total`,`Tell your senior and the nurse, document it, file an incident report, and make sure the next doses are adjusted`,`Change the time in the chart so it looks right`,`Ask the nurse to take the blame`],a:1,e:`It is probably harmless — and still exactly the kind of near-miss reporting that prevents a serious error later. Never alter records.`},
],
[
{t:'h',x:`Looking after yourself — and making the most of this month`},
{t:'cards',i:[['Nights','Sleep before your first night. Eat a real meal. Avoid driving home exhausted — Jeddah roads at 7 a.m. are not forgiving. Take a short break around 3–4 a.m. if your senior agrees.'],['Breaks and prayer','You are entitled to breaks and to pray. Tell your senior and the charge nurse, hand over sick patients, and go.'],['A bad case','A death, a child, a mistake — it’s normal to feel it for days. Talk to your senior, a colleague or the wellbeing service. Ask for a debrief.'],['Burnout signs','Dreading every shift, numbness, cynicism, poor sleep, irritability. Tell someone early. You are not the first.'],['Your logbook','Track your procedures and cases from day one. Ask to be signed off. Seniors remember interns who ask.'],['Residency','Your evaluation, letters of recommendation and your SMLE score all matter for the Saudi Board match. Ask for mid-rotation feedback — and act on it. If you are interested in EM, tell the program director.']]},
{t:'mentor',x:`<p>One last thing before your night shift. You don’t have to know everything. You have to be <b>safe, honest and curious</b>: know your limits, say when you’re worried, and look things up. Do that, and you will be an intern every senior wants on their shift.</p>`},
]]});
