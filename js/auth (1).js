/**
 * Authentication & Role-Based Access Control
 * DEMO ONLY - Passwords are hashed simply for demo. Use proper hashing + backend in production.
 */

const ROLES = {
  admin: 'admin',
  principal: 'principal',
  teacher: 'teacher',
  accountant: 'accountant',
  staff: 'staff'
};

const PERMISSIONS = {
  dashboard: { admin: 'full', principal: 'full', teacher: 'limited', accountant: 'limited', staff: 'limited' },
  students: { admin: 'full', principal: 'full', teacher: 'assigned', accountant: 'view', staff: 'view' },
  teachers: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'limited' },
  staff: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'limited' },
  parents: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'view' },
  classes: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'view' },
  subjects: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'view' },
  attendance: { admin: 'full', principal: 'full', teacher: 'manage', accountant: 'view', staff: 'view' },
  timetable: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'view' },
  homework: { admin: 'full', principal: 'full', teacher: 'manage', accountant: 'view', staff: 'view' },
  exams: { admin: 'full', principal: 'full', teacher: 'manage', accountant: 'view', staff: 'view' },
  results: { admin: 'full', principal: 'full', teacher: 'manage', accountant: 'view', staff: 'view' },
  fees: { admin: 'full', principal: 'view', teacher: 'view', accountant: 'full', staff: 'limited' },
  admissions: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'view' },
  leaves: { admin: 'full', principal: 'full', teacher: 'manage', accountant: 'view', staff: 'manage' },
  notices: { admin: 'full', principal: 'full', teacher: 'view', accountant: 'view', staff: 'view' },
  reports: { admin: 'full', principal: 'full', teacher: 'limited', accountant: 'fee', staff: 'limited' },
  settings: { admin: 'full', principal: 'limited', teacher: 'none', accountant: 'none', staff: 'none' },
  users: { admin: 'full', principal: 'limited', teacher: 'none', accountant: 'none', staff: 'none' }
};

// Simple demo hash (NOT for production)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'demo_' + Math.abs(hash).toString(16);
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SMS.STORAGE_PREFIX + 'currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    // Never store password
    const safe = { ...user };
    delete safe.password;
    delete safe.passwordHash;
    localStorage.setItem(SMS.STORAGE_PREFIX + 'currentUser', JSON.stringify(safe));
  } else {
    localStorage.removeItem(SMS.STORAGE_PREFIX + 'currentUser');
  }
}

function login(username, password, remember = false) {
  const users = SMS.getData('users');
  const user = users.find(u => 
    (u.username === username || u.email === username) && u.status === 'active'
  );
  if (!user) return { success: false, message: 'Invalid username or password' };
  
  const hash = simpleHash(password);
  if (user.passwordHash !== hash) {
    return { success: false, message: 'Invalid username or password' };
  }

  setCurrentUser(user);
  if (remember) {
    localStorage.setItem(SMS.STORAGE_PREFIX + 'remember', 'true');
  }
  return { success: true, user };
}

function logout() {
  setCurrentUser(null);
  localStorage.removeItem(SMS.STORAGE_PREFIX + 'remember');
  window.location.href = 'login.html';
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function hasPermission(module, action = 'view') {
  const user = getCurrentUser();
  if (!user) return false;
  const role = user.role;
  const perm = PERMISSIONS[module];
  if (!perm) return role === 'admin';
  const level = perm[role] || 'none';
  if (level === 'full' || level === 'manage') return true;
  if (level === 'none') return false;
  if (action === 'view' && (level === 'view' || level === 'limited' || level === 'assigned' || level === 'fee')) return true;
  if (action === 'edit' || action === 'add' || action === 'delete') {
    return level === 'full' || level === 'manage';
  }
  return false;
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function requirePermission(module, action = 'view') {
  if (!requireAuth()) return false;
  if (!hasPermission(module, action)) {
    showToast('You do not have permission to access this module.', 'error');
    return false;
  }
  return true;
}

function getDemoAccounts() {
  return [
    { username: 'admin', password: 'admin123', role: 'Admin', name: 'System Administrator' },
    { username: 'principal', password: 'principal123', role: 'Principal', name: 'Mr. Ahmed Khan' },
    { username: 'teacher', password: 'teacher123', role: 'Teacher', name: 'Ms. Sara Ali' },
    { username: 'accountant', password: 'account123', role: 'Accountant', name: 'Mr. Bilal Ahmed' },
    { username: 'staff', password: 'staff123', role: 'Staff', name: 'Ms. Fatima Noor' }
  ];
}

window.Auth = {
  ROLES,
  PERMISSIONS,
  login,
  logout,
  isLoggedIn,
  getCurrentUser,
  setCurrentUser,
  hasPermission,
  requireAuth,
  requirePermission,
  getDemoAccounts,
  simpleHash
};
