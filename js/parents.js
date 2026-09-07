document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('parents', 'view')) return;
  seedDemoData();
  initLayout('parents', 'Parents');
  document.getElementById('pageHeader').textContent = 'Parents';
  const data = SMS.getData('parents');
  document.getElementById('pageBody').innerHTML = `<div class="table-responsive"><table class="table table-hover mb-0">
    <thead><tr><th>Father</th><th>Mother</th><th>Phone</th><th>Occupation</th><th>Children</th></tr></thead>
    <tbody>${data.map(p => `<tr>
      <td>${p.fatherName}</td><td>${p.motherName}</td><td>${p.phone}</td><td>${p.occupation}</td>
      <td>${(p.children||[]).length}</td>
    </tr>`).join('')}</tbody></table></div>`;
});
