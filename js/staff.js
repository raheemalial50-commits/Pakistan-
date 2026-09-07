document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('staff', 'view')) return;
  seedDemoData();
  initLayout('staff', 'Staff');
  document.getElementById('pageHeader').textContent = 'Staff Management';
  const data = SMS.getData('staff');
  document.getElementById('pageBody').innerHTML = `<div class="table-responsive"><table class="table table-hover mb-0">
    <thead><tr><th>ID</th><th>Name</th><th>Position</th><th>Phone</th><th>Joining</th><th>Salary</th><th>Status</th></tr></thead>
    <tbody>${data.map(s => `<tr>
      <td>${s.employeeId}</td><td>${s.name}</td><td>${s.position}</td><td>${s.phone}</td>
      <td>${formatDate(s.joiningDate)}</td><td>${formatCurrency(s.salary)}</td><td>${getStatusBadge(s.status)}</td>
    </tr>`).join('')}</tbody></table></div>`;
});
