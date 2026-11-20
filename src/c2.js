/* ================= MODULE 3 ================= */
MODULES.push({id:'m03',n:3,part:'Part B · The rules',partSub:'What protects your patient — and your licence',title:'Safety, communication & documentation',sub:'When to call your senior, SBAR, verbal orders, patient ID, notes, handover and infection control',mins:25,
take:[
`Call your senior for: any CTAS 1–2, abnormal vitals, an abnormal ECG, every discharge, every medico-legal case, anyone who wants to leave — and whenever you are worried.`,
`Present with <b>SBAR</b>. Hand over with <b>I-PASS</b>. Every pending result has a name next to it.`,
`Two identifiers every time — name and MRN. Never the bed number.`,
`Read back every verbal order. Never change a note after the fact; write a timed addendum.`,
`Needlestick: wash, report immediately, occupational health the same shift. HIV prophylaxis works best within hours.`],
s:[
[
{t:'mentor',x:`<p>Almost every serious incident I have reviewed in twelve years had the same root cause: <b>someone knew something and did not say it</b>, or said it and was not heard. This module is about saying it clearly.</p>`},
{t:'h',x:`When to call your senior`},
{t:'p',x:`At CMC, interns <b>must</b> inform their senior immediately about:`},
{t:'check',i:[`Any CTAS 1 or 2 patient`,`Any abnormal vital sign that does not settle quickly (HR >120 or <50, SBP <90, SpO₂ <92%, RR >24, GCS drop, temp >39 °C or <36 °C with symptoms)`,`Any abnormal ECG`,`Before <b>every</b> discharge`,`Any patient who wants to leave against advice or has disappeared`,`Any medico-legal case, suspected abuse or police involvement`,`Any complaint, threat or aggression`,`Any death, or any patient who may die`,`Any time you feel uncomfortable — <b>“I’m worried” is enough</b>`]},
{t:'call',k:'rule',x:`There is no such thing as calling your senior too often in your first week. There is such a thing as calling too late.`},
],
[
{t:'h',x:`Present like a senior: SBAR`},
{t:'p',x:`When you call, your senior is usually busy with something else. Give them what they need in 30 seconds.`},
{t:'table',head:['','What to say','Example'],rows:[
['<b>S</b>ituation','Who, where, the one-line problem','“Dr. Fahad, it’s {DR}, intern. Bed 12, Mr. Saleh, 64, I’m worried he’s septic.”'],
['<b>B</b>ackground','Relevant history only','“Diabetic on dialysis, two days of fever and cough.”'],
['<b>A</b>ssessment','Vitals and what you think','“HR 124, BP 86/50, RR 28, SpO₂ 90%. I think pneumonia with septic shock.”'],
['<b>R</b>ecommendation','What you want and by when','“Can you see him now? I’ve sent cultures and a lactate. Should I start antibiotics and fluids?”']]},
{t:'call',k:'idea',x:`Write it like a news headline: the most important thing first. If your senior hangs up after one sentence, they should already know <b>who</b>, <b>what</b> and <b>how worried to be</b>.`},
{t:'order',q:`Put this call to your senior in SBAR order.`,i:[`“Bed 5, Mrs. Nora, 45 — she has new left-sided weakness.”`,`“She came in two hours ago with a migraine; she has hypertension.”`,`“Weakness started 20 minutes ago, glucose 6.2, BP 190/104. I think this is a stroke.”`,`“Can you come now? Should I call a stroke code?”`],e:`Situation → Background → Assessment → Recommendation. Notice the <b>time of onset</b> in the assessment — for a stroke, it decides the treatment.`},
],
[
{t:'h',x:`Orders, patient ID and high-alert drugs`},
{t:'list',i:[
`<b>Two identifiers</b> before any drug, blood, procedure or result: full name and medical record number (MRN). Never “the patient in bed 4” — patients move.`,
`<b>Verbal orders</b> only in emergencies. The nurse reads it back, you confirm — then you write it as soon as the emergency is over.`,
`<b>Allergies</b> — ask yourself, even if the triage note says “NKDA”.`,
`<b>High-alert medications</b> are double-checked: insulin, potassium, heparin, opioids, sedatives, inotropes, magnesium, chemotherapy.`,
`<b>Never write “U” for units</b> — it has been misread as a zero (10U → 100). Write “units” in full.`]},
{t:'mcq',q:`During a resuscitation your senior says “give 1 of adrenaline”. What should happen?`,o:[`The nurse gives 1 mL of whatever adrenaline is on the trolley`,`The nurse says “1 milligram of adrenaline IV, 1 in 10,000, giving now” and your senior confirms`,`You write the order first, then it is given`,`The nurse waits for the pharmacist`],a:1,e:`Closed-loop communication: the drug, dose, route and strength are said out loud and confirmed. In an arrest the order is written straight after.`},
],
[
{t:'h',x:`Documentation: if it isn’t written, it didn’t happen`},
{t:'p',x:`Your note is a clinical tool, a legal document and a message to the next doctor. In Saudi medico-legal reviews, the notes are often the only evidence of what you did.`},
{t:'list',i:[`Write the <b>time</b> of every entry, and the time you saw the patient.`,`Record vitals, positives <b>and important negatives</b> (“no neck stiffness”, “no saddle anaesthesia”).`,`Write what you discussed with the patient and family, and who was present.`,`Write your name, “intern”, and the name of the senior you discussed with.`,`<b>Never edit or delete</b> an earlier entry. Add a timed addendum: “Addendum 14:20 — …”.`,`Facts, not opinions. “Patient states he was hit with a stick” — not “patient was assaulted”.`]},
{t:'reveal',q:`What is wrong with this note? “Pt ok. Chest pain better. D/C.”`,a:`Almost everything. No time, no vitals, no ECG, no troponin, no senior named, “ok” means nothing, interns cannot discharge, and there is no safety-netting. A better version: <i>“15:40. Pain-free after GTN. HR 76, BP 132/80. ECGs at 0 and 2 h unchanged, hs-troponin 0 and 2 h below cut-off (values). Discussed with Dr. Fahad (registrar) — discharge with cardiology clinic in 1 week. Return precautions explained in Arabic to patient and son: return if pain recurs, breathlessness or fainting. — {DR}, intern.”</i>`},
],
[
{t:'h',x:`Handover with I-PASS`},
{t:'p',x:`Handover is the most dangerous moment of the shift. Use the same structure every time:`},
{t:'table',head:['','Meaning','Example'],rows:[
['<b>I</b>','Illness severity — stable, watcher, unstable','“Watcher.”'],
['<b>P</b>','Patient summary — one-liner, what was done','“Bed 9, 70M, CAP, had cultures and ceftriaxone at 17:00.”'],
['<b>A</b>','Action list — what is still to do, and by whom','“Lactate repeat due at 21:00 — I have asked the nurse.”'],
['<b>S</b>','Situation awareness / contingency — what if?','“If his BP drops below 90, start a second bolus and call the senior.”'],
['<b>S</b>','Synthesis by receiver — they repeat it back','“So: watcher, repeat lactate at 9, escalate if hypotensive.”']]},
{t:'mcq',q:`What is the most dangerous phrase in an ED handover?`,o:[`“He’s stable.”`,`“Bloods are pending.”`,`“Family is at the bedside.”`,`“The plan is admission under medicine.”`],a:1,e:`“Pending” with no name, no time and no action is how abnormal potassium levels get found at 6 a.m. Say who will check it and what to do if it is abnormal.`},
],
[
{t:'h',x:`Infection control and protecting yourself`},
{t:'call',k:'saudi',title:'MERS-CoV — a Saudi priority',x:`Saudi triage screens every patient with fever or respiratory symptoms for MERS-CoV with a few standard questions: <b>contact with a confirmed case</b>, recent work in or visit to a healthcare facility with MERS cases, or direct contact with camels. A positive screen means a surgical mask on the patient, an isolation room, and <b>N95 + gown + gloves + eye protection</b> for you. Infection control is notified. Follow the current MOH case definition posted at triage.`},
{t:'list',i:[`Hand hygiene at the <b>5 moments</b>: before touching a patient, before a clean procedure, after body-fluid exposure, after touching a patient, after touching their surroundings.`,`PPE <b>before</b> you enter an isolation room, not after you realise what it is.`,`Sharps go straight into the sharps bin, by the person who used them. Never re-cap.`]},
{t:'case',title:'Needlestick at 3 a.m.',pt:'Night shift',nomon:1,start:'a',n:{
a:{x:`<p>While taking blood from a confused patient, he pulls his arm and the needle goes into your finger. The patient has hepatitis C and an unknown HIV status. It’s 3 a.m. and the department is busy.</p>`,
ch:[{x:`Squeeze the finger hard to make it bleed, then carry on — you will report it in the morning`,s:0,go:'b',f:`Squeezing is not recommended and delaying the report delays HIV prophylaxis, which works best when started within hours.`},
{x:`Wash it under running water with soap, tell your senior and the charge nurse, and go to occupational health / the ED doctor on duty now`,s:2,go:'c',f:`Correct. Let it bleed freely, wash, don’t scrub or squeeze, and report immediately.`}]},
b:{x:`<p>By morning, nine hours have passed.</p>`,ch:[{x:`Report now`,s:0,go:'c',f:`Still worth doing — prophylaxis can be started up to 72 hours — but the earlier, the better.`}]},
c:{x:`<p>The ED doctor on duty assesses the exposure, the source patient’s bloods (HIV, HBV, HCV) are sent with consent, and you get baseline bloods. An incident report is filed. You are offered HIV prophylaxis while the source result comes back.</p><p>Your senior covers your patients. Nobody is upset with you.</p>`}},
debrief:`Every hospital has a needlestick pathway — find out where it is in your first week. Reporting protects you; it is never a mark against you.`},
]]});

/* ================= MODULE 4 ================= */
MODULES.push({id:'m04',n:4,part:'Part B · The rules',title:'Law, ethics & the Saudi context',sub:'Consent, refusal, confidentiality, medico-legal cases, abuse, DNR, death in the ED and pressure from outside',mins:30,
take:[
`A competent adult — man or woman — gives their own consent. A guardian consents for a minor. In a life-threatening emergency, treat without delay.`,
`A patient leaving against advice: check capacity, explain risks in their language, involve your senior, document, and tell them they can come back any time.`,
`Accidents, assaults, burns, poisonings, firearm injuries and unknown patients are medico-legal: inform the senior and the hospital police office. Describe — don’t interpret.`,
`Suspected abuse must be reported (Child Protection team / 1919). You don’t need proof — you need a reasonable suspicion.`,
`DNR is decided by three physicians, not by interns and not by the family. If there is no valid DNR, the patient is full code.`],
s:[
[
{t:'mentor',x:`<p>You will not be sued for not knowing a rare disease. You can get into real trouble for taking a history from the wrong person, sharing results on WhatsApp, or letting a confused patient walk out. This module is the part of medicine nobody taught you in lectures.</p>`},
{t:'h',x:`Consent — who signs?`},
{t:'list',i:[`A <b>competent adult</b> (18 and over) consents for themselves — <b>whether man or woman</b>. A Saudi MOH directive states that a guardian’s approval is not required for an adult woman to receive health services.`,`For a <b>minor</b> (under 18), consent comes from the parent or legal guardian.`,`Consent must be <b>informed</b> (risks, benefits, alternatives explained in a language they understand), <b>voluntary</b>, and given by someone with <b>capacity</b>.`,`In a <b>life-threatening emergency</b> where the patient cannot consent and delay would cause harm, treat. Document why.`,`Consent for a procedure is taken by the doctor performing it, or a licensed doctor — not by an intern on their behalf.`]},
{t:'call',k:'saudi',x:`Families are central in Saudi care, and patients often want relatives involved. Include them <b>when the patient wants it</b>. But the decision belongs to the competent patient. If a husband insists he must sign for his adult, competent wife, explain politely that the hospital takes her own consent — and involve your senior if it becomes a conflict.`},
{t:'mcq',q:`A 26-year-old married woman needs a CT with contrast. She agrees. Her husband is at work and unreachable. The radiographer asks whose signature is needed.`,o:[`Her husband’s — she is married`,`Her father’s`,`Her own — she is a competent adult`,`Nobody’s — CT doesn’t need consent`],a:2,e:`She is a competent adult and consents for herself. Contrast scans do need consent at most hospitals because of allergy and kidney risks.`},
],
[
{t:'h',x:`Capacity and leaving against medical advice (DAMA)`},
{t:'p',x:`A patient with capacity can refuse anything — even treatment that would save their life. To have capacity they must be able to <b>understand</b> the information, <b>retain</b> it, <b>weigh</b> it, and <b>communicate</b> a decision.`},
{t:'tool',name:'capacity'},
{t:'case',title:'“I want to go home”',pt:'Acute · bed 14',mon:{hr:92,bp:'148/90',sp:'97%',rr:18},start:'a',n:{
a:{x:`<p>A 52-year-old man with chest pain for 2 hours. First ECG shows subtle ST depression, troponin is pending. He takes off his monitor leads.</p>`,say:{who:'Patient, bed 14',ar:`خلاص يا {دكتور|دكتورة}، أنا أحسن دحين. عندي شغل بكرة الصبح، أبغى أطلع، {اكتبلي|اكتبيلي} ورقة وخلّصنا.`,en:`That’s it, doctor, I feel better now. I have work tomorrow morning. I want to leave — write me a paper and let’s finish this.`},
ch:[{x:`Tell him he can’t leave and ask security to stop him`,s:0,go:'b',f:`A competent adult cannot be detained. Force without legal grounds is assault. Security is for violence, not disagreement.`},
{x:`Sit down, ask what’s worrying him, explain in plain Arabic what the ECG may mean and what could happen, and call your senior`,s:2,go:'c',f:`Most DAMA patients stay once someone listens. Fear of cost, work, family or a long wait is common.`},
{x:`Give him the DAMA form to sign so he can go`,s:0,go:'b',f:`Too fast. The form doesn’t protect anyone if nobody assessed capacity and explained the risks.`}]},
b:{x:`<p>He is now angry and heading for the exit. Your senior arrives.</p>`,ch:[{x:`Let your senior lead while you listen`,s:1,go:'c',f:`OK — but you could have started that conversation.`}]},
c:{x:`<p>It turns out he is worried about missing a meeting where his contract is renewed. Your senior explains that this could be a heart attack and that it can cause sudden death. He understands and repeats the risks back correctly. He still wants to leave.</p>`,
ch:[{x:`Accept that he has capacity: document the discussion, he signs DAMA, give aspirin if he agrees, written advice, and tell him he can return any time`,s:2,go:'d',f:`That is a safe DAMA. You keep the door open — “you are welcome back at any hour, no need to wait from the start”.`},
{x:`Refuse to give him anything since he is leaving against advice`,s:0,go:'d',f:`Leaving against advice doesn’t mean losing all care. Offer whatever he will accept.`}]},
d:{x:`<p>He comes back the next morning at 06:00 with ongoing pain. Troponin is raised. Because the door was left open, he came back.</p>`}},
debrief:`A good DAMA note includes: capacity assessed, risks explained (specifically, e.g. “death”), in which language, who was present, senior’s name, what was offered, and that he was told he can return.`},
],
[
{t:'h',x:`Confidentiality`},
{t:'list',i:[`Information belongs to the patient. Relatives — including spouses and parents of adults — get details <b>only with the patient’s permission</b>.`,`Employers, schools, sponsors and the police receive information through <b>official hospital channels</b> (medical reports, the police office), not from you in the corridor.`,`<b>No photos of patients</b> on your phone, ever — not even “for learning”. No patient details in WhatsApp groups.`,`Watch your voice at the board. Curtains are not walls.`]},
{t:'mcq',q:`A caller says he is the brother of a patient admitted after an RTA and asks whether he was drunk. What do you say?`,o:[`Tell him the toxicology result`,`Say “I can’t share any information on the phone. Please come to the department, and with the patient’s permission the team will update you.”`,`Confirm the patient is here but say nothing else`,`Transfer him to the police office`],a:1,e:`You cannot verify a caller’s identity. Even confirming someone is a patient can be a breach. Keep it general and polite.`},
],
[
{t:'h',x:`Medico-legal cases (MLC)`},
{t:'p',x:`Some patients come with a legal side as well as a medical one. In Saudi hospitals, these are notified to the police through the hospital’s process — at CMC, the <b>hospital police office</b> next to the ED.`},
{t:'sort',q:`Medico-legal case or not?`,bins:[{l:'Medico-legal'},{l:'Not usually'}],i:[
{x:`Road traffic accident`,b:0,w:`Always an MLC, even if minor.`},
{x:`Assault or injury from a fight`,b:0},
{x:`Child with a fracture and a story that doesn’t fit`,b:0,w:`Suspected abuse — MLC and Child Protection.`},
{x:`Poisoning or overdose, accidental or intentional`,b:0},
{x:`Burns, firearm or stab wounds`,b:0},
{x:`Unidentified or unconscious patient with no companion`,b:0},
{x:`Work injury at a construction site`,b:0,w:`Workplace injuries are treated as medico-legal at most hospitals because of liability and insurance.`},
{x:`Elderly woman with pneumonia`,b:1},
{x:`Renal colic`,b:1},
{x:`Death on arrival or unexpected death in the ED`,b:0}]},
{t:'call',k:'rule',title:'Your role in an MLC',x:`<ul><li><b>Treat first.</b> The legal side never delays care.</li><li>Inform your senior; they inform the police office per policy.</li><li>Document injuries precisely: site, size (cm), shape, colour, type (abrasion, laceration, bruise, burn). Use a body diagram.</li><li>Write what the patient says in quotation marks. Do not write conclusions (“was beaten by husband”).</li><li>Preserve evidence: bag clothes in paper, don’t wash wounds more than needed, keep bullets and blades.</li><li>Medical reports for the police are written by a licensed doctor — not you.</li></ul>`},
],
[
{t:'h',x:`Abuse — children, women, the elderly`},
{t:'p',x:`Saudi law (the Child Protection Law and the Protection from Abuse Law) requires health practitioners to report suspected abuse or neglect. Hospitals have <b>Child Protection teams</b> linked to the National Family Safety Program, and the Ministry of Human Resources runs the <b>1919</b> reporting line.`},
{t:'list',title:'Red flags',i:[`A story that changes, or doesn’t match the injury or the child’s age`,`Delay in seeking care`,`Bruises in babies who aren’t yet mobile; bruises on the ears, neck or torso of young children`,`Patterned injuries: belt, hand, cigarette burn, immersion burn with clear lines`,`A partner who answers every question for the patient and won’t leave the room`]},
{t:'call',k:'pearl',x:`You need a <b>reasonable suspicion</b>, not proof. Your job is to notice, keep the patient safe, document, and escalate to your senior, the social worker and the Child Protection team. Do not confront the suspected abuser yourself.`},
{t:'mcq',q:`A 30-year-old woman has bruises of different ages on her arms. Her husband answers all your questions. What is your best next step?`,o:[`Ask her directly about abuse in front of her husband`,`Find a reason to examine her alone (e.g. “we examine all patients privately”), with a female nurse, and ask open, safe questions`,`Call the police from the bedside`,`Ignore it — it’s a family matter`],a:1,e:`Safety first: separate them without accusation. If she discloses, involve your senior and the social worker; they know the reporting pathway and safe options for her.`},
],
[
{t:'h',x:`DNR and code status`},
{t:'p',x:`Saudi policy (based on Fatwa 12086 and the 2017 national DNR policy of the Saudi Health Council) makes DNR a <b>medical decision by three physicians</b>, led by the consultant responsible for the patient. The family is informed and supported, but does not decide.`},
{t:'list',i:[`Before you start CPR, there is no time to research: <b>if there is no valid DNR form, the patient is full code.</b>`,`As an intern, you <b>never</b> write, change or discuss a DNR on your own.`,`A DNR is not “do not treat”. Pain relief, oxygen, antibiotics and dignity continue.`,`Check code status on handover for every frail, elderly or palliative patient.`]},
{t:'mcq',q:`An 88-year-old with metastatic cancer arrests in the ED. His son shouts “do everything!”. A nurse says she thinks there is a DNR from his last admission, but the form can’t be found.`,o:[`Don’t start CPR — the nurse remembers a DNR`,`Start CPR and call your senior; look for the valid form in parallel`,`Ask the son to decide`,`Do “slow code” — gentle compressions`],a:1,e:`No valid form in front of you means full resuscitation until a senior confirms otherwise. A “slow code” is dishonest and never acceptable.`},
],
[
{t:'h',x:`When a patient dies in the ED`},
{t:'list',i:[`Death is confirmed by a <b>licensed physician</b>. You may be present and learn the examination: no central pulse, heart sounds or breath sounds over several minutes of observation (commonly 5), fixed dilated pupils, no response to pain.`,`Note the time of death, who confirmed it, and who was told.`,`In a medico-legal or unexpected death, <b>leave all lines and tubes in place</b> and inform the police office.`]},
{t:'call',k:'saudi',title:'Caring for a Muslim patient after death',x:`Gently close the eyes and mouth, straighten the limbs, and if possible turn the body to face the qibla. Cover the body completely. Allow the family to be present and to pray. Families often want the body released quickly for washing and burial, ideally the same day — tell your senior early so paperwork isn’t the delay. Autopsy is uncommon and is mainly done when the law requires it.`},
{t:'say',who:'A daughter, after her father has died',ar:`الله يرحمه... يا {دكتور|دكتورة} متى نقدر ناخذه؟ نبغى ندفنه اليوم إن شاء الله.`,en:`May God have mercy on him… Doctor, when can we take him? We want to bury him today, God willing.`},
{t:'reveal',q:`What could you say?`,a:`Something simple and honest, after expressing condolence: <i>“عظم الله أجركم. الطبيب المسؤول بيكمل الأوراق دحين، وبنحاول نخلّصها بأسرع وقت عشان تقدرون تدفنونه اليوم.”</i> — “May God magnify your reward. The responsible doctor will complete the paperwork now, and we’ll try to finish it as quickly as possible so you can bury him today.” Then make sure it happens.`},
],
[
{t:'h',x:`Pressure from outside the bedside`},
{t:'table',head:['Situation','What you do'],rows:[
['A patient asks you for <b>sick leave</b> (إجازة مرضية)','Interns can’t issue it. Sick leaves are issued electronically through the Seha platform by a licensed physician. Refer to your senior — and never promise one.'],
['Someone asks for a <b>medical report</b> for court, police, school or work','Through the hospital’s medical reports process, by a licensed doctor.'],
['A relative becomes <b>aggressive</b>','Keep distance, don’t argue, keep the exit behind you, call security. Saudi law penalises assault on healthcare workers — you don’t have to tolerate it.'],
['A patient offers you a <b>gift or money</b>','Politely decline. A sincere “جزاك الله خير” is enough.'],
['<b>Social media</b>: a viral clip, a funny case','Never post about patients, even anonymised. Jeddah is a small city — people recognise each other.']]},
{t:'mcq',q:`A young man with a mild cold asks you for three days of sick leave “because the manager wants a paper”. What do you do?`,o:[`Write it on a hospital note paper`,`Tell him sick leaves go through Seha and are issued by a licensed doctor; ask your senior to assess whether it is medically justified`,`Tell him colds don’t get sick leave`,`Give him the senior’s mobile number`],a:1,e:`You don’t issue it and you don’t decide it alone. Your senior will assess and, if justified, issue it through Seha.`},
]]});
