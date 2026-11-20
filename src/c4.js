/* ================= MODULE 7 ================= */
MODULES.push({id:'m07',n:7,part:'Part D · Core presentations',partSub:'What will come through the doors this month',title:'Chest pain & breathlessness',sub:'ACS and STEMI, dissection, PE, pneumothorax, asthma, COPD, pulmonary oedema and ABGs',mins:25,
take:[
`Every adult with chest pain (or an “equivalent”: epigastric pain, breathlessness, sweating, collapse) gets a 12-lead ECG <b>within 10 minutes</b>.`,
`STEMI → senior + cath lab now. Aspirin 300 mg chewed unless contraindicated. Door-to-balloon ≤90 min.`,
`One normal troponin early on does not rule out ACS. Use the CMC serial troponin pathway.`,
`Tearing pain to the back, pulse or BP difference between arms → think dissection. <b>No heparin, no thrombolysis</b> until it’s excluded.`,
`Severe asthma: can’t finish sentences, PEF <50%. Life-threatening: silent chest, SpO₂ <92%, exhaustion, a “normal” CO₂.`],
s:[
[
{t:'mentor',x:`<p>Chest pain is the presentation that will teach you the most about emergency medicine — because most of it is harmless, and the rest can kill within an hour. Your job is not to diagnose every chest pain. It is to <b>not miss the dangerous ones</b>.</p>`},
{t:'nums',i:[['10 min','door to first ECG'],['300 mg','aspirin, chewed'],['≤ 90 min','door to balloon in STEMI'],['0 / 1–3 h','serial hs-troponin per CMC pathway']]},
{t:'h',x:`STEMI — know it when you see it`},
{t:'list',i:[`New ST elevation at the J-point in <b>two contiguous leads</b>: ≥1 mm in most leads; in V2–V3 ≥2 mm in men ≥40, ≥2.5 mm in men <40, ≥1.5 mm in women.`,`Territories: II, III, aVF = inferior · V1–V4 = anterior · I, aVL, V5–V6 = lateral.`,`<b>Equivalents</b> your senior will want to see immediately: new LBBB with symptoms, ST depression in V1–V3 (posterior MI), hyperacute T waves, ST elevation in aVR with widespread depression.`,`If the first ECG is normal but the story is good: <b>repeat it every 15–30 minutes</b> while there is pain.`]},
{t:'tool',name:'leads'},
{t:'mcq',q:`ST elevation in V1–V4 with reciprocal depression in II, III and aVF. Which artery is most likely blocked?`,o:[`Right coronary artery`,`Left anterior descending`,`Circumflex`,`It is pericarditis`],a:1,e:`Anterior STEMI = LAD. Pericarditis gives widespread, concave ST elevation with PR depression and no reciprocal changes.`},
],
[
{t:'h',x:`ACS doesn’t always look like ACS`},
{t:'call',k:'saudi',x:`Saudi Arabia has one of the highest rates of diabetes in the world, and many patients have it for years before diagnosis. Diabetics, women and the elderly often present with <b>tiredness, breathlessness, nausea, “indigestion” or collapse</b> — not crushing chest pain.`},
{t:'case',title:'“Just tired and a bit of heartburn”',pt:'Acute · bed 3',mon:{hr:96,bp:'138/84',sp:'96%',rr:20,t:'36.9'},start:'a',n:{
a:{x:`<p>A 63-year-old woman, diabetic for 15 years, hypertensive. Triage: CTAS 3, “fatigue”.</p>`,say:{who:'Patient',ar:`والله {يا ولدي|يا بنتي} من أمس وأنا تعبانة، ونفَسي ضايق شوية، وعندي حموضة هنا. قلت يمكن من الأكل.`,en:`Honestly, {my son|my daughter}, since yesterday I’ve been tired, a bit short of breath, and I have heartburn here. I thought maybe it was the food.`},
ch:[{x:`12-lead ECG and hs-troponin now`,s:2,go:'b',f:`Exactly. Fatigue + breathlessness + “heartburn” in an elderly diabetic is ACS until proven otherwise.`},
{x:`Give an antacid and see if it works`,s:0,go:'b',f:`Response to antacids doesn’t exclude ACS. ECG first, always.`}]},
b:{x:`<p>ECG: 1.5 mm ST depression in V4–V6, no ST elevation. hs-troponin: raised above the 99th percentile.</p>`,
ch:[{x:`Present as possible NSTEMI: aspirin 300 mg, discuss anticoagulation and cardiology with your senior, repeat ECG, keep monitored`,s:2,go:'c',f:`Right. NSTEMI isn’t a cath lab emergency unless she is unstable, but she needs treatment and admission.`},
{x:`Activate the cath lab for STEMI`,s:0,go:'c',f:`No ST elevation. Know the difference — a false activation pulls a team from another patient.`},
{x:`Discharge with cardiology follow-up as she now feels better`,s:0,go:'c',f:`Raised troponin + ischaemic ECG = admission.`}]},
c:{x:`<p>She is admitted to cardiology and has a coronary angiogram the next day showing a tight circumflex stenosis.</p>`}},
debrief:`Elderly patients often call a young doctor “my son” (يا ولدي) or “my daughter” (يا بنتي) — they speak to you like family. Let it build trust; it doesn’t replace introducing yourself properly.`},
],
[
{t:'h',x:`The other killers`},
{t:'table',head:['','Clues','First steps','Avoid'],rows:[
['Aortic dissection','Sudden tearing pain radiating to the back; BP or pulse difference between arms; new aortic regurgitation; neuro deficit','Senior now, CT aortogram, pain relief, lower HR (<60) then BP (systolic 100–120) with IV beta-blocker','Heparin, thrombolysis'],
['Pulmonary embolism','Pleuritic pain, breathlessness, tachycardia, recent surgery/immobility/long flight, pregnancy, cancer','Wells score; D-dimer only if low probability; CTPA if high; anticoagulate; thrombolysis if massive','D-dimer in high-probability patients'],
['Tension pneumothorax','Severe breathlessness, absent breath sounds one side, hypotension, distended neck veins','Clinical diagnosis — decompress immediately (adults: 4th/5th intercostal space, mid-axillary line), then chest drain','Waiting for an X-ray'],
['Cardiac tamponade','Hypotension, raised JVP, muffled heart sounds; trauma, malignancy, renal failure','Bedside echo, senior, pericardiocentesis','Large fluid boluses alone']]},
{t:'mcq',q:`A 49-year-old hypertensive man has sudden severe pain between his shoulder blades. BP right arm 182/100, left arm 140/86. Which treatment must you avoid until imaging?`,o:[`Morphine`,`IV labetalol`,`Heparin`,`Oxygen`],a:2,e:`This looks like aortic dissection. Anticoagulation or thrombolysis can be fatal. Pain control and controlling HR and BP are correct.`},
],
[
{t:'h',x:`Breathlessness: asthma, COPD and pulmonary oedema`},
{t:'table',head:['Asthma severity','Features'],rows:[
['Moderate','Increasing symptoms, PEF 50–75% of best/predicted, talking in sentences'],
['Acute severe','Any of: PEF 33–50%, RR ≥25, HR ≥110, <b>can’t complete sentences</b>'],
['Life-threatening','Any of: PEF <33%, SpO₂ <92%, <b>silent chest</b>, cyanosis, poor effort, exhaustion, confusion, hypotension, arrhythmia, a “normal” PaCO₂']]},
{t:'list',title:'Acute severe asthma — what you start while calling your senior',i:[`Oxygen to SpO₂ 94–98%`,`Salbutamol 5 mg nebulised, back-to-back if needed (oxygen-driven)`,`Ipratropium 0.5 mg nebulised`,`Prednisolone 40–50 mg orally or hydrocortisone 100 mg IV`,`If not improving: magnesium sulphate 2 g IV over 20 minutes, ABG, senior/ICU`]},
{t:'call',k:'saudi',x:`Jeddah has frequent <b>dust storms</b> (غبار) in spring and summer. On those days expect a wave of asthma and COPD exacerbations — and keep nebulisers stocked.`},
{t:'cards',i:[['COPD exacerbation','Target SpO₂ <b>88–92%</b> with a Venturi mask. Nebulisers (air-driven if CO₂ retainer), steroids, antibiotics if sputum is purulent. ABG — consider BiPAP if pH <7.35 and PaCO₂ high.'],['Acute pulmonary oedema','Sit upright, oxygen, CPAP/BiPAP early. Nitrates if systolic BP >100 (sublingual, then infusion). Furosemide IV if fluid overloaded. Find the cause: ACS, arrhythmia, valve, missed dialysis.'],['Pneumonia','CURB-65 helps (Confusion, Urea >7, RR ≥30, BP <90/≤60, age ≥65). Antibiotics per CMC guide. Think MERS, TB and COVID in the right context.'],['Silent chest','Not improvement. It means almost no air is moving. Senior and anaesthesia immediately.']]},
],
[
{t:'h',x:`Blood gases without fear`},
{t:'tool',name:'seesaw'},
{t:'p',x:`Four steps: <b>1.</b> pH — acidaemia or alkalaemia? <b>2.</b> Which explains it — CO₂ (respiratory) or HCO₃⁻ (metabolic)? <b>3.</b> Is there compensation? <b>4.</b> If metabolic acidosis, calculate the anion gap.`},
{t:'tool',name:'abg'},
{t:'mcq',q:`pH 7.31, PaCO₂ 62 mmHg, HCO₃⁻ 30 in a breathless COPD patient. Best description?`,o:[`Metabolic acidosis`,`Respiratory acidosis with metabolic compensation (chronic)`,`Respiratory alkalosis`,`Normal`],a:1,e:`High CO₂ explains the low pH, and the raised HCO₃⁻ shows the kidneys have been compensating for some time — an acute-on-chronic picture is common in COPD.`},
],
[
{t:'case',title:'Dust storm Thursday',pt:'Resus · 16:30',mon:{hr:124,bp:'132/80',sp:'90%',rr:32,t:'37.1'},start:'a',n:{
a:{x:`<p>A 19-year-old known asthmatic is brought in by his brother during a dust storm. He is sitting forward, using his neck muscles.</p>`,say:{who:'Patient (between breaths)',ar:`مو قادر... أتنفس... البخاخ... ما نفع`,en:`Can’t… breathe… the inhaler… didn’t work`},
ch:[{x:`Oxygen, salbutamol + ipratropium nebulisers now, call your senior, steroids`,s:2,go:'b',f:`He can’t finish sentences and SpO₂ is 90% — this is acute severe, possibly life-threatening. Treat first, then history.`},
{x:`Take a full history first, including triggers and medication`,s:0,go:'b',f:`The history can wait. ABCDE.`},
{x:`Get a chest X-ray before treatment`,s:0,go:'b',f:`X-ray only after initial treatment, unless you suspect pneumothorax.`}]},
b:{x:`<p>After two back-to-back nebulisers he is still struggling. You listen to his chest: very little air entry on either side, no wheeze.</p>`,mon:{hr:136,sp:'88%',rr:34},
ch:[{x:`Recognise a silent chest: senior to bedside now, magnesium 2 g IV, ABG, alert anaesthesia/ICU`,s:2,go:'c',f:`A silent chest is life-threatening. The lack of wheeze is a bad sign, not a good one.`},
{x:`Good — the wheeze has gone, he’s improving`,s:0,go:'c',f:`Dangerous misread. Wheeze needs airflow. No wheeze + no air entry = near-fatal asthma.`}]},
c:{x:`<p>ABG: pH 7.33, PaCO₂ 46 mmHg.</p>`,
ch:[{x:`A normal-to-rising CO₂ in an asthmatic this tachypnoeic is a sign of exhaustion — escalate`,s:2,go:'d',f:`Correct. During an attack the CO₂ should be <b>low</b>. A “normal” CO₂ means he is tiring.`},
{x:`CO₂ is near normal, so he is safe`,s:0,go:'d',f:`Exactly the trap. Rising CO₂ is a pre-arrest sign in asthma.`}]},
d:{x:`<p>Your senior and the anaesthetist manage him in Resus. After magnesium and continuous nebulisers he improves slowly and goes to the ICU for observation.</p>`,mon:{hr:112,sp:'95%',rr:24}}},
debrief:`In acute asthma, three findings mean <b>“get help now”</b>: silent chest, SpO₂ under 92%, and a normal or high PaCO₂.`},
]]});

/* ================= MODULE 8 ================= */
MODULES.push({id:'m08',n:8,part:'Part D · Core presentations',title:'Sepsis, fever & the Jeddah specials',sub:'The sepsis hour-1 bundle, dengue, MERS-CoV, Hajj and Umrah, meningococcal disease and heat stroke',mins:25,
take:[
`Sepsis hour-1 bundle: lactate, blood cultures before antibiotics, broad-spectrum antibiotics, 30 mL/kg crystalloid for hypotension or lactate ≥4, vasopressors for MAP <65.`,
`Dengue: paracetamol only — <b>no NSAIDs, no aspirin, no IM injections</b>. The danger comes as the fever settles (days 3–7). Know the warning signs.`,
`Fever + non-blanching rash = meningococcal disease until proven otherwise. Ceftriaxone now; don’t wait for the LP.`,
`Heat stroke = core temperature >40 °C + altered mental state. <b>Cool first</b>, everything else second.`,
`Fever and cough after contact with a MERS case or a hospital stay: screen and isolate. Fever in a returning traveller: think malaria.`],
s:[
[
{t:'mentor',x:`<p>Sepsis kills more of our patients than heart attacks do — and it is far easier to miss. The septic patient often walks in, talks to you, and just says he feels weak.</p>`},
{t:'h',x:`Recognising sepsis`},
{t:'list',i:[`<b>Sepsis</b> is life-threatening organ dysfunction caused by the body’s response to infection.`,`<b>Septic shock</b>: needs vasopressors to keep MAP ≥65 and lactate >2 mmol/L despite adequate fluids.`,`Screening clue — <b>qSOFA</b> (any 2): RR ≥22, new confusion, systolic BP ≤100. qSOFA misses many cases; use it as a red flag, not a rule-out.`,`Other clues: lactate ≥2, mottled skin, low urine output, low platelets, hypothermia, new confusion in the elderly.`]},
{t:'call',k:'idea',x:`In sepsis the bacteria are rarely what kills. It’s the body’s overreaction: vessels widen and leak, blood pressure falls, and organs starve of oxygen. That is why fluids and pressure support matter as much as the antibiotic — and why the clock matters.`},
{t:'nums',i:[['1 hour','to start the bundle'],['30 mL/kg','crystalloid for hypotension or lactate ≥4'],['MAP ≥ 65','target — noradrenaline if fluids don’t work'],['≥ 2','lactate (mmol/L) that should be repeated']]},
{t:'multi',q:`Which belong in the hour-1 sepsis bundle?`,o:[`Measure lactate`,`Blood cultures before antibiotics`,`Broad-spectrum antibiotics`,`Wait for the CT result before antibiotics`,`30 mL/kg crystalloid if hypotensive or lactate ≥4`,`Vasopressors if MAP stays <65`],a:[0,1,2,4,5],e:`Never delay antibiotics for imaging. If cultures will take more than a few minutes, give antibiotics first.`},
{t:'call',k:'local',x:`Use the CMC empirical antibiotic guide (posted in Resus) — it is built from our local resistance data. When in doubt, ask the pharmacist. Neutropenic patients (on chemotherapy) get antibiotics <b>within an hour, before</b> the blood count comes back.`},
],
[
{t:'case',title:'Weakness since yesterday',pt:'Acute · bed 8',mon:{hr:118,bp:'94/56',sp:'94%',rr:24,t:'38.6'},start:'a',n:{
a:{x:`<p>A 76-year-old woman brought by her son. She has had burning on passing urine for three days and is now “not herself”.</p>`,say:{who:'Her son',ar:`أمي من أمس مو طبيعية، ما تعرفني كويس، وتتكلم كلام مو مفهوم. هي عادي تكون صاحية ومرة واعية.`,en:`My mother hasn’t been normal since yesterday — she doesn’t recognise me properly and she’s saying things that don’t make sense. Normally she’s very alert and sharp.`},
ch:[{x:`Recognise sepsis: tell your senior, two IV cannulas, lactate, blood and urine cultures, start antibiotics within the hour, fluids`,s:2,go:'b',f:`New confusion + RR 24 + SBP 94 = qSOFA 3, likely urosepsis. The clock started at triage.`},
{x:`Send a urine dipstick and wait for the result`,s:0,go:'b',f:`A dipstick doesn’t change the plan for a patient with sepsis. Bundle first.`}]},
b:{x:`<p>Lactate is 4.6 mmol/L. She weighs about 60 kg.</p>`,
ch:[{x:`30 mL/kg = about 1,800 mL crystalloid, given in boluses with reassessment after each`,s:2,go:'c',f:`Correct. Reassess for crackles and breathing after each bolus, especially in elderly patients with heart disease.`},
{x:`One litre over 8 hours`,s:0,go:'c',f:`Too little, too slow for septic shock with lactate >4.`}]},
c:{x:`<p>After 2 litres her BP is 84/50, MAP about 61.</p>`,mon:{hr:112,bp:'84/50'},
ch:[{x:`Septic shock — senior starts noradrenaline (peripherally is acceptable initially), plan for ICU`,s:2,go:'d',f:`Don’t keep pouring fluid into a patient who isn’t responding. Vasopressors are next.`},
{x:`Give another 3 litres`,s:0,go:'d',f:`Excess fluid causes pulmonary oedema. After 30 mL/kg, vasopressors come in.`}]},
d:{x:`<p>Her MAP rises to 68 on noradrenaline. She is admitted to the ICU. Her son asks if she will recover; your senior speaks to him.</p>`,mon:{hr:98,bp:'102/60'}}},
debrief:`The son told you the most important fact: <b>this is new confusion</b>. Always ask “is this normal for her?”`},
],
[
{t:'h',x:`Dengue — Jeddah’s seasonal guest`},
{t:'call',k:'saudi',x:`Dengue is endemic in Jeddah and the western region, spread by the <i>Aedes aegypti</i> mosquito, with peaks in the hot, humid months and after rain. It is a notifiable disease — tell your senior so it is reported to the MOH.`},
{t:'tool',name:'dengue'},
{t:'list',title:'Warning signs (WHO) — admit and tell your senior',i:[`Abdominal pain or tenderness`,`Persistent vomiting`,`Fluid accumulation (ascites, pleural effusion)`,`Mucosal bleeding (gums, nose)`,`Lethargy or restlessness`,`Liver enlargement >2 cm`,`Rising haematocrit <b>with</b> a rapid fall in platelets`]},
{t:'call',k:'danger',x:`Paracetamol only for fever and pain. <b>No ibuprofen, diclofenac or aspirin</b> (bleeding risk) and <b>no IM injections</b> (haematomas).`},
{t:'case',title:'“The fever finally went down”',pt:'Urgent care · 20:10',mon:{hr:108,bp:'102/84',sp:'98%',rr:20,t:'37.2'},start:'a',n:{
a:{x:`<p>A 28-year-old man from Al-Safa district. Fever for four days.</p>`,say:{who:'Patient',ar:`لي أربعة أيام حرارة وجسمي كله مكسّر. أمس الحرارة نزلت الحمد لله، بس اليوم بطني يوجعني ومرة تعبان، ولثّتي نزّلت دم وأنا أفرّش.`,en:`I’ve had a fever for four days and my whole body aches. Yesterday the fever went down, thank God, but today my stomach hurts, I’m really tired, and my gums bled when I brushed.`},
ch:[{x:`Recognise warning signs in the critical phase: CBC with haematocrit, dengue NS1/serology, tell your senior, plan admission`,s:2,go:'b',f:`Fever settling + abdominal pain + mucosal bleeding = critical phase with warning signs. This is when patients deteriorate.`},
{x:`He’s improving — the fever is gone. Discharge with ibuprofen for the aches`,s:0,go:'b',f:`Two errors: the end of the fever is the most dangerous time in dengue, and NSAIDs increase bleeding.`}]},
b:{x:`<p>Results: haematocrit 49% (it was 41% at his clinic visit two days ago), platelets 38 ×10⁹/L. Notice the narrow pulse pressure: 102/84.</p>`,
ch:[{x:`Plasma leakage with compensated shock: senior review, start IV crystalloid per the dengue protocol, monitor haematocrit, urine output and vitals closely`,s:2,go:'c',f:`Rising HCT + falling platelets + narrowing pulse pressure (≤20 mmHg) = leaking. Careful, monitored fluids.`},
{x:`Transfuse platelets because they are below 50`,s:0,go:'c',f:`Prophylactic platelet transfusion isn’t recommended in dengue without significant bleeding. The problem is leakage, not platelets.`}]},
c:{x:`<p>He is admitted to the medical ward with strict monitoring and recovers over three days.</p>`,mon:{hr:92,bp:'112/76'}}},
debrief:`A narrow pulse pressure (systolic minus diastolic ≤20 mmHg) is an early sign of dengue shock — the BP can look “normal”.`},
],
[
{t:'h',x:`Hajj, Umrah and the gateway city`},
{t:'p',x:`King Abdulaziz International Airport and Jeddah Islamic Port receive millions of pilgrims. Our ED sees the effects all year, and especially in Hajj season: crowds, heat, chronic illness away from home, and infections from every continent.`},
{t:'cards',i:[['Meningococcal disease','Fever + non-blanching petechial/purpuric rash, headache, neck stiffness, shock. <b>Ceftriaxone 2 g IV immediately</b>, droplet precautions, notify infection control. Close contacts need prophylaxis.'],['Heat stroke','Core temp >40 °C + confusion, seizures or coma. Elderly pilgrims (classic) and young labourers or runners (exertional). <b>Cool first</b>.'],['Imported malaria','Fever in someone who arrived from sub-Saharan Africa or South Asia in the past months. Blood film and rapid test — even if they feel “just like flu”.'],['Respiratory infections','Influenza, COVID-19 and bacterial pneumonia spread fast in crowds. Screen for MERS-CoV by the standard questions.'],['Language barriers','Indonesian, Urdu, Bengali, Turkish, Hausa, Persian… Use the hospital interpreter or phone line, not a fellow pilgrim, for anything important.'],['Chronic disease off routine','Diabetics with hypo- or hyperglycaemia, heart failure from salty food and walking, missed dialysis.']]},
{t:'mcq',q:`A 22-year-old Umrah pilgrim has fever, headache and a few dark-purple spots on his legs that don’t fade when you press a glass on them. BP 94/60. What first?`,o:[`Lumbar puncture, then antibiotics`,`CT head, then antibiotics`,`Ceftriaxone 2 g IV now, droplet precautions, call your senior`,`Paracetamol and observe`],a:2,e:`Suspected meningococcal sepsis kills within hours. Antibiotics first — cultures if quick, but never delay. LP comes later if safe.`},
],
[
{t:'h',x:`Heat stroke — cool first`},
{t:'table',head:['','Heat exhaustion','Heat stroke'],rows:[['Core temp','Usually <40 °C','<b>>40 °C</b>'],['Mental state','Normal (may feel faint)','<b>Confused, agitated, seizing, comatose</b>'],['Skin','Sweaty','Often hot and dry (but can be sweaty in exertional)'],['Treatment','Shade, fluids, rest','<b>Immediate rapid cooling</b>, ABCDE, ICU']]},
{t:'list',title:'Cooling',i:[`Best for exertional heat stroke: <b>cold-water or ice-water immersion</b>.`,`Otherwise: remove clothes, spray lukewarm water + strong fans (evaporative cooling), ice packs to the neck, armpits and groin.`,`Measure <b>core</b> (rectal) temperature. Stop active cooling at about 38.5–39 °C to avoid overshoot.`,`Paracetamol does not work for heat stroke.`,`Check glucose, electrolytes, CK (rhabdomyolysis), kidney and liver function, clotting (DIC).`]},
{t:'mcq',q:`A 30-year-old construction worker collapsed on a site at 14:00 in August. Temp 41.6 °C, GCS 10. What is the priority?`,o:[`CT head for the reduced GCS`,`Paracetamol 1 g IV`,`Immediate aggressive cooling while managing the airway`,`Start fluids and recheck the temperature in an hour`],a:2,e:`The longer the core temperature stays above 40 °C, the more organ damage. Cooling is the treatment — “cool first, transport second”.`},
]]});
