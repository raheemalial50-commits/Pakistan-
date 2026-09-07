document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('timetable', 'view')) return;
  seedDemoData();
  initLayout('timetable', 'Timetable');
  document.getElementById('pageHeader').textContent = 'Class Timetable (Grade 5-A)';
  const tt = SMS.getData('timetable').filter(t => t.classId === 'cls_5' && t.sectionName === 'A');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [1, 2, 3, 4, 5, 6];
  let html = '<div class="table-responsive"><table class="table table-bordered table-sm text-center"><thead><tr><th>Period</th>';
  days.forEach(d => html += `<th>${d}</th>`);
  html += '</tr></thead><tbody>';
  periods.forEach(p => {
    const sample = tt.find(t => t.period === p);
    html += `<tr><td class="fw-semibold">${p}<br><small>${sample ? sample.startTime + '-' + sample.endTime : ''}</small></td>`;
    days.forEach(d => {
      const cell = tt.find(t => t.day === d && t.period === p);
      html += `<td>${cell ? `<div class="tt-subject">${cell.subjectName}</div><div class="tt-teacher">${cell.teacherName}</div>` : '-'}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  document.getElementById('pageBody').innerHTML = html;
});
