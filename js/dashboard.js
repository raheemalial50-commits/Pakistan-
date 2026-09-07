document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  seedDemoData();
  initLayout('dashboard', 'Dashboard');

  const students = SMS.getData('students').filter(s => s.status === 'active');
  const teachers = SMS.getData('teachers').filter(t => t.status === 'active');
  const staff = SMS.getData('staff').filter(s => s.status === 'active');
  const classes = SMS.getData('classes');
  const today = new Date().toISOString().split('T')[0];
  const attendance = SMS.getData('attendance').filter(a => a.date === today);
  const present = attendance.filter(a => a.status === 'Present').length;
  const absent = attendance.filter(a => a.status === 'Absent').length;
  const leave = attendance.filter(a => a.status === 'Leave').length;
  const feePayments = SMS.getData('feePayments');
  const totalCollected = feePayments.reduce((s, p) => s + (p.paidAmount || 0), 0);
  const totalPending = feePayments.reduce((s, p) => s + (p.remainingAmount || 0), 0);
  const admissions = SMS.getData('admissions');
  const exams = SMS.getData('exams').filter(e => e.status === 'upcoming');
  const notices = SMS.getData('notices').slice(0, 5);

  const boys = students.filter(s => s.gender === 'Male').length;
  const girls = students.filter(s => s.gender === 'Female').length;

  // Stat cards
  const cards = [
    { icon: 'fa-user-graduate', color: '#1e40af', value: students.length, label: 'Total Students', change: '+5 this month', up: true },
    { icon: 'fa-chalkboard-teacher', color: '#059669', value: teachers.length, label: 'Total Teachers', change: 'Stable', up: true },
    { icon: 'fa-users', color: '#7c3aed', value: staff.length, label: 'Total Staff', change: '', up: true },
    { icon: 'fa-school', color: '#0891b2', value: classes.length, label: 'Total Classes', change: '', up: true },
    { icon: 'fa-calendar-check', color: '#10b981', value: present, label: "Today's Present", change: attendance.length ? Math.round(present / attendance.length * 100) + '%' : '0%', up: true },
    { icon: 'fa-user-times', color: '#ef4444', value: absent, label: "Today's Absent", change: '', up: false },
    { icon: 'fa-money-bill-wave', color: '#f59e0b', value: formatCurrency(totalCollected), label: 'Fee Collected', change: 'This month', up: true },
    { icon: 'fa-exclamation-circle', color: '#dc2626', value: formatCurrency(totalPending), label: 'Pending Fees', change: feePayments.filter(p => p.remainingAmount > 0).length + ' students', up: false }
  ];

  document.getElementById('statCards').innerHTML = cards.map(c => `
    <div class="col-6 col-md-4 col-xl-3">
      <div class="stat-card">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <div class="stat-value">${c.value}</div>
            <div class="stat-label">${c.label}</div>
            ${c.change ? `<div class="stat-change ${c.up ? 'up' : 'down'} mt-1">${c.change}</div>` : ''}
          </div>
          <div class="stat-icon" style="background:${c.color}"><i class="fas ${c.icon}"></i></div>
        </div>
      </div>
    </div>
  `).join('');

  // Charts
  new Chart(document.getElementById('genderChart'), {
    type: 'doughnut',
    data: {
      labels: ['Boys', 'Girls'],
      datasets: [{ data: [boys, girls], backgroundColor: ['#3b82f6', '#ec4899'], borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  new Chart(document.getElementById('attendanceChart'), {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent', 'Leave'],
      datasets: [{ data: [present, absent, leave], backgroundColor: ['#10b981', '#ef4444', '#f59e0b'], borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  const paidCount = feePayments.filter(p => p.status === 'Paid').length;
  const partialCount = feePayments.filter(p => p.status === 'Partial').length;
  const pendingCount = feePayments.filter(p => p.status === 'Pending').length;
  new Chart(document.getElementById('feeChart'), {
    type: 'doughnut',
    data: {
      labels: ['Paid', 'Partial', 'Pending'],
      datasets: [{ data: [paidCount, partialCount, pendingCount], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  // Notices
  document.getElementById('noticesList').innerHTML = notices.length ? notices.map(n => `
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div>
        <div class="fw-semibold">${n.title}</div>
        <small class="text-muted">${formatDate(n.date)} · ${n.audience}</small>
      </div>
      ${getStatusBadge(n.priority)}
    </li>
  `).join('') : '<li class="list-group-item text-muted text-center">No notices</li>';

  // Exams
  document.getElementById('examsList').innerHTML = exams.length ? exams.map(e => `
    <tr>
      <td>${e.examName}</td>
      <td>${e.className}</td>
      <td>${e.subjectName}</td>
      <td>${formatDate(e.date)}</td>
    </tr>
  `).join('') : '<tr><td colspan="4" class="text-center text-muted">No upcoming exams</td></tr>';
});
