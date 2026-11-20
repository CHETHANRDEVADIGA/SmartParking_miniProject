# Formal Defect Report: Smart Parking Management System

**Project Title:** Automated Testing of a Smart Parking Slot Booking and Management System  
**Test Cycle:** Cypress Automated E2E & White-Box API Inspection  
**Testing Tool:** Cypress v13.17.0 on Google Chrome / Electron Headless  
**Date of Testing:** November 2026  
**Lead QA Engineer:** Chethan  

---

## 1. Defect Summary Table

| Defect ID | Defect Title | Impacted Module | Severity | Priority | Status |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **DEF-01** | SQLite Identifier Quoting Syntax Error in `assignSlot` & `processExit` | Backend (`/api/parking/entry` & `/api/parking/exit`) | **Critical** | **High** | Open / Confirmed |
| **DEF-02** | Missing Range Constraint Permits Negative Hourly Tariff Rates | Backend (`/api/rates`) & Frontend Rates Manager | **Medium** | **Medium** | Open / Confirmed |
| **DEF-03** | Missing Client-Side License Plate Format Regex Validation | Frontend (`/entry` & `/reservations`) | **Low** | **Low** | Open / Observed |

---

## 2. Detailed Defect Logs

### Defect ID: DEF-01
* **Defect Title:** SQLite Identifier Quoting Syntax Error on String Literals in `assignSlot`
* **Module Affected:** Backend API Router (`backend/routes/parking.js` - Line 26 and Line 81)
* **Severity:** **Critical** (Blocks physical slot assignment on strict SQLite engines)
* **Priority:** **High** (Core business logic impacted)
* **Status:** Open / Confirmed with reproducible API trace
* **Associated Test Case:** TC09 (`TC09_Vehicle_Entry_Result.png`)

#### Description:
In `backend/routes/parking.js`, the SQL query to find an available parking slot is written as:
```javascript
const slot = db.prepare('SELECT id FROM slots WHERE type = ? AND status = "Available" ORDER BY id ASC LIMIT 1').get(type);
```
In SQLite syntax standards (and enforced in newer `better-sqlite3` versions and strict database modes), double quotes (`"..."`) represent an **identifier** (such as a table or column name). String literals must be enclosed in single quotes (`'...'`). Consequently, when the Express server queries the database, SQLite interprets `"Available"` as a column name, throwing an uncaught SQL error:
`no such column: "Available" - should this be a string literal in single-quotes?`

#### Steps to Reproduce:
1. Log in to the application as Administrator or standard User.
2. Navigate to **Vehicle Entry** (`/entry`).
3. Enter any license plate (e.g., `TN-09-CY-5555`).
4. Select Vehicle Type `Car`.
5. Click **Generate Ticket & Assign Slot**.

#### Expected Result:
The backend should find the lowest available Car slot index, set its status to `'Occupied'`, insert a row into `parking_records`, and return HTTP 201 with ticket metadata.

#### Actual Result:
The backend API returns HTTP 400 Bad Request with:
```json
{
  "error": "no such column: \"Available\" - should this be a string literal in single-quotes?"
}
```
The frontend renders this error in a red notification banner.

#### Recommended Fix:
Change double quotes to single quotes in `backend/routes/parking.js`:
```javascript
// Fix on Line 26:
const slot = db.prepare("SELECT id FROM slots WHERE type = ? AND status = 'Available' ORDER BY id ASC LIMIT 1").get(type);

// Fix on Line 81:
db.prepare("UPDATE slots SET status = 'Available' WHERE id = ?").run(record.slot_id);
```

---

### Defect ID: DEF-02
* **Defect Title:** Dynamic Tariff Manager Permits Negative Hourly Pricing Rates
* **Module Affected:** Backend API (`backend/routes/rates.js`) & Database Schema (`rates` table)
* **Severity:** **Medium** (Financial / tariff integrity violation)
* **Priority:** **Medium** (Allows nonsensical negative parking fees)
* **Status:** Open / Confirmed
* **Associated Test Case:** BVA-09 (`BVA_Analysis.xlsx`)

#### Description:
The `rates` table in `backend/db/database.js` defines:
```sql
CREATE TABLE IF NOT EXISTS rates (
  vehicle_type TEXT PRIMARY KEY CHECK(vehicle_type IN ('Car', 'Bike')),
  hourly_rate REAL NOT NULL
);
```
Notice that the table schema lacks a constraint ensuring `hourly_rate > 0`. Furthermore, the Express route handler `PUT /api/rates` performs no numerical validation to ensure rates are non-negative. If an Administrator enters `-50` for Car rate, the database saves it. Upon vehicle checkout, the duration is multiplied by `-50`, generating a negative fee where the facility pays the driver.

#### Steps to Reproduce:
1. Dispatch an authenticated `PUT /api/rates` with payload:
   ```json
   { "rates": { "Car": -50, "Bike": 20 } }
   ```
2. Check database rate records.

#### Expected Result:
Server should reject negative rates with HTTP 400 Bad Request (`"Hourly rate must be a positive number"`).

#### Actual Result:
Server updates the database row to `-50`, returning HTTP 200 OK.

#### Recommended Fix:
1. Update database table definition:
   ```sql
   hourly_rate REAL NOT NULL CHECK(hourly_rate >= 0)
   ```
2. Add validation in `backend/routes/rates.js`:
   ```javascript
   if (rates.Car < 0 || rates.Bike < 0) {
     return res.status(400).json({ error: 'Hourly rate must be non-negative' });
   }
   ```

---

### Defect ID: DEF-03
* **Defect Title:** Missing Client-Side License Plate Format Validation
* **Module Affected:** Frontend Vehicle Entry & Advance Reservation Pages
* **Severity:** **Low** (UI/UX input sanitization)
* **Priority:** **Low** (Does not cause runtime crashes)
* **Status:** Open / Observed

#### Description:
The vehicle entry input field in `Entry.jsx` and `Reservations.jsx` defines:
```jsx
<input type="text" required placeholder="e.g. TN-00-AA-1111" ... />
```
It lacks a regex pattern attribute (e.g., `pattern="^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$"`). Consequently, users can submit arbitrary non-plate strings such as `12345` or `TEST$$$`, which are stored in the database without standard vehicle registration sanitization.

#### Recommended Fix:
Add HTML5 regex pattern and custom client-side validation to enforce regional license plate formats.
