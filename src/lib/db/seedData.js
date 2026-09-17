/**
 * High-quality clinical seed data for Rotation Companion across all 15 Core & Specialty Rotations.
 */

export const INITIAL_DEMO_USER = {
  id: 'demo-user',
  name: 'Alex Rivera',
  email: 'alex.rivera@medschool.edu',
  studentType: 'med_student',
  academicYear: 'year_3',
  currentRotationId: 'general-surgery',
  rotationStartDate: new Date().toISOString().split('T')[0],
  rotationEndDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  avatarUrl: '',
  medicalSchool: 'Johns Hopkins School of Medicine',
  targetSpecialty: 'General Surgery / Interventional Radiology',
  completedTopicIds: ['topic-surg-1', 'topic-surg-2'],
  bookmarkedQuestionIds: ['q-surg-1']
};

export const INITIAL_HISTORICAL_ROTATIONS = [
  {
    id: 'hist-1',
    rotationId: 'internal-medicine',
    name: 'Internal Medicine',
    startDate: '2026-04-01',
    endDate: '2026-04-28',
    grade: 'Honors',
    notes: 'Strong diagnostic reasoning in cardiology and nephrology. Shelf exam score 94th percentile.'
  },
  {
    id: 'hist-2',
    rotationId: 'pediatrics',
    name: 'Pediatrics',
    startDate: '2026-05-01',
    endDate: '2026-05-28',
    grade: 'High Pass',
    notes: 'Great rapport with pediatric patients and parents. Excellent neonatal resuscitation knowledge.'
  },
  {
    id: 'hist-3',
    rotationId: 'obgyn',
    name: 'Obstetrics & Gynecology',
    startDate: '2026-06-01',
    endDate: '2026-06-28',
    grade: 'Honors',
    notes: 'Outstanding surgical skills in L&D and gynecologic OR. High evaluation scores from chief resident.'
  },
  {
    id: 'hist-4',
    rotationId: 'psychiatry',
    name: 'Psychiatry',
    startDate: '2026-07-01',
    endDate: '2026-07-28',
    grade: 'High Pass',
    notes: 'Thorough mental status examinations and suicide risk assessments in inpatient unit.'
  }
];

export const INITIAL_LOGGED_CASES = [
  {
    id: 'log-surg-1',
    rotationId: 'general-surgery',
    date: new Date().toISOString().split('T')[0],
    category: 'Acute Abdomen',
    chiefComplaint: '22-year-old male with 18 hours of periumbilical pain migrating to RLQ and anorexia',
    diagnosisCategory: 'Acute Appendicitis',
    observed: 'Observed laparoscopic appendectomy. Assisted with abdominal insufflation and mesoappendix dissection.',
    learned: 'Alvarado score criteria (score >= 7 indicates high probability). Confluence of taeniae coli locates appendiceal base.',
    questionsHad: 'When is non-operative management with antibiotics appropriate versus emergency surgery?',
    topicsToReview: ['Acute Appendicitis', 'Laparoscopic Surgery Principles']
  },
  {
    id: 'log-surg-2',
    rotationId: 'general-surgery',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    category: 'Intestinal Obstruction',
    chiefComplaint: '64-year-old female with bilious emesis, abdominal distension, and obstipation for 2 days',
    diagnosisCategory: 'Small Bowel Obstruction (SBO)',
    observed: 'Assisted in placing Nasogastric (NG) tube under suction. Evaluated abdominal series upright X-ray.',
    learned: 'Adhesions are the #1 cause of SBO in post-op patients (60-75%). Step-ladder air-fluid levels on upright CXR.',
    questionsHad: 'What radiological criteria indicate complete SBO requiring urgent OR laparotomy?',
    topicsToReview: ['Small Bowel Obstruction', 'NG Tube Management']
  },
  {
    id: 'log-med-1',
    rotationId: 'internal-medicine',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    category: 'Cardiology',
    chiefComplaint: '58-year-old male with severe substernal chest pressure radiating to jaw and diaphoresis',
    diagnosisCategory: 'Acute Coronary Syndrome (STEMI)',
    observed: 'Evaluated 12-lead ECG in ED, noted 3mm ST-segment elevation in leads II, III, and aVF.',
    learned: 'Door-to-balloon target is <90 minutes. Inferior STEMI requires right-sided ECG leads V4R to check RV infarction.',
    questionsHad: 'Why are nitrates strictly contraindicated in right ventricular myocardial infarction?',
    topicsToReview: ['Acute Coronary Syndrome', 'ECG Lead Localization']
  },
  {
    id: 'log-rad-1',
    rotationId: 'radiology',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    category: 'Emergency Neuroradiology',
    chiefComplaint: '54-year-old male presenting with sudden onset "worst headache of life" (thunderclap headache)',
    diagnosisCategory: 'Subarachnoid Hemorrhage (SAH)',
    observed: 'Reviewed non-contrast Head CT and CTA of cerebral vessels with neuroradiology attending.',
    learned: 'Acute intracranial blood appears hyperdense (white) in basal cisterns. Nimodipine prevents vasospasm.',
    questionsHad: 'What is the diagnostic sensibility of non-contrast CT within 6 hours of headache onset?',
    topicsToReview: ['Head CT Interpretation', 'Subarachnoid Hemorrhage']
  },
  {
    id: 'log-peds-1',
    rotationId: 'pediatrics',
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    category: 'Pediatric Infectious Disease',
    chiefComplaint: '21-day-old infant with rectal temperature of 38.4°C (101.1°F) and lethargy',
    diagnosisCategory: 'Neonatal Fever Without Source',
    observed: 'Observed infant lumbar puncture and catheterized urine specimen collection.',
    learned: 'Neonates <28 days with fever require full sepsis workup including LP. Empiric IV Ampicillin + Gentamicin.',
    questionsHad: 'Why is Ceftriaxone avoided in neonates under 28 days of age?',
    topicsToReview: ['Neonatal Sepsis', 'Pediatric Antibiotic Dosing']
  },
  {
    id: 'log-em-1',
    rotationId: 'emergency-medicine',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    category: 'Trauma Resuscitation',
    chiefComplaint: '32-year-old male unrestrained driver involved in high-speed rollover motor vehicle collision',
    diagnosisCategory: 'Polytrauma / Tension Pneumothorax',
    observed: 'Participated in ATLS Primary Survey (ABCDE). Assisted with FAST ultrasound examination.',
    learned: 'Tension pneumothorax is a clinical diagnosis requiring immediate 5th ICS needle decompression before CXR.',
    questionsHad: 'What are the 4 standard anatomic windows evaluated during a FAST ultrasound?',
    topicsToReview: ['ATLS Primary Survey', 'FAST Ultrasound']
  },
  {
    id: 'log-anes-1',
    rotationId: 'anesthesiology',
    date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    category: 'Airway Management',
    chiefComplaint: 'Pre-operative airway evaluation for elective open cholecystectomy in Class III obese patient',
    diagnosisCategory: 'Difficult Airway Management',
    observed: 'Evaluated Mallampati score (Class III), performed Rapid Sequence Induction (RSI) and video laryngoscopy.',
    learned: 'Continuous 4-phase waveform capnography is the gold standard for confirming ETT position.',
    questionsHad: 'What are absolute contraindications to Succinylcholine administration?',
    topicsToReview: ['Mallampati Airway Classification', 'Rapid Sequence Induction']
  },
  {
    id: 'log-ortho-1',
    rotationId: 'orthopedics',
    date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    category: 'Trauma & Musculoskeletal',
    chiefComplaint: '28-year-old male motor-cyclist with closed mid-shaft tibial fracture and severe lower leg pain',
    diagnosisCategory: 'Acute Compartment Syndrome',
    observed: 'Observed intracompartmental pressure measurement and emergency 4-compartment lower leg fasciotomy.',
    learned: 'Pain out of proportion and pain with passive muscle stretch are early diagnostic markers. Delta P <= 30 mmHg.',
    questionsHad: 'Why is pulselessness considered a late and unreliable sign of acute compartment syndrome?',
    topicsToReview: ['Compartment Syndrome', 'Fasciotomy Principles']
  }
];

export const INITIAL_TOPICS = [
  // 1. General Surgery
  {
    id: 'topic-surg-1',
    rotationId: 'general-surgery',
    title: 'Acute Appendicitis',
    description: 'Pathophysiology, clinical presentation, Alvarado score, diagnostics, and surgical management of appendicitis.',
    importance: 5,
    difficulty: 3,
    estimatedTimeMin: 15,
    weekNumber: 1,
    content: {
      whatIsIt: 'Acute inflammation of the vermiform appendix, most commonly caused by luminal obstruction by a fecalith, lymphoid hyperplasia, or neoplasm.',
      whyItMatters: 'It is the most common cause of emergency general surgical admission worldwide. Delayed diagnosis risks perforation, peritonitis, and intra-abdominal abscess formation.',
      typicalPresentation: 'Periumbilical visceral pain migrating to the right lower quadrant (McBurney point) over 12–24 hours, accompanied by anorexia, low-grade fever, nausea, and localized peritoneal signs.',
      importantHistory: 'Ask about exact sequence of pain migration (visceral to somatic), appetite ("anorexia is present in >90%"), vomiting timing (usually after pain onset), bowel habits, and gynecologic history in females.',
      importantExam: 'McBurney point tenderness, Rovsing sign (RLQ pain on LLQ palpation), Psoas sign (pain on right hip extension), Obturator sign (pain on internal rotation of flexed right hip), and rebound tenderness.',
      investigations: 'CBC with diff (leukocytosis with left shift), CRP, urinalysis (rule out UTI/nephrolithiasis), pregnancy test in females. Imaging: Ultrasound in children/pregnant women; Contrast-enhanced CT scan of abdomen/pelvis in adults (appendix >6mm with wall thickening/stranding).',
      differentialDiagnosis: 'Acute mesenteric adenitis, cecal diverticulitis, Meckel diverticulitis, ectopic pregnancy, ruptured ovarian cyst, pelvic inflammatory disease, nephrolithiasis, terminal ileitis (Crohn\'s).',
      complications: 'Perforation, appendiceal phlegmon/abscess, generalized peritonitis, pylephlebitis (portal vein septic thrombophlebitis), surgical site infection post-op.',
      keyLearningPoints: [
        'Anorexia is almost universal — if the patient is ravenously hungry, reconsider appendicitis.',
        'Alvarado Score ≥7 strongly favors acute appendicitis.',
        'CT scan sensitivity and specificity are >95% in adults.',
        'Laparoscopic appendectomy is the gold standard definitive management.'
      ],
      commonQuestions: [
        'What anatomic milestone helps locate the base of the appendix during surgery? (Confluence of the taeniae coli at the cecal apex)',
        'What is the most common cause of appendiceal luminal obstruction in pediatric patients? (Lymphoid hyperplasia)'
      ]
    }
  },
  {
    id: 'topic-surg-2',
    rotationId: 'general-surgery',
    title: 'Small Bowel Obstruction (SBO)',
    description: 'Etiology, cardinal symptoms, plain film vs CT findings, conservative management vs surgical indications.',
    importance: 5,
    difficulty: 3,
    estimatedTimeMin: 15,
    weekNumber: 2,
    content: {
      whatIsIt: 'Mechanical or functional blockage of the small intestine preventing normal transit of intraluminal content.',
      whyItMatters: 'Adhesions from prior surgery account for 60-75% of cases. Closed-loop obstruction can lead to ischemia, necrosis, and perforation within hours.',
      typicalPresentation: 'Four cardinal features: colicky abdominal pain, profuse bilious vomiting, abdominal distension, and obstipation (failure to pass gas or stool).',
      importantHistory: 'Prior abdominal/pelvic surgeries (adhesions!), hernia history, history of malignancy, bowel habits, inflammatory bowel disease.',
      importantExam: 'High-pitched "tinkling" bowel sounds early, silent abdomen late. Inspect for surgical scars and perform thorough groin examination for incarcerated femoral or inguinal hernias.',
      investigations: 'Abdominal X-rays (supine and upright): dilated small bowel loops (>3cm), air-fluid levels in step-ladder pattern, absence of colonic gas. CT abdomen/pelvis with IV contrast is gold standard.',
      differentialDiagnosis: 'Paralytic ileus, large bowel obstruction, pseudo-obstruction (Ogilvie syndrome), mesenteric ischemia.',
      complications: 'Bowel strangulation, ischemia, transmural necrosis, perforation, septic shock, severe electrolyte imbalances.',
      keyLearningPoints: [
        'Adhesions #1 cause in developed nations; hernias #1 cause worldwide without prior surgery history.',
        'Complete obstruction requires urgent surgery; partial SBO often resolves with conservative NPO + NG tube decompression.',
        'Peritoneal signs, fever, and leukocytosis suggest strangulation/ischemia.'
      ],
      commonQuestions: [
        'What is the cardinal radiological finding of SBO on upright plain film? (Multiple air-fluid levels >3cm in step-ladder configuration)',
        'What is the initial non-operative management bundle for uncomplicated adhesion SBO? (NPO, IV fluid resuscitation, Foley catheter, and Nasogastric tube decompression)'
      ]
    }
  },

  // 2. Internal Medicine
  {
    id: 'topic-med-1',
    rotationId: 'internal-medicine',
    title: 'Acute Coronary Syndrome (ACS)',
    description: 'STEMI vs NSTEMI vs Unstable Angina, ECG localized lead changes, troponin kinetics, and antiplatelet algorithms.',
    importance: 5,
    difficulty: 4,
    estimatedTimeMin: 20,
    weekNumber: 1,
    content: {
      whatIsIt: 'Spectrum of myocardial ischemia resulting from acute coronary artery plaque rupture, thrombosis, or vasospasm.',
      whyItMatters: 'Leading cause of adult mortality globally. Rapid Door-to-Balloon time (<90 min) in STEMI saves myocardial tissue and reduces cardiac arrest risk.',
      typicalPresentation: 'Substernal pressure, heaviness, or radiation to jaw/left arm, diaphoresis, dyspnea, nausea. Atypical presentations (silent MI) common in diabetics and elderly.',
      importantHistory: 'Cardiovascular risk factors (hypertension, dyslipidemia, smoking, diabetes, family history of premature CAD), cocaine use in young patients.',
      importantExam: 'Heart rate, blood pressure, S3/S4 gallop, new systolic murmur (papillary muscle dysfunction/MR), signs of heart failure (elevated JVP, lung crackles).',
      investigations: '12-lead ECG within 10 minutes of arrival. Cardiac Biomarkers: High-sensitivity Troponin I/T at 0h and 1-3h. Lipid panel, CMP, CBC, Coagulation studies.',
      differentialDiagnosis: 'Aortic dissection, pulmonary embolism, pericarditis/myocarditis, GERD/esophageal spasm, tension pneumothorax.',
      complications: 'Ventricular arrhythmias (VF/VT), cardiogenic shock, papillary muscle rupture, free wall rupture, pericarditis (Dressler syndrome).',
      keyLearningPoints: [
        'STEMI requires emergent reperfusion (PCI within 90 mins; fibrinolysis within 30 mins if PCI unavailable).',
        'MONA-BASH regimen: Morphine, Oxygen (if SaO2<90%), Nitrates, Aspirin, Beta-blockers, ACEi, Statin, Heparin.',
        'Nitrates are strictly contraindicated in Right Ventricular infarction (inferior STEMI with ST elevation in V4R).'
      ],
      commonQuestions: [
        'Which ECG leads correspond to an anteroseptal myocardial infarction? (V1 to V4 - LAD artery)',
        'Why are nitrates contraindicated in Right Ventricular Infarction? (RV infarction is preload dependent; nitrates cause venodilation reducing preload, precipitating severe hypotension)'
      ]
    }
  },

  // 3. Radiology
  {
    id: 'topic-rad-1',
    rotationId: 'radiology',
    title: 'Chest Radiograph (CXR) Systematic Interpretation',
    description: 'ABCDE approach to reading CXR, identifying consolidation, pneumothorax, pulmonary edema, and tube/line placement.',
    importance: 5,
    difficulty: 2,
    estimatedTimeMin: 15,
    weekNumber: 1,
    content: {
      whatIsIt: 'Systematic visual inspection framework for evaluating PA and lateral chest radiographs in clinical practice.',
      whyItMatters: 'Most frequently ordered diagnostic imaging study in medicine. Correct interpretation is essential for acute cardiopulmonary management.',
      typicalPresentation: 'Evaluation of acute dyspnea, chest pain, trauma, fever, cough, or line position verification.',
      importantHistory: 'Surgical history, prior CXRs for comparison, smoking history, immunodeficiency, clinical suspicion (pneumonia vs HF vs PE).',
      importantExam: 'Correlate radiological findings with focal crackles, wheezing, bronchial breath sounds, or absent breath sounds.',
      investigations: 'Systematic ABCDE approach: Airway (tracheal alignment), Bones/Soft tissue (fractures), Cardiac (cardiomegaly >50% width), Diaphragm (flattening, free air), Equal lung fields (infiltrates, pneumothorax, effusion).',
      differentialDiagnosis: 'Lobular pneumonia, pulmonary edema (Kerley B lines, bat-wing opacity), pneumothorax (visceral pleural line), pleural effusion (costophrenic blunting).',
      complications: 'Misinterpretation of misaligned ET tube, missed subtle pneumothorax, unrecognized free air under diaphragm (perforated viscus).',
      keyLearningPoints: [
        'Always check technical quality: Rotation, Inspiration (9-10 posterior ribs), Penetration (vertebral bodies visible behind heart).',
        'Free air under diaphragm on upright CXR indicates perforated hollow viscus until proven otherwise.',
        'Deep sulcus sign on supine CXR indicates occult pneumothorax.'
      ],
      commonQuestions: [
        'What is the Silhouette Sign in chest radiography? (Loss of normal radiographic border between structures of similar tissue density, e.g., right heart border loss indicates RML consolidation)',
        'How many posterior ribs should be visible above the diaphragm on a technically adequate inspiratory CXR? (9 to 11 posterior ribs)'
      ]
    }
  },
  {
    id: 'topic-rad-2',
    rotationId: 'radiology',
    title: 'Emergency Abdominal & Head CT Basics',
    description: 'Indications for non-contrast CT Head (stroke vs bleed) and Contrast-enhanced CT Abdomen (appendicitis, diverticulitis, trauma).',
    importance: 5,
    difficulty: 3,
    estimatedTimeMin: 15,
    weekNumber: 2,
    content: {
      whatIsIt: 'Rapid cross-sectional tomographic imaging protocols for acute neurological and abdominal emergencies.',
      whyItMatters: 'CT non-contrast Head is the gold-standard initial imaging to rule out intracranial hemorrhage before thrombolysis in acute stroke.',
      typicalPresentation: 'Thunderclap headache, focal neurologic deficits, acute abdominal pain, blunt abdominal trauma.',
      importantHistory: 'Time of symptom onset, anticoagulant use, GFR/kidney function (contrast nephropathy risk), iodine allergy.',
      importantExam: 'GCS score, pupillary symmetry, focal weakness, peritoneal abdominal signs, hemodynamic stability.',
      investigations: 'Head CT (hyperdense acute blood, midline shift, skull fractures). Abdominal CT with IV contrast (bowel wall thickening, fluid collections, solid organ lacerations, extravasation).',
      differentialDiagnosis: 'Subarachnoid hemorrhage vs subdural/epidural hematoma; Acute ischemic stroke; Perforated diverticulitis vs appendicitis vs pancreatitis.',
      complications: 'Contrast-induced nephropathy, radiation exposure, delayed diagnosis of early ischemic stroke (<6 hours may appear normal on CT).',
      keyLearningPoints: [
        'Acute intracranial blood appears HYPERDENSE (bright white) on non-contrast CT.',
        'Epidural hematoma is convex/lens-shaped (does not cross suture lines); Subdural is crescent-shaped (crosses suture lines).',
        'Check serum creatinine before administering IV iodinated contrast.'
      ],
      commonQuestions: [
        'What is the characteristic shape of an epidural hematoma on non-contrast head CT? (Biconvex / lens-shaped, limited by cranial sutures)',
        'Why is a non-contrast head CT performed immediately in suspected ischemic stroke? (To rule out intracranial hemorrhage before administering IV tPA)'
      ]
    }
  },

  // 4. Pediatrics
  {
    id: 'topic-peds-1',
    rotationId: 'pediatrics',
    title: 'Pediatric Acute Fever & Sepsis',
    description: 'Approach to fever without localizing signs, neonatal fever algorithms (<28d vs 29-60d), and pediatric sepsis resuscitation.',
    importance: 5,
    difficulty: 3,
    estimatedTimeMin: 15,
    weekNumber: 1,
    content: {
      whatIsIt: 'Systemic inflammatory response to infection in infants and children, carrying risk of rapid deterioration to septic shock.',
      whyItMatters: 'Neonates (<28 days) with fever (≥38.0°C) require full sepsis workup including LP due to immature immune systems.',
      typicalPresentation: 'Fever, lethargy, poor feeding, irritability, tachypnea, tachycardia, delayed capillary refill (>2s), weak peripheral pulses.',
      importantHistory: 'Maternal GBS status, intrapartum fever, gestational age, immunization history, fluid intake/urine output (wet diapers).',
      importantExam: 'Fontanelle bulge/depression, skin rash (petechiae/purpura), tone, cry quality, capillary refill, respiratory effort.',
      investigations: 'Neonates <28d: CBC, Blood Culture, Urinalysis + Urine Culture, Lumbar Puncture (CSF count, protein, glucose, culture).',
      differentialDiagnosis: 'Bacterial meningitis, bacteremia, UTI, pneumonia, viral illness (enterovirus, HSV), dehydration.',
      complications: 'Septic shock, DIC, acute respiratory distress, neurological sequelae from meningitis.',
      keyLearningPoints: [
        'Fever in a neonate <28 days is a medical emergency requiring hospitalization and empiric IV Ampicillin + Cefotaxime/Gentamicin.',
        'Do not wait for LP results if infant is unstable — administer IV antibiotics promptly.',
        'Fluid boluses in pediatric septic shock: 10-20 mL/kg isotonic crystalloid.'
      ],
      commonQuestions: [
        'Why is Ceftriaxone avoided in neonates under 28 days of age? (It displaces bilirubin from albumin risking kernicterus)',
        'What are the two empiric IV antibiotics for neonatal fever <28 days? (Ampicillin + Gentamicin or Cefotaxime)'
      ]
    }
  },

  // 5. Emergency Medicine
  {
    id: 'topic-em-1',
    rotationId: 'emergency-medicine',
    title: 'Polytrauma & Primary Survey (ABCDE)',
    description: 'ATLS primary survey, airway stabilization, tension pneumothorax management, pelvic binder, and FAST exam.',
    importance: 5,
    difficulty: 4,
    estimatedTimeMin: 15,
    weekNumber: 1,
    content: {
      whatIsIt: 'Standardized resuscitation and triage protocol for severe traumatic injuries based on Advanced Trauma Life Support (ATLS).',
      whyItMatters: 'Prevents preventable trauma deaths by identifying and treating immediately life-threatening injuries in hierarchical order.',
      typicalPresentation: 'High-energy motor vehicle collision, fall from height, gunshot/stab wound with hemodynamic instability or altered mental status.',
      importantHistory: 'AMPLE history: Allergies, Medications, Past medical history, Last meal, Events leading to injury.',
      importantExam: 'Airway with C-spine restriction, Breathing & Ventilation, Circulation with hemorrhage control, Disability (GCS & pupils), Exposure/Environment.',
      investigations: 'Trauma panel: CBC, Coags, Type & Cross (4-6 units), ABG/Lactate. Radiographs: Chest, Pelvis. eFAST Ultrasound.',
      differentialDiagnosis: 'Tension pneumothorax, massive hemothorax, pericardial tamponade, open pneumothorax, flail chest, hemorrhagic shock.',
      complications: 'Lethal triad of trauma: Hypothermia, Acidosis, Coagulopathy.',
      keyLearningPoints: [
        'Treat life-threatening conditions immediately as they are identified before proceeding to the next step.',
        'Tension pneumothorax is a CLINICAL diagnosis — perform immediate needle thoracostomy before waiting for CXR.',
        'Massive transfusion protocol (MTP) ratio: 1:1:1 (PRBCs : FFP : Platelets).'
      ],
      commonQuestions: [
        'Where is needle decompression performed for tension pneumothorax according to updated ATLS guidelines? (5th intercostal space in anterior axillary line, or 2nd ICS in midclavicular line)',
        'What 4 anatomic windows are examined during a FAST exam? (Pericardial, Right Upper Quadrant/Morison pouch, Left Upper Quadrant/Splenorenal, Pelvic/Suprapubic)'
      ]
    }
  },

  // 6. Anesthesiology
  {
    id: 'topic-anes-1',
    rotationId: 'anesthesiology',
    title: 'Airway Evaluation & Endotracheal Intubation',
    description: 'Mallampati score, ASA physical status classification, Rapid Sequence Induction (RSI) medications, and difficult airway algorithm.',
    importance: 5,
    difficulty: 3,
    estimatedTimeMin: 15,
    weekNumber: 1,
    content: {
      whatIsIt: 'Systematic preoperative airway assessment, pharmacological induction, neuromuscular blockade, and securing artificial airway.',
      whyItMatters: 'Airway management failure is a primary cause of intraoperative brain damage, hypoxic arrest, and anesthesia mortality.',
      typicalPresentation: 'Preoperative evaluation for elective surgery or emergency airway management for respiratory failure.',
      importantHistory: 'Prior difficult intubation history, GERD/aspiration risk, neck radiation, rheumatoid arthritis, cervical spine instability.',
      importantExam: 'Mallampati Class (I-IV), Thyromental distance (<6cm indicates difficult airway), mouth opening (<3 fingerbreadths), neck range of motion.',
      investigations: 'Pre-op airway examination, ASA status determination, arterial blood gas in critically ill patients.',
      differentialDiagnosis: 'Difficult mask ventilation vs difficult intubation vs surgical airway requirement.',
      complications: 'Hypoxemia, esophageal intubation, dental trauma, aspiration pneumonitis, malignant hyperthermia.',
      keyLearningPoints: [
        'RSI key induction drugs: Propofol / Etomidate / Ketamine + Succinylcholine or Rocuronium.',
        'Succinylcholine is contraindicated in hyperkalemia, burn injuries >24h, and denervating neuromuscular diseases.',
        'Confirmation of ETT placement: Continuous waveform capnography is the gold standard.'
      ],
      commonQuestions: [
        'What defines Mallampati Class IV? (Only hard palate visible; soft palate, fauces, and uvula are completely obscured)',
        'What is the gold standard method to confirm correct endotracheal tube placement? (Continuous 4-phase waveform capnography)'
      ]
    }
  },

  // 7. Orthopedics
  {
    id: 'topic-ortho-1',
    rotationId: 'orthopedics',
    title: 'Compartment Syndrome & Open Fractures',
    description: 'Diagnosis of compartment syndrome (6 Ps), delta pressure, emergency fasciotomy, and Gustilo-Anderson open fracture classification.',
    importance: 5,
    difficulty: 3,
    estimatedTimeMin: 15,
    weekNumber: 1,
    content: {
      whatIsIt: 'Surgical emergency where increased pressure within a closed fascial compartment compromises tissue perfusion.',
      whyItMatters: 'Irreversible muscle ischemia and nerve necrosis occur within 4-8 hours if emergency fasciotomy is not performed.',
      typicalPresentation: 'Pain out of proportion to exam, severe pain with passive stretch of involved muscles, tense woody compartment.',
      importantHistory: 'High-energy long bone fracture (tibia #1), crush injury, tight cast/dressing, reperfusion after vascular injury.',
      importantExam: '6 Ps: Pain (earliest/most sensitive), Paresthesia, Pallor, Poikilothermia, Paralysis, Pulselessness (late sign). Pain with passive stretch is pathognomonic.',
      investigations: 'Clinical diagnosis. Intracompartmental pressure measurement: Delta pressure (Diastolic BP - Compartment Pressure) ≤30 mmHg indicates compartment syndrome.',
      differentialDiagnosis: 'Deep vein thrombosis, arterial occlusion, localized hematoma, severe contusion.',
      complications: 'Volkmann ischemic contracture, rhabdomyolysis, acute kidney injury, limb amputation.',
      keyLearningPoints: [
        'Pain out of proportion to injury and pain on passive muscle stretch are the earliest indicators.',
        'Do NOT wait for pulselessness — pulselessness is a late sign indicating irreversible damage.',
        'Treatment is emergent dual-incision 4-compartment fasciotomy of the leg.'
      ],
      commonQuestions: [
        'What is the most common anatomic site for acute compartment syndrome? (Anterior compartment of the lower leg following tibial shaft fracture)',
        'What delta pressure threshold confirms compartment syndrome? (Delta pressure = Diastolic BP - Compartment Pressure ≤ 30 mmHg)'
      ]
    }
  },

  // 8. Neurology
  {
    id: 'topic-neuro-1',
    rotationId: 'neurology',
    title: 'Acute Ischemic Stroke & TIA Management',
    description: 'NIHSS scale, ACA/MCA/PCA vascular territory syndromes, IV thrombolysis window, and mechanical thrombectomy.',
    importance: 5,
    difficulty: 4,
    estimatedTimeMin: 18,
    weekNumber: 1,
    content: {
      whatIsIt: 'Sudden neurological deficit caused by focal cerebral ischemia due to arterial thrombosis or embolism.',
      whyItMatters: 'Time is brain — 1.9 million neurons are lost per minute during untreated acute ischemic stroke.',
      typicalPresentation: 'Sudden onset contralateral hemiparesis, facial droop, dysarthria, aphasia, hemispatial neglect, visual field deficits.',
      importantHistory: 'Exact "Last Known Well" time, anticoagulant use, recent surgery/bleeding history, seizure at onset.',
      importantExam: 'NIH Stroke Scale (NIHSS), blood pressure, capillary glucose (rule out hypoglycemia!), cardiac exam (AFib).',
      investigations: 'Immediate non-contrast Head CT (rule out hemorrhage). CT Angiography (CTA) of head/neck for Large Vessel Occlusion (LVO). ECG, fingerstick glucose.',
      differentialDiagnosis: 'Intracranial hemorrhage, hypoglycemia, post-ictal Todd paralysis, complex migraine, conversion disorder.',
      complications: 'Hemorrhagic transformation, cerebral edema/herniation, aspiration pneumonia, DVT/PE.',
      keyLearningPoints: [
        'IV Alteplase/Tenecteplase window: within 4.5 hours of Last Known Well time.',
        'Mechanical Thrombectomy window: up to 24 hours for LVO (ICA, MCA M1 segment) guided by perfusion imaging.',
        'Target BP before IV tPA: <185/110 mmHg.'
      ],
      commonQuestions: [
        'What vascular territory is involved in contralateral lower extremity weakness greater than upper extremity weakness? (Anterior Cerebral Artery - ACA)',
        'What is the maximum time window for IV tPA administration from Last Known Well? (4.5 hours)'
      ]
    }
  }
];

export const INITIAL_CASES = [
  // Surgery Cases
  {
    id: 'case-surg-1',
    rotationId: 'general-surgery',
    title: 'Acute Appendicitis',
    category: 'Acute Abdomen',
    typicalPresentation: '22-year-old male presenting with 18 hours of periumbilical pain that migrated to the right lower quadrant, accompanied by anorexia and low-grade fever.',
    importantHistory: 'Onset 18h ago, pain migrated from epigastrium to RLQ. Anorexia (+), 1 episode of emesis.',
    examinationConcepts: 'Tenderness at McBurney point, voluntary guarding, positive Rovsing sign, positive Psoas sign.',
    differentialDiagnosis: 'Mesenteric adenitis, cecal diverticulitis, Meckel diverticulitis, gastroenteritis.',
    investigationConcepts: 'CBC: WBC 14.5k. CT Abdomen/Pelvis: 8.5mm blind-ending fluid-filled tubular structure in RLQ with wall thickening.',
    managementPrinciples: 'NPO, IV Fluid hydration, IV Cefoxitin or Ceftriaxone + Metronidazole, prompt Laparoscopic Appendectomy.',
    complications: 'Perforation, localized abscess formation, wound infection.',
    commonQuestionsOnRounds: [
      'What anatomic milestone helps locate the base of the appendix? (Confluence of taeniae coli at cecal apex)'
    ]
  },
  // Internal Medicine Cases
  {
    id: 'case-med-1',
    rotationId: 'internal-medicine',
    title: 'Acute Exacerbation of COPD',
    category: 'Pulmonology',
    typicalPresentation: '68-year-old female smoker presenting with worsening dyspnea, increased sputum volume, and purulence.',
    importantHistory: 'Baseline home oxygen 2L NC. 3-day history of URI symptoms followed by increased dyspnea and green sputum.',
    examinationConcepts: 'Tachypneic (RR 26), using accessory muscles, diffuse wheezing, prolonged expiratory phase.',
    differentialDiagnosis: 'Acute HF decompensation, pulmonary embolism, pneumonia, pneumothorax.',
    investigationConcepts: 'ABG: Acute on chronic respiratory acidosis. CXR: Hyperinflation, flattened diaphragms.',
    managementPrinciples: 'Supplemental O2 (SaO2 88-92%), Inhaled Albuterol/Ipratropium, Oral Prednisone (5 days), Antibiotics (Azithromycin).',
    complications: 'Respiratory failure requiring intubation, cor pulmonale.',
    commonQuestionsOnRounds: [
      'What are the Anthonisen criteria for antibiotic initiation in COPD exacerbation? (Increased dyspnea, sputum volume, and sputum purulence)'
    ]
  },
  // Radiology Cases
  {
    id: 'case-rad-1',
    rotationId: 'radiology',
    title: 'Acute Subarachnoid Hemorrhage',
    category: 'Emergency Neuroradiology',
    typicalPresentation: '54-year-old male presenting to ED with sudden onset "worst headache of life" (thunderclap headache) and nuchal rigidity.',
    importantHistory: 'Sudden onset while lifting heavy box. Nausea, vomiting, photophobia. History of untreated hypertension.',
    examinationConcepts: 'GCS 14, meningismus (positive Kernig and Brudzinski signs), photophobia, elevated BP 185/110 mmHg.',
    differentialDiagnosis: 'Subarachnoid hemorrhage (ruptured berry aneurysm), sentinel headache, cerebral venous sinus thrombosis, migraine.',
    investigationConcepts: 'Non-contrast Head CT: Hyperdense blood in basal cisterns, Circle of Willis, and anterior interhemispheric fissure. CT Angiogram (CTA) showing 6mm anterior communicating artery aneurysm.',
    managementPrinciples: 'ICU admission, BP control (labetalol/nicardipine, target SBP <160), Nimodipine 60mg q4h (prevent vasospasm), neurosurgical/endovascular coiling consultation.',
    complications: 'Rebleeding (highest risk in first 24h), cerebral vasospasm (days 4-14), hydrocephalus, hyponatremia (CSW vs SIADH).',
    commonQuestionsOnRounds: [
      'What is the utility of Nimodipine in subarachnoid hemorrhage? (Reduces cerebral vasospasm and improves neurological outcomes)',
      'If head CT is negative but clinical suspicion for SAH remains high, what is the next step? (Lumbar puncture looking for xanthochromia/elevated RBCs)'
    ]
  }
];

export const INITIAL_SKILLS = [
  // General Surgery Skills
  { id: 'skill-surg-1', rotationId: 'general-surgery', title: 'Abdominal Examination & Peritoneal Signs', category: 'Physical Examination', status: 'OBSERVED', description: 'Inspection, auscultation, percussion, light/deep palpation, Rovsing, Psoas, and Murphy signs.' },
  { id: 'skill-surg-2', rotationId: 'general-surgery', title: 'Simple Interrupted Suture & Knot Tying', category: 'Procedures', status: 'SUPERVISED', description: 'Instrument tie, two-handed knot, suture placement with proper eversion of wound edges.' },
  { id: 'skill-surg-3', rotationId: 'general-surgery', title: 'Sterile Technique & Scrubbing', category: 'Procedures', status: 'CONFIDENT', description: 'Surgical hand scrub, donning sterile gown and gloves, maintaining sterile field in OR.' },

  // Internal Medicine Skills
  { id: 'skill-med-1', rotationId: 'internal-medicine', title: 'Cardiopulmonary Physical Examination', category: 'Physical Examination', status: 'CONFIDENT', description: 'Auscultation of heart sounds, murmurs, JVP measurement, lung exam for crackles/wheezes.' },
  { id: 'skill-med-2', rotationId: 'internal-medicine', title: '12-Lead ECG Acquisition & Interpretation', category: 'Diagnostics', status: 'SUPERVISED', description: 'Lead placement, rate/rhythm analysis, axis calculation, ST segment and QT evaluation.' },

  // Radiology Skills
  { id: 'skill-rad-1', rotationId: 'radiology', title: 'Chest Radiograph (CXR) Systematic Reading', category: 'Diagnostics', status: 'CONFIDENT', description: 'ABCDE approach, identifying infiltrates, effusions, pneumothorax, and line positions.' },
  { id: 'skill-rad-2', rotationId: 'radiology', title: 'Abdominal CT Anatomy & Pathology Identification', category: 'Diagnostics', status: 'SUPERVISED', description: 'Identifying appendicitis, SBO, free air, liver/splenic lacerations, and fluid collections.' },
  { id: 'skill-rad-3', rotationId: 'radiology', title: 'FAST Ultrasound Scanning & Image Acquisition', category: 'Procedures', status: 'OBSERVED', description: 'Pericardial, Morison pouch, splenorenal, and pelvic views for free intra-abdominal fluid.' },

  // Emergency Medicine Skills
  { id: 'skill-em-1', rotationId: 'emergency-medicine', title: 'ATLS Trauma Primary Survey Execution', category: 'Procedures', status: 'SUPERVISED', description: 'ABCDE assessment, cervical spine stabilization, hemorrhage control, and eFAST integration.' },

  // Anesthesiology Skills
  { id: 'skill-anes-1', rotationId: 'anesthesiology', title: 'Bag-Valve-Mask Ventilation & Airway Placement', category: 'Procedures', status: 'SUPERVISED', description: '2-person BVM technique, oral/nasopharyngeal airway sizing and insertion.' },

  // Orthopedics Skills
  { id: 'skill-ortho-1', rotationId: 'orthopedics', title: 'Musculoskeletal Examination & Splinting', category: 'Procedures', status: 'SUPERVISED', description: 'Compartment palpation, passive stretch test, sugar-tong and posterior slab splint application.' },

  // Neurology Skills
  { id: 'skill-neuro-1', rotationId: 'neurology', title: 'NIH Stroke Scale (NIHSS) Evaluation', category: 'Physical Examination', status: 'CONFIDENT', description: 'Standardized 11-item examination for acute ischemic stroke severity.' }
];

export const INITIAL_QUESTIONS = [
  {
    id: 'q-surg-1',
    rotationId: 'general-surgery',
    topicId: 'topic-surg-1',
    vignette: 'A 24-year-old male presents to the emergency department with 14 hours of constant abdominal pain that began around his belly button and has moved to the lower right side. He reports nausea and lack of appetite. Temperature is 38.1°C (100.6°F), blood pressure 124/78 mmHg, pulse 94/min. Abdominal examination reveals localized tenderness and rebound in the right lower quadrant.',
    question: 'Which of the following physical examination signs is most suggestive of an inflamed appendix lying retrocecal in anatomical position?',
    options: [
      'Pain in the RLQ upon deep palpation of the LLQ (Rovsing sign)',
      'Pain on passive extension of the right hip with patient lying on left side (Psoas sign)',
      'Pain on internal rotation of the flexed right hip (Obturator sign)',
      'Cessation of inspiration during deep palpation of RUQ (Murphy sign)'
    ],
    correctAnswer: 1,
    explanation: 'The psoas sign (pain on passive right hip extension) indicates irritation of the retroperitoneal psoas muscle, characteristic of a retrocecal appendix. Obturator sign suggests a pelvic appendix.',
    highYieldPearl: 'Retrocecal appendix = Psoas sign (+); Pelvic appendix = Obturator sign (+).',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-rad-1',
    rotationId: 'radiology',
    topicId: 'topic-rad-1',
    vignette: 'A 62-year-old female smoker presents with 3 days of productive cough and fever. An anteroposterior chest radiograph demonstrates opacification of the right lower lung field with loss of visual demarcation of the right hemidiaphragm, while the right heart border remains sharp and distinct.',
    question: 'In which lung lobe is the consolidation located based on the silhouette sign?',
    options: [
      'Right Upper Lobe (RUL)',
      'Right Middle Lobe (RML)',
      'Right Lower Lobe (RLL)',
      'Left Lower Lobe (LLL)'
    ],
    correctAnswer: 2,
    explanation: 'Loss of the right hemidiaphragm silhouette indicates a Right Lower Lobe (RLL) process. Loss of the right heart border silhouette indicates a Right Middle Lobe (RML) process.',
    highYieldPearl: 'Right heart border loss = RML consolidation; Right diaphragm loss = RLL consolidation.',
    difficulty: 'Intermediate'
  }
];
