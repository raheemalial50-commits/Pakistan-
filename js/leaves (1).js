document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('leaves', 'view')) return;
  seedDemoData();
  initLayout('leaves', 'Leave Management');
  document.getElementById('pageHeader').textContent = 'Leave Management';
  const data = SMS.getData('leaves');
  document.getElementById('pageBody').innerHTML = `<div class="table-responsive"><table class="table table-hover mb-0">
    <thead><tr><th>Applicant</th><th>Type</th><th>Leave Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${data.map(l => `<tr>
      <td>${l.applicantName}</td><td>${l.applicantType}</td><td>${l.leaveType}</td>
      <td>${formatDate(l.fromDate)}</td><td>${formatDate(l.toDate)}</td><td>${l.reason}</td>
      <td>${getStatusBadge(l.status)}</td>
      <td>${l.status==='Pending' && Auth.hasPermission('leaves','edit') ? `
        <button class="btn btn-sm btn-success" onclick="updateLeave('${l.id}','Approved')">Approve</button>
        <button class="btn btn-sm btn-danger" onclick="updateLeave('${l.id}','Rejected')">Reject</button>` : '-'}</td>
    </tr>`).join('')}</tbody></table></div>`;
});
function updateLeave(id, status) {
  SMS.updateData('leaves', id, { status, approvedBy: Auth.getCurrentUser()?.id });
  showToast('Leave ' + status.toLowerCase());
  location.reload();
}
window.updateLeave = updateLeave;
