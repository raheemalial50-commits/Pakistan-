document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('homework', 'view')) return;
  seedDemoData();
  initLayout('homework', 'Homework');
  document.getElementById('pageHeader').textContent = 'Homework';
  if (Auth.hasPermission('homework', 'manage') || Auth.hasPermission('homework', 'edit')) {
    document.getElementById('pageActions').innerHTML = '<button class="btn btn-sm btn-primary" onclick="addHW()"><i class="fas fa-plus"></i> Add Homework</button>';
  }
  const hw = SMS.getData('homework');
  document.getElementById('pageBody').innerHTML = hw.length ? `<div class="list-group">` + hw.map(h => `
    <div class="list-group-item">
      <div class="d-flex justify-content-between"><h6 class="mb-1">${h.title}</h6><span class="badge bg-info">${h.subjectName}</span></div>
      <p class="mb-1 small">${h.description}</p>
      <small class="text-muted">${h.className} ${h.sectionName || ''} · Due: ${formatDate(h.dueDate)} · By ${h.teacherName}</small>
    </div>`).join('') + '</div>' : '<div class="empty-state"><i class="fas fa-tasks"></i><h5>No homework</h5></div>';
});
function addHW() {
  const title = prompt('Title:');
  if (!title) return;
  SMS.addData('homework', {
    title, description: prompt('Description:') || '', subjectName: prompt('Subject:') || 'General',
    className: prompt('Class:') || 'Grade 5', sectionName: 'A',
    teacherName: Auth.getCurrentUser()?.name || 'Teacher',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: prompt('Due date (YYYY-MM-DD):') || '', status: 'active'
  });
  showToast('Homework added');
  location.reload();
}
window.addHW = addHW;
