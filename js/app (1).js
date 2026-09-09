/**
 * Shared App Utilities, UI Components, Sidebar, Toasts, Modals
 */

function showToast(message, type = 'success', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }
  const id = 'toast_' + Date.now();
  const bg = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : type === 'warning' ? 'bg-warning text-dark' : 'bg-info';
  const html = `
    <div id="${id}" class="toast align-items-center text-white ${bg} border-0" role="alert">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`;
  container.insertAdjacentHTML('beforeend', html);
  const toastEl = document.getElementById(id);
  const toast = new bootstrap.Toast(toastEl, { delay: duration });
  toast.show();
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

function confirmModal(title, message, onConfirm) {
  let modal = document.getElementById('confirmModal');
  if (!modal) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal fade" id="confirmModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmModalTitle">Confirm</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="confirmModalBody"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmModalBtn">Confirm</button>
            </div>
          </div>
        </div>
      </div>`);
    modal = document.getElementById('confirmModal');
  }
  document.getElementById('confirmModalTitle').textContent = title;
  document.getElementById('confirmModalBody').textContent = message;
  const btn = document.getElementById('confirmModalBtn');
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener('click', () => {
    bootstrap.Modal.getInstance(modal).hide();
    onConfirm();
  });
  new bootstrap.Modal(modal).show();
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-GB');
}

function formatCurrency(amount) {
  const settings = SMS.getSettings();
  return (settings.currency || 'PKR') + ' ' + Number(amount || 0).toLocaleString();
}

function getStatusBadge(status) {
  const map = {
    active: 'success', Active: 'success', Paid: 'success', Approved: 'success', Present: 'success',
    pending: 'warning', Pending: 'warning', Partial: 'warning', Leave: 'warning',
    inactive: 'secondary', Inactive: 'secondary', Rejected: 'danger', Absent: 'danger',
    upcoming: 'info', high: 'danger', medium: 'warning', low: 'secondary'
  };
  const color = map[status] || 'secondary';
  return `<span class="badge bg-${color}">${status}</span>`;
}

function renderSidebar(activePage = '') {
  const user = Auth.getCurrentUser();
  if (!user) return '';

  const menu = [
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard', href: 'dashboard.html', module: 'dashboard' },
    { id: 'students', icon: 'fa-user-graduate', label: 'Students', href: 'students.html', module: 'students',
      children: [
        { label: 'All Students', href: 'students.html' },
        { label: 'Add Student', href: 'students.html?action=add' },
        { label: 'Student Profile', href: 'student-profile.html' }
      ]
    },
    { id: 'teachers', icon: 'fa-chalkboard-teacher', label: 'Teachers', href: 'teachers.html', module: 'teachers' },
    { id: 'staff', icon: 'fa-users', label: 'Staff', href: 'staff.html', module: 'staff' },
    { id: 'parents', icon: 'fa-user-friends', label: 'Parents', href: 'parents.html', module: 'parents' },
    { id: 'classes', icon: 'fa-school', label: 'Classes & Sections', href: 'classes.html', module: 'classes' },
    { id: 'subjects', icon: 'fa-book', label: 'Subjects', href: 'subjects.html', module: 'subjects' },
    { id: 'attendance', icon: 'fa-calendar-check', label: 'Attendance', href: 'attendance.html', module: 'attendance' },
    { id: 'timetable', icon: 'fa-clock', label: 'Timetable', href: 'timetable.html', module: 'timetable' },
    { id: 'homework', icon: 'fa-tasks', label: 'Homework', href: 'homework.html', module: 'homework' },
    { id: 'exams', icon: 'fa-file-alt', label: 'Exams & Results', href: 'exams.html', module: 'exams',
      children: [
        { label: 'Exam Schedule', href: 'exams.html' },
        { label: 'Marks Entry', href: 'results.html' },
        { label: 'Report Cards', href: 'results.html?view=reportcards' }
      ]
    },
    { id: 'fees', icon: 'fa-money-bill-wave', label: 'Fees', href: 'fees.html', module: 'fees',
      children: [
        { label: 'Collect Fee', href: 'fees.html' },
        { label: 'Pending Fees', href: 'fees.html?view=pending' },
        { label: 'Payment History', href: 'fees.html?view=history' }
      ]
    },
    { id: 'admissions', icon: 'fa-user-plus', label: 'Admissions', href: 'admissions.html', module: 'admissions' },
    { id: 'leaves', icon: 'fa-calendar-minus', label: 'Leave Management', href: 'leaves.html', module: 'leaves' },
    { id: 'notices', icon: 'fa-bullhorn', label: 'Notices', href: 'notices.html', module: 'notices' },
    { id: 'notifications', icon: 'fa-bell', label: 'Notifications', href: 'notifications.html', module: 'dashboard' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports', href: 'reports.html', module: 'reports' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings', href: 'settings.html', module: 'settings' }
  ];

  let html = `
    <div class="sidebar-header">
      <div class="school-logo">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div class="school-info">
        <h6 class="mb-0">SMPS Qamber</h6>
        <small>Smart Modern Public School</small>
      </div>
    </div>
    <div class="sidebar-user">
      <div class="user-avatar"><i class="fas fa-user-circle"></i></div>
      <div>
        <div class="user-name">${user.name}</div>
        <div class="user-role">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <ul class="nav flex-column">`;

  menu.forEach(item => {
    if (!Auth.hasPermission(item.module, 'view')) return;
    const active = activePage === item.id ? 'active' : '';
    if (item.children) {
      html += `
        <li class="nav-item">
          <a class="nav-link ${active}" data-bs-toggle="collapse" href="#menu_${item.id}" role="button">
            <i class="fas ${item.icon}"></i> <span>${item.label}</span>
            <i class="fas fa-chevron-down ms-auto"></i>
          </a>
          <div class="collapse ${active ? 'show' : ''}" id="menu_${item.id}">
            <ul class="nav flex-column ms-3">
              ${item.children.map(c => `<li class="nav-item"><a class="nav-link" href="${c.href}">${c.label}</a></li>`).join('')}
            </ul>
          </div>
        </li>`;
    } else {
      html += `
        <li class="nav-item">
          <a class="nav-link ${active}" href="${item.href}">
            <i class="fas ${item.icon}"></i> <span>${item.label}</span>
          </a>
        </li>`;
    }
  });

  html += `
      </ul>
    </nav>
    <div class="sidebar-footer">
      <a href="#" onclick="Auth.logout(); return false;" class="nav-link text-danger">
        <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
      </a>
    </div>`;
  return html;
}

function renderTopbar(pageTitle = '') {
  const user = Auth.getCurrentUser();
  const notifications = SMS.getData('notifications').filter(n => !n.read);
  return `
    <div class="topbar d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <button class="btn btn-link sidebar-toggle d-lg-none me-2" id="sidebarToggle">
          <i class="fas fa-bars"></i>
        </button>
        <h4 class="page-title mb-0">${pageTitle}</h4>
      </div>
      <div class="topbar-right d-flex align-items-center gap-3">
        <div class="search-box d-none d-md-block">
          <input type="text" class="form-control form-control-sm" id="globalSearch" placeholder="Search students, teachers...">
        </div>
        <div class="dropdown">
          <a href="notifications.html" class="btn btn-link position-relative text-dark">
            <i class="fas fa-bell fa-lg"></i>
            ${notifications.length ? `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${notifications.length}</span>` : ''}
          </a>
        </div>
        <div class="dropdown">
          <a class="dropdown-toggle text-dark text-decoration-none d-flex align-items-center" href="#" data-bs-toggle="dropdown">
            <i class="fas fa-user-circle fa-lg me-1"></i>
            <span class="d-none d-md-inline">${user ? user.name.split(' ')[0] : ''}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="settings.html"><i class="fas fa-cog me-2"></i>Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="Auth.logout(); return false;"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>`;
}

function initLayout(activePage, pageTitle) {
  if (!Auth.requireAuth()) return;

  const sidebarEl = document.getElementById('sidebar');
  const topbarEl = document.getElementById('topbar');
  if (sidebarEl) sidebarEl.innerHTML = renderSidebar(activePage);
  if (topbarEl) topbarEl.innerHTML = renderTopbar(pageTitle);

  // Sidebar toggle for mobile
  const toggle = document.getElementById('sidebarToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
    });
  }

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 992 && document.body.classList.contains('sidebar-open')) {
      if (!e.target.closest('#sidebar') && !e.target.closest('#sidebarToggle')) {
        document.body.classList.remove('sidebar-open');
      }
    }
  });

  // Global search
  const searchInput = document.getElementById('globalSearch');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) {
          // Simple redirect to students with search for demo
          window.location.href = `students.html?search=${encodeURIComponent(q)}`;
        }
      }
    });
  }
}

function exportToCSV(data, filename) {
  if (!data || !data.length) {
    showToast('No data to export', 'warning');
    return;
  }
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => {
      const val = row[h] == null ? '' : String(row[h]);
      return `"${val.replace(/"/g, '""')}"`;
    }).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'export.csv';
  link.click();
}

function printPage() {
  window.print();
}

function addWhatsAppButton() {
  if (document.querySelector('.whatsapp-float')) return;
  const a = document.createElement('a');
  a.href = 'https://wa.me/923362506588?text=' + encodeURIComponent('Assalamualaikum! THE SMART MODERN PUBLIC SCHOOL QAMBER se rabta karna hai.');
  a.className = 'whatsapp-float';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.title = 'Chat on WhatsApp';
  a.setAttribute('aria-label', 'Chat on WhatsApp');
  a.innerHTML = '<i class="fab fa-whatsapp"></i>';
  document.body.appendChild(a);
}



// Initialize demo data on first load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof seedDemoData === 'function') {
    seedDemoData();
  }
});

window.showToast = showToast;
window.confirmModal = confirmModal;
window.formatDate = formatDate;
window.formatCurrency = formatCurrency;
window.getStatusBadge = getStatusBadge;
window.initLayout = initLayout;
window.exportToCSV = exportToCSV;
window.printPage = printPage;
window.addWhatsAppButton = addWhatsAppButton;
