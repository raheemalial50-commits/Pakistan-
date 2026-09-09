document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('exams', 'view')) return;
  seedDemoData();
  initLayout('exams', 'Exams & Schedule');
  document.getElementById('pageHeader').textContent = 'Exam Schedule';
  const exams = SMS.getData('exams');
  const types = SMS.getData('examTypes');
  let html = `<div class="mb-3"><strong>Exam Types:</strong> ${types.map(t => t.name).join(', ')}</div>`;
  html += `<div class="table-responsive"><table class="table table-hover mb-0"><thead><tr><th>Exam</th><th>Class</th><th>Subject</th><th>Date</th><th>Time</th><th>Room</th><th>Status</th></tr></thead><tbody>`;
  exams.forEach(e => {
    html += `<tr><td>${e.examName}</td><td>${e.className}</td><td>${e.subjectName}</td><td>${formatDate(e.date)}</td><td>${e.startTime} - ${e.endTime}</td><td>${e.room}</td><td>${getStatusBadge(e.status)}</td></tr>`;
  });
  html += '</tbody></table></div>';
  document.getElementById('pageBody').innerHTML = html;
});
