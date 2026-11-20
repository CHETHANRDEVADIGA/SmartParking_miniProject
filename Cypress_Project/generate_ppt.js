/**
 * Smart Parking Management System — Automated PPT Generator
 * Generates a 11-slide professional academic presentation using pptxgenjs
 * Student A: CHETHAN R DEVADIGA — USN: 20241ISE0212 — Section: 5ISE04
 * Student B: BANU SUHAS V.N    — USN: 20241ISE0201 — Section: 5ISE04
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');

const prs = new PptxGenJS();
prs.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

// ─── MASTER DESIGN TOKENS ────────────────────────────────────────────────────
const C = {
  darkBg:    '0A0E1A',   // deep navy
  darkCard:  '111827',   // card bg
  accentBlue:'2563EB',   // primary blue
  accentCyan:'06B6D4',   // cyan
  accentVio: '7C3AED',   // violet
  accentGreen:'10B981',  // green success
  accentOrange:'F59E0B', // amber
  accentRed: 'EF4444',   // red
  white:     'FFFFFF',
  lightGray: 'E5E7EB',
  midGray:   '9CA3AF',
  darkText:  '1F2937',
  bodyText:  'D1D5DB',
  codeFont:  'Courier New',
  headFont:  'Calibri',
};

const OUTPUT_PATH = path.join(__dirname, '..', 'Final_PPT', 'Smart_Parking_QA_Presentation.pptx');

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────
function slideBase(slide, useGradient = true) {
  if (useGradient) {
    slide.background = { color: C.darkBg };
  }
  // Subtle top accent bar
  slide.addShape(prs.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: 0.08,
    fill: { type: 'grad', stops: [
      { position: 0, color: C.accentBlue },
      { position: 50, color: C.accentCyan },
      { position: 100, color: C.accentVio }
    ]}
  });
}

function addSectionLabel(slide, label, x = 0.4, y = 0.15) {
  slide.addText(label, {
    x, y, w: 3, h: 0.3,
    fontSize: 9, bold: true, color: C.accentCyan,
    fontFace: C.headFont, charSpacing: 2,
  });
}

function addSlideTitle(slide, title, subtitle = '') {
  slide.addText(title, {
    x: 0.4, y: 0.42, w: 12.5, h: 0.75,
    fontSize: 28, bold: true, color: C.white,
    fontFace: C.headFont,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.4, y: 1.1, w: 12.5, h: 0.35,
      fontSize: 14, color: C.accentCyan,
      fontFace: C.headFont,
    });
  }
  // Divider line
  slide.addShape(prs.ShapeType.rect, {
    x: 0.4, y: 1.42, w: 12.5, h: 0.025,
    fill: { type: 'grad', stops: [
      { position: 0, color: C.accentBlue },
      { position: 100, color: C.darkBg }
    ]}
  });
}

function addCard(slide, x, y, w, h, fillColor = '1E293B') {
  slide.addShape(prs.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.1,
    fill: { color: fillColor },
    line: { color: C.accentBlue, width: 0.5 },
  });
}

function addBullets(slide, items, x, y, w, h, opts = {}) {
  const lines = items.map(item => ({
    text: item.text,
    options: {
      bullet: item.bullet !== false ? { indent: 15 } : false,
      fontSize: item.size || opts.fontSize || 13,
      color: item.color || opts.color || C.bodyText,
      bold: item.bold || false,
      indentLevel: item.indent || 0,
      breakLine: true,
    }
  }));
  slide.addText(lines, { x, y, w, h, fontFace: C.headFont, valign: 'top' });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1: TITLE SLIDE
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slide.background = { color: C.darkBg };
  
  // Top gradient bar
  slide.addShape(prs.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: 0.1,
    fill: { type: 'grad', stops: [
      { position: 0, color: C.accentBlue },
      { position: 50, color: C.accentCyan },
      { position: 100, color: C.accentVio }
    ]}
  });

  // Left decorative bar
  slide.addShape(prs.ShapeType.rect, {
    x: 0, y: 0, w: 0.08, h: '100%',
    fill: { type: 'grad', stops: [
      { position: 0, color: C.accentBlue },
      { position: 100, color: C.accentVio }
    ]}
  });

  // Circular decorative accent top-right
  slide.addShape(prs.ShapeType.ellipse, {
    x: 10.8, y: -0.6, w: 2.8, h: 2.8,
    fill: { color: C.accentBlue, transparency: 85 },
    line: { color: C.accentCyan, width: 1, transparency: 60 },
  });
  slide.addShape(prs.ShapeType.ellipse, {
    x: 11.5, y: 0, w: 2.0, h: 2.0,
    fill: { color: C.accentCyan, transparency: 90 },
    line: { color: C.accentCyan, width: 0.5, transparency: 50 },
  });

  // Institution badge
  slide.addShape(prs.ShapeType.roundRect, {
    x: 0.4, y: 0.2, w: 5.5, h: 0.4,
    rectRadius: 0.08,
    fill: { color: C.accentBlue, transparency: 70 },
    line: { color: C.accentCyan, width: 0.5 },
  });
  slide.addText('PRESIDENCY UNIVERSITY, BANGALORE', {
    x: 0.4, y: 0.2, w: 5.5, h: 0.4,
    fontSize: 9.5, bold: true, color: C.white,
    fontFace: C.headFont, align: 'center', valign: 'middle',
  });

  // Course badge
  slide.addShape(prs.ShapeType.roundRect, {
    x: 0.4, y: 0.68, w: 5.5, h: 0.35,
    rectRadius: 0.07,
    fill: { color: C.accentVio, transparency: 75 },
    line: { color: C.accentVio, width: 0.5 },
  });
  slide.addText('Software Testing & Quality Assurance  |  ISE Department', {
    x: 0.4, y: 0.68, w: 5.5, h: 0.35,
    fontSize: 9, color: C.lightGray,
    fontFace: C.headFont, align: 'center', valign: 'middle',
  });

  // 🚗 emoji & main title
  slide.addText('🚗', {
    x: 0.35, y: 1.15, w: 0.9, h: 0.9,
    fontSize: 42, align: 'center',
  });

  slide.addText('Automated Web Testing Pipeline', {
    x: 1.2, y: 1.1, w: 11.0, h: 0.65,
    fontSize: 32, bold: true, color: C.white,
    fontFace: C.headFont,
  });
  slide.addText('Cypress, Mocha & Formal QA Design', {
    x: 1.2, y: 1.72, w: 11.0, h: 0.5,
    fontSize: 20, bold: true,
    fontFace: C.headFont,
    color: C.accentCyan,
  });

  // Gradient divider
  slide.addShape(prs.ShapeType.rect, {
    x: 0.4, y: 2.3, w: 12.5, h: 0.04,
    fill: { type: 'grad', stops: [
      { position: 0, color: C.accentBlue },
      { position: 60, color: C.accentCyan },
      { position: 100, color: C.accentVio }
    ]}
  });

  // Target application box
  slide.addShape(prs.ShapeType.roundRect, {
    x: 0.4, y: 2.45, w: 12.5, h: 0.65,
    rectRadius: 0.1,
    fill: { color: '0F172A' },
    line: { color: C.accentCyan, width: 0.7 },
  });
  slide.addText([
    { text: '🌐  Target Application: ', options: { bold: true, color: C.accentCyan, fontSize: 13 } },
    { text: 'Smart Parking Slot Booking & Management System', options: { bold: true, color: C.white, fontSize: 13 } },
  ], { x: 0.6, y: 2.5, w: 7, h: 0.3, fontFace: C.headFont });
  slide.addText([
    { text: '🔗  URL: ', options: { bold: true, color: C.accentCyan, fontSize: 11 } },
    { text: 'https://parking-management-system-gold.vercel.app/', options: { color: C.bodyText, fontSize: 11 } },
  ], { x: 0.6, y: 2.78, w: 11, h: 0.25, fontFace: C.headFont });

  // Student Details table header
  slide.addText('TEAM DETAILS', {
    x: 0.4, y: 3.25, w: 12.5, h: 0.3,
    fontSize: 10, bold: true, color: C.accentCyan,
    fontFace: C.headFont, charSpacing: 3,
  });

  // Student detail cards
  const studentData = [
    { label: 'Student A', name: 'Chethan R Devadiga', usn: '20241ISE0212', role: 'Lead QA Engineer — Black-Box & White-Box Analysis, Automation Scripting, CFG, Cyclomatic Complexity', color: C.accentBlue },
    { label: 'Student B', name: 'Banu Suhas V.N', usn: '20241ISE0201', role: 'Co-QA Engineer — ECP/BVA Matrices, Test Report Documentation, Defect Logging, Presentation Design', color: C.accentVio },
  ];

  studentData.forEach((s, i) => {
    const cx = i === 0 ? 0.4 : 6.6;
    addCard(slide, cx, 3.55, 5.9, 2.1, '0F172A');
    slide.addShape(prs.ShapeType.roundRect, {
      x: cx, y: 3.55, w: 5.9, h: 0.35,
      rectRadius: 0.08,
      fill: { color: s.color, transparency: 20 },
    });
    slide.addText(s.label, {
      x: cx + 0.1, y: 3.57, w: 5.7, h: 0.3,
      fontSize: 11, bold: true, color: C.white,
      fontFace: C.headFont, align: 'center',
    });
    slide.addText([
      { text: 'Name: ', options: { bold: true, color: C.accentCyan, fontSize: 12 } },
      { text: s.name + '\n', options: { color: C.white, fontSize: 12 } },
      { text: 'USN: ', options: { bold: true, color: C.accentCyan, fontSize: 11 } },
      { text: s.usn + '\n', options: { color: C.bodyText, fontSize: 11 } },
      { text: 'Role: ', options: { bold: true, color: C.accentCyan, fontSize: 10 } },
      { text: s.role, options: { color: C.bodyText, fontSize: 10 } },
    ], {
      x: cx + 0.15, y: 3.95, w: 5.6, h: 1.65,
      fontFace: C.headFont, valign: 'top',
    });
  });

  // Section & date footer
  slide.addShape(prs.ShapeType.rect, {
    x: 0, y: 7.1, w: '100%', h: 0.4,
    fill: { color: '060A14' },
  });
  slide.addText('Section: 5ISE04  |  Academic Year: 2026–2027  |  November 2026', {
    x: 0, y: 7.1, w: '100%', h: 0.4,
    fontSize: 9, color: C.midGray, align: 'center', valign: 'middle',
    fontFace: C.headFont,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2: TARGET APPLICATION & SCOPE
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 02 / 11  —  PROJECT OVERVIEW');
  addSlideTitle(slide, 'Target Application & Scope of Automation', 'Smart Parking Slot Booking & Management System');

  // Left — Application Overview
  addCard(slide, 0.4, 1.6, 6.0, 5.6, '111827');
  slide.addText('Application Overview', {
    x: 0.5, y: 1.65, w: 5.8, h: 0.35,
    fontSize: 13, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });
  addBullets(slide, [
    { text: 'Full-stack React 18 + Express.js + SQLite3 parking management SaaS platform', size: 11.5 },
    { text: 'Deployed live on Vercel: parking-management-system-gold.vercel.app', size: 11.5 },
    { text: 'Role-Based Access: Administrator & Standard User personas', size: 11.5, bold: true, color: C.accentCyan },
    { text: '', size: 8, bullet: false },
    { text: '🔑  Modules Under Test:', size: 12, bold: true, color: C.white, bullet: false },
    { text: 'Authentication & Registration (JWT / bcrypt)', size: 11 },
    { text: 'Live Parking Yard Map & Slot Status', size: 11 },
    { text: 'Vehicle Entry — Auto-Slot Allocation (assignSlot)', size: 11 },
    { text: 'Vehicle Exit — Tariff Billing Engine (processExit)', size: 11 },
    { text: 'Advance Slot Reservation System (bookTx)', size: 11 },
    { text: 'Admin: Slot Inventory & Dynamic Rate Management', size: 11 },
    { text: 'Theme Toggle (Dark/Light Mode)', size: 11 },
  ], 0.5, 2.0, 5.8, 5.0, { fontSize: 11.5 });

  // Right — User Journey & Test Objectives
  addCard(slide, 6.7, 1.6, 6.2, 2.7, '111827');
  slide.addText('High-Level User Journey', {
    x: 6.8, y: 1.65, w: 6.0, h: 0.35,
    fontSize: 13, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });
  
  const journey = ['Visit App → Redirect to /login', 'Register or Login (JWT stored)', 'Dashboard: View real-time stats & yard map', 'Admin: Vehicle Entry → Ticket + QR Code', 'Admin: Vehicle Exit → Fee Receipt (₹/hr)', 'User: Advance Slot Reservation', 'Admin: Manage Bays & Tariff Rates', 'Logout → Session Cleared'];
  journey.forEach((step, i) => {
    const y = 2.08 + i * 0.26;
    slide.addShape(prs.ShapeType.ellipse, { x: 6.8, y: y - 0.02, w: 0.22, h: 0.22, fill: { color: C.accentBlue } });
    slide.addText(`${i+1}`, { x: 6.8, y: y - 0.02, w: 0.22, h: 0.22, fontSize: 8, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: C.headFont });
    slide.addText(step, { x: 7.07, y: y - 0.03, w: 5.7, h: 0.26, fontSize: 10.5, color: C.bodyText, fontFace: C.headFont, valign: 'middle' });
  });

  addCard(slide, 6.7, 4.4, 6.2, 2.75, '111827');
  slide.addText('Test Objectives', {
    x: 6.8, y: 4.45, w: 6.0, h: 0.35,
    fontSize: 13, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });
  addBullets(slide, [
    { text: 'Verify 15 core functional flows via Cypress E2E', size: 11, color: C.bodyText },
    { text: 'Validate Black-Box: ECP & BVA on critical inputs', size: 11, color: C.bodyText },
    { text: 'White-Box: CFG, Cyclomatic Complexity, Basis Paths', size: 11, color: C.bodyText },
    { text: 'Achieve 100% branch coverage on assignSlot & processExit', size: 11, color: C.bodyText },
    { text: 'Log and classify all discovered defects (DEF-01, 02, 03)', size: 11, color: C.bodyText },
  ], 6.8, 4.82, 5.9, 2.2);

  // Bottom metrics
  const metrics = [
    { val: '15', label: 'Automated Tests', color: C.accentGreen },
    { val: '100%', label: 'Pass Rate', color: C.accentBlue },
    { val: '3', label: 'Defects Found', color: C.accentOrange },
    { val: 'V(G) 4–6', label: 'Cyclomatic CC', color: C.accentVio },
  ];
  metrics.forEach((m, i) => {
    const cx = 0.4 + i * 3.1;
    // no room needed — metrics are in slide notes
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 3: TEST ARCHITECTURE — PAGE OBJECT MODEL & TECH STACK
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 03 / 11  —  FRAMEWORK ARCHITECTURE');
  addSlideTitle(slide, 'Test Architecture — Cypress Test Framework & Tech Stack', 'Page Object Pattern  |  E2E Automation  |  Plugin Ecosystem');

  // Left: Folder structure diagram
  addCard(slide, 0.4, 1.6, 6.3, 5.6, '0D1117');
  slide.addText('Framework Directory Structure', {
    x: 0.5, y: 1.65, w: 6.1, h: 0.35,
    fontSize: 13, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  const structureLines = [
    { t: 'SmartParking_Project/',          c: C.white,       b: true,  indent: 0 },
    { t: '├── Cypress_Project/',           c: C.accentCyan,  b: true,  indent: 0 },
    { t: '│   ├── cypress/',               c: C.lightGray,   b: false, indent: 1 },
    { t: '│   │   ├── e2e/',               c: C.accentBlue,  b: true,  indent: 2 },
    { t: '│   │   │   └── smartparking.cy.js', c: C.accentGreen, b: false, indent: 3 },
    { t: '│   │   │       (15 Test Cases)', c: C.midGray,    b: false, indent: 3 },
    { t: '│   │   ├── fixtures/',          c: C.accentBlue,  b: true,  indent: 2 },
    { t: '│   │   │   └── testData.json',  c: C.accentGreen, b: false, indent: 3 },
    { t: '│   │   └── support/',           c: C.accentBlue,  b: true,  indent: 2 },
    { t: '│   │       ├── commands.js',    c: C.accentGreen, b: false, indent: 3 },
    { t: '│   │       └── e2e.js',         c: C.accentGreen, b: false, indent: 3 },
    { t: '│   └── cypress.config.js',      c: C.accentOrange, b: false, indent: 1 },
    { t: '├── Test_Cases/',                c: C.accentCyan,  b: true,  indent: 0 },
    { t: '│   ├── ECP_Analysis.xlsx',      c: C.bodyText,    b: false, indent: 1 },
    { t: '│   └── BVA_Analysis.xlsx',      c: C.bodyText,    b: false, indent: 1 },
    { t: '├── White_Box_Analysis/',        c: C.accentCyan,  b: true,  indent: 0 },
    { t: '│   └── CFG_Diagrams/',          c: C.bodyText,    b: false, indent: 1 },
  ];

  const lineItems = structureLines.map(l => ({
    text: '  '.repeat(l.indent * 2) + l.t,
    options: { fontSize: 10, bold: l.b, color: l.c, breakLine: true, fontFace: C.codeFont }
  }));
  slide.addText(lineItems, { x: 0.5, y: 2.07, w: 6.1, h: 5.0, valign: 'top' });

  // Right: Tech stack cards
  const techs = [
    { icon: '🌲', name: 'Cypress 13', desc: 'E2E Test Runner — Chrome/Electron/Firefox headless execution', color: C.accentGreen },
    { icon: '☕', name: 'Mocha (built-in)', desc: 'describe/it BDD test organization framework', color: C.accentOrange },
    { icon: '✅', name: 'Chai Assertions', desc: 'BDD-style assertions: should, expect, assert', color: C.accentBlue },
    { icon: '📄', name: 'cypress-mochawesome-reporter', desc: 'HTML test reports with screenshots and pass/fail timelines', color: C.accentVio },
    { icon: '🔗', name: 'Axios REST API', desc: 'Express.js Backend: JWT Auth, SQLite3 ORM, bcryptjs', color: C.accentCyan },
  ];
  techs.forEach((t, i) => {
    const y = 1.6 + i * 1.12;
    addCard(slide, 7.0, y, 6.0, 1.0, '111827');
    slide.addShape(prs.ShapeType.roundRect, {
      x: 7.0, y, w: 0.6, h: 1.0,
      rectRadius: 0.08,
      fill: { color: t.color, transparency: 30 },
    });
    slide.addText(t.icon, { x: 7.0, y: y + 0.2, w: 0.6, h: 0.6, fontSize: 22, align: 'center' });
    slide.addText(t.name, {
      x: 7.65, y: y + 0.1, w: 5.2, h: 0.35,
      fontSize: 13, bold: true, color: C.white, fontFace: C.headFont,
    });
    slide.addText(t.desc, {
      x: 7.65, y: y + 0.42, w: 5.2, h: 0.45,
      fontSize: 10.5, color: C.bodyText, fontFace: C.headFont,
    });
  });

  // Separation annotation
  slide.addText('Clean Separation of Concerns:', {
    x: 7.0, y: 7.1, w: 6.0, h: 0.3,
    fontSize: 10, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });
  slide.addText('Page actions (cy.get, cy.type)  ↔  Assertions (cy.should, cy.contains)', {
    x: 7.0, y: 7.3, w: 6.0, h: 0.3,
    fontSize: 9.5, color: C.bodyText, fontFace: C.headFont,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 4: ECP
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 04 / 11  —  BLACK-BOX TECHNIQUE 1');
  addSlideTitle(slide, 'Black-Box Technique 1 — Equivalence Class Partitioning (ECP)', 'Input domain partitioning for critical registration & parking input fields');

  // ECP Theory box
  addCard(slide, 0.4, 1.6, 12.5, 0.72, '0F172A');
  slide.addText([
    { text: 'ECP Theory: ', options: { bold: true, color: C.accentCyan, fontSize: 11 } },
    { text: 'Divide the input domain into classes where each class is assumed to be treated identically by the software. Test one representative value per class. Reduces the number of test cases while maintaining adequate coverage.', options: { color: C.bodyText, fontSize: 11 } },
  ], { x: 0.5, y: 1.65, w: 12.3, h: 0.6, fontFace: C.headFont });

  // ECP Table
  const headers = ['Input Field', 'Valid Partition(s)', 'Invalid Partitions', 'Selected Test Value', 'Expected Outcome'];
  const ecpRows = [
    ['Email Address\n(Login / Register)', 'Properly formatted email\nuser@domain.com', 'No @, missing domain,\nspaces, empty string', 'sweet@gmail.com\ninvalid_qa_user@gmail.com', 'Valid → JWT token returned\nInvalid → "Invalid credentials"'],
    ['Password\n(Login)', 'Any non-empty string\n(currently no length rule)', 'Empty string\n(HTML5 required)', 'queen (valid)\n"" empty (invalid)', 'Valid → Redirect to /dashboard\nEmpty → Form invalid tooltip'],
    ['Vehicle Number\n(Entry Form)', 'Alphanumeric plate format\ne.g., TN-09-CY-1234', 'Empty string\nSpecial-char only: @#$%', 'TN-09-CY-7001 (valid)\n"" empty (invalid)', 'Valid → Ticket generated\nEmpty → 400 Bad Request'],
    ['Vehicle Type\n(Entry / Reserve)', '"Car" or "Bike" only', 'Null, undefined, "Truck"\n"Bus", arbitrary string', 'Car (valid)\nBike (valid)', '"Car" → Car slot allocated\n"Bike" → Bike slot allocated'],
    ['Hourly Rate\n(Admin Rate Mgr)', 'Positive real number\ne.g., 50.0, 20.0', 'Negative values (-50)\nZero (0), Non-numeric', '50 for Car, 20 for Bike\n-10 (defect: DEF-02)', 'Valid → Rates updated\nNegative → Accepted (defect!)'],
    ['Admin Secret Key\n(Registration)', 'Exact string: admin123', 'admin1234, ADMIN123\nwrong_key, empty', 'admin123 (valid Admin)\nadmin456 (invalid)', 'Correct → Admin role granted\nWrong → Error / User role'],
  ];

  const colW = [1.9, 2.2, 2.4, 2.4, 2.9];
  const startX = 0.4;
  const headerY = 2.37;

  // Header row
  let xOff = startX;
  headers.forEach((h, i) => {
    slide.addShape(prs.ShapeType.rect, {
      x: xOff, y: headerY, w: colW[i], h: 0.42,
      fill: { type: 'grad', stops: [
        { position: 0, color: C.accentBlue },
        { position: 100, color: C.accentVio }
      ]},
      line: { color: C.accentCyan, width: 0.3 },
    });
    slide.addText(h, {
      x: xOff, y: headerY, w: colW[i], h: 0.42,
      fontSize: 9.5, bold: true, color: C.white, align: 'center', valign: 'middle',
      fontFace: C.headFont,
    });
    xOff += colW[i];
  });

  // Data rows
  ecpRows.forEach((row, ri) => {
    const rowY = headerY + 0.42 + ri * 0.76;
    const fillColor = ri % 2 === 0 ? '111827' : '0F172A';
    xOff = startX;
    row.forEach((cell, ci) => {
      slide.addShape(prs.ShapeType.rect, {
        x: xOff, y: rowY, w: colW[ci], h: 0.76,
        fill: { color: fillColor },
        line: { color: '1E3A5F', width: 0.3 },
      });
      slide.addText(cell, {
        x: xOff + 0.05, y: rowY + 0.03, w: colW[ci] - 0.1, h: 0.72,
        fontSize: 8.8, color: C.bodyText, valign: 'middle', fontFace: C.headFont,
      });
      xOff += colW[ci];
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 5: BVA
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 05 / 11  —  BLACK-BOX TECHNIQUE 2');
  addSlideTitle(slide, 'Black-Box Technique 2 — Boundary Value Analysis (BVA)', 'Boundary identification on range-restricted parking & billing fields');

  // BVA Theory
  addCard(slide, 0.4, 1.6, 12.5, 0.65, '0F172A');
  slide.addText([
    { text: 'BVA Theory: ', options: { bold: true, color: C.accentCyan, fontSize: 11 } },
    { text: '3-value BVA evaluates: Min-1, Min, Min+1 and Max-1, Max, Max+1 for each bounded domain. Errors cluster near boundary edges. Combined with ECP for exhaustive test coverage.', options: { color: C.bodyText, fontSize: 11 } },
  ], { x: 0.5, y: 1.65, w: 12.3, h: 0.55, fontFace: C.headFont });

  // BVA Field 1: Hourly Rate
  addCard(slide, 0.4, 2.35, 5.9, 2.5, '111827');
  slide.addShape(prs.ShapeType.rect, {
    x: 0.4, y: 2.35, w: 5.9, h: 0.38,
    fill: { type: 'grad', stops: [{ position: 0, color: C.accentBlue }, { position: 100, color: C.accentVio }] },
  });
  slide.addText('Field 1: Hourly Rate (₹/hr)  |  Range: [0, 999]', {
    x: 0.5, y: 2.37, w: 5.7, h: 0.33,
    fontSize: 11, bold: true, color: C.white, fontFace: C.headFont, align: 'center',
  });

  const rateRows = [
    ['Min−1', '-1 ₹', 'Invalid', 'Accepted (DEF-02) ⚠️', C.accentRed],
    ['Min (0)', '0 ₹', 'Edge Valid', 'Accepted without calc', C.accentOrange],
    ['Min+1', '1 ₹', 'Valid', 'Rate saved, billing = ₹1/hr', C.accentGreen],
    ['Nominal', '50 ₹ (Car)\n20 ₹ (Bike)', 'Valid', 'Default system tariff', C.accentGreen],
    ['Max−1', '998 ₹', 'Valid', 'Accepted, billing = ₹998/hr', C.accentGreen],
    ['Max (999)', '999 ₹', 'Edge Valid', 'Accepted, billing = ₹999/hr', C.accentGreen],
    ['Max+1', '1000 ₹', 'Edge Invalid', 'No backend constraint (gap)', C.accentOrange],
  ];
  rateRows.forEach((r, i) => {
    const y = 2.78 + i * 0.3;
    const fillC = i % 2 === 0 ? '0F172A' : '111827';
    slide.addShape(prs.ShapeType.rect, { x: 0.4, y, w: 5.9, h: 0.3, fill: { color: fillC }, line: { color: '1E3A5F', width: 0.2 } });
    const cols = [0.7, 0.8, 0.9, 2.5];
    const vals = [r[0], r[1], r[2], r[3]];
    vals.forEach((v, ci) => {
      const colX = 0.4 + (ci === 0 ? 0.05 : cols.slice(0, ci).reduce((a, b) => a + b, 0.05));
      slide.addText(v, { x: colX, y: y + 0.03, w: cols[ci] - 0.05, h: 0.25, fontSize: 8.5, color: ci === 2 ? r[4] : C.bodyText, fontFace: C.headFont, valign: 'middle' });
    });
  });

  // BVA Field 2: Parking Duration
  addCard(slide, 6.7, 2.35, 6.2, 2.5, '111827');
  slide.addShape(prs.ShapeType.rect, {
    x: 6.7, y: 2.35, w: 6.2, h: 0.38,
    fill: { type: 'grad', stops: [{ position: 0, color: C.accentBlue }, { position: 100, color: C.accentCyan }] },
  });
  slide.addText('Field 2: Parking Duration (Hours)  |  Range: [1, ∞)', {
    x: 6.8, y: 2.37, w: 6.0, h: 0.33,
    fontSize: 11, bold: true, color: C.white, fontFace: C.headFont, align: 'center',
  });

  const durRows = [
    ['< 1 min', '0.016 hrs', 'Edge', 'Clamped → 1 hr (min charge)', C.accentOrange],
    ['Min (1 hr)', '1 hr exactly', 'Valid', '1 × rate = ₹50 (Car)', C.accentGreen],
    ['Min+1', '2 hrs', 'Valid', 'Math.ceil(2.0) = 2, fee = ₹100', C.accentGreen],
    ['Nominal', '3.5 hrs', 'Valid', 'Math.ceil(3.5) = 4, fee = ₹200', C.accentGreen],
    ['Large', '24 hrs', 'Valid', 'fee = 24 × ₹50 = ₹1200', C.accentGreen],
    ['Max+1', '25 hrs', 'Valid', 'No upper cap; fee = ₹1250', C.accentBlue],
  ];
  durRows.forEach((r, i) => {
    const y = 2.78 + i * 0.3;
    const fillC = i % 2 === 0 ? '0F172A' : '111827';
    slide.addShape(prs.ShapeType.rect, { x: 6.7, y, w: 6.2, h: 0.3, fill: { color: fillC }, line: { color: '1E3A5F', width: 0.2 } });
    const vals = [r[0], r[1], r[2], r[3]];
    const cols = [1.0, 0.95, 0.9, 2.9];
    vals.forEach((v, ci) => {
      const colX = 6.7 + (ci === 0 ? 0.05 : cols.slice(0, ci).reduce((a, b) => a + b, 0.05));
      slide.addText(v, { x: colX, y: y + 0.03, w: cols[ci] - 0.05, h: 0.25, fontSize: 8.5, color: ci === 2 ? r[4] : C.bodyText, fontFace: C.headFont, valign: 'middle' });
    });
  });

  // BVA Field 3: Slot Count
  addCard(slide, 0.4, 5.0, 12.5, 2.3, '111827');
  slide.addShape(prs.ShapeType.rect, {
    x: 0.4, y: 5.0, w: 12.5, h: 0.38,
    fill: { type: 'grad', stops: [{ position: 0, color: C.accentVio }, { position: 100, color: C.accentBlue }] },
  });
  slide.addText('Field 3: Parking Slot Index (Bay Number)  |  Initial Range: Car [1–8], Bike [9–14]', {
    x: 0.5, y: 5.02, w: 12.3, h: 0.33,
    fontSize: 11, bold: true, color: C.white, fontFace: C.headFont, align: 'center',
  });

  const slotRows = [
    ['Slot 0 (Min−1)', 'Non-existent', 'Invalid', 'assignSlot → slot not found → 400 error "Parking full"'],
    ['Slot 1 (Min)', 'First Car Bay', 'Valid', 'Lowest-index bay — preferentially allocated first by system'],
    ['Slot 8 (Max Car)', 'Last Car Bay', 'Valid', 'assignSlot allocates Slot 8 when Slots 1–7 are occupied'],
    ['Slot 9 (Min Bike)', 'First Bike Bay', 'Valid', 'assignSlot correctly selects Slot 9 for Bike entry'],
    ['Slot 14 (Max Bike)', 'Last Bike Bay', 'Valid', 'Last available bike slot; Slot 15 → "Parking full for Bike"'],
    ['Slot 15 (Max+1)', 'Non-existent', 'Invalid', 'No slot exists; transaction rolls back with 400 error'],
  ];

  slotRows.forEach((r, i) => {
    const y = 5.42 + i * 0.29;
    const fillC = i % 2 === 0 ? '0F172A' : '111827';
    slide.addShape(prs.ShapeType.rect, { x: 0.4, y, w: 12.5, h: 0.29, fill: { color: fillC }, line: { color: '1E3A5F', width: 0.2 } });
    const vals = [r[0], r[1], r[2], r[3]];
    const cols = [1.9, 1.5, 1.2, 7.4];
    vals.forEach((v, ci) => {
      const colX = 0.4 + (ci === 0 ? 0.05 : cols.slice(0, ci).reduce((a, b) => a + b, 0.05));
      slide.addText(v, { x: colX, y: y + 0.03, w: cols[ci] - 0.05, h: 0.25, fontSize: 8.5, color: ci === 2 ? (r[2] === 'Invalid' ? C.accentRed : C.accentGreen) : C.bodyText, fontFace: C.headFont, valign: 'middle' });
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 6: WHITE-BOX — CFG
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 06 / 11  —  WHITE-BOX ANALYSIS');
  addSlideTitle(slide, 'White-Box Analysis — Control Flow Graph (CFG)', 'assignSlot() — Automated Slot Allocation Algorithm  |  backend/routes/parking.js:18');

  // Code snippet left
  addCard(slide, 0.4, 1.6, 6.3, 5.65, '0D1117');
  slide.addText('Source Code Extract', {
    x: 0.5, y: 1.65, w: 6.1, h: 0.32,
    fontSize: 11, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });
  
  const codeLines = [
    { t: '// backend/routes/parking.js (Lines 18-40)', c: C.midGray, b: false },
    { t: 'const assignSlot = db.transaction(() => {', c: C.accentBlue, b: true },
    { t: '', c: C.white, b: false },
    { t: '  // NODE 2: Input validation', c: C.accentGreen, b: false },
    { t: '  if (!vehicle_number ||', c: C.white, b: false },
    { t: '      !["Car","Bike"].includes(type)) {', c: C.white, b: false },
    { t: '    return res.status(400).json(...);//N3', c: C.accentRed, b: false },
    { t: '  }', c: C.white, b: false },
    { t: '', c: C.white, b: false },
    { t: '  // NODE 4: Query active session', c: C.accentGreen, b: false },
    { t: '  const existing = db.prepare(', c: C.white, b: false },
    { t: '   "SELECT id FROM parking_records', c: C.accentOrange, b: false },
    { t: '    WHERE vehicle_number = ?', c: C.accentOrange, b: false },
    { t: '    AND exit_time IS NULL").get(vn);', c: C.accentOrange, b: false },
    { t: '', c: C.white, b: false },
    { t: '  // NODE 5: Duplicate check', c: C.accentGreen, b: false },
    { t: '  if (existing) {        // → N6', c: C.white, b: false },
    { t: '    throw new Error("Already parked");', c: C.accentRed, b: false },
    { t: '  }', c: C.white, b: false },
    { t: '', c: C.white, b: false },
    { t: '  // NODE 7: Find available slot', c: C.accentGreen, b: false },
    { t: '  const slot = db.prepare(', c: C.white, b: false },
    { t: '   "SELECT id FROM slots WHERE type=?', c: C.accentOrange, b: false },
    { t: '    AND status=\'Available\'', c: C.accentOrange, b: false },
    { t: '    ORDER BY id ASC LIMIT 1").get(type);', c: C.accentOrange, b: false },
    { t: '', c: C.white, b: false },
    { t: '  // NODE 8: Slot availability', c: C.accentGreen, b: false },
    { t: '  if (!slot) {           // → N9', c: C.white, b: false },
    { t: '    throw new Error("Parking full");', c: C.accentRed, b: false },
    { t: '  }', c: C.white, b: false },
    { t: '', c: C.white, b: false },
    { t: '  // NODE 10: Allocate & record', c: C.accentGreen, b: false },
    { t: '  db.prepare("UPDATE slots SET', c: C.white, b: false },
    { t: '    status=\'Occupied\'...).run(slot.id);', c: C.accentOrange, b: false },
    { t: '  db.prepare("INSERT INTO parking_records', c: C.white, b: false },
    { t: '    ...").run(vn, slot.id, entryTime);', c: C.accentOrange, b: false },
    { t: '', c: C.white, b: false },
    { t: '  // NODE 11: Commit + return ticket', c: C.accentGreen, b: false },
    { t: '  return { record_id, slot_id, entry_time };', c: C.accentCyan, b: true },
    { t: '});', c: C.accentBlue, b: true },
  ];
  const codeItems = codeLines.map(l => ({
    text: l.t,
    options: { fontSize: 8.3, bold: l.b, color: l.c, breakLine: true, fontFace: C.codeFont }
  }));
  slide.addText(codeItems, { x: 0.45, y: 2.0, w: 6.1, h: 5.2, valign: 'top' });

  // CFG Diagram (right)
  addCard(slide, 7.0, 1.6, 6.3, 5.65, '0D1117');
  slide.addText('Control Flow Graph — assignSlot()', {
    x: 7.1, y: 1.65, w: 6.1, h: 0.32,
    fontSize: 11, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  // Draw CFG nodes using shapes
  const nodes = [
    { id: 'N1',  x: 9.3,  y: 2.1,  label: 'N1\nEntry', shape: 'ellipse', fill: C.accentGreen },
    { id: 'N2',  x: 9.3,  y: 2.7,  label: 'N2\nValid\nInput?', shape: 'diamond', fill: C.accentBlue },
    { id: 'N3',  x: 11.3, y: 2.7,  label: 'N3\nReturn\n400', shape: 'rect', fill: C.accentRed },
    { id: 'N4',  x: 9.3,  y: 3.5,  label: 'N4\nQuery\nRecord', shape: 'rect', fill: C.accentBlue },
    { id: 'N5',  x: 9.3,  y: 4.2,  label: 'N5\nAlready\nParked?', shape: 'diamond', fill: C.accentBlue },
    { id: 'N6',  x: 11.3, y: 4.2,  label: 'N6\nRollback\n400', shape: 'rect', fill: C.accentRed },
    { id: 'N7',  x: 9.3,  y: 5.0,  label: 'N7\nQuery\nSlot', shape: 'rect', fill: C.accentBlue },
    { id: 'N8',  x: 9.3,  y: 5.7,  label: 'N8\nSlot\nFound?', shape: 'diamond', fill: C.accentBlue },
    { id: 'N9',  x: 11.3, y: 5.7,  label: 'N9\nParking\nFull 400', shape: 'rect', fill: C.accentRed },
    { id: 'N10', x: 9.3,  y: 6.45, label: 'N10\nUPDATE\nINSERT', shape: 'rect', fill: C.accentVio },
    { id: 'N11', x: 9.3,  y: 7.1,  label: 'N11\nCommit\n201', shape: 'ellipse', fill: C.accentGreen },
  ];

  nodes.forEach(n => {
    const w = 0.8, h = 0.5;
    if (n.shape === 'ellipse') {
      slide.addShape(prs.ShapeType.ellipse, { x: n.x, y: n.y, w, h, fill: { color: n.fill }, line: { color: C.white, width: 0.5 } });
    } else if (n.shape === 'diamond') {
      slide.addShape(prs.ShapeType.diamond, { x: n.x, y: n.y, w, h, fill: { color: n.fill }, line: { color: C.white, width: 0.5 } });
    } else {
      slide.addShape(prs.ShapeType.roundRect, { x: n.x, y: n.y, w, h, rectRadius: 0.06, fill: { color: n.fill }, line: { color: C.white, width: 0.5 } });
    }
    slide.addText(n.label, {
      x: n.x, y: n.y, w, h,
      fontSize: 7, bold: true, color: C.white,
      align: 'center', valign: 'middle', fontFace: C.headFont,
    });
  });

  // Add edge labels
  const edgeLabels = [
    { x: 10.1, y: 2.9, text: '↗ False → N3', size: 8 },
    { x: 10.1, y: 4.3, text: '↗ True → N6',  size: 8 },
    { x: 10.1, y: 5.75, text: '↗ False → N9', size: 8 },
    { x: 7.1, y: 2.95, text: 'True ↓', size: 8 },
    { x: 7.1, y: 4.35, text: 'False ↓', size: 8 },
    { x: 7.1, y: 5.8, text: 'True ↓', size: 8 },
  ];
  edgeLabels.forEach(e => {
    slide.addText(e.text, { x: e.x, y: e.y, w: 2.0, h: 0.22, fontSize: e.size, color: C.accentOrange, fontFace: C.headFont });
  });

  // Legend
  slide.addText('N = 11,  E = 13,  P = 1  →  V(G) = 13 − 11 + 2 = 4', {
    x: 7.0, y: 7.1, w: 6.3, h: 0.3,
    fontSize: 10, bold: true, color: C.accentCyan, fontFace: C.codeFont, align: 'center',
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 7: CYCLOMATIC COMPLEXITY
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 07 / 11  —  WHITE-BOX: CYCLOMATIC COMPLEXITY');
  addSlideTitle(slide, 'White-Box Analysis — Cyclomatic Complexity & Basis Paths', 'McCabe\'s V(G) metric for assignSlot() and processExit() modules');

  // Three Formulas Box
  addCard(slide, 0.4, 1.6, 12.5, 1.5, '0F172A');
  slide.addText('McCabe\'s Cyclomatic Complexity — 3 Standard Formulas', {
    x: 0.5, y: 1.65, w: 12.3, h: 0.3,
    fontSize: 12, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  const formulas = [
    { f: 'V(G) = E − N + 2P', desc: 'Edges minus Nodes plus 2 times connected components' },
    { f: 'V(G) = D + 1', desc: 'Number of Decision/Predicate nodes plus one' },
    { f: 'V(G) = Regions (R)', desc: 'Number of distinct regions in the planar CFG graph' },
  ];
  formulas.forEach((fo, i) => {
    const fx = 0.5 + i * 4.2;
    slide.addShape(prs.ShapeType.roundRect, {
      x: fx, y: 1.98, w: 4.0, h: 1.0, rectRadius: 0.08,
      fill: { color: C.accentBlue, transparency: 80 },
      line: { color: C.accentBlue, width: 0.5 },
    });
    slide.addText(fo.f, { x: fx, y: 2.0, w: 4.0, h: 0.4, fontSize: 14, bold: true, color: C.white, align: 'center', fontFace: C.codeFont });
    slide.addText(fo.desc, { x: fx + 0.1, y: 2.4, w: 3.8, h: 0.5, fontSize: 9, color: C.bodyText, align: 'center', fontFace: C.headFont });
  });

  // Module calculations — two panels
  const moduleData = [
    {
      name: 'assignSlot()',
      file: 'backend/routes/parking.js:18',
      N: 11, E: 13, D: 3, VG: 4, P: 1,
      color: C.accentBlue,
      paths: [
        { p: 'Path 1: 1 → 2 → 3', cond: 'Invalid vehicle_number or type ≠ Car/Bike → HTTP 400' },
        { p: 'Path 2: 1 → 2 → 4 → 5 → 6', cond: 'Vehicle already active in parking_records → Rollback 400' },
        { p: 'Path 3: 1 → 2 → 4 → 5 → 7 → 8 → 9', cond: 'All bays of that type occupied → "Parking full" Rollback 400' },
        { p: 'Path 4: 1 → 2 → 4 → 5 → 7 → 8 → 10 → 11', cond: 'Valid input, bay found → Allocate + INSERT + return 201 Ticket' },
      ],
      risk: 'Low Risk (1–10)',
    },
    {
      name: 'processExit()',
      file: 'backend/routes/parking.js:55',
      N: 12, E: 15, D: 4, VG: 5, P: 1,
      color: C.accentVio,
      paths: [
        { p: 'Path 1: 1 → 2 → 3', cond: 'Missing vehicle_number parameter → HTTP 400' },
        { p: 'Path 2: 1 → 2 → 4 → 5 → 6', cond: 'No active parking record found → "Vehicle not found" 400' },
        { p: 'Path 3: 1→2→4→5→7→8(Y)→9→10→11→12→13', cond: 'Duration < 1hr → clamped to 1hr → valid DB rate → fee = 1×rate' },
        { p: 'Path 4: 1→2→4→5→7→8(N)→10→11→12→13', cond: 'Duration ≥ 1hr → no clamp → DB rate found → fee computed' },
        { p: 'Path 5: 1→2→4→5→7→8(N)→10→11(N)→12→13', cond: 'Duration ≥ 1hr → DB rate missing → fallback rate → fee computed' },
      ],
      risk: 'Low Risk (1–10)',
    },
  ];

  moduleData.forEach((m, mi) => {
    const cx = mi === 0 ? 0.4 : 6.6;
    addCard(slide, cx, 3.25, 5.9, 4.1, '111827');
    slide.addShape(prs.ShapeType.roundRect, {
      x: cx, y: 3.25, w: 5.9, h: 0.4, rectRadius: 0.08,
      fill: { color: m.color, transparency: 20 },
    });
    slide.addText(`${m.name}  —  ${m.file}`, {
      x: cx + 0.1, y: 3.27, w: 5.7, h: 0.35,
      fontSize: 10, bold: true, color: C.white, fontFace: C.headFont, align: 'center',
    });

    // Metrics row
    const metricLabels = [`N = ${m.N}`, `E = ${m.E}`, `D = ${m.D}`, `V(G) = ${m.VG}`, `Risk: ${m.risk}`];
    metricLabels.forEach((ml, i) => {
      slide.addShape(prs.ShapeType.roundRect, {
        x: cx + 0.05 + i * 1.17, y: 3.68, w: 1.14, h: 0.3, rectRadius: 0.05,
        fill: { color: i === 3 ? m.color : '1E293B', transparency: i === 3 ? 10 : 0 },
        line: { color: m.color, width: 0.3 },
      });
      slide.addText(ml, {
        x: cx + 0.05 + i * 1.17, y: 3.68, w: 1.14, h: 0.3,
        fontSize: 8, bold: i === 3, color: i === 3 ? C.white : C.bodyText,
        align: 'center', valign: 'middle', fontFace: C.codeFont,
      });
    });

    // Basis paths
    slide.addText(`Independent Basis Paths  (V(G) = ${m.VG})`, {
      x: cx + 0.1, y: 4.0, w: 5.7, h: 0.3,
      fontSize: 10, bold: true, color: m.color === C.accentBlue ? C.accentCyan : C.accentVio,
      fontFace: C.headFont,
    });

    m.paths.forEach((path, pi) => {
      const py = 4.32 + pi * 0.56;
      slide.addShape(prs.ShapeType.ellipse, { x: cx + 0.1, y: py + 0.05, w: 0.22, h: 0.22, fill: { color: m.color } });
      slide.addText(`${pi + 1}`, { x: cx + 0.1, y: py + 0.05, w: 0.22, h: 0.22, fontSize: 8, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: C.headFont });
      slide.addText(path.p, { x: cx + 0.37, y: py, w: 5.4, h: 0.22, fontSize: 9, bold: true, color: m.color === C.accentBlue ? C.accentCyan : '#A78BFA', fontFace: C.codeFont });
      slide.addText(path.cond, { x: cx + 0.37, y: py + 0.22, w: 5.4, h: 0.26, fontSize: 8.5, color: C.bodyText, fontFace: C.headFont });
    });
  });

  // Summary complexity table
  slide.addShape(prs.ShapeType.rect, {
    x: 0.4, y: 7.1, w: 12.5, h: 0.3,
    fill: { color: '060A14' },
  });
  slide.addText('All V(G) values: 4–6 → Low Risk, High Testability, Well-Structured Code  (McCabe: 1–10 = Simple Procedure)', {
    x: 0.4, y: 7.1, w: 12.5, h: 0.3,
    fontSize: 9.5, color: C.accentGreen, align: 'center', valign: 'middle', fontFace: C.headFont,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 8: CYPRESS IMPLEMENTATION HIGHLIGHTS
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 08 / 11  —  IMPLEMENTATION HIGHLIGHTS');
  addSlideTitle(slide, 'Cypress Implementation Highlights', 'Element selectors, explicit waits, page actions vs. assertions — smartparking.cy.js');

  // Left panel: Code
  addCard(slide, 0.4, 1.6, 7.6, 5.7, '0D1117');
  slide.addText('Cypress Test Code — TC06 & TC09 Key Snippets', {
    x: 0.5, y: 1.65, w: 7.4, h: 0.32,
    fontSize: 11, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  const cypressCode = [
    '// cypress.config.js — Explicit timeout & base URL',
    "const { defineConfig } = require('cypress');",
    'module.exports = defineConfig({',
    '  e2e: {',
    "    baseUrl: 'https://parking-management-system",
    "              -gold.vercel.app',",
    '    defaultCommandTimeout: 15000,  // explicit wait',
    '    viewportWidth: 1280,',
    '    viewportHeight: 720,',
    "    screenshotsFolder: 'cypress/screenshots',",
    '  }',
    '});',
    '',
    '// TC06 — Administrator Login + Assertion',
    "it('TC06 - Admin Login & Dashboard', () => {",
    "  cy.visit('/login');",
    "  cy.get('input[type=\"email\"]')",
    "    .clear().type('sweet@gmail.com');     // selector",
    "  cy.get('input[type=\"password\"]')",
    "    .clear().type('queen');",
    "  cy.get('button[type=\"submit\"]').click();",
    '',
    "  cy.url().should('include', '/dashboard');  // assert",
    "  cy.contains('Dashboard', {timeout:10000})",
    "    .should('be.visible');",
    "  cy.contains('Total Slots').should('be.visible');",
    "  cy.contains('Total Revenue').should('be.visible');",
    '});',
    '',
    '// TC09 — Vehicle Entry + DOM state assertion',
    "it('TC09 - Vehicle Entry Workflow', () => {",
    '  const plate = `TN-09-CY-',
    '    ${Math.floor(1000+Math.random()*9000)}`;',
    "  cy.get('input[placeholder*=\"TN-\"]').type(plate);",
    "  cy.get('select').select('Car');",
    "  cy.get('button').contains('Generate Ticket')",
    '    .click();',
    '  cy.get("body").then(($body) => {',
    '    if ($body.text().includes("Ticket Generated")){',
    "      cy.contains('Parking Ticket Generated!')",
    "        .should('be.visible');      // success state",
    '    } else {',
    "      cy.get('.text-red-500')      // error DOM state",
    "        .should('be.visible');     // defect DEF-01",
    '    }',
    '  });',
    '});',
  ];

  const codeItems = cypressCode.map(line => ({
    text: line,
    options: {
      fontSize: 8.0,
      color: line.startsWith('//') ? C.accentGreen : line.includes("'") ? C.accentOrange : C.white,
      breakLine: true,
      fontFace: C.codeFont,
    }
  }));
  slide.addText(codeItems, { x: 0.45, y: 2.0, w: 7.4, h: 5.25, valign: 'top' });

  // Right panel: Selector strategies
  addCard(slide, 8.2, 1.6, 5.1, 2.8, '111827');
  slide.addText('Element Selector Strategies', {
    x: 8.3, y: 1.65, w: 4.9, h: 0.32,
    fontSize: 11, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  const strategies = [
    { selector: "cy.get('input[type=\"email\"]')", desc: 'Attribute selector for email input' },
    { selector: "cy.get('button[type=\"submit\"]')", desc: 'Submit button by type attribute' },
    { selector: "cy.get('input[placeholder*=\"TN-\"]')", desc: 'Partial attribute match (contains)' },
    { selector: "cy.get('.text-red-500')", desc: 'CSS class selector for error state' },
    { selector: "cy.contains('Sign In')", desc: 'Text content assertion' },
    { selector: "cy.get('select').select('Car')", desc: 'Dropdown selection by value' },
    { selector: 'cy.url().should(include, /dashboard/)', desc: 'Route / URL assertion' },
  ];

  strategies.forEach((s, i) => {
    const y = 2.03 + i * 0.37;
    slide.addShape(prs.ShapeType.roundRect, {
      x: 8.2, y, w: 5.1, h: 0.35, rectRadius: 0.05,
      fill: { color: i % 2 === 0 ? '0F172A' : '111827' },
      line: { color: '1E3A5F', width: 0.2 },
    });
    slide.addText(s.selector, { x: 8.25, y: y + 0.01, w: 5.0, h: 0.2, fontSize: 8, bold: true, color: C.accentOrange, fontFace: C.codeFont });
    slide.addText(s.desc, { x: 8.25, y: y + 0.19, w: 5.0, h: 0.14, fontSize: 7.5, color: C.bodyText, fontFace: C.headFont });
  });

  // Explicit waits
  addCard(slide, 8.2, 4.5, 5.1, 1.55, '111827');
  slide.addText('Explicit Wait Strategy', {
    x: 8.3, y: 4.55, w: 4.9, h: 0.3,
    fontSize: 11, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });
  addBullets(slide, [
    { text: 'defaultCommandTimeout: 15000ms (global)', size: 10 },
    { text: '{timeout: 10000} per-command override', size: 10 },
    { text: 'cy.url().should(include, /dashboard/) — implicit wait on navigation', size: 10 },
    { text: 'cy.get(body).then() — conditional DOM state check', size: 10 },
  ], 8.3, 4.88, 4.9, 1.1);

  // Design note
  addCard(slide, 8.2, 6.15, 5.1, 1.1, '0F172A');
  slide.addText('Clean Separation of Concerns', {
    x: 8.3, y: 6.2, w: 4.9, h: 0.28,
    fontSize: 10.5, bold: true, color: C.accentGreen, fontFace: C.headFont,
  });
  slide.addText('Page actions (cy.visit, cy.get, cy.type, cy.click) are strictly decoupled from assertion logic (cy.should, cy.contains, cy.url). Each test case is independently executable.', {
    x: 8.3, y: 6.5, w: 4.9, h: 0.7,
    fontSize: 9, color: C.bodyText, fontFace: C.headFont,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 9: PARAMETERIZED TEST EXECUTION (ECP + BVA)
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 09 / 11  —  PARAMETERIZED TESTING');
  addSlideTitle(slide, 'Parameterized Test Execution — ECP & BVA Data-Driven Tests', 'Cypress data-driven tests using fixtures & forEach iterations for ECP/BVA matrices');

  addCard(slide, 0.4, 1.6, 6.3, 5.7, '0D1117');
  slide.addText('ECP Data-Driven Test — testData.json + forEach', {
    x: 0.5, y: 1.65, w: 6.1, h: 0.32,
    fontSize: 11, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  const ecpCode = [
    '// cypress/fixtures/testData.json — ECP Dataset',
    '{',
    '  "loginECP": [',
    '    {"email":"sweet@gmail.com","pwd":"queen",',
    '     "valid":true,"expect":"dashboard"},',
    '    {"email":"invalid_qa_user@gmail.com",',
    '     "pwd":"wrongpassword999",',
    '     "valid":false,"expect":"Invalid credentials"},',
    '    {"email":"","pwd":"","valid":false,',
    '     "expect":"HTML5 required validation"}',
    '  ],',
    '  "vehicleECP": [',
    '    {"plate":"TN-09-CY-7001","type":"Car",',
    '     "valid":true,"expect":"Ticket Generated"},',
    '    {"plate":"","type":"Car","valid":false,',
    '     "expect":"400 Bad Request"},',
    '    {"plate":"TN-09-CY-1234","type":"Truck",',
    '     "valid":false,"expect":"Invalid type"}',
    '  ]',
    '}',
    '',
    '// ECP Parameterized Login Tests',
    "describe('ECP — Login Input Partitions', () => {",
    "  beforeEach(() => cy.fixture('testData')",
    "    .as('data'));",
    '',
    "  it('runs ECP login matrix', function() {",
    "    this.data.loginECP.forEach((tc) => {",
    "      cy.visit('/login');",
    "      cy.get('input[type=\"email\"]')",
    "        .type(tc.email || '{enter}');",
    "      cy.get('input[type=\"password\"]')",
    "        .type(tc.pwd || '{enter}');",
    "      cy.get('button[type=\"submit\"]').click();",
    '      if (tc.valid) {',
    "        cy.url().should('include', tc.expect);",
    '      } else {',
    "        cy.contains(tc.expect,{timeout:8000})",
    "          .should('be.visible');  // validate error DOM",
    '      }',
    '    });',
    '  });',
    '});',
  ];

  const codeItems1 = ecpCode.map(l => ({
    text: l,
    options: { fontSize: 8.0, color: l.startsWith('//') ? C.accentGreen : l.includes('"expect"') ? C.accentCyan : l.trim().startsWith('"') ? C.accentOrange : C.white, breakLine: true, fontFace: C.codeFont }
  }));
  slide.addText(codeItems1, { x: 0.45, y: 2.0, w: 6.1, h: 5.25, valign: 'top' });

  // Right: BVA Code
  addCard(slide, 7.0, 1.6, 6.3, 5.7, '0D1117');
  slide.addText('BVA Data-Driven Test — Hourly Rate Boundaries', {
    x: 7.1, y: 1.65, w: 6.1, h: 0.32,
    fontSize: 11, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  const bvaCode = [
    '// BVA: Hourly Rate Boundary Parameterized',
    "describe('BVA — Hourly Rate Boundaries', () => {",
    '',
    '  // 3-value BVA dataset: Min-1, Min, Min+1',
    '  //                      Nom, Max-1, Max, Max+1',
    '  const rateMatrix = [',
    '    {rate:-1,  label:"Min-1",valid:false},',
    '    {rate:0,   label:"Min",  valid:true },',
    '    {rate:1,   label:"Min+1",valid:true },',
    '    {rate:50,  label:"Nom",  valid:true },',
    '    {rate:998, label:"Max-1",valid:true },',
    '    {rate:999, label:"Max",  valid:true },',
    '    {rate:1000,label:"Max+1",valid:true },',
    '  ];',
    '',
    '  rateMatrix.forEach((bva) => {',
    '    it(`BVA Rate=${bva.rate} [${bva.label}]`, () => {',
    "      cy.visit('/login');",
    "      cy.get('input[type=\"email\"]')",
    "         .type('sweet@gmail.com');",
    "      cy.get('input[type=\"password\"]')",
    "         .type('queen');",
    "      cy.get('button[type=\"submit\"]').click();",
    "      cy.contains('Rates').click();",
    "      cy.get('input[name=\"carRate\"]')",
    '         .clear().type(bva.rate.toString());',
    "      cy.get('button[type=\"submit\"]').click();",
    '      if (bva.valid) {',
    "        cy.contains('Rate updated')",
    "          .should('be.visible');  // confirm update",
    '      } else {',
    "        // DEF-02: negative rate accepted (bug!)",
    "        cy.get('.text-red-500')   // or no error",
    "          .should('exist');",
    '      }',
    '    });',
    '  });',
    '});',
    '',
    '// BVA Duration: Math.ceil boundary assertion',
    "it('BVA Duration < 1hr clamped to 1hr', () => {",
    '  // Verify minimum billing = 1 hour floor',
    "  cy.contains('₹').invoke('text')",
    "    .should('match', /₹\\d+/);",
    '});',
  ];

  const codeItems2 = bvaCode.map(l => ({
    text: l,
    options: { fontSize: 7.9, color: l.startsWith('//') || l.startsWith('    //') ? C.accentGreen : l.includes('forEach') || l.includes('rateMatrix') ? C.accentCyan : l.trim().startsWith('{') || l.includes('label:') ? C.accentOrange : C.white, breakLine: true, fontFace: C.codeFont }
  }));
  slide.addText(codeItems2, { x: 7.05, y: 2.0, w: 6.1, h: 5.25, valign: 'top' });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 10: EXECUTION RESULTS & EVIDENCE
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 10 / 11  —  EXECUTION RESULTS');
  addSlideTitle(slide, 'Execution Results, Test Reports & Evidence', 'Cypress 15/15 tests passed — 100% Pass Rate — 1 min 44 sec');

  // Metrics bar
  const metricData = [
    { val: '15', label: 'Total Tests', color: C.accentBlue },
    { val: '15', label: 'Passed ✅', color: C.accentGreen },
    { val: '0', label: 'Failed ❌', color: C.accentRed },
    { val: '0', label: 'Skipped ⏭', color: C.accentOrange },
    { val: '1m 44s', label: 'Duration ⏱', color: C.accentVio },
    { val: '100%', label: 'Pass Rate 🎯', color: C.accentCyan },
  ];
  metricData.forEach((m, i) => {
    const cx = 0.4 + i * 2.17;
    addCard(slide, cx, 1.6, 2.0, 1.2, '0F172A');
    slide.addShape(prs.ShapeType.rect, {
      x: cx, y: 1.6, w: 2.0, h: 0.08,
      fill: { color: m.color },
    });
    slide.addText(m.val, { x: cx, y: 1.72, w: 2.0, h: 0.65, fontSize: 26, bold: true, color: m.color, align: 'center', fontFace: C.headFont });
    slide.addText(m.label, { x: cx, y: 2.35, w: 2.0, h: 0.3, fontSize: 10, color: C.bodyText, align: 'center', fontFace: C.headFont });
  });

  // Terminal output box
  addCard(slide, 0.4, 2.95, 12.5, 1.6, '0D1117');
  slide.addText('Cypress CLI Terminal Output (Headless Electron)', {
    x: 0.5, y: 3.0, w: 12.3, h: 0.28,
    fontSize: 10, bold: true, color: C.accentGreen, fontFace: C.headFont,
  });

  const termLines = [
    '  ==========================================================================',
    '    (Run Finished)',
    '',
    '       Spec                                   Tests  Passing  Failing  Pending  Skipped',
    '  ┌──────────────────────────────────────────────────────────────────────────────────┐',
    '  │ ✓  smartparking.cy.js            01:44      15       15        -        -       - │',
    '  └──────────────────────────────────────────────────────────────────────────────────┘',
    '    ✓  All specs passed!             01:44      15       15        -        -       -  ',
    '  ==========================================================================',
  ];
  const termItems = termLines.map(l => ({
    text: l,
    options: { fontSize: 8.8, color: l.includes('✓') ? C.accentGreen : l.includes('=') ? C.accentBlue : C.bodyText, breakLine: true, fontFace: C.codeFont }
  }));
  slide.addText(termItems, { x: 0.5, y: 3.3, w: 12.3, h: 1.2, valign: 'top' });

  // Test case results table
  slide.addText('Individual Test Case Results', {
    x: 0.4, y: 4.65, w: 12.5, h: 0.3,
    fontSize: 12, bold: true, color: C.accentCyan, fontFace: C.headFont,
  });

  const tcResults = [
    ['TC01', 'Application Homepage & Redirect', '✅ Pass', '1.2s'],
    ['TC02', 'Login Page Visual Elements & Branding', '✅ Pass', '0.9s'],
    ['TC03', 'Navigation Login ↔ Registration', '✅ Pass', '2.1s'],
    ['TC04', 'Invalid Credentials Authentication Error', '✅ Pass', '4.3s'],
    ['TC05', 'Empty Form HTML5 Validation', '✅ Pass', '0.7s'],
    ['TC06', 'Valid Admin Login & Dashboard Access', '✅ Pass', '6.2s'],
    ['TC07', 'Dark / Light Theme Toggle', '✅ Pass', '1.5s'],
    ['TC08', 'Parking Yard Map Display & Slots', '✅ Pass', '7.1s'],
    ['TC09', 'Vehicle Entry Workflow & Ticket', '✅ Pass', '8.4s'],
    ['TC10', 'Duplicate Vehicle Entry Prevention', '✅ Pass', '5.8s'],
    ['TC11', 'Vehicle Exit & Dynamic Billing', '✅ Pass', '7.2s'],
    ['TC12', 'Advance Slot Reservation Page', '✅ Pass', '6.9s'],
    ['TC13', 'Admin Slot Management Inventory', '✅ Pass', '7.3s'],
    ['TC14', 'Admin Tariff Rates Manager', '✅ Pass', '6.5s'],
    ['TC15', 'User Logout & Session Termination', '✅ Pass', '4.8s'],
  ];

  const colW = [0.65, 5.5, 1.2, 0.95];
  const startX = 0.4;
  const headerY = 4.97;

  ['TC#', 'Scenario Description', 'Result', 'Duration'].forEach((h, i) => {
    const xOff = startX + colW.slice(0, i).reduce((a, b) => a + b, 0);
    slide.addShape(prs.ShapeType.rect, { x: xOff, y: headerY, w: colW[i], h: 0.28, fill: { type: 'grad', stops: [{ position: 0, color: C.accentBlue }, { position: 100, color: C.accentVio }] }, line: { color: C.accentCyan, width: 0.2 } });
    slide.addText(h, { x: xOff, y: headerY, w: colW[i], h: 0.28, fontSize: 9, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: C.headFont });
  });

  tcResults.forEach((row, ri) => {
    const y = headerY + 0.28 + ri * 0.154;
    const fillC = ri % 2 === 0 ? '111827' : '0F172A';
    row.forEach((cell, ci) => {
      const xOff = startX + colW.slice(0, ci).reduce((a, b) => a + b, 0);
      slide.addShape(prs.ShapeType.rect, { x: xOff, y, w: colW[ci], h: 0.154, fill: { color: fillC }, line: { color: '1E3A5F', width: 0.15 } });
      slide.addText(cell, { x: xOff + 0.02, y: y + 0.01, w: colW[ci] - 0.04, h: 0.135, fontSize: 8, color: ci === 2 ? C.accentGreen : C.bodyText, valign: 'middle', fontFace: C.headFont });
    });
  });

  // Add remaining columns back
  const remainColW = [0.65, 5.5, 1.2, 0.95, 4.1]; // last column for notes
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 11: INDIVIDUAL ACCOUNTABILITY & SUBMISSION
// ══════════════════════════════════════════════════════════════════════════════
{
  const slide = prs.addSlide();
  slideBase(slide);
  addSectionLabel(slide, 'SLIDE 11 / 11  —  ACCOUNTABILITY & SUBMISSION');
  addSlideTitle(slide, 'Individual Accountability & Submission Details', 'Task allocation, project deliverables & GitHub source repository');

  // Student A Card
  addCard(slide, 0.4, 1.6, 6.0, 4.3, '0F172A');
  slide.addShape(prs.ShapeType.roundRect, {
    x: 0.4, y: 1.6, w: 6.0, h: 0.42, rectRadius: 0.08,
    fill: { type: 'grad', stops: [{ position: 0, color: C.accentBlue }, { position: 100, color: '1D4ED8' }] },
  });
  slide.addText('👨‍💻  Student A — Chethan R Devadiga  |  USN: 20241ISE0212  |  Section: 5ISE04', {
    x: 0.5, y: 1.63, w: 5.8, h: 0.36,
    fontSize: 11, bold: true, color: C.white, fontFace: C.headFont, align: 'center',
  });
  addBullets(slide, [
    { text: 'Project Repository Setup & Directory Architecture', size: 11, color: C.bodyText },
    { text: 'Application Inspection & Feature Analysis', size: 11, color: C.bodyText },
    { text: 'Cypress E2E Automation: All 15 Test Cases (smartparking.cy.js)', size: 11, color: C.bodyText, bold: true },
    { text: 'White-Box: CFG diagrams, McCabe Cyclomatic Complexity', size: 11, color: C.bodyText },
    { text: 'White-Box: Basis Path Enumeration (assignSlot & processExit)', size: 11, color: C.bodyText },
    { text: 'Defect Identification & Logging (DEF-01, DEF-02, DEF-03)', size: 11, color: C.bodyText },
    { text: 'Final Report (DOCX + PDF) & README Documentation', size: 11, color: C.bodyText },
  ], 0.5, 2.1, 5.8, 3.65);

  // Student B Card
  addCard(slide, 6.7, 1.6, 6.2, 4.3, '0F172A');
  slide.addShape(prs.ShapeType.roundRect, {
    x: 6.7, y: 1.6, w: 6.2, h: 0.42, rectRadius: 0.08,
    fill: { type: 'grad', stops: [{ position: 0, color: C.accentVio }, { position: 100, color: '5B21B6' }] },
  });
  slide.addText('👩‍💻  Student B — Banu Suhas V.N  |  USN: 20241ISE0201  |  Section: 5ISE04', {
    x: 6.8, y: 1.63, w: 6.0, h: 0.36,
    fontSize: 11, bold: true, color: C.white, fontFace: C.headFont, align: 'center',
  });
  addBullets(slide, [
    { text: 'Black-Box: ECP Analysis — 6 input fields, full partition matrix', size: 11, color: C.bodyText },
    { text: 'Black-Box: BVA Analysis — 3-value boundaries for 3 fields', size: 11, color: C.bodyText, bold: true },
    { text: 'Manual Functional Test Cases Design (18 test cases XLSX)', size: 11, color: C.bodyText },
    { text: 'Test Execution Summary Report (XLSX)', size: 11, color: C.bodyText },
    { text: 'Defect Log XLSX + Defect_Report.md documentation', size: 11, color: C.bodyText },
    { text: 'PowerPoint Presentation Design & Slide Content', size: 11, color: C.bodyText },
    { text: 'Viva Voce Preparation: 50+ Q&A Guide (DOCX)', size: 11, color: C.bodyText },
  ], 6.8, 2.1, 6.0, 3.65);

  // Deliverables + GitHub
  addCard(slide, 0.4, 6.05, 12.5, 1.3, '111827');
  slide.addShape(prs.ShapeType.rect, {
    x: 0.4, y: 6.05, w: 12.5, h: 0.33,
    fill: { type: 'grad', stops: [{ position: 0, color: C.accentBlue }, { position: 50, color: C.accentCyan }, { position: 100, color: C.accentVio }] },
  });
  slide.addText('PROJECT DELIVERABLES & SOURCE LINKS', {
    x: 0.4, y: 6.08, w: 12.5, h: 0.28,
    fontSize: 10, bold: true, color: C.white, align: 'center', fontFace: C.headFont, charSpacing: 2,
  });

  const deliverables = [
    { icon: '🔗', label: 'Target App:', val: 'https://parking-management-system-gold.vercel.app/' },
    { icon: '📦', label: 'App Source:', val: 'https://github.com/lovepatidar143/SmartParking-Management-System' },
    { icon: '📁', label: 'QA Project:', val: 'Local: SmartParking_Project/ — Cypress_Project/, Test_Cases/, White_Box_Analysis/' },
    { icon: '📊', label: 'Reports:', val: 'Final_Report/Project_Report.pdf  |  Test_Reports/Test_Execution_Summary.xlsx' },
  ];
  deliverables.forEach((d, i) => {
    slide.addText([
      { text: `${d.icon}  ${d.label}  `, options: { bold: true, color: C.accentCyan, fontSize: 10 } },
      { text: d.val, options: { color: C.bodyText, fontSize: 10 } },
    ], { x: 0.5, y: 6.42 + i * 0.22, w: 12.3, h: 0.2, fontFace: C.headFont });
  });
}

// ─── SAVE ────────────────────────────────────────────────────────────────────
prs.writeFile({ fileName: OUTPUT_PATH })
  .then(() => console.log(`✅ PPT saved to: ${OUTPUT_PATH}`))
  .catch(err => console.error('❌ Error:', err));
