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

  // Common chart options
  const chartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16, usePointStyle: true, pointStyle: 'circle', font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 8
      }
    }
  };

  // 1. Gender Chart - Doughnut with percentage labels
  const genderTotal = boys + girls || 1;
  new Chart(document.getElementById('genderChart'), {
    type: 'doughnut',
    data: {
      labels: [`Boys (${boys})`, `Girls (${girls})`],
      datasets: [{
        data: [boys || 0.001, girls || 0.001],
        backgroundColor: ['#3b82f6', '#ec4899'],
        borderWidth: 3,
        borderColor: '#fff',
        hoverOffset: 8
      }]
    },
    options: {
      ...chartOpts,
      cutout: '65%',
      plugins: {
        ...chartOpts.plugins,
        tooltip: {
          ...chartOpts.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              const val = Math.round(ctx.raw);
              const pct = Math.round((val / genderTotal) * 100);
              return ` ${ctx.label}: ${val} (${pct}%)`;
            }
          }
        }
      }
    }
  });

  // 2. Attendance Chart - Horizontal Bar (clearer pattern)
  new Chart(document.getElementById('attendanceChart'), {
    type: 'bar',
    data: {
      labels: ['Present', 'Absent', 'Leave'],
      datasets: [{
        label: 'Students',
        data: [present, absent, leave],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 28
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f172a',
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: '#f1f5f9' }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });

  // 3. Fee Chart - Doughnut with better style
  const paidCount = feePayments.filter(p => p.status === 'Paid').length;
  const partialCount = feePayments.filter(p => p.status === 'Partial').length;
  const pendingCount = feePayments.filter(p => p.status === 'Pending').length;
  const feeTotal = paidCount + partialCount + pendingCount || 1;

  new Chart(document.getElementById('feeChart'), {
    type: 'doughnut',
    data: {
      labels: [`Paid (${paidCount})`, `Partial (${partialCount})`, `Pending (${pendingCount})`],
      datasets: [{
        data: [paidCount || 0.001, partialCount || 0.001, pendingCount || 0.001],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 3,
        borderColor: '#fff',
        hoverOffset: 8
      }]
    },
    options: {
      ...chartOpts,
      cutout: '60%',
      plugins: {
        ...chartOpts.plugins,
        tooltip: {
          ...chartOpts.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              const val = Math.round(ctx.raw);
              const pct = Math.round((val / feeTotal) * 100);
              return ` ${ctx.label}: ${pct}%`;
            }
          }
        }
      }
    }
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
