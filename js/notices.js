document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('notices', 'view')) return;
  seedDemoData();
  initLayout('notices', 'Notices & Announcements');
  document.getElementById('pageHeader').textContent = 'Notices & Announcements';
  if (Auth.hasPermission('notices', 'edit')) {
    document.getElementById('pageActions').innerHTML = '<button class="btn btn-sm btn-primary" onclick="addNotice()"><i class="fas fa-plus"></i> Add Notice</button>';
  }
  renderNotices();
});
function renderNotices() {
  const notices = SMS.getData('notices');
  document.getElementById('pageBody').innerHTML = notices.length ? `<div class="list-group list-group-flush">` + notices.map(n => `
    <div class="list-group-item">
      <div class="d-flex justify-content-between"><h6 class="mb-1">${n.title}</h6>${getStatusBadge(n.priority)}</div>
      <p class="mb-1 small">${n.description}</p>
      <small class="text-muted">${formatDate(n.date)} · Audience: ${n.audience}</small>
    </div>`).join('') + '</div>' : '<div class="empty-state"><i class="fas fa-bullhorn"></i><h5>No notices</h5></div>';
}
function addNotice() {
  const title = prompt('Notice Title:');
  if (!title) return;
  const description = prompt('Description:') || '';
  SMS.addData('notices', { title, description, date: new Date().toISOString().split('T')[0], audience: 'Everyone', priority: 'medium', status: 'active' });
  showToast('Notice added');
  renderNotices();
}
window.addNotice = addNotice;
