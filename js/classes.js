document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('classes', 'view')) return;
  seedDemoData();
  initLayout('classes', 'Classes & Sections');
  document.getElementById('pageHeader').textContent = 'Classes & Sections';
  const classes = SMS.getData('classes');
  const sections = SMS.getData('sections');
  let html = '<div class="row g-3">';
  classes.forEach(c => {
    const secs = sections.filter(s => s.classId === c.id);
    html += `<div class="col-md-4"><div class="card h-100"><div class="card-header">${c.name}</div><div class="card-body">
      <ul class="list-group list-group-flush">`;
    secs.forEach(s => {
      const count = SMS.getData('students').filter(st => st.sectionId === s.id).length;
      html += `<li class="list-group-item d-flex justify-content-between"><span>Section ${s.name}</span><span class="badge bg-primary">${count} students</span></li>`;
    });
    html += `</ul></div></div></div>`;
  });
  html += '</div>';
  document.getElementById('pageBody').innerHTML = html;
});
