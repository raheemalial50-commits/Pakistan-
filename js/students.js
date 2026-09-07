let currentPage = 1;
const perPage = 10;
let filteredStudents = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requirePermission('students', 'view')) return;
  seedDemoData();
  initLayout('students', 'Students');

  // Populate class filter & form
  const classes = SMS.getData('classes');
  const filterClass = document.getElementById('filterClass');
  const stuClass = document.getElementById('stuClass');
  classes.forEach(c => {
    filterClass.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    stuClass.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });

  stuClass.addEventListener('change', loadSections);
  document.getElementById('searchInput').addEventListener('input', () => { currentPage = 1; renderTable(); });
  filterClass.addEventListener('change', () => { currentPage = 1; renderTable(); });
  document.getElementById('filterStatus').addEventListener('change', () => { currentPage = 1; renderTable(); });

  document.getElementById('studentForm').addEventListener('submit', saveStudent);

  // URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'add') openStudentModal();
  if (params.get('search')) document.getElementById('searchInput').value = params.get('search');

  if (!Auth.hasPermission('students', 'add')) {
    document.getElementById('btnAddStudent')?.classList.add('d-none');
  }

  renderTable();
});

function loadSections() {
  const classId = document.getElementById('stuClass').value;
  const secSelect = document.getElementById('stuSection');
  secSelect.innerHTML = '<option value="">Select</option>';
  SMS.getData('sections').filter(s => s.classId === classId).forEach(s => {
    secSelect.innerHTML += `<option value="${s.id}">${s.name}</option>`;
  });
}

function getFiltered() {
  let data = SMS.getData('students');
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const classId = document.getElementById('filterClass').value;
  const status = document.getElementById('filterStatus').value;
  if (search) {
    data = data.filter(s =>
      s.name.toLowerCase().includes(search) ||
      s.admissionNo.toLowerCase().includes(search) ||
      (s.fatherName || '').toLowerCase().includes(search) ||
      String(s.rollNo).includes(search)
    );
  }
  if (classId) data = data.filter(s => s.classId === classId);
  if (status) data = data.filter(s => s.status === status);
  return data;
}

function renderTable() {
  filteredStudents = getFiltered();
  const total = filteredStudents.length;
  const start = (currentPage - 1) * perPage;
  const pageData = filteredStudents.slice(start, start + perPage);

  const tbody = document.getElementById('studentsTable');
  const empty = document.getElementById('emptyState');

  if (total === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('d-none');
  } else {
    empty.classList.add('d-none');
    tbody.innerHTML = pageData.map(s => `
      <tr>
        <td>${s.admissionNo}</td>
        <td>
          <a href="student-profile.html?id=${s.id}" class="text-decoration-none fw-semibold">${s.name}</a>
        </td>
        <td>${s.className || '-'}</td>
        <td>${s.sectionName || '-'}</td>
        <td>${s.rollNo || '-'}</td>
        <td>${s.gender}</td>
        <td>${s.phone || '-'}</td>
        <td>${getStatusBadge(s.status)}</td>
        <td class="no-print">
          <div class="btn-group btn-group-sm">
            <a href="student-profile.html?id=${s.id}" class="btn btn-outline-primary" title="View"><i class="fas fa-eye"></i></a>
            ${Auth.hasPermission('students', 'edit') ? `<button class="btn btn-outline-secondary" onclick="editStudent('${s.id}')" title="Edit"><i class="fas fa-edit"></i></button>` : ''}
            ${Auth.hasPermission('students', 'delete') ? `<button class="btn btn-outline-danger" onclick="deleteStudent('${s.id}')" title="Delete"><i class="fas fa-trash"></i></button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  document.getElementById('tableInfo').textContent = `Showing ${Math.min(start + 1, total)}-${Math.min(start + perPage, total)} of ${total} students`;
  renderPagination(total);
}

function renderPagination(total) {
  const pages = Math.ceil(total / perPage) || 1;
  const ul = document.getElementById('pagination');
  let html = '';
  html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="goPage(${currentPage - 1});return false;">Prev</a></li>`;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" onclick="goPage(${i});return false;">${i}</a></li>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
  }
  html += `<li class="page-item ${currentPage === pages ? 'disabled' : ''}"><a class="page-link" href="#" onclick="goPage(${currentPage + 1});return false;">Next</a></li>`;
  ul.innerHTML = html;
}

function goPage(p) {
  const pages = Math.ceil(filteredStudents.length / perPage) || 1;
  if (p < 1 || p > pages) return;
  currentPage = p;
  renderTable();
}

function openStudentModal(id = null) {
  if (!Auth.hasPermission('students', id ? 'edit' : 'add')) {
    showToast('Permission denied', 'error');
    return;
  }
  document.getElementById('studentForm').reset();
  document.getElementById('studentId').value = '';
  document.getElementById('studentModalTitle').textContent = id ? 'Edit Student' : 'Add Student';
  if (id) {
    const s = SMS.getById('students', id);
    if (!s) return;
    document.getElementById('studentId').value = s.id;
    document.getElementById('stuName').value = s.name || '';
    document.getElementById('stuAdmNo').value = s.admissionNo || '';
    document.getElementById('stuFather').value = s.fatherName || '';
    document.getElementById('stuMother').value = s.motherName || '';
    document.getElementById('stuDob').value = s.dob || '';
    document.getElementById('stuGender').value = s.gender || '';
    document.getElementById('stuBlood').value = s.bloodGroup || '';
    document.getElementById('stuClass').value = s.classId || '';
    loadSections();
    document.getElementById('stuSection').value = s.sectionId || '';
    document.getElementById('stuRoll').value = s.rollNo || '';
    document.getElementById('stuPhone').value = s.phone || '';
    document.getElementById('stuEmail').value = s.email || '';
    document.getElementById('stuAddress').value = s.address || '';
    document.getElementById('stuCity').value = s.city || '';
    document.getElementById('stuAdmDate').value = s.admissionDate || '';
    document.getElementById('stuPrevSchool').value = s.previousSchool || '';
    document.getElementById('stuEmergency').value = s.emergencyContact || '';
    document.getElementById('stuStatus').value = s.status || 'active';
  } else {
    document.getElementById('stuAdmDate').value = new Date().toISOString().split('T')[0];
    const count = SMS.getData('students').length;
    document.getElementById('stuAdmNo').value = `ADM-2025-${1001 + count}`;
  }
  new bootstrap.Modal(document.getElementById('studentModal')).show();
}

function editStudent(id) { openStudentModal(id); }

function saveStudent(e) {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const classId = document.getElementById('stuClass').value;
  const sectionId = document.getElementById('stuSection').value;
  const cls = SMS.getById('classes', classId);
  const sec = SMS.getById('sections', sectionId);

  const data = {
    name: document.getElementById('stuName').value.trim(),
    admissionNo: document.getElementById('stuAdmNo').value.trim(),
    fatherName: document.getElementById('stuFather').value.trim(),
    motherName: document.getElementById('stuMother').value.trim(),
    dob: document.getElementById('stuDob').value,
    gender: document.getElementById('stuGender').value,
    bloodGroup: document.getElementById('stuBlood').value,
    classId, className: cls ? cls.name : '',
    sectionId, sectionName: sec ? sec.name : '',
    rollNo: document.getElementById('stuRoll').value,
    phone: document.getElementById('stuPhone').value.trim(),
    email: document.getElementById('stuEmail').value.trim(),
    address: document.getElementById('stuAddress').value.trim(),
    city: document.getElementById('stuCity').value.trim(),
    admissionDate: document.getElementById('stuAdmDate').value,
    previousSchool: document.getElementById('stuPrevSchool').value.trim(),
    emergencyContact: document.getElementById('stuEmergency').value.trim(),
    status: document.getElementById('stuStatus').value
  };

  // Duplicate check
  const existing = SMS.getData('students').find(s => s.admissionNo === data.admissionNo && s.id !== id);
  if (existing) {
    showToast('Admission number already exists', 'error');
    return;
  }

  if (id) {
    SMS.updateData('students', id, data);
    showToast('Student updated successfully');
  } else {
    SMS.addData('students', data);
    showToast('Student added successfully');
  }
  bootstrap.Modal.getInstance(document.getElementById('studentModal')).hide();
  renderTable();
}

function deleteStudent(id) {
  if (!Auth.hasPermission('students', 'delete')) return;
  confirmModal('Delete Student', 'Are you sure you want to delete this student? This action cannot be undone.', () => {
    SMS.deleteData('students', id);
    showToast('Student deleted');
    renderTable();
  });
}

function exportStudents() {
  const data = getFiltered().map(s => ({
    'Admission No': s.admissionNo,
    Name: s.name,
    Father: s.fatherName,
    Class: s.className,
    Section: s.sectionName,
    Roll: s.rollNo,
    Gender: s.gender,
    Phone: s.phone,
    Status: s.status
  }));
  exportToCSV(data, 'students_export.csv');
}

window.openStudentModal = openStudentModal;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.exportStudents = exportStudents;
window.goPage = goPage;
