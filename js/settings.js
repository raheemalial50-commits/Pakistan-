document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('settings', 'view')) return;
  seedDemoData();
  initLayout('settings', 'Settings');
  document.getElementById('pageHeader').textContent = 'School Settings';
  const s = SMS.getSettings();
  document.getElementById('pageBody').innerHTML = `
    <form id="settingsForm" class="row g-3">
      <div class="col-md-6"><label class="form-label">School Name</label><input class="form-control" id="sName" value="${s.schoolName || ''}"></div>
      <div class="col-md-6"><label class="form-label">Principal Name</label><input class="form-control" id="sPrincipal" value="${s.principalName || ''}"></div>
      <div class="col-md-6"><label class="form-label">Phone</label><input class="form-control" id="sPhone" value="${s.phone || ''}"></div>
      <div class="col-md-6"><label class="form-label">Email</label><input class="form-control" id="sEmail" value="${s.email || ''}"></div>
      <div class="col-12"><label class="form-label">Address</label><textarea class="form-control" id="sAddress" rows="2">${s.address || ''}</textarea></div>
      <div class="col-md-4"><label class="form-label">Academic Session</label><input class="form-control" id="sSession" value="${s.academicSession || ''}"></div>
      <div class="col-md-4"><label class="form-label">Currency</label><input class="form-control" id="sCurrency" value="${s.currency || 'PKR'}"></div>
      <div class="col-md-4"><label class="form-label">Passing %</label><input type="number" class="form-control" id="sPass" value="${s.passingPercentage || 40}"></div>
      <div class="col-12"><button type="submit" class="btn btn-primary">Save Settings</button>
        <button type="button" class="btn btn-outline-danger ms-2" onclick="if(confirm('Reset all demo data?')){SMS.clearAllData();location.reload()}">Reset Demo Data</button></div>
    </form>
    <hr class="my-4">
    <h6>Demo Accounts</h6>
    <p class="small text-muted">Use these on the login page. Passwords are demo-only and not real credentials.</p>
    <ul class="small">${Auth.getDemoAccounts().map(a => `<li><strong>${a.role}</strong>: ${a.username} / ${a.password}</li>`).join('')}</ul>`;
  document.getElementById('settingsForm').addEventListener('submit', e => {
    e.preventDefault();
    SMS.saveSettings({
      ...s,
      schoolName: document.getElementById('sName').value,
      principalName: document.getElementById('sPrincipal').value,
      phone: document.getElementById('sPhone').value,
      email: document.getElementById('sEmail').value,
      address: document.getElementById('sAddress').value,
      academicSession: document.getElementById('sSession').value,
      currency: document.getElementById('sCurrency').value,
      passingPercentage: Number(document.getElementById('sPass').value)
    });
    showToast('Settings saved');
  });
});
