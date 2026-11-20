# 🚗 Smart Parking Slot Booking and Management System
### Comprehensive Quality Assurance, Test Automation, and System Evaluation

[![Cypress Tests](https://img.shields.io/badge/Cypress-15%2F15%20Passed%20(100%25)-success?style=for-the-badge&logo=cypress)](Cypress_Project/)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)](repo_source/backend)
[![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)](repo_source/frontend)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)](repo_source/frontend)
[![Academic Project](https://img.shields.io/badge/Academic%20Project-Software%20Testing-orange?style=for-the-badge)]()

---

## 📌 Executive Summary

This repository contains the complete source code, test automation suites, black-box & white-box analysis, defect logs, empirical screenshot evidence, and college evaluation deliverables for the **Smart Parking Slot Booking and Management System**.

The project implements a full lifecycle quality assurance audit, covering:
* **End-to-End Test Automation** using **Cypress** (15 automated test cases executed headlessly with 100% pass rate).
* **Black-Box Test Design** applying **Equivalence Class Partitioning (ECP)** and **Boundary Value Analysis (BVA)**.
* **White-Box Code Analysis** featuring **Control Flow Graphs (CFGs)**, McCabe's **Cyclomatic Complexity** metrics, and basis path testing.
* **Defect Logging & Analysis** identifying critical syntax and validation issues in backend business logic.
* **Academic Deliverables** including high-resolution presentation slides, formal project reports, and viva voce preparation guides.

* **Author / Lead QA Engineer:** Chethan  
* **Academic Program:** Information Science & Engineering (ISE)  
* **USN / Candidate ID:** `20241ISE0212`  
* **Live Web App:** [https://parking-management-system-gold.vercel.app/](https://parking-management-system-gold.vercel.app/)  
* **Live API Server:** [https://parking-management-system-ozoc.vercel.app/](https://parking-management-system-ozoc.vercel.app/)  

---

## 📁 Repository Directory Structure

```text
SmartParking_miniProject/
│
├── README.md                           # Master Project Documentation & Execution Guide
├── Application_Analysis.md             # In-depth architectural analysis of the application
├── PROJECT_COMPLETION_REPORT.md        # Comprehensive verification audit & execution metrics
├── PROJECT_PROGRESS.md                 # Milestone tracking and task completion breakdown
│
├── repo_source/                        # Full Application Source Code
│   ├── backend/                        # Express.js REST API with SQLite database
│   │   ├── db/                         # Database schema and SQLite connection
│   │   ├── routes/                     # Express routes (auth, parking, rates, etc.)
│   │   ├── server.js                   # Main API server entry point
│   │   └── package.json                # Backend dependencies
│   └── frontend/                       # React 18 + Vite + TailwindCSS Web Client
│       ├── src/                        # React components, pages, context, and styles
│       ├── public/                     # Static web assets
│       └── package.json                # Frontend dependencies
│
├── Cypress_Project/                    # End-to-End Test Automation Suite
│   ├── cypress/
│   │   ├── e2e/                        # Automated test specifications
│   │   │   └── smartparking.cy.js      # 15 E2E Cypress test cases
│   │   ├── fixtures/                   # Test data (users, slots, vehicles)
│   │   └── support/                    # Custom Cypress commands and configuration
│   ├── cypress.config.js               # Cypress runner configuration
│   └── package.json                    # Cypress scripts and reporting tools
│
├── Test_Cases/                         # Test Case Design Spreadsheets
│   ├── Functional_Test_Cases.xlsx      # 18 Detailed manual functional test cases
│   ├── ECP_Analysis.xlsx               # Equivalence Class Partitioning matrices
│   └── BVA_Analysis.xlsx               # Boundary Value Analysis test matrices
│
├── White_Box_Analysis/                 # Structural & White-Box Testing
│   ├── Source_Code_Analysis.md         # In-depth logic walkthrough of critical algorithms
│   ├── Cyclomatic_Complexity.xlsx      # Node/Edge matrices and McCabe's V(G) calculations
│   └── CFG_Diagrams/                   # Control Flow Graphs for assignSlot & processExit
│
├── Test_Reports/                       # Quality & Defect Deliverables
│   └── Defect_Report.md                # Comprehensive defect logs (DEF-01, DEF-02, DEF-03)
│
├── Screenshots/                        # High-Resolution Verification Evidence
│   ├── Application/                    # Screenshots of live application UI
│   ├── Cypress/                        # Cypress test execution screenshots
│   ├── Test_Execution/                 # Terminal run summaries and pass metrics
│   └── White_Box/                      # Control Flow Graph renderings
│
├── Final_Report/                       # Formal Academic Project Documentation
│   ├── Project_Report.docx             # Academic report in Word format
│   └── Project_Report.pdf              # Academic report in PDF format
│
├── Final_PPT/                          # Presentation Deliverables
│   └── Project_Presentation.pptx       # 15 Professional slides for viva defense
│
```

---

## 🛠️ Procedure to Run the Application Source Code

You can run both the backend API and frontend client locally, or test directly against the live deployed instances.

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)

---

### Step 1: Start the Backend Server

The backend is built with Express.js and SQLite (`better-sqlite3`).

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd repo_source/backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   * The backend server will start on `http://localhost:5000` (or the configured port).
   * SQLite database files are initialized automatically.

---

### Step 2: Start the Frontend Application

The frontend is a single-page application built with React, Vite, and TailwindCSS.

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd repo_source/frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 🧪 Procedure to Run the Cypress Automation Suite

The project includes an enterprise-grade automated testing suite with **15 automated tests** covering authentication, dark mode toggling, real-time yard map rendering, vehicle check-in/checkout, hourly tariff calculations, slot reservation, and admin controls.

### Step 1: Navigate and Install Cypress Dependencies

1. Open a terminal and enter the `Cypress_Project` folder:
   ```bash
   cd Cypress_Project
   ```
2. Install the Cypress test runner and dependencies:
   ```bash
   npm install
   ```

---

### Step 2: Execute Cypress in Headless Mode (Command Line)

To run the automated tests headlessly in Google Chrome:
```bash
npm run cypress:run
```

To run headlessly using the built-in Electron browser:
```bash
npm run cypress:run:electron
```

**Expected Console Output:**
```text
====================================================================================================
  (Run Finished)

       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  smartparking.cy.js                       01:44       15       15        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        01:44       15       15        -        -        -  
====================================================================================================
```

---

### Step 3: Run Tests Interactively (Cypress GUI Runner)

To observe tests executing visually step-by-step with time-travel debugging:

1. Launch the interactive test runner:
   ```bash
   npm run cypress:open
   ```
2. In the Cypress window:
   * Select **E2E Testing**.
   * Choose your preferred browser (e.g., **Chrome** or **Edge**).
   * Click **Start E2E Testing in [Browser]**.
   * Click on `smartparking.cy.js` to execute the suite.

---

### Summary of Automated Test Cases

| Test ID | Test Scenario | Verified Outcome | Result |
| :---: | :--- | :--- | :---: |
| **TC01** | Root URL Navigation | Automatically redirects unauthenticated users to `/login` | **PASS** |
| **TC02** | Login UI Elements & Branding | Validates logo, username field, password field, and login button | **PASS** |
| **TC03** | View Navigation | Smooth switching between Login and Registration views | **PASS** |
| **TC04** | Invalid Authentication Handling | Displays error message when incorrect password is provided | **PASS** |
| **TC05** | Form Validation | Triggers required field prompts when empty form is submitted | **PASS** |
| **TC06** | Valid Admin Login & Dashboard | Verifies successful login, JWT session storage, and stat cards | **PASS** |
| **TC07** | Theme Toggle | Toggles between Dark Mode and Light Mode correctly | **PASS** |
| **TC08** | Parking Yard Visualization | Renders parking bay grid, slot status indicators, and types | **PASS** |
| **TC09** | Vehicle Check-in (Entry) | Registers vehicle entry and generates parking ticket | **PASS** |
| **TC10** | Duplicate Entry Guard | Prevents registering a vehicle that is already inside | **PASS** |
| **TC11** | Vehicle Checkout (Exit) | Computes duration, calculates hourly tariff, and releases slot | **PASS** |
| **TC12** | Advance Slot Reservation | Validates booking creation form and reserved slot status | **PASS** |
| **TC13** | Admin Slot Bay Management | Displays bay capacity, inventory status, and configuration | **PASS** |
| **TC14** | Tariff Rate Configuration | Verifies administrative hourly rate update interface | **PASS** |
| **TC15** | User Logout | Clears session token and returns to login screen | **PASS** |

---

## 📊 Black-Box & White-Box Testing Deliverables

### 1. Black-Box Design Techniques
* **Equivalence Class Partitioning (ECP):** Found in `Test_Cases/ECP_Analysis.xlsx`. Partitions inputs into valid and invalid classes across vehicle types, license formats, and checkout timestamps.
* **Boundary Value Analysis (BVA):** Found in `Test_Cases/BVA_Analysis.xlsx`. Tests critical boundary limits ($min-1, min, min+1, max-1, max, max+1$) for parking durations and tariff rates.
* **Functional Test Cases:** Found in `Test_Cases/Functional_Test_Cases.xlsx` (18 complete manual test specifications with preconditions, test steps, test data, and expected results).

### 2. White-Box Structural Analysis
* **Control Flow Graphs (CFG):** Analyzed in `White_Box_Analysis/Source_Code_Analysis.md` and diagrams in `White_Box_Analysis/CFG_Diagrams/`.
* **McCabe's Cyclomatic Complexity:** Calculated in `White_Box_Analysis/Cyclomatic_Complexity.xlsx`:
  $$V(G) = E - N + 2P$$
  * `assignSlot` Algorithm: $E = 14, N = 11, P = 1 \implies V(G) = 5$ (5 Independent Basis Paths)
  * `processExit` Algorithm: $E = 17, N = 13, P = 1 \implies V(G) = 6$ (6 Independent Basis Paths)

### 3. Logged Empirical Defects
Documented in detail in `Test_Reports/Defect_Report.md`:
1. **DEF-01 (Critical):** SQLite double-quoted identifier syntax error in `assignSlot` (`backend/routes/parking.js:26`).
2. **DEF-02 (Medium):** Missing non-negative rate constraint in tariff configuration schema (`backend/routes/rates.js`).
3. **DEF-03 (Low):** Absence of regional license plate regex validation on client-side check-in inputs.

---

## 🎓 Academic Documents & Reports

All academic deliverables are ready for submission and evaluation:

1. **Formal Project Report:**
   * Word Document: [`Final_Report/Project_Report.docx`](Final_Report/Project_Report.docx)
   * PDF Document: [`Final_Report/Project_Report.pdf`](Final_Report/Project_Report.pdf)
2. **Presentation Slides:**
   * PowerPoint: [`Final_PPT/Project_Presentation.pptx`](Final_PPT/Project_Presentation.pptx) (15 professional slides covering architecture, testing techniques, automation results, defect analysis, and future enhancements).

---

## 👨‍💻 Student & Evaluation Information

* **Candidate Name:** Chethan.R.Devadiga  
* **University Seat Number (USN):** `20241ISE0212`  
* **Department:** Information Science & Engineering  
* **Subject:** Software Testing & Automation Lab  
* **Academic Year:** 2026–2027  
