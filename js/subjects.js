document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('subjects', 'view')) return;
  seedDemoData();
  initLayout('subjects', 'Subjects');
  document.getElementById('pageHeader').textContent = 'Subjects';
  const subjects = SMS.getData('subjects');
  let html = `<div class="table-responsive"><table class="table table-hover mb-0"><thead><tr><th>Code</th><th>Name</th><th>Class</th><th>Teacher</th><th>Max</th><th>Pass</th></tr></thead><tbody>`;
  subjects.forEach(s => {
    html += `<tr><td>${s.code}</td><td>${s.name}</td><td>${s.className}</td><td>${s.teacherName || '-'}</td><td>${s.maxMarks}</td><td>${s.passingMarks}</td></tr>`;
  });
  html += '</tbody></table></div>';
  document.getElementById('pageBody').innerHTML = html || '<div class="empty-state"><i class="fas fa-book"></i><h5>No subjects</h5></div>';
});
