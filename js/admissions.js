document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('admissions', 'view')) return;
  seedDemoData();
  initLayout('admissions', 'Admissions');
  document.getElementById('pageHeader').textContent = 'Admission Applications';
  const data = SMS.getData('admissions');
  document.getElementById('pageBody').innerHTML = `<div class="table-responsive"><table class="table table-hover mb-0">
    <thead><tr><th>App No</th><th>Student</th><th>Father</th><th>Class</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${data.map(a => `<tr>
      <td>${a.applicationNo}</td><td>${a.studentName}</td><td>${a.fatherName}</td>
      <td>${a.applyingClass}</td><td>${formatDate(a.applicationDate)}</td><td>${getStatusBadge(a.status)}</td>
      <td>${a.status==='Pending' && Auth.hasPermission('admissions','edit') ? `
        <button class="btn btn-sm btn-success" onclick="updateAdm('${a.id}','Approved')">Approve</button>
        <button class="btn btn-sm btn-danger" onclick="updateAdm('${a.id}','Rejected')">Reject</button>` : '-'}</td>
    </tr>`).join('')}</tbody></table></div>`;
});
function updateAdm(id, status) {
  SMS.updateData('admissions', id, { status });
  showToast('Application ' + status.toLowerCase());
  location.reload();
}
window.updateAdm = updateAdm;
