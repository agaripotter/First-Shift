/* ================= MODULE 11 ================= */
MODULES.push({id:'m11',n:11,part:'Part D · Core presentations',title:'Abdomen, pregnancy & the groin',sub:'Abdominal pain at the extremes of age, ectopic pregnancy, pre-eclampsia, GI bleeding, torsion and renal colic',mins:20,
take:[
`Every woman of reproductive age with abdominal pain, bleeding or collapse gets a <b>pregnancy test</b>. No exceptions for “she says she can’t be pregnant”.`,
`Elderly + abdominal pain = high risk: ruptured AAA, mesenteric ischaemia, perforation, MI.`,
`Pain out of proportion to the examination → think mesenteric ischaemia.`,
`Testicular torsion is a 6-hour emergency: urology now, don’t wait for an ultrasound.`,
`Pregnant after 20 weeks with BP ≥140/90 and headache, visual symptoms or RUQ pain = pre-eclampsia. Seizure = eclampsia → magnesium.`],
s:[
[
{t:'mentor',x:`<p>Abdominal pain is one of the most common reasons people come to our ED. Most go home with gastritis, constipation or a urine infection. Your job is to find the few who would die if you sent them home.</p>`},
{t:'h',x:`The can’t-miss list depends on who is in front of you`},
{t:'sort',q:`Match each patient to the diagnosis you must rule out first.`,bins:[{l:'Ruptured AAA'},{l:'Ectopic pregnancy'},{l:'Mesenteric ischaemia'},{l:'Inferior MI'},{l:'Testicular torsion'}],i:[
{x:`71-year-old male smoker, sudden back and flank pain, BP 90/60, “renal colic”`,b:0,w:`“First-ever renal colic” in an older man is an AAA until proven otherwise. Bedside ultrasound of the aorta.`},
{x:`24-year-old woman, left iliac fossa pain, light-headed, last period 7 weeks ago`,b:1},
{x:`78-year-old with atrial fibrillation, severe pain but a soft, barely tender abdomen`,b:2,w:`Pain out of proportion to the examination + AF = embolus to the gut. Lactate may be normal early.`},
{x:`62-year-old diabetic, epigastric pain and vomiting, HR 52`,b:3},
{x:`14-year-old boy, sudden left lower abdominal pain and vomiting`,b:4,w:`Teenage boys with abdominal pain: always examine the testes. They are often too embarrassed to mention them.`}]},
{t:'call',k:'saudi',title:'Chaperones and modesty',x:`Abdominal, breast, genital and rectal examinations need a chaperone — a female nurse for female patients. Explain what you will do before you do it, expose only what you need, and offer a female doctor if one is available <b>and it won’t delay emergency care</b>.`},
],
[
{t:'case',title:'Pain, dizziness and a late period',pt:'Acute · 09:20',mon:{hr:112,bp:'100/66',sp:'99%',rr:20,t:'36.7'},start:'a',n:{
a:{x:`<p>A 27-year-old married woman, triaged CTAS 3 for lower abdominal pain. Her husband is with her.</p>`,say:{who:'Patient',ar:`تحت بطني يوجعني من الصبح، خصوصًا الجهة اليسار، وحاسة بدوخة. الدورة متأخرة شوية، بس عادي هي دايمًا تتأخر.`,en:`My lower belly has been hurting since the morning, especially on the left, and I feel dizzy. My period is a little late, but that’s normal — it’s always late.`},
ch:[{x:`Urine or serum β-hCG now, two IV cannulas, bloods including group and crossmatch, tell your senior`,s:2,go:'b',f:`Pain + dizziness + late period + tachycardia = ectopic until proven otherwise.`},
{x:`Treat as a urine infection and wait for the urine culture`,s:0,go:'b',f:`“It’s always late” is not a pregnancy test.`}]},
b:{x:`<p>The pregnancy test is positive. While you are writing, the nurse calls: the patient fainted on the way to the bathroom.</p>`,mon:{hr:132,bp:'78/48'},
ch:[{x:`To Resus: senior now, bedside FAST, O-negative or crossmatched blood, call gynaecology for theatre`,s:2,go:'c',f:`Haemodynamically unstable ectopic = surgical emergency. Gynaecology to the bedside; she goes to theatre.`},
{x:`Book a formal pelvic ultrasound for the morning list`,s:0,go:'c',f:`She is bleeding into her abdomen now.`}]},
c:{x:`<p>FAST shows free fluid. Gynaecology takes her to theatre for a ruptured left tubal ectopic. Her husband is shaken.</p>`,say:{who:'Her husband',ar:`يا {دكتور|دكتورة} هي بخير؟ ما كنا ندري إنها حامل أصلاً.`,en:`Doctor, is she okay? We didn’t even know she was pregnant.`},
ch:[{x:`Tell him briefly what is happening and that the gynaecology team will update him after surgery; ask your senior to speak to him`,s:2,go:'d',f:`Honest, brief, and you bring in the person who can answer the hard questions.`},
{x:`Explain all the details of ectopic pregnancy and future fertility`,s:1,go:'d',f:`Kind intention, but that conversation belongs to the gynaecology team, and to her first.`}]},
d:{x:`<p>She recovers well. Her blood group is Rh-negative, so the team gives anti-D.</p>`}},
debrief:`Check Rh status in every woman with bleeding in pregnancy — Rh-negative mothers need anti-D to protect future pregnancies.`},
],
[
{t:'h',x:`Pregnancy in the ED`},
{t:'table',head:['Situation','What to do'],rows:[
['Bleeding in early pregnancy','β-hCG, Hb, blood group/Rh, ultrasound. Stable → early pregnancy service. Unstable → Resus.'],
['Pre-eclampsia (>20 weeks, up to 6 weeks postpartum)','BP ≥140/90 with protein in urine or symptoms. Severe: ≥160/110, headache, visual disturbance, RUQ pain. Call obstetrics; antihypertensive (e.g. labetalol) per protocol.'],
['Eclampsia','Magnesium sulphate 4 g IV over 5–15 min, then 1 g/h. Obstetrics now. Monitor reflexes, breathing, urine output.'],
['Trauma or arrest after ~20 weeks','Manual left displacement of the uterus (or left tilt) to relieve pressure on the IVC. Obstetrics to the bedside immediately.'],
['Imaging','Never withhold a necessary scan because of pregnancy. Discuss with your senior and radiology.']]},
{t:'mcq',q:`A woman 10 days after delivery has a severe headache and BP 168/112. What should you think about?`,o:[`Postnatal tension headache`,`Postpartum pre-eclampsia`,`Migraine — she has a history`,`Caffeine withdrawal`],a:1,e:`Pre-eclampsia can appear up to 6 weeks after delivery. Venous sinus thrombosis is the other big one in the postpartum period.`},
],
[
{t:'h',x:`GI bleeding, torsion and renal colic`},
{t:'cards',i:[['Upper GI bleed','Haematemesis or melaena. Two large IVs, Hb, crossmatch, urea. Transfuse if Hb <70 g/L (80 if cardiac disease). PPI after endoscopy decision. Suspected varices (liver disease): terlipressin + IV antibiotics. Glasgow-Blatchford score 0–1 may go home with follow-up.'],['Testicular torsion','Sudden severe testicular pain, high-riding testis, absent cremasteric reflex, vomiting. Salvage drops sharply after 6 hours. <b>Urology to the bedside — don’t delay for ultrasound.</b>'],['Renal colic','Loin-to-groin colicky pain, restless patient, haematuria. NSAID first-line for pain (if kidneys OK). CT KUB. Fever + stone = infected obstructed kidney → urology emergency.'],['Appendicitis','Pain starting around the umbilicus and moving to the right iliac fossa, anorexia, fever, tenderness. Atypical in pregnancy, the elderly and children.']]},
{t:'mcq',q:`A 16-year-old boy has had sudden severe right testicular pain for 2 hours and is vomiting. The ultrasound department says they can scan him in 3 hours. What do you do?`,o:[`Wait for the ultrasound`,`Give analgesia and reassess in the morning`,`Urgent urology review now — surgical exploration shouldn’t wait for imaging`,`Treat as epididymitis with antibiotics`],a:2,e:`Clinical suspicion of torsion = surgical exploration. Every hour of delay costs testicular viability.`},
]]});

/* ================= MODULE 12 ================= */
MODULES.push({id:'m12',n:12,part:'Part D · Core presentations',title:'Children in the ED',sub:'The paediatric assessment triangle, normal vitals, weight and doses, the febrile infant, breathing problems and safeguarding',mins:20,
take:[
`Start with the <b>Paediatric Assessment Triangle</b>: appearance, work of breathing, circulation to the skin.`,
`Know normal vitals by age. A tachycardic, quiet child is sicker than a crying one.`,
`Weigh the child, or estimate with APLS formulas. Every dose is checked by two people.`,
`Fever in an infant under 3 months is serious; under 28 days → full septic workup and IV antibiotics.`,
`Injuries that don’t match the story or the child’s development → safeguarding, with your senior.`],
s:[
[
{t:'mentor',x:`<p>Children compensate brilliantly — until they don’t. A child can keep a normal blood pressure while losing a quarter of their blood volume, then crash in minutes. Learn what “sick” looks like in a child.</p>`},
{t:'h',x:`The Paediatric Assessment Triangle`},
{t:'table',head:['Side','Look for (from the door, without touching)'],rows:[['<b>Appearance</b> (TICLS)','Tone, Interactiveness, Consolability, Look/gaze, Speech/cry'],['<b>Work of breathing</b>','Recessions, nasal flaring, head bobbing, grunting, stridor, wheeze, tripod position'],['<b>Circulation to skin</b>','Pallor, mottling, cyanosis']]},
{t:'call',k:'pearl',x:`A child who is <b>quiet, floppy and not interested</b> in you, their parent, or a phone is far more worrying than one who screams when you approach. Abnormal appearance = sick, whatever the vitals say.`},
{t:'call',k:'idea',x:`Children are like a stretched spring. They hold their blood pressure and keep going until the spring snaps — and then they crash fast. Watch for the early signs (a fast heart rate, quietness, mottled skin) instead of waiting for a low BP.`},
{t:'mcq',q:`A 2-year-old with fever lies still on his mother’s lap, doesn’t look at you, doesn’t cry when you examine him, and his legs are mottled. What does the triangle tell you?`,o:[`He’s tired from the fever — give paracetamol and reassess`,`Abnormal appearance and circulation — he is sick: possible septic shock. Resus and senior now.`,`He is calm, which is reassuring`,`Only work of breathing matters in children`],a:1,e:`Poor interaction + mottled skin = compensated (or decompensating) shock. Treat now.`},
],
[
{t:'h',x:`Weight, doses and normal vitals`},
{t:'p',x:`Weight decides nearly every paediatric drug and fluid. Measure it whenever you can. In an emergency, estimate it (APLS: under 1 year (0.5 × months) + 4; 1–5 years (2 × age) + 8; 6–12 years (3 × age) + 7) or use a length-based tape.`},
{t:'tool',name:'peds'},
{t:'mcq',q:`Using the helper above: roughly what is the estimated weight of a 4-year-old, and the fluid bolus?`,o:[`12 kg, 240 mL`,`16 kg, 160 mL`,`20 kg, 400 mL`,`24 kg, 240 mL`],a:1,e:`(2 × 4) + 8 = 16 kg. Bolus 10 mL/kg = 160 mL, then reassess. Adult habits (“give a litre”) can drown a child.`},
],
[
{t:'case',title:'Six weeks old and hot',pt:'Paeds ED · 03:15',mon:{hr:178,bp:'—',sp:'97%',rr:52,t:'38.4'},start:'a',n:{
a:{x:`<p>A mother brings her 6-week-old daughter, born at term, no previous illness.</p>`,say:{who:'Mother',ar:`بنتي عمرها شهر ونص، من الليل وهي سخنة وما ترضع زي العادة، ونايمة كثير.`,en:`My daughter is a month and a half old. Since the night she’s been hot, she isn’t feeding like usual, and she’s sleeping a lot.`},
ch:[{x:`This is a febrile infant under 3 months with poor feeding and lethargy — senior now, septic workup and IV antibiotics`,s:2,go:'b',f:`Fever + poor feeding + sleepiness in a young infant = serious bacterial infection until proven otherwise.`},
{x:`Give paracetamol and discharge with advice — probably a virus`,s:0,go:'b',f:`Young infants can’t localise infection. Meningitis and urinary sepsis look like this.`}]},
b:{x:`<p>Your senior agrees. The workup includes blood culture, CBC, CRP/procalcitonin, urine by catheter or suprapubic aspiration, and a lumbar puncture.</p>`,
ch:[{x:`Antibiotics after cultures, without delaying them for the LP if it will take time`,s:2,go:'c',f:`Correct. A lethargic infant gets antibiotics promptly; the LP can follow.`},
{x:`Wait for all results before giving antibiotics`,s:0,go:'c',f:`Time matters in neonatal sepsis and meningitis.`}]},
c:{x:`<p>The urine shows nitrites and leukocytes; the CSF is clear. She is admitted to paediatrics on IV antibiotics for a urinary tract infection and does well.</p>`,mon:{hr:150,t:'37.6'}}},
debrief:`A febrile infant under 28 days always gets the full workup and IV antibiotics. From 29 to 90 days, your senior and the paediatric team use a risk-stratification pathway.`},
],
[
{t:'h',x:`Breathing problems in children`},
{t:'table',head:['','Clues','Treatment'],rows:[['Croup (6 months–6 years)','Barking cough, hoarse voice, stridor, often at night','Keep calm on parent’s lap. Dexamethasone 0.15 mg/kg oral. Severe (stridor at rest, recessions): nebulised adrenaline + senior.'],['Bronchiolitis (under 2)','Runny nose then cough, crackles ± wheeze, feeding poorly','Supportive: suction, feeds, oxygen if SpO₂ low. Bronchodilators and steroids usually don’t help.'],['Asthma (over 2)','Wheeze, known triggers, response to salbutamol','Salbutamol (spacer or nebuliser), steroids; escalate as in adults.'],['Foreign body','Sudden choking or coughing while eating or playing','Partial: let them cough, call senior/ENT. Complete obstruction: back blows and chest/abdominal thrusts.'],['Epiglottitis (rare now)','Toxic, drooling, sitting forward, quiet stridor','<b>Do not examine the throat</b> or upset the child. Senior, anaesthesia and ENT immediately.']]},
{t:'mcq',q:`An 18-month-old has a barking cough and stridor only when crying. He is playing between coughs. What is the best treatment?`,o:[`Nebulised salbutamol`,`Oral dexamethasone`,`IV antibiotics`,`Intubation`],a:1,e:`Mild–moderate croup: a single dose of oral dexamethasone. Salbutamol doesn’t work on the upper airway.`},
],
[
{t:'h',x:`Safeguarding children`},
{t:'list',i:[`<b>“Those who don’t cruise rarely bruise”</b> — bruises in a baby who isn’t yet moving around are a red flag.`,`<b>TEN-4</b>: bruising on the <b>T</b>orso, <b>E</b>ars or <b>N</b>eck in a child under <b>4</b>, or any bruise in a baby under 4 months.`,`Fractures in infants, especially ribs, metaphyseal and skull fractures.`,`Scalds with sharp lines or a “glove and stocking” pattern (immersion).`,`A delay in seeking care, or a story that changes or doesn’t match the child’s development.`]},
{t:'call',k:'saudi',x:`CMC has a <b>Child Protection team</b> linked to the National Family Safety Program. Your role: treat, document exactly, tell your senior, and the team does the rest. You don’t accuse anyone, and you don’t promise the child to keep a secret.`},
{t:'mcq',q:`A 3-month-old has a swollen thigh. The father says he “rolled off the sofa”. X-ray shows a femur fracture. What next?`,o:[`Cast and discharge — it fits a fall`,`Tell your senior; this needs safeguarding review and a skeletal survey per the Child Protection pathway`,`Ask the father directly if he hurt the baby`,`Call the police yourself from the bedside`],a:1,e:`Three-month-olds don’t usually roll, and a femur fracture needs significant force. Escalate through the pathway.`},
]]});
