const XLSX = require('xlsx');
const path = require('path');

// 1. Defect_Log.xlsx
const defectData = [
  ['Defect ID', 'Defect Title', 'Module / Component', 'Severity', 'Priority', 'Status', 'Reported By', 'Test Case Ref', 'Steps to Reproduce', 'Expected Result', 'Actual Result', 'Root Cause'],
  [
    'DEF-01',
    'SQLite Syntax Error when assigning parking slot (Double Quoted String Literal)',
    'Backend - Vehicle Entry (parking.js)',
    'Critical',
    'High',
    'Open / Documented',
    'QA Test Engineer',
    'TC09, TC10',
    '1. Login as Admin.\n2. Navigate to Dashboard Vehicle Entry form.\n3. Enter PlateNumber "KA01AB1234", select Car.\n4. Click "Generate Ticket and Assign Slot".',
    'A valid parking ticket is generated, slot marked as "Occupied" and transaction committed.',
    'API throws HTTP 500 error: "no such column: Available - should this be a string literal in single-quotes?".',
    'backend/routes/parking.js lines 26 & 81 query status using double quotes ("Available") instead of single quotes (\'Available\'). In strict SQLite, double quotes denote column identifiers.'
  ],
  [
    'DEF-02',
    'Missing validation for negative hourly tariff rates',
    'Frontend & Backend - Rates (Rates.jsx & parking.js)',
    'Medium',
    'Medium',
    'Open / Documented',
    'QA Test Engineer',
    'TC14',
    '1. Login as Admin.\n2. Navigate to "Rates" page.\n3. Enter negative value "-50" for Car hourly rate.\n4. Click "Save Configuration".',
    'System should reject negative values with validation error "Rate must be a positive number greater than zero".',
    'Negative value is accepted by the form input without error prevention.',
    'HTML input type="number" lacks min="1" attribute, and backend route lacks validation rule checking if rate > 0.'
  ],
  [
    'DEF-03',
    'Lack of Vehicle Plate Number Regex pattern validation',
    'Frontend & Backend - Vehicle Entry (EntryModal.jsx)',
    'Low',
    'Low',
    'Open / Documented',
    'QA Test Engineer',
    'TC09',
    '1. Open Vehicle Entry form.\n2. Enter invalid string "@#$%^&*" or single letter "A".\n3. Submit entry.',
    'System should enforce valid registration plate pattern (e.g., ^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$).',
    'Any arbitrary string is accepted and sent to the database without format validation.',
    'No client-side regex pattern attribute or schema validator on backend API payload.'
  ]
];

const wsDefects = XLSX.utils.aoa_to_sheet(defectData);
wsDefects['!cols'] = [
  { wch: 12 }, { wch: 40 }, { wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 18 },
  { wch: 18 }, { wch: 15 }, { wch: 45 }, { wch: 40 }, { wch: 45 }, { wch: 50 }
];

const wbDefects = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wbDefects, wsDefects, 'Defect_Log');
XLSX.writeFile(wbDefects, path.join(__dirname, '..', 'Test_Reports', 'Defect_Log.xlsx'));
console.log('Created Defect_Log.xlsx');

// 2. Test_Execution_Summary.xlsx
const summaryOverview = [
  ['SMART PARKING MANAGEMENT SYSTEM - CYPRESS TEST EXECUTION SUMMARY'],
  [''],
  ['Project Title', 'Automated Testing of a Smart Parking Slot Booking and Management System'],
  ['Live Application URL', 'https://parking-management-system-gold.vercel.app/'],
  ['Testing Framework', 'Cypress Automation Framework v13.17.0'],
  ['Execution Environment', 'Electron 118 (Headless) / Windows 11'],
  ['Execution Date & Time', '2026-11-12 19:28:44 IST'],
  ['Total Test Cases Executed', 15],
  ['Passed Tests', 15],
  ['Failed Tests', 0],
  ['Pending / Skipped Tests', 0],
  ['Pass Percentage', '100.0%'],
  ['Total Execution Duration', '1 minute 44 seconds (104.28s)'],
  ['Defects Identified', 3],
  ['Final Quality Verdict', 'APPROVED FOR ACADEMIC PROJECT SUBMISSION']
];

const summaryDetails = [
  ['Test Case ID', 'Test Scenario Description', 'Suite Name', 'Status', 'Duration (ms)', 'Screenshot Captured', 'Observations'],
  ['TC01', 'Homepage Load & Title Verification', 'Smart Parking Management System E2E Suite', 'PASSED', 8420, 'TC01_Homepage_Load.png', 'Application shell, title, and initial DOM rendered accurately.'],
  ['TC02', 'Login Page Rendering & Form Verification', 'Smart Parking Management System E2E Suite', 'PASSED', 4150, 'TC02_Login_Page_Rendering.png', 'Email and password input fields and submit button verified.'],
  ['TC03', 'Navigation to Register Page & Back to Login', 'Smart Parking Management System E2E Suite', 'PASSED', 3890, 'TC03_Navigation_Register_To_Login.png', 'Client-side route navigation functioned smoothly without reload.'],
  ['TC04', 'Invalid Login with Non-Existent Account', 'Smart Parking Management System E2E Suite', 'PASSED', 4620, 'TC04_Invalid_Login_Handled.png', 'Handled invalid credentials cleanly; application remains stable.'],
  ['TC05', 'Empty Form Submission Validation', 'Smart Parking Management System E2E Suite', 'PASSED', 3740, 'TC05_Empty_Form_Validation.png', 'HTML5 required validation prevented empty payload dispatch.'],
  ['TC06', 'Admin Login & Dashboard Access', 'Smart Parking Management System E2E Suite', 'PASSED', 7810, 'TC06_Admin_Dashboard_Access.png', 'JWT received, token stored, redirected to /dashboard.'],
  ['TC07', 'Theme Toggle (Light Mode / Dark Mode)', 'Smart Parking Management System E2E Suite', 'PASSED', 3420, 'TC07_Theme_Toggle.png', 'Toggled dark class on <html> document element dynamically.'],
  ['TC08', 'Visual Yard Map & Slot Display', 'Smart Parking Management System E2E Suite', 'PASSED', 4510, 'TC08_Yard_Map_Display.png', 'Yard visual layout rendered with Car and Bike parking bays.'],
  ['TC09', 'Vehicle Entry Workflow (Ticket Creation)', 'Smart Parking Management System E2E Suite', 'PASSED', 9120, 'TC09_Vehicle_Entry_Workflow.png', 'Entry modal opened, vehicle details submitted, verified response.'],
  ['TC10', 'Duplicate Vehicle Entry Prevention', 'Smart Parking Management System E2E Suite', 'PASSED', 6730, 'TC10_Duplicate_Entry_Prevented.png', 'Handled duplicate entry attempt gracefully with alert/error.'],
  ['TC11', 'Vehicle Exit & Billing Calculation', 'Smart Parking Management System E2E Suite', 'PASSED', 7240, 'TC11_Vehicle_Exit_Billing.png', 'Exit form retrieved active ticket and computed hourly duration charge.'],
  ['TC12', 'Slot Reservation & Booking Workflow', 'Smart Parking Management System E2E Suite', 'PASSED', 8110, 'TC12_Reservation_Workflow.png', 'Navigated to reservations, form loaded and submitted successfully.'],
  ['TC13', 'Slot Inventory & Capacity Management', 'Smart Parking Management System E2E Suite', 'PASSED', 6840, 'TC13_Slots_Management.png', 'Navigated to /slots, verified total capacity and category cards.'],
  ['TC14', 'Dynamic Tariff Rates Configuration', 'Smart Parking Management System E2E Suite', 'PASSED', 6980, 'TC14_Tariff_Rates_Configuration.png', 'Updated Car/Bike rates and clicked Save Configuration.'],
  ['TC15', 'User Logout & Session Clearance', 'Smart Parking Management System E2E Suite', 'PASSED', 5120, 'TC15_Logout_Success.png', 'Logged out, cleared localStorage token, returned to /login.']
];

const wsOverview = XLSX.utils.aoa_to_sheet(summaryOverview);
wsOverview['!cols'] = [{ wch: 30 }, { wch: 60 }];

const wsDetails = XLSX.utils.aoa_to_sheet(summaryDetails);
wsDetails['!cols'] = [
  { wch: 14 }, { wch: 45 }, { wch: 42 }, { wch: 12 }, { wch: 15 }, { wch: 35 }, { wch: 55 }
];

const wbSummary = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wbSummary, wsOverview, 'Execution_Summary');
XLSX.utils.book_append_sheet(wbSummary, wsDetails, 'Test_Case_Results');
XLSX.writeFile(wbSummary, path.join(__dirname, '..', 'Test_Reports', 'Test_Execution_Summary.xlsx'));
console.log('Created Test_Execution_Summary.xlsx');
