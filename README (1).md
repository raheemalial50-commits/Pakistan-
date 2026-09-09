# THE SMART MODERN PUBLIC SCHOOL QAMBER
## School Management System (Demo)

A complete, modern, professional School Management System web application built with HTML5, CSS3, Vanilla JavaScript, Bootstrap 5, Font Awesome, and Chart.js. Data persists in LocalStorage (DEMO ONLY).

### School
**THE SMART MODERN PUBLIC SCHOOL QAMBER**  
Qamber, Sindh, Pakistan

---

## Demo Credentials (DEMO ONLY)

| Role        | Username     | Password      |
|-------------|--------------|---------------|
| Admin       | admin        | admin123      |
| Principal   | principal    | principal123  |
| Teacher     | teacher      | teacher123    |
| Accountant  | accountant   | account123    |
| Staff       | staff        | staff123      |

**Important:** These are demo credentials only. Never use real passwords. LocalStorage authentication is for demonstration purposes.

---

## How to Run Locally

1. Download or clone the project folder `school-management-system`.
2. Open `index.html` or `login.html` in a modern browser (Chrome, Firefox, Edge, Safari).
3. Or use a local server:
   ```bash
   # Python
   python -m http.server 8080
   # Node
   npx serve .
   ```
4. Visit `http://localhost:8080`

No build step required. No backend required for the demo.

---

## Project Structure

```
school-management-system/
├── index.html              # Redirects to login
├── login.html              # Authentication
├── dashboard.html          # Main dashboard with charts
├── students.html           # Student CRUD
├── student-profile.html    # Student detail view
├── teachers.html           # Teacher management
├── staff.html              # Staff management
├── parents.html            # Parents
├── classes.html            # Classes & Sections
├── subjects.html           # Subjects
├── attendance.html         # Student attendance marking
├── timetable.html          # Class timetable
├── homework.html           # Homework
├── exams.html              # Exam schedule
├── results.html            # Marks & results
├── fees.html               # Fee collection, pending, history, structure
├── admissions.html         # Admission applications
├── leaves.html             # Leave management
├── notices.html            # Notices & announcements
├── notifications.html      # Notification center
├── reports.html            # Reports & CSV export
├── settings.html           # School settings
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── print.css
├── js/
│   ├── storage.js          # LocalStorage data layer
│   ├── auth.js             # Auth & RBAC
│   ├── demo-data.js        # Seed data
│   ├── app.js              # Shared UI (sidebar, toasts, etc.)
│   ├── dashboard.js
│   ├── students.js
│   └── ... (module scripts)
└── assets/
```

---

## Features Implemented

- Role-based login (Admin, Principal, Teacher, Accountant, Staff)
- Dashboard with live stats and Chart.js charts
- Student full CRUD + profile + search/filter/export
- Teacher management
- Staff & Parents lists
- Classes & Sections overview
- Subjects list
- Attendance marking (Present/Absent/Leave) with bulk actions
- Timetable grid
- Homework list + add
- Exam schedule
- Marks entry & grading (A+ to F)
- Fee collection, pending fees, payment history, fee structure, printable receipts
- Admissions (approve/reject)
- Leave management (approve/reject)
- Notices
- Notifications
- Reports with CSV export
- Settings (school profile, session, currency)
- Responsive sidebar (drawer on mobile)
- Print-friendly styles
- Toast notifications & confirmation modals
- Empty states
- Form validation

---

## How to Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload the entire `school-management-system` folder contents (or push via git).
3. Go to Settings → Pages.
4. Source: Deploy from branch `main` (or `master`), folder `/ (root)`.
5. Save. Your site will be available at `https://<username>.github.io/<repo>/`.

---

## Connecting a Real Backend Later (Firebase / Supabase / MySQL)

The data layer in `js/storage.js` is intentionally modular:

- `getData(collection)`, `saveData(collection, data)`, `addData`, `updateData`, `deleteData`
- Replace these functions with API calls to your backend.
- Keep the same collection names and object shapes.
- Move authentication to server-side sessions / JWT.
- Never store password hashes in LocalStorage in production.
- Use HTTPS and proper CORS.

Example migration path:
1. Keep UI as-is.
2. Replace `SMS.getData('students')` with `fetch('/api/students').then(r => r.json())`.
3. Replace `SMS.addData` with `POST /api/students`.
4. Add auth tokens to requests.

---

## Architecture

- **Multi-page application** with shared layout (sidebar + topbar injected by `app.js`).
- **LocalStorage** as the demo database with a clean abstraction layer.
- **Role-based UI permissions** checked via `Auth.hasPermission(module, action)`.
- **Bootstrap 5** for components and responsiveness.
- **Chart.js** for dashboard visualizations.
- **No frameworks** — pure vanilla JS for easy learning and migration.

---

## Browser Support

Chrome, Firefox, Edge, Safari (recent versions). Mobile-first responsive design tested for 320px–1440px+.

---

## License / Demo Notice

This is a demonstration project for educational and portfolio purposes.  
All data is fictional demo data for **THE SMART MODERN PUBLIC SCHOOL QAMBER**.  
Do not use for real student records without a secure backend.
