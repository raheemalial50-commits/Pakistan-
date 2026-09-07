document.addEventListener('DOMContentLoaded', () => {
  seedDemoData();
  initLayout('notifications', 'Notifications');
  document.getElementById('pageHeader').textContent = 'Notification Center';
  const data = SMS.getData('notifications');
  document.getElementById('pageBody').innerHTML = data.length ? `<div class="list-group">` + data.map(n => `
    <div class="list-group-item ${n.read ? '' : 'list-group-item-primary'}">
      <div class="d-flex justify-content-between">
        <h6 class="mb-1">${n.title}</h6>
        <small>${formatDate(n.date)}</small>
      </div>
      <p class="mb-0 small">${n.message}</p>
    </div>`).join('') + '</div>' : '<div class="empty-state"><i class="fas fa-bell"></i><h5>No notifications</h5></div>';
  // Mark all read
  const updated = data.map(n => ({ ...n, read: true }));
  SMS.saveData('notifications', updated);
});
