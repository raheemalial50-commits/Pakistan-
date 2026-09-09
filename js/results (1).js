document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('results', 'view') && !Auth.requirePermission('exams', 'view')) return;
  seedDemoData();
  initLayout('exams', 'Results & Report Cards');
  document.getElementById('pageHeader').textContent = 'Marks & Results';
  const results = SMS.getData('results');
  let html = `<div class="table-responsive"><table class="table table-hover mb-0"><thead><tr><th>Student</th><th>Exam</th><th>Subject</th><th>Marks</th><th>%</th><th>Grade</th><th>Remarks</th></tr></thead><tbody>`;
  results.forEach(r => {
    html += `<tr><td>${r.studentName}</td><td>${r.examName}</td><td>${r.subjectName}</td><td>${r.obtainedMarks}/${r.totalMarks}</td><td>${r.percentage}%</td><td><span class="badge bg-${r.grade==='F'?'danger':'success'}">${r.grade}</span></td><td>${r.remarks}</td></tr>`;
  });
  html += '</tbody></table></div>';
  if (Auth.hasPermission('exams', 'manage') || Auth.hasPermission('results', 'edit')) {
    document.getElementById('pageActions').innerHTML = '<button class="btn btn-sm btn-primary" onclick="addMarks()"><i class="fas fa-plus"></i> Enter Marks</button>';
  }
  document.getElementById('pageBody').innerHTML = html || '<div class="empty-state"><i class="fas fa-file-alt"></i><h5>No results yet</h5></div>';
});
function addMarks() {
  const students = SMS.getData('students').filter(s => s.status === 'active');
  const name = prompt('Student name (exact):');
  const student = students.find(s => s.name.toLowerCase() === (name||'').toLowerCase());
  if (!student) { showToast('Student not found', 'error'); return; }
  const subject = prompt('Subject:') || 'Mathematics';
  const obtained = Number(prompt('Obtained marks:') || 0);
  const total = 100;
  const percentage = Math.round(obtained / total * 100);
  const grade = SMS.calculateGrade(percentage);
  SMS.addData('results', {
    studentId: student.id, studentName: student.name, examName: 'Manual Entry',
    subjectName: subject, totalMarks: total, obtainedMarks: obtained,
    percentage, grade, remarks: percentage >= 40 ? 'Pass' : 'Fail',
    className: student.className, sectionName: student.sectionName
  });
  showToast('Marks saved');
  location.reload();
}
window.addMarks = addMarks;
