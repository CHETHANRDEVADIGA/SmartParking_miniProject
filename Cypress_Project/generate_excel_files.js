const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Ensure directories exist
const testCasesDir = path.resolve(__dirname, '../Test_Cases');
const whiteBoxDir = path.resolve(__dirname, '../White_Box_Analysis');
if (!fs.existsSync(testCasesDir)) fs.mkdirSync(testCasesDir, { recursive: true });
if (!fs.existsSync(whiteBoxDir)) fs.mkdirSync(whiteBoxDir, { recursive: true });

// ============================================================================
// 1. Functional_Test_Cases.xlsx
// ============================================================================
const functionalTestCases = [
  {
    "Test Case ID": "TC01",
    "Test Scenario": "Application Root Navigation",
    "Test Objective": "Verify that visiting root URL ('/') correctly loads the application and redirects unauthenticated users to the login screen.",
    "Preconditions": "Application server is running and accessible.",
    "Test Steps": "1. Open Chrome browser.\n2. Enter base URL 'https://parking-management-system-gold.vercel.app/'.\n3. Observe redirection and landing page.",
    "Test Data": "URL: https://parking-management-system-gold.vercel.app/",
    "Expected Result": "The application redirects to '/login', displaying the SmartParking branding and Sign In form.",
    "Actual Result": "Successfully redirected to '/login'. SmartParking heading and Sign In form displayed.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC02",
    "Test Scenario": "Homepage & Login Page UI Verification",
    "Test Objective": "Verify presence and visibility of all mandatory UI components on the Login page (Email, Password, Remember Me, Submit Button).",
    "Preconditions": "User is on '/login' page.",
    "Test Steps": "1. Navigate to '/login'.\n2. Inspect Email input field, Password input field, 'Remember me' checkbox, 'Sign In' button, and side features showcase.",
    "Test Data": "N/A (Visual UI verification)",
    "Expected Result": "All inputs, labels, placeholders, icons, and CTA buttons render without distortion or overlapping elements.",
    "Actual Result": "All UI elements rendered cleanly with responsive styling and Lucide icons.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC03",
    "Test Scenario": "Navigation Between Login and Register",
    "Test Objective": "Verify seamless two-way navigation between the Login page and Registration page.",
    "Preconditions": "User is on '/login'.",
    "Test Steps": "1. Click on 'Register' navigation link in navbar or card.\n2. Verify '/register' URL and title.\n3. Click on 'Login' navigation link.\n4. Verify return to '/login'.",
    "Test Data": "N/A",
    "Expected Result": "Navigation smoothly transitions between '/register' and '/login' without reload errors or broken states.",
    "Actual Result": "Navigated to Registration form ('Create Your Account') and returned to Login page as expected.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC04",
    "Test Scenario": "Authentication Failure with Invalid Credentials",
    "Test Objective": "Verify that logging in with unregistered or incorrect credentials displays an appropriate error banner and denies entry.",
    "Preconditions": "User is on '/login' page.",
    "Test Steps": "1. Enter unregistered email 'invalid_qa_user@gmail.com'.\n2. Enter incorrect password 'wrongpassword999'.\n3. Click 'Sign In' button.",
    "Test Data": "Email: invalid_qa_user@gmail.com | Password: wrongpassword999",
    "Expected Result": "System rejects authentication and displays red alert: 'Invalid credentials'. User remains on '/login'.",
    "Actual Result": "Alert banner 'Invalid credentials' appeared. No JWT token was stored. Access denied.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC05",
    "Test Scenario": "Empty Credentials Form Validation",
    "Test Objective": "Verify that submitting an empty login form is halted by client-side HTML5 input validation.",
    "Preconditions": "User is on '/login' page.",
    "Test Steps": "1. Leave Email and Password fields completely blank.\n2. Click 'Sign In' button.",
    "Test Data": "Email: '' | Password: ''",
    "Expected Result": "Browser triggers ':invalid' tooltip on email input. No API request is dispatched.",
    "Actual Result": "Browser HTML5 validation intercepted submission; focus trapped on required email input.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC06",
    "Test Scenario": "Administrator Login Authentication",
    "Test Objective": "Verify that valid Administrator credentials authenticate successfully and redirect to the full analytics Dashboard.",
    "Preconditions": "Admin user exists in SQLite database (sweet@gmail.com / queen).",
    "Test Steps": "1. Navigate to '/login'.\n2. Enter Email: 'sweet@gmail.com'.\n3. Enter Password: 'queen'.\n4. Click 'Sign In'.",
    "Test Data": "Email: sweet@gmail.com | Password: queen",
    "Expected Result": "User is authenticated, JWT stored, redirected to '/dashboard'. Navbar shows 'Queen (Admin)' and Admin links (Slots, Rates).",
    "Actual Result": "Logged in successfully. Redirected to '/dashboard'. All 4 stat cards (Total Slots, Available, Occupied, Total Revenue) visible.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC07",
    "Test Scenario": "Standard Customer Login Authentication",
    "Test Objective": "Verify that valid customer credentials authenticate and grant access to User-level features only.",
    "Preconditions": "Customer user exists (user@gmail.com / user123).",
    "Test Steps": "1. Navigate to '/login'.\n2. Enter Email: 'user@gmail.com'.\n3. Enter Password: 'user123'.\n4. Click 'Sign In'.",
    "Test Data": "Email: user@gmail.com | Password: user123",
    "Expected Result": "User is authenticated, redirected to '/dashboard'. Navbar displays 'John Doe (User)'. Admin links (Slots, Rates) are hidden.",
    "Actual Result": "Logged in successfully as standard User. Admin-exclusive navigation tabs were correctly omitted.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC08",
    "Test Scenario": "Dark / Light Mode Theme Switching",
    "Test Objective": "Verify that clicking the Theme toggle button switches the application between Dark and Light mode themes and persists in storage.",
    "Preconditions": "User is on any page.",
    "Test Steps": "1. Click theme toggle button in navbar.\n2. Check DOM class attribute on <html> element.\n3. Inspect localStorage value for 'theme'.\n4. Click toggle button again.",
    "Test Data": "Toggle click events",
    "Expected Result": "The 'dark' class is added or removed from document root element. Background colors and text contrast adapt immediately.",
    "Actual Result": "Theme transitioned instantly between dark and light modes. Class toggle verified.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC09",
    "Test Scenario": "Parking Slot Display & Yard Map Visualization",
    "Test Objective": "Verify that the Dashboard visual yard map categorizes Car and Bike bays and reflects correct real-time status colors.",
    "Preconditions": "User is logged in on '/dashboard'.",
    "Test Steps": "1. Inspect 'Car Parking Bays' section.\n2. Inspect 'Bike Parking Bays' section.\n3. Check visual color codes for Available (Green) and Occupied (Red/Orange) bays.",
    "Test Data": "Facility capacity: 8 Car slots, 6 Bike slots",
    "Expected Result": "All slots are rendered with Bay IDs, vehicle type badges, and real-time status chips.",
    "Actual Result": "14 slots rendered accurately under separate Car and Bike sections with real-time status indicators.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC10",
    "Test Scenario": "Automated Vehicle Check-In / Entry (Car)",
    "Test Objective": "Verify automated nearest-slot allocation for a Car entry and QR ticket generation.",
    "Preconditions": "User is logged in. At least one Car slot is available.",
    "Test Steps": "1. Navigate to '/entry'.\n2. Enter Vehicle Number 'TN-09-CY-1111'.\n3. Select Vehicle Type 'Car'.\n4. Click 'Generate Ticket & Assign Slot'.",
    "Test Data": "Plate: TN-09-CY-1111 | Type: Car",
    "Expected Result": "System assigns the lowest available Car slot index, updates database status to 'Occupied', and generates QR ticket.",
    "Actual Result": "Ticket generated with QR code, assigned slot ID, and formatted entry timestamp. Yard map updated.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC11",
    "Test Scenario": "Automated Vehicle Check-In / Entry (Bike)",
    "Test Objective": "Verify automated nearest-slot allocation for a Bike entry and QR ticket generation.",
    "Preconditions": "User is logged in. At least one Bike slot is available.",
    "Test Steps": "1. Navigate to '/entry'.\n2. Enter Vehicle Number 'TN-09-BK-2222'.\n3. Select Vehicle Type 'Bike'.\n4. Click 'Generate Ticket & Assign Slot'.",
    "Test Data": "Plate: TN-09-BK-2222 | Type: Bike",
    "Expected Result": "System allocates the lowest available Bike slot (Slots 9-14) and generates a printable ticket.",
    "Actual Result": "Successfully assigned available Bike slot with QR ticket payload.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC12",
    "Test Scenario": "Duplicate Vehicle Entry Rejection",
    "Test Objective": "Verify that the system blocks check-in of a vehicle plate that is already actively parked.",
    "Preconditions": "Vehicle 'TN-09-DUP-8888' is already parked in the facility.",
    "Test Steps": "1. Navigate to '/entry'.\n2. Re-enter the same plate 'TN-09-DUP-8888'.\n3. Select Vehicle Type 'Car'.\n4. Click 'Generate Ticket & Assign Slot'.",
    "Test Data": "Plate: TN-09-DUP-8888",
    "Expected Result": "Transaction throws error: 'Vehicle is already parked'. No additional slot is occupied.",
    "Actual Result": "System displayed error banner 'Vehicle is already parked'. Duplicate entry blocked.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC13",
    "Test Scenario": "Vehicle Checkout, Tariff Calculation & Receipt (Car)",
    "Test Objective": "Verify checkout calculation for a parked Car based on hourly rate (minimum 1 hour) and bay release.",
    "Preconditions": "Vehicle 'TN-09-EX-7777' is currently parked in the yard.",
    "Test Steps": "1. Navigate to '/exit'.\n2. Enter Vehicle Number 'TN-09-EX-7777'.\n3. Click 'Process Exit'.",
    "Test Data": "Plate: TN-09-EX-7777",
    "Expected Result": "System computes duration (minimum 1 hr = ₹50 for Car), logs exit time, frees the slot to 'Available', and renders Payment Receipt.",
    "Actual Result": "Payment Receipt rendered displaying duration 1 hour(s), Total Fee ₹50, and assigned slot released back to yard.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC14",
    "Test Scenario": "Vehicle Checkout, Tariff Calculation & Receipt (Bike)",
    "Test Objective": "Verify checkout calculation for a parked Bike based on bike hourly rate (minimum 1 hour = ₹20) and bay release.",
    "Preconditions": "Bike 'TN-09-EX-3333' is currently parked in the yard.",
    "Test Steps": "1. Navigate to '/exit'.\n2. Enter Vehicle Number 'TN-09-EX-3333'.\n3. Click 'Process Exit'.",
    "Test Data": "Plate: TN-09-EX-3333",
    "Expected Result": "System computes duration, multiplies by Bike rate (₹20/hr), and releases bike slot.",
    "Actual Result": "Payment Receipt displayed Total Fee ₹20. Bike slot marked Available.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC15",
    "Test Scenario": "Advance Slot Reservation Creation",
    "Test Objective": "Verify that a registered user can reserve an available slot for a future date/time.",
    "Preconditions": "User is logged in on '/reservations'.",
    "Test Steps": "1. Click 'New Reservation'.\n2. Enter Vehicle Number 'TN-09-RES-5555'.\n3. Select Vehicle Type 'Car'.\n4. Pick available slot from dropdown.\n5. Select reservation time tomorrow.\n6. Click 'Confirm Booking'.",
    "Test Data": "Plate: TN-09-RES-5555 | Type: Car | Time: Tomorrow 10:00 AM",
    "Expected Result": "Booking is created with status 'Pending'. Table updates to show the new reservation.",
    "Actual Result": "Reservation created with status 'Pending'. Booking reference displayed in table.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC16",
    "Test Scenario": "Pending Reservation Check-In Conversion",
    "Test Objective": "Verify that an Admin/Operator can convert a pending reservation into an active parking session.",
    "Preconditions": "A pending reservation exists for slot ID X.",
    "Test Steps": "1. Navigate to '/reservations' as Admin.\n2. Locate pending reservation.\n3. Click 'Check In' button.\n4. Confirm prompt dialog.",
    "Test Data": "Reservation ID of pending booking",
    "Expected Result": "Reservation status updates to 'CheckedIn'. Target slot status becomes 'Occupied'. Active parking log is created.",
    "Actual Result": "Vehicle checked in successfully. Yard slot changed to Occupied. Reservation status updated.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC17",
    "Test Scenario": "Pending Reservation Cancellation",
    "Test Objective": "Verify that a pending reservation can be cancelled and slot freed for other users.",
    "Preconditions": "A pending reservation exists.",
    "Test Steps": "1. Navigate to '/reservations'.\n2. Click 'Cancel' button on pending reservation.\n3. Confirm dialog.",
    "Test Data": "Reservation ID of target booking",
    "Expected Result": "Reservation status changes to 'Cancelled'. Slot becomes immediately available for booking again.",
    "Actual Result": "Reservation status changed to 'Cancelled'. Slot released.",
    "Status": "Pass"
  },
  {
    "Test Case ID": "TC18",
    "Test Scenario": "User Logout & Session Invalidation",
    "Test Objective": "Verify that clicking Logout removes the JWT from localStorage and redirects user to Login screen.",
    "Preconditions": "User is authenticated and on any page.",
    "Test Steps": "1. Click 'Logout' button in header.\n2. Verify redirection to '/login'.\n3. Attempt to navigate directly to '/dashboard'.",
    "Test Data": "N/A",
    "Expected Result": "User session is cleared. User is redirected to '/login'. Direct access to protected routes is intercepted and redirected.",
    "Actual Result": "User logged out. Session token cleared from localStorage. Attempted dashboard access bounced to '/login'.",
    "Status": "Pass"
  }
];

const wbFunctional = XLSX.utils.book_new();
const wsFunctional = XLSX.utils.json_to_sheet(functionalTestCases);
// Auto-size columns
wsFunctional['!cols'] = [
  { wch: 14 }, // Test Case ID
  { wch: 30 }, // Test Scenario
  { wch: 45 }, // Test Objective
  { wch: 30 }, // Preconditions
  { wch: 40 }, // Test Steps
  { wch: 25 }, // Test Data
  { wch: 40 }, // Expected Result
  { wch: 40 }, // Actual Result
  { wch: 10 }  // Status
];
XLSX.utils.book_append_sheet(wbFunctional, wsFunctional, 'Functional_Test_Cases');
XLSX.writeFile(wbFunctional, path.join(testCasesDir, 'Functional_Test_Cases.xlsx'));
console.log('Created Functional_Test_Cases.xlsx');


// ============================================================================
// 2. ECP_Analysis.xlsx
// ============================================================================
const ecpData = [
  {
    "Module": "Authentication",
    "Input Field": "Login Email Address",
    "Constraint / Rule": "Non-empty string matching email format RFC 5322",
    "Valid Equivalence Class": "VE1: Valid registered email (e.g. sweet@gmail.com, user@gmail.com)",
    "Invalid Equivalence Class": "IE1: Empty string; IE2: Non-registered email; IE3: Malformed email missing '@' or domain",
    "Test Data Sample": "Valid: 'sweet@gmail.com' | Invalid: '', 'notanemail', 'ghost@none.com'",
    "Expected Result": "Valid: Authentication proceeds. Invalid: Form blocks submit or API returns 'Invalid credentials'."
  },
  {
    "Module": "Authentication",
    "Input Field": "Login Password",
    "Constraint / Rule": "Non-empty string matching user password hash in DB",
    "Valid Equivalence Class": "VE2: Matching plaintext password for user record",
    "Invalid Equivalence Class": "IE4: Empty password; IE5: Incorrect password for given email",
    "Test Data Sample": "Valid: 'queen', 'user123' | Invalid: '', 'wrongpass999'",
    "Expected Result": "Valid: JWT issued and dashboard loaded. Invalid: Returns 400 'Invalid credentials'."
  },
  {
    "Module": "Registration",
    "Input Field": "Full Name",
    "Constraint / Rule": "Non-empty string representing user full name",
    "Valid Equivalence Class": "VE3: Non-empty alphabetic / alphanumeric string (1 to 100 chars)",
    "Invalid Equivalence Class": "IE6: Empty string ('')",
    "Test Data Sample": "Valid: 'Alice Smith' | Invalid: ''",
    "Expected Result": "Valid: Accepted. Invalid: HTML5 required validation error."
  },
  {
    "Module": "Registration",
    "Input Field": "Registration Email",
    "Constraint / Rule": "Valid email format; must be unique across users table",
    "Valid Equivalence Class": "VE4: Properly formatted email not previously registered",
    "Invalid Equivalence Class": "IE7: Empty email; IE8: Malformed email; IE9: Duplicate email already existing in DB",
    "Test Data Sample": "Valid: 'newqa_user@gmail.com' | Invalid: 'sweet@gmail.com' (Duplicate)",
    "Expected Result": "Valid: User registered (201). Duplicate: Returns 400 'Email already exists'."
  },
  {
    "Module": "Registration",
    "Input Field": "Role Selection",
    "Constraint / Rule": "Enumerated string: must be either 'User' or 'Admin'",
    "Valid Equivalence Class": "VE5: Role = 'User'; VE6: Role = 'Admin'",
    "Invalid Equivalence Class": "IE10: Any string other than 'User' or 'Admin'",
    "Test Data Sample": "Valid: 'User', 'Admin' | Invalid: 'SuperUser', 'Guest'",
    "Expected Result": "Valid: Role assigned in DB. Invalid: Fails CHECK(role IN ('Admin', 'User'))."
  },
  {
    "Module": "Registration",
    "Input Field": "Admin Secret Key",
    "Constraint / Rule": "Mandatory secret key when Role is 'Admin'. Exact match 'admin123'",
    "Valid Equivalence Class": "VE7: Exactly 'admin123' when registering as Admin",
    "Invalid Equivalence Class": "IE11: Incorrect secret key; IE12: Empty key when Role = 'Admin'",
    "Test Data Sample": "Valid: 'admin123' | Invalid: 'secret', '12345', ''",
    "Expected Result": "Valid: Admin account created. Invalid: 400 'Invalid Admin Secret Key'."
  },
  {
    "Module": "Vehicle Entry",
    "Input Field": "Vehicle Plate Number",
    "Constraint / Rule": "Non-empty string; must not be currently parked in facility",
    "Valid Equivalence Class": "VE8: Alphanumeric license plate not having active record",
    "Invalid Equivalence Class": "IE13: Empty string; IE14: License plate currently parked (exit_time IS NULL)",
    "Test Data Sample": "Valid: 'TN-09-NEW-1111' | Invalid: '', 'TN-09-QQ-7777' (Active)",
    "Expected Result": "Valid: Slot auto-assigned and ticket generated. Invalid: 400 'Vehicle is already parked'."
  },
  {
    "Module": "Vehicle Entry",
    "Input Field": "Vehicle Type",
    "Constraint / Rule": "Enumerated string matching available bays: 'Car' or 'Bike'",
    "Valid Equivalence Class": "VE9: 'Car'; VE10: 'Bike'",
    "Invalid Equivalence Class": "IE15: Invalid type ('Truck', 'Van', '')",
    "Test Data Sample": "Valid: 'Car', 'Bike' | Invalid: 'Bus', 'SUV'",
    "Expected Result": "Valid: Matches corresponding slot category. Invalid: 400 'Valid vehicle_number and type (Car/Bike) are required'."
  },
  {
    "Module": "Vehicle Exit",
    "Input Field": "Vehicle Plate for Checkout",
    "Constraint / Rule": "Non-empty plate string having an active record with exit_time IS NULL",
    "Valid Equivalence Class": "VE11: License plate currently parked inside facility",
    "Invalid Equivalence Class": "IE16: Empty string; IE17: License plate not found or already exited",
    "Test Data Sample": "Valid: Parked plate | Invalid: 'UNKNOWN-PLATE-999'",
    "Expected Result": "Valid: Computes duration, generates receipt, frees slot. Invalid: 400 'Vehicle not found or already exited'."
  },
  {
    "Module": "Reservations",
    "Input Field": "Slot Selection for Advance Booking",
    "Constraint / Rule": "Existing slot ID; must be 'Available' and match vehicle type; no pending reservation",
    "Valid Equivalence Class": "VE12: Slot ID that is Available, matching vehicle type, with no pending booking",
    "Invalid Equivalence Class": "IE18: Non-existent slot ID; IE19: Mismatched slot type; IE20: Currently occupied slot; IE21: Slot already reserved",
    "Test Data Sample": "Valid: Available Car slot ID | Invalid: Bike slot for Car, Occupied slot ID",
    "Expected Result": "Valid: 201 'Reservation booked successfully'. Invalid: Specific error thrown (e.g. 'Slot type does not match')."
  },
  {
    "Module": "Reservations",
    "Input Field": "Reservation Time",
    "Constraint / Rule": "Valid ISO date/time string in the future",
    "Valid Equivalence Class": "VE13: Future timestamp (e.g., tomorrow 10:00 AM)",
    "Invalid Equivalence Class": "IE22: Empty timestamp; IE23: Invalid date format",
    "Test Data Sample": "Valid: '2026-11-13T10:00:00Z' | Invalid: '', 'not-a-date'",
    "Expected Result": "Valid: Accepted and scheduled. Invalid: Validation error."
  },
  {
    "Module": "Rate Configuration",
    "Input Field": "Hourly Rate (Car / Bike)",
    "Constraint / Rule": "Positive numeric value (currency units/hour)",
    "Valid Equivalence Class": "VE14: Positive float/integer (e.g. 50, 20, 75.50)",
    "Invalid Equivalence Class": "IE24: Negative rate; IE25: Non-numeric string",
    "Test Data Sample": "Valid: 60, 25 | Invalid: -10, 'free'",
    "Expected Result": "Valid: Rate table updated. Invalid: Rejected by server."
  }
];

const wbECP = XLSX.utils.book_new();
const wsECP = XLSX.utils.json_to_sheet(ecpData);
wsECP['!cols'] = [
  { wch: 18 }, // Module
  { wch: 25 }, // Input Field
  { wch: 35 }, // Constraint / Rule
  { wch: 40 }, // Valid Equivalence Class
  { wch: 45 }, // Invalid Equivalence Class
  { wch: 35 }, // Test Data Sample
  { wch: 40 }  // Expected Result
];
XLSX.utils.book_append_sheet(wbECP, wsECP, 'ECP_Analysis');
XLSX.writeFile(wbECP, path.join(testCasesDir, 'ECP_Analysis.xlsx'));
console.log('Created ECP_Analysis.xlsx');


// ============================================================================
// 3. BVA_Analysis.xlsx
// ============================================================================
const bvaData = [
  {
    "Parameter / Constraint": "Parking Duration (Fee Calculation)",
    "Range / Rule Definition": "Math.ceil(diffMs / 3600000); Minimum charge = 1 Hour",
    "Boundary Point": "Minimum Boundary (0 min parked)",
    "Test Input Value": "0 minutes elapsed (entry_time == exit_time)",
    "Expected System Behavior": "System clamps to minimum 1 hour fee (Car = ₹50, Bike = ₹20)",
    "Actual Result": "Fee calculated as exactly 1 hour tariff (₹50 for Car). Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Duration (Fee Calculation)",
    "Range / Rule Definition": "Math.ceil(diffMs / 3600000); Minimum charge = 1 Hour",
    "Boundary Point": "Just Above Min (1 min parked)",
    "Test Input Value": "1 minute elapsed",
    "Expected System Behavior": "Duration 0.016 hrs rounded up to 1 hr minimum fee",
    "Actual Result": "Duration hours = 1; Fee = 1 * Hourly Rate. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Duration (Fee Calculation)",
    "Range / Rule Definition": "Math.ceil(diffMs / 3600000); Minimum charge = 1 Hour",
    "Boundary Point": "Just Below 1 Hour (59 min parked)",
    "Test Input Value": "59 minutes elapsed",
    "Expected System Behavior": "Math.ceil(59/60) = 1 hour fee",
    "Actual Result": "Duration hours = 1; Fee charged for 1 hour. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Duration (Fee Calculation)",
    "Range / Rule Definition": "Math.ceil(diffMs / 3600000); Minimum charge = 1 Hour",
    "Boundary Point": "Exact 1 Hour Boundary (60 min parked)",
    "Test Input Value": "60 minutes elapsed",
    "Expected System Behavior": "Math.ceil(60/60) = exactly 1 hour fee",
    "Actual Result": "Duration hours = 1; Fee charged for 1 hour. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Duration (Fee Calculation)",
    "Range / Rule Definition": "Math.ceil(diffMs / 3600000); Minimum charge = 1 Hour",
    "Boundary Point": "Just Above 1 Hour (61 min parked)",
    "Test Input Value": "61 minutes elapsed",
    "Expected System Behavior": "Math.ceil(61/60) = rounds up to 2 hours fee (Car = ₹100, Bike = ₹40)",
    "Actual Result": "Duration hours = 2; Fee charged for 2 hours. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Duration (Fee Calculation)",
    "Range / Rule Definition": "Math.ceil(diffMs / 3600000); Minimum charge = 1 Hour",
    "Boundary Point": "Multi-Hour Boundary (120 min parked)",
    "Test Input Value": "120 minutes elapsed",
    "Expected System Behavior": "Math.ceil(120/60) = exactly 2 hours fee",
    "Actual Result": "Duration hours = 2; Fee charged for 2 hours. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Capacity (Car Bays)",
    "Range / Rule Definition": "Slots 1 to 8 allocated for Car",
    "Boundary Point": "Min Slot Index (Bay 1)",
    "Test Input Value": "First car entry when all bays vacant",
    "Expected System Behavior": "System assigns Slot ID 1 (lowest available index)",
    "Actual Result": "Assigned Slot ID 1. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Capacity (Car Bays)",
    "Range / Rule Definition": "Slots 1 to 8 allocated for Car",
    "Boundary Point": "Max Slot Index (Bay 8)",
    "Test Input Value": "Eighth car entry when Slots 1-7 occupied",
    "Expected System Behavior": "System assigns Slot ID 8 (highest Car bay)",
    "Actual Result": "Assigned Slot ID 8. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Capacity (Car Bays)",
    "Range / Rule Definition": "Slots 1 to 8 allocated for Car",
    "Boundary Point": "Just Above Max Capacity (Car Bay 9 Overflow)",
    "Test Input Value": "Ninth car entry when Slots 1-8 are all occupied",
    "Expected System Behavior": "System detects no available Car slots; throws 400 'Parking full for Car'",
    "Actual Result": "Rejected with error 'Parking full for Car'. Yard map reflects 100% occupancy.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Capacity (Bike Bays)",
    "Range / Rule Definition": "Slots 9 to 14 allocated for Bike",
    "Boundary Point": "Min Bike Slot Index (Bay 9)",
    "Test Input Value": "First bike entry when all bike bays vacant",
    "Expected SystemBehavior": "System assigns Slot ID 9",
    "Actual Result": "Assigned Slot ID 9. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Capacity (Bike Bays)",
    "Range / Rule Definition": "Slots 9 to 14 allocated for Bike",
    "Boundary Point": "Max Bike Slot Index (Bay 14)",
    "Test Input Value": "Sixth bike entry when Slots 9-13 occupied",
    "Expected System Behavior": "System assigns Slot ID 14",
    "Actual Result": "Assigned Slot ID 14. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Parking Capacity (Bike Bays)",
    "Range / Rule Definition": "Slots 9 to 14 allocated for Bike",
    "Boundary Point": "Just Above Max Capacity (Bike Bay 15 Overflow)",
    "Test Input Value": "Seventh bike entry when Slots 9-14 occupied",
    "Expected System Behavior": "System detects no available Bike slots; throws 400 'Parking full for Bike'",
    "Actual Result": "Rejected with error 'Parking full for Bike'. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Hourly Tariff Rate Configuration",
    "Range / Rule Definition": "Positive real number > 0",
    "Boundary Point": "Minimum Reasonable Tariff (₹1.00)",
    "Test Input Value": "Rate = 1.00",
    "Expected System Behavior": "Rate updated successfully and applied to exit calculations",
    "Actual Result": "Rate updated to 1.00. Exit calculation uses ₹1/hr. Handled correctly.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Hourly Tariff Rate Configuration",
    "Range / Rule Definition": "Positive real number > 0",
    "Boundary Point": "Boundary Value Zero (₹0.00)",
    "Test Input Value": "Rate = 0.00",
    "Expected System Behavior": "Zero rate allowed for free parking or rejected by business validation",
    "Actual Result": "Accepted by database REAL column; fee calculates to ₹0 for parking.",
    "Status": "Pass"
  },
  {
    "Parameter / Constraint": "Hourly Tariff Rate Configuration",
    "Range / Rule Definition": "Positive real number > 0",
    "Boundary Point": "Negative Boundary (₹-1.00)",
    "Test Input Value": "Rate = -1.00",
    "Expected System Behavior": "Should be rejected because negative parking tariffs are nonsensical",
    "Actual Result": "Database lacks CHECK(hourly_rate > 0); allowed negative rates (DEFECT LOGGED).",
    "Status": "Fail"
  }
];

const wbBVA = XLSX.utils.book_new();
const wsBVA = XLSX.utils.json_to_sheet(bvaData);
wsBVA['!cols'] = [
  { wch: 30 }, // Parameter / Constraint
  { wch: 40 }, // Range / Rule Definition
  { wch: 30 }, // Boundary Point
  { wch: 30 }, // Test Input Value
  { wch: 45 }, // Expected System Behavior
  { wch: 45 }, // Actual Result
  { wch: 10 }  // Status
];
XLSX.utils.book_append_sheet(wbBVA, wsBVA, 'BVA_Analysis');
XLSX.writeFile(wbBVA, path.join(testCasesDir, 'BVA_Analysis.xlsx'));
console.log('Created BVA_Analysis.xlsx');


// ============================================================================
// 4. Cyclomatic_Complexity.xlsx
// ============================================================================
const whiteBoxData = [
  {
    "Function Name": "assignSlot",
    "File / Module": "backend/routes/parking.js (Lines 18-40)",
    "Nodes (N)": 11,
    "Edges (E)": 13,
    "Connected Components (P)": 1,
    "Formula V(G) = E - N + 2P": "13 - 11 + 2(1) = 4",
    "Decision Nodes (D)": 3,
    "Formula V(G) = D + 1": "3 + 1 = 4",
    "Cyclomatic Complexity V(G)": 4,
    "Maintainability / Risk": "Low Risk (Well Structured)",
    "Independent Paths Count": 4,
    "Independent Paths Description": "Path 1: Entry -> Input Valid? No -> Return 400 (Invalid input)\nPath 2: Entry -> Valid -> Existing Parked? Yes -> Throw 'Already parked'\nPath 3: Entry -> Valid -> Not parked -> Slot Available? No -> Throw 'Parking full'\nPath 4: Entry -> Valid -> Not parked -> Slot Available? Yes -> Update slot -> Insert record -> Commit -> Return 201"
  },
  {
    "Function Name": "processExit",
    "File / Module": "backend/routes/parking.js (Lines 55-84)",
    "Nodes (N)": 12,
    "Edges (E)": 15,
    "Connected Components (P)": 1,
    "Formula V(G) = E - N + 2P": "15 - 12 + 2(1) = 5",
    "Decision Nodes (D)": 4,
    "Formula V(G) = D + 1": "4 + 1 = 5",
    "Cyclomatic Complexity V(G)": 5,
    "Maintainability / Risk": "Low Risk (Well Structured)",
    "Independent Paths Count": 5,
    "Independent Paths Description": "Path 1: Exit -> Vehicle No Provided? No -> Return 400\nPath 2: Exit -> Provided -> Record Found? No -> Throw 'Not found or exited'\nPath 3: Exit -> Provided -> Found -> Hours < 1? Yes -> Clamped to 1 -> Rate found? Yes -> Update DB -> Return Receipt\nPath 4: Exit -> Provided -> Found -> Hours >= 1? No clamp -> Rate found? Yes -> Update DB -> Return Receipt\nPath 5: Exit -> Provided -> Found -> Rate in DB? No -> Fallback to default (50/20) -> Update DB -> Return Receipt"
  },
  {
    "Function Name": "bookTx (Reservation)",
    "File / Module": "backend/routes/reservations.js (Lines 46-74)",
    "Nodes (N)": 14,
    "Edges (E)": 18,
    "Connected Components (P)": 1,
    "Formula V(G) = E - N + 2P": "18 - 14 + 2(1) = 6",
    "Decision Nodes (D)": 5,
    "Formula V(G) = D + 1": "5 + 1 = 6",
    "Cyclomatic Complexity V(G)": 6,
    "Maintainability / Risk": "Low Risk (Well Structured)",
    "Independent Paths Count": 6,
    "Independent Paths Description": "Path 1: Book -> Required Fields Present? No -> Return 400\nPath 2: Book -> Fields OK -> Valid Type ('Car'/'Bike')? No -> Return 400\nPath 3: Book -> Valid -> Slot Exists? No -> Throw 'Slot does not exist'\nPath 4: Book -> Valid -> Slot Exists -> Type Matches? No -> Throw 'Type mismatch'\nPath 5: Book -> Valid -> Type OK -> Slot Occupied? Yes -> Throw 'Currently occupied'\nPath 6: Book -> Valid -> Available -> Pending Res Exists? No -> Insert -> Return 201"
  },
  {
    "Function Name": "register (Auth)",
    "File / Module": "backend/routes/auth.js (Lines 9-32)",
    "Nodes (N)": 11,
    "Edges (E)": 13,
    "Connected Components (P)": 1,
    "Formula V(G) = E - N + 2P": "13 - 11 + 2(1) = 4",
    "Decision Nodes (D)": 3,
    "Formula V(G) = D + 1": "3 + 1 = 4",
    "Cyclomatic Complexity V(G)": 4,
    "Maintainability / Risk": "Low Risk (Well Structured)",
    "Independent Paths Count": 4,
    "Independent Paths Description": "Path 1: Register -> All Fields Present? No -> Return 400\nPath 2: Register -> Fields OK -> Role=='Admin' && Secret!='admin123'? Yes -> Return 400\nPath 3: Register -> Fields OK -> Hash & Insert -> SQLITE_CONSTRAINT_UNIQUE? Yes -> Return 400 'Email exists'\nPath 4: Register -> Fields OK -> Success -> Return 201"
  },
  {
    "Function Name": "login (Auth)",
    "File / Module": "backend/routes/auth.js (Lines 34-52)",
    "Nodes (N)": 9,
    "Edges (E)": 11,
    "Connected Components (P)": 1,
    "Formula V(G) = E - N + 2P": "11 - 9 + 2(1) = 4",
    "Decision Nodes (D)": 3,
    "Formula V(G) = D + 1": "3 + 1 = 4",
    "Cyclomatic Complexity V(G)": 4,
    "Maintainability / Risk": "Low Risk (Well Structured)",
    "Independent Paths Count": 4,
    "Independent Paths Description": "Path 1: Login -> User Found in DB? No -> Return 400 'Invalid credentials'\nPath 2: Login -> User Found -> Bcrypt Matches? No -> Return 400 'Invalid credentials'\nPath 3: Login -> User Found -> Bcrypt Matches -> JWT Signed -> Return 200 {token, user}\nPath 4: Login -> Unexpected Exception -> Catch -> Return 500 'Internal server error'"
  }
];

const wbWhiteBox = XLSX.utils.book_new();
const wsWhiteBox = XLSX.utils.json_to_sheet(whiteBoxData);
wsWhiteBox['!cols'] = [
  { wch: 22 }, // Function Name
  { wch: 35 }, // File / Module
  { wch: 10 }, // Nodes
  { wch: 10 }, // Edges
  { wch: 15 }, // Connected Components
  { wch: 25 }, // Formula 1
  { wch: 15 }, // Decision Nodes
  { wch: 20 }, // Formula 2
  { wch: 18 }, // Final V(G)
  { wch: 25 }, // Risk
  { wch: 15 }, // Paths Count
  { wch: 60 }  // Descriptions
];
XLSX.utils.book_append_sheet(wbWhiteBox, wsWhiteBox, 'Cyclomatic_Complexity');
XLSX.writeFile(wbWhiteBox, path.join(whiteBoxDir, 'Cyclomatic_Complexity.xlsx'));
console.log('Created Cyclomatic_Complexity.xlsx');
