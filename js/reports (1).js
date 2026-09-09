document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('reports', 'view')) return;
  seedDemoData();
  initLayout('reports', 'Reports');
  document.getElementById('pageHeader').textContent = 'Reports';
  document.getElementById('pageBody').innerHTML = `
    <div class="row g-3">
      <div class="col-md-4"><div class="card h-100"><div class="card-body text-center">
        <i class="fas fa-user-graduate fa-2x text-primary mb-2"></i>
        <h6>Student List</h6>
        <button class="btn btn-sm btn-outline-primary" onclick="exportStudentsReport()">Export CSV</button>
      </div></div></div>
      <div class="col-md-4"><div class="card h-100"><div class="card-body text-center">
        <i class="fas fa-calendar-check fa-2x text-success mb-2"></i>
        <h6>Attendance Report</h6>
        <button class="btn btn-sm btn-outline-primary" onclick="exportAttendance()">Export CSV</button>
      </div></div></div>
      <div class="col-md-4"><div class="card h-100"><div class="card-body text-center">
        <i class="fas fa-money-bill fa-2x text-warning mb-2"></i>
        <h6>Fee Collection</h6>
        <button class="btn btn-sm btn-outline-primary" onclick="exportFees()">Export CSV</button>
      </div></div></div>
      <div class="col-md-4"><div class="card h-100"><div class="card-body text-center">
        <i class="fas fa-file-alt fa-2x text-info mb-2"></i>
        <h6>Exam Results</h6>
        <button class="btn btn-sm btn-outline-primary" onclick="exportResults()">Export CSV</button>
      </div></div></div>
      <div class="col-md-4"><div class="card h-100"><div class="card-body text-center">
        <i class="fas fa-chalkboard-teacher fa-2x text-secondary mb-2"></i>
        <h6>Teacher List</h6>
        <button class="btn btn-sm btn-outline-primary" onclick="exportTeachers()">Export CSV</button>
      </div></div></div>
      <div class="col-md-4"><div class="card h-100"><div class="card-body text-center">
        <i class="fas fa-print fa-2x mb-2"></i>
        <h6>Print Page</h6>
        <button class="btn btn-sm btn-outline-secondary" onclick="printPage()">Print</button>
      </div></div></div>
    </div>`;
});
function exportStudentsReport() {
  exportToCSV(SMS.getData('students').map(s => ({ Name: s.name, Admission: s.admissionNo, Class: s.className, Section: s.sectionName, Gender: s.gender, Status: s.status })), 'students_report.csv');
}
function exportAttendance() {
  exportToCSV(SMS.getData('attendance').map(a => ({ Student: a.studentName, Class: a.className, Date: a.date, Status: a.status })), 'attendance_report.csv');
}
function exportFees() {
  exportToCSV(SMS.getData('feePayments').map(p => ({ Student: p.studentName, Month: p.month, Amount: p.amount, Paid: p.paidAmount, Status: p.status })), 'fee_report.csv');
}
function exportResults() {
  exportToCSV(SMS.getData('results').map(r => ({ Student: r.studentName, Exam: r.examName, Subject: r.subjectName, Marks: r.obtainedMarks, Grade: r.grade })), 'results_report.csv');
}
function exportTeachers() {
  exportToCSV(SMS.getData('teachers').map(t => ({ Name: t.name, Designation: t.designation, Phone: t.phone, Status: t.status })), 'teachers_report.csv');
}
window.exportStudentsReport = exportStudentsReport;
window.exportAttendance = exportAttendance;
window.exportFees = exportFees;
window.exportResults = exportResults;
window.exportTeachers = exportTeachers;
