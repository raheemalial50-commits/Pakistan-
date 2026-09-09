/**
 * School Management System - LocalStorage Data Layer
 * DEMO ONLY - Designed for easy migration to Firebase/Supabase/MySQL
 */

const STORAGE_PREFIX = 'smps_qamber_';

const COLLECTIONS = {
  students: 'students',
  teachers: 'teachers',
  staff: 'staff',
  parents: 'parents',
  classes: 'classes',
  sections: 'sections',
  subjects: 'subjects',
  attendance: 'attendance',
  teacherAttendance: 'teacherAttendance',
  timetable: 'timetable',
  homework: 'homework',
  exams: 'exams',
  examTypes: 'examTypes',
  results: 'results',
  feeStructure: 'feeStructure',
  feePayments: 'feePayments',
  admissions: 'admissions',
  leaves: 'leaves',
  notices: 'notices',
  notifications: 'notifications',
  users: 'users',
  settings: 'settings',
  sessions: 'sessions'
};

function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getData(collection) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + collection);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getData error:', e);
    return [];
  }
}

function saveData(collection, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + collection, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('saveData error:', e);
    return false;
  }
}

function getById(collection, id) {
  const data = getData(collection);
  return data.find(item => item.id === id) || null;
}

function addData(collection, item) {
  const data = getData(collection);
  if (!item.id) item.id = generateId(collection.slice(0, 3));
  item.createdAt = new Date().toISOString();
  item.updatedAt = item.createdAt;
  data.push(item);
  saveData(collection, data);
  return item;
}

function updateData(collection, id, updates) {
  const data = getData(collection);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
  saveData(collection, data);
  return data[index];
}

function deleteData(collection, id) {
  let data = getData(collection);
  const initialLength = data.length;
  data = data.filter(item => item.id !== id);
  saveData(collection, data);
  return data.length < initialLength;
}

function queryData(collection, filters = {}) {
  let data = getData(collection);
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      data = data.filter(item => {
        const val = item[key];
        if (typeof filters[key] === 'string') {
          return String(val).toLowerCase().includes(String(filters[key]).toLowerCase());
        }
        return val === filters[key];
      });
    }
  });
  return data;
}

function searchData(collection, searchTerm, fields = []) {
  if (!searchTerm) return getData(collection);
  const term = searchTerm.toLowerCase();
  const data = getData(collection);
  return data.filter(item => {
    if (fields.length === 0) {
      return Object.values(item).some(v => String(v).toLowerCase().includes(term));
    }
    return fields.some(f => String(item[f] || '').toLowerCase().includes(term));
  });
}

function getSettings() {
  const data = getData('settings');
  return data.length > 0 ? data[0] : getDefaultSettings();
}

function saveSettings(settings) {
  const data = getData('settings');
  if (data.length === 0) {
    addData('settings', settings);
  } else {
    updateData('settings', data[0].id, settings);
  }
}

function getDefaultSettings() {
  return {
    id: 'settings_main',
    schoolName: 'THE SMART MODERN PUBLIC SCHOOL QAMBER',
    schoolShortName: 'SMPS Qamber',
    address: 'Qamber, Sindh, Pakistan',
    phone: '+92 300 1234567',
    email: 'info@smpsqamber.edu.pk',
    website: 'www.smpsqamber.edu.pk',
    principalName: 'Mr. Ahmed Khan',
    registrationNumber: 'SINDH-EDU-2020-0456',
    logo: '',
    academicSession: '2025-2026',
    currency: 'PKR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    passingPercentage: 40,
    grades: [
      { grade: 'A+', min: 90, max: 100 },
      { grade: 'A', min: 80, max: 89 },
      { grade: 'B', min: 70, max: 79 },
      { grade: 'C', min: 60, max: 69 },
      { grade: 'D', min: 50, max: 59 },
      { grade: 'F', min: 0, max: 49 }
    ]
  };
}

function calculateGrade(percentage) {
  const settings = getSettings();
  const grades = settings.grades || getDefaultSettings().grades;
  for (const g of grades) {
    if (percentage >= g.min && percentage <= g.max) return g.grade;
  }
  return 'F';
}

function isInitialized() {
  return localStorage.getItem(STORAGE_PREFIX + 'initialized') === 'true';
}

function markInitialized() {
  localStorage.setItem(STORAGE_PREFIX + 'initialized', 'true');
}

function clearAllData() {
  Object.values(COLLECTIONS).forEach(c => localStorage.removeItem(STORAGE_PREFIX + c));
  localStorage.removeItem(STORAGE_PREFIX + 'initialized');
  localStorage.removeItem(STORAGE_PREFIX + 'currentUser');
}

window.SMS = {
  generateId,
  getData,
  saveData,
  getById,
  addData,
  updateData,
  deleteData,
  queryData,
  searchData,
  getSettings,
  saveSettings,
  getDefaultSettings,
  calculateGrade,
  isInitialized,
  markInitialized,
  clearAllData,
  COLLECTIONS,
  STORAGE_PREFIX
};
