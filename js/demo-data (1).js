/**
 * Realistic Demo Data for THE SMART MODERN PUBLIC SCHOOL QAMBER
 * Clearly marked as DEMO data.
 */

function seedDemoData() {
  if (SMS.isInitialized()) return;

  // Settings
  SMS.saveSettings(SMS.getDefaultSettings());

  // Users (demo credentials)
  const users = [
    { id: 'usr_admin', username: 'admin', email: 'admin@smpsqamber.edu.pk', passwordHash: Auth.simpleHash('admin123'), role: 'admin', name: 'System Administrator', status: 'active', phone: '03001234501' },
    { id: 'usr_prin', username: 'principal', email: 'principal@smpsqamber.edu.pk', passwordHash: Auth.simpleHash('principal123'), role: 'principal', name: 'Mr. Ahmed Khan', status: 'active', phone: '03001234502' },
    { id: 'usr_teach', username: 'teacher', email: 'sara.ali@smpsqamber.edu.pk', passwordHash: Auth.simpleHash('teacher123'), role: 'teacher', name: 'Ms. Sara Ali', status: 'active', phone: '03001234503', teacherId: 'tch_001' },
    { id: 'usr_acc', username: 'accountant', email: 'bilal@smpsqamber.edu.pk', passwordHash: Auth.simpleHash('account123'), role: 'accountant', name: 'Mr. Bilal Ahmed', status: 'active', phone: '03001234504' },
    { id: 'usr_staff', username: 'staff', email: 'fatima@smpsqamber.edu.pk', passwordHash: Auth.simpleHash('staff123'), role: 'staff', name: 'Ms. Fatima Noor', status: 'active', phone: '03001234505' }
  ];
  SMS.saveData('users', users);

  // Classes
  const classes = [
    { id: 'cls_1', name: 'Grade 1', level: 1, status: 'active' },
    { id: 'cls_2', name: 'Grade 2', level: 2, status: 'active' },
    { id: 'cls_3', name: 'Grade 3', level: 3, status: 'active' },
    { id: 'cls_4', name: 'Grade 4', level: 4, status: 'active' },
    { id: 'cls_5', name: 'Grade 5', level: 5, status: 'active' },
    { id: 'cls_6', name: 'Grade 6', level: 6, status: 'active' }
  ];
  SMS.saveData('classes', classes);

  // Sections
  const sections = [];
  classes.forEach(c => {
    ['A', 'B', 'C'].forEach(s => {
      sections.push({
        id: `sec_${c.level}_${s}`,
        classId: c.id,
        className: c.name,
        name: s,
        capacity: 40,
        classTeacherId: null,
        status: 'active'
      });
    });
  });
  SMS.saveData('sections', sections);

  // Teachers
  const teacherNames = [
    { name: 'Ms. Sara Ali', gender: 'Female', subjects: ['English'], classes: ['Grade 1', 'Grade 2'] },
    { name: 'Mr. Imran Shah', gender: 'Male', subjects: ['Mathematics'], classes: ['Grade 3', 'Grade 4'] },
    { name: 'Ms. Ayesha Malik', gender: 'Female', subjects: ['Science'], classes: ['Grade 5', 'Grade 6'] },
    { name: 'Mr. Usman Raza', gender: 'Male', subjects: ['Urdu'], classes: ['Grade 1', 'Grade 2'] },
    { name: 'Ms. Hina Batool', gender: 'Female', subjects: ['Islamiyat'], classes: ['Grade 3', 'Grade 4'] },
    { name: 'Mr. Kamran Ali', gender: 'Male', subjects: ['Computer'], classes: ['Grade 5', 'Grade 6'] },
    { name: 'Ms. Nadia Khan', gender: 'Female', subjects: ['Social Studies'], classes: ['Grade 4', 'Grade 5'] },
    { name: 'Mr. Farhan Ahmed', gender: 'Male', subjects: ['Physical Education'], classes: ['Grade 1', 'Grade 6'] },
    { name: 'Ms. Rabia Noor', gender: 'Female', subjects: ['Art'], classes: ['Grade 2', 'Grade 3'] },
    { name: 'Mr. Shahid Hussain', gender: 'Male', subjects: ['Mathematics', 'Science'], classes: ['Grade 6'] }
  ];
  const teachers = teacherNames.map((t, i) => ({
    id: `tch_${String(i + 1).padStart(3, '0')}`,
    employeeId: `EMP-T-${1001 + i}`,
    name: t.name,
    fatherName: 'Guardian Name',
    gender: t.gender,
    dob: `198${i % 9}-0${(i % 9) + 1}-15`,
    cnic: `42101-${1000000 + i}-${i % 9}`,
    phone: `0300${1000000 + i}`,
    email: t.name.toLowerCase().replace(/[^a-z]/g, '.') + '@smpsqamber.edu.pk',
    address: 'Qamber, Sindh',
    qualification: i % 2 === 0 ? 'M.Ed' : 'B.Ed',
    experience: 3 + (i % 10),
    joiningDate: `201${i % 9}-0${(i % 8) + 1}-01`,
    designation: i === 0 ? 'Senior Teacher' : 'Teacher',
    assignedSubjects: t.subjects,
    assignedClasses: t.classes,
    salary: 45000 + (i * 2000),
    status: 'active',
    photo: ''
  }));
  SMS.saveData('teachers', teachers);
  // Link class teachers
  sections[0].classTeacherId = teachers[0].id;
  sections[3].classTeacherId = teachers[1].id;
  SMS.saveData('sections', sections);

  // Staff
  const staff = [
    { id: 'stf_001', employeeId: 'EMP-S-2001', name: 'Mr. Bilal Ahmed', position: 'Accountant', phone: '03011234501', email: 'bilal@smpsqamber.edu.pk', joiningDate: '2019-03-01', salary: 50000, status: 'active' },
    { id: 'stf_002', employeeId: 'EMP-S-2002', name: 'Ms. Fatima Noor', position: 'Clerk', phone: '03011234502', email: 'fatima@smpsqamber.edu.pk', joiningDate: '2020-06-15', salary: 35000, status: 'active' },
    { id: 'stf_003', employeeId: 'EMP-S-2003', name: 'Mr. Asif Raza', position: 'Librarian', phone: '03011234503', email: 'asif@smpsqamber.edu.pk', joiningDate: '2018-09-01', salary: 38000, status: 'active' },
    { id: 'stf_004', employeeId: 'EMP-S-2004', name: 'Ms. Sana Iqbal', position: 'Receptionist', phone: '03011234504', email: 'sana@smpsqamber.edu.pk', joiningDate: '2021-01-10', salary: 32000, status: 'active' },
    { id: 'stf_005', employeeId: 'EMP-S-2005', name: 'Mr. Ghulam Hussain', position: 'Security', phone: '03011234505', email: '', joiningDate: '2017-05-01', salary: 28000, status: 'active' }
  ];
  SMS.saveData('staff', staff);

  // Parents
  const parents = [];
  for (let i = 1; i <= 12; i++) {
    parents.push({
      id: `par_${String(i).padStart(3, '0')}`,
      fatherName: `Mr. Parent Father ${i}`,
      motherName: `Mrs. Parent Mother ${i}`,
      phone: `0302${1000000 + i}`,
      email: `parent${i}@email.com`,
      address: `House ${i}, Street ${i}, Qamber`,
      occupation: i % 2 === 0 ? 'Business' : 'Government Employee',
      children: []
    });
  }
  SMS.saveData('parents', parents);

  // Students (20+)
  const firstNames = ['Ali', 'Ahmed', 'Hassan', 'Hussain', 'Fatima', 'Ayesha', 'Zainab', 'Maryam', 'Omar', 'Yusuf', 'Amina', 'Sara', 'Bilal', 'Hamza', 'Noor', 'Hina', 'Usman', 'Rabia', 'Farhan', 'Sana', 'Imran', 'Nadia'];
  const students = [];
  let roll = 1;
  classes.forEach((cls, ci) => {
    const secs = sections.filter(s => s.classId === cls.id);
    secs.forEach((sec, si) => {
      for (let k = 0; k < 2; k++) {
        const idx = students.length;
        if (idx >= 22) break;
        const gender = idx % 2 === 0 ? 'Male' : 'Female';
        const name = firstNames[idx % firstNames.length] + ' ' + (gender === 'Male' ? 'Khan' : 'Bibi');
        const parent = parents[idx % parents.length];
        const student = {
          id: `stu_${String(idx + 1).padStart(3, '0')}`,
          admissionNo: `ADM-2025-${1001 + idx}`,
          name: name,
          fatherName: parent.fatherName,
          motherName: parent.motherName,
          dob: `201${ci + 2}-0${(idx % 9) + 1}-1${idx % 9}`,
          gender: gender,
          classId: cls.id,
          className: cls.name,
          sectionId: sec.id,
          sectionName: sec.name,
          rollNo: roll++,
          phone: parent.phone,
          email: `student${idx + 1}@smpsqamber.edu.pk`,
          address: parent.address,
          city: 'Qamber',
          admissionDate: '2025-04-01',
          previousSchool: idx % 3 === 0 ? 'Previous Primary School' : '',
          bloodGroup: ['A+', 'B+', 'O+', 'AB+'][idx % 4],
          emergencyContact: parent.phone,
          parentId: parent.id,
          status: 'active',
          photo: ''
        };
        students.push(student);
        if (!parent.children.includes(student.id)) parent.children.push(student.id);
      }
    });
  });
  SMS.saveData('students', students);
  SMS.saveData('parents', parents);

  // Subjects
  const subjectList = [
    { name: 'English', code: 'ENG' },
    { name: 'Urdu', code: 'URD' },
    { name: 'Mathematics', code: 'MATH' },
    { name: 'Science', code: 'SCI' },
    { name: 'Social Studies', code: 'SST' },
    { name: 'Islamiyat', code: 'ISL' },
    { name: 'Computer', code: 'COMP' },
    { name: 'Art', code: 'ART' },
    { name: 'Physical Education', code: 'PE' }
  ];
  const subjects = [];
  classes.forEach(cls => {
    subjectList.forEach((sub, i) => {
      subjects.push({
        id: `sub_${cls.level}_${sub.code}`,
        name: sub.name,
        code: sub.code,
        classId: cls.id,
        className: cls.name,
        teacherId: teachers[i % teachers.length].id,
        teacherName: teachers[i % teachers.length].name,
        maxMarks: 100,
        passingMarks: 40,
        status: 'active'
      });
    });
  });
  SMS.saveData('subjects', subjects);

  // Fee Structure
  const feeStructure = classes.map(cls => ({
    id: `fee_${cls.id}`,
    classId: cls.id,
    className: cls.name,
    admissionFee: 5000,
    tuitionFee: 3000 + (cls.level * 200),
    examFee: 1000,
    computerFee: 500,
    transportFee: 1500,
    otherFee: 300,
    discount: 0
  }));
  SMS.saveData('feeStructure', feeStructure);

  // Fee Payments (some paid, some pending)
  const feePayments = [];
  students.forEach((stu, i) => {
    const fs = feeStructure.find(f => f.classId === stu.classId);
    const total = (fs.tuitionFee + fs.examFee + fs.computerFee);
    const paid = i % 3 === 0 ? total : (i % 3 === 1 ? total * 0.5 : 0);
    feePayments.push({
      id: `pay_${stu.id}_sep`,
      studentId: stu.id,
      studentName: stu.name,
      admissionNo: stu.admissionNo,
      className: stu.className,
      sectionName: stu.sectionName,
      invoiceNo: `INV-2025-${2000 + i}`,
      month: 'September 2025',
      feeType: 'Monthly Tuition',
      amount: total,
      discount: 0,
      paidAmount: paid,
      remainingAmount: total - paid,
      paymentMethod: paid > 0 ? (i % 2 === 0 ? 'Cash' : 'Bank Transfer') : '',
      paymentDate: paid > 0 ? '2025-09-05' : '',
      status: paid >= total ? 'Paid' : (paid > 0 ? 'Partial' : 'Pending'),
      dueDate: '2025-09-10'
    });
  });
  SMS.saveData('feePayments', feePayments);

  // Attendance (today + some history)
  const today = new Date().toISOString().split('T')[0];
  const attendance = [];
  students.forEach((stu, i) => {
    const status = i % 10 === 0 ? 'Absent' : (i % 15 === 0 ? 'Leave' : 'Present');
    attendance.push({
      id: `att_${stu.id}_${today}`,
      studentId: stu.id,
      studentName: stu.name,
      classId: stu.classId,
      className: stu.className,
      sectionId: stu.sectionId,
      sectionName: stu.sectionName,
      date: today,
      status: status,
      markedBy: 'usr_teach'
    });
  });
  SMS.saveData('attendance', attendance);

  // Teacher Attendance
  const teacherAttendance = teachers.map((t, i) => ({
    id: `tatt_${t.id}_${today}`,
    teacherId: t.id,
    teacherName: t.name,
    date: today,
    status: i === 7 ? 'Leave' : (i === 9 ? 'Half Day' : 'Present'),
    markedBy: 'usr_admin'
  }));
  SMS.saveData('teacherAttendance', teacherAttendance);

  // Exam Types
  const examTypes = [
    { id: 'ext_1', name: 'Monthly Test', status: 'active' },
    { id: 'ext_2', name: 'Mid Term', status: 'active' },
    { id: 'ext_3', name: 'Final Term', status: 'active' },
    { id: 'ext_4', name: 'Annual Exam', status: 'active' }
  ];
  SMS.saveData('examTypes', examTypes);

  // Exams / Schedule
  const exams = [
    { id: 'exm_1', examTypeId: 'ext_1', examName: 'Monthly Test - September', classId: 'cls_5', className: 'Grade 5', subjectId: subjects.find(s => s.classId === 'cls_5' && s.code === 'MATH')?.id, subjectName: 'Mathematics', date: '2025-09-15', startTime: '09:00', endTime: '11:00', room: 'Hall A', status: 'upcoming' },
    { id: 'exm_2', examTypeId: 'ext_1', examName: 'Monthly Test - September', classId: 'cls_5', className: 'Grade 5', subjectId: subjects.find(s => s.classId === 'cls_5' && s.code === 'ENG')?.id, subjectName: 'English', date: '2025-09-16', startTime: '09:00', endTime: '11:00', room: 'Hall A', status: 'upcoming' },
    { id: 'exm_3', examTypeId: 'ext_2', examName: 'Mid Term 2025', classId: 'cls_6', className: 'Grade 6', subjectId: subjects.find(s => s.classId === 'cls_6' && s.code === 'SCI')?.id, subjectName: 'Science', date: '2025-10-10', startTime: '09:00', endTime: '12:00', room: 'Hall B', status: 'upcoming' }
  ];
  SMS.saveData('exams', exams);

  // Results (sample)
  const results = [];
  const grade5Students = students.filter(s => s.classId === 'cls_5');
  grade5Students.forEach((stu, i) => {
    results.push({
      id: `res_${stu.id}_math`,
      studentId: stu.id,
      studentName: stu.name,
      examId: 'exm_1',
      examName: 'Monthly Test - September',
      subjectName: 'Mathematics',
      totalMarks: 100,
      obtainedMarks: 65 + (i * 5) % 30,
      percentage: 0,
      grade: '',
      remarks: '',
      className: stu.className,
      sectionName: stu.sectionName
    });
  });
  results.forEach(r => {
    r.percentage = Math.round((r.obtainedMarks / r.totalMarks) * 100);
    r.grade = SMS.calculateGrade(r.percentage);
    r.remarks = r.percentage >= 40 ? 'Pass' : 'Fail';
  });
  SMS.saveData('results', results);

  // Homework
  const homework = [
    { id: 'hw_1', subjectName: 'Mathematics', classId: 'cls_5', className: 'Grade 5', sectionName: 'A', teacherId: teachers[1].id, teacherName: teachers[1].name, title: 'Chapter 3 Exercises', description: 'Complete exercises 1 to 10 from Chapter 3.', assignedDate: today, dueDate: '2025-09-12', status: 'active' },
    { id: 'hw_2', subjectName: 'English', classId: 'cls_4', className: 'Grade 4', sectionName: 'B', teacherId: teachers[0].id, teacherName: teachers[0].name, title: 'Essay Writing', description: 'Write an essay on "My School" (150 words).', assignedDate: today, dueDate: '2025-09-14', status: 'active' },
    { id: 'hw_3', subjectName: 'Science', classId: 'cls_6', className: 'Grade 6', sectionName: 'A', teacherId: teachers[2].id, teacherName: teachers[2].name, title: 'Lab Report', description: 'Prepare lab report for experiment on photosynthesis.', assignedDate: '2025-09-05', dueDate: '2025-09-13', status: 'active' }
  ];
  SMS.saveData('homework', homework);

  // Notices
  const notices = [
    { id: 'ntc_1', title: 'Parent-Teacher Meeting', description: 'PTM will be held on 20th September 2025. All parents are requested to attend.', date: today, audience: 'Everyone', priority: 'high', status: 'active' },
    { id: 'ntc_2', title: 'Independence Day Celebration', description: 'School will celebrate Independence Day with special assembly and cultural program.', date: '2025-08-10', audience: 'Everyone', priority: 'medium', status: 'active' },
    { id: 'ntc_3', title: 'Fee Submission Deadline', description: 'Last date for September fee submission is 10th September 2025.', date: today, audience: 'Parents', priority: 'high', status: 'active' },
    { id: 'ntc_4', title: 'Teacher Training Workshop', description: 'Mandatory workshop for all teaching staff on 15th September.', date: '2025-09-08', audience: 'Teachers', priority: 'medium', status: 'active' }
  ];
  SMS.saveData('notices', notices);

  // Notifications
  const notifications = [
    { id: 'not_1', title: 'Fee Due Reminder', message: 'September fee is due for several students.', type: 'fee', read: false, date: today },
    { id: 'not_2', title: 'New Homework Assigned', message: 'Mathematics homework assigned to Grade 5.', type: 'homework', read: false, date: today },
    { id: 'not_3', title: 'Upcoming Exam', message: 'Monthly Test starts from 15th September.', type: 'exam', read: true, date: '2025-09-05' },
    { id: 'not_4', title: 'New Notice', message: 'Parent-Teacher Meeting scheduled.', type: 'notice', read: false, date: today }
  ];
  SMS.saveData('notifications', notifications);

  // Admissions
  const admissions = [
    { id: 'adm_1', applicationNo: 'APP-2025-001', studentName: 'New Applicant One', fatherName: 'Mr. Applicant Father', motherName: 'Mrs. Applicant Mother', dob: '2018-05-12', gender: 'Male', previousSchool: 'ABC Primary', applyingClass: 'Grade 1', phone: '03031111111', email: 'app1@email.com', address: 'Qamber', applicationDate: '2025-08-20', status: 'Pending' },
    { id: 'adm_2', applicationNo: 'APP-2025-002', studentName: 'New Applicant Two', fatherName: 'Mr. Father Two', motherName: 'Mrs. Mother Two', dob: '2017-03-22', gender: 'Female', previousSchool: '', applyingClass: 'Grade 2', phone: '03032222222', email: '', address: 'Qamber', applicationDate: '2025-08-25', status: 'Approved' },
    { id: 'adm_3', applicationNo: 'APP-2025-003', studentName: 'Rejected Applicant', fatherName: 'Mr. Father Three', motherName: 'Mrs. Mother Three', dob: '2016-11-08', gender: 'Male', previousSchool: 'XYZ School', applyingClass: 'Grade 3', phone: '03033333333', email: '', address: 'Nearby Town', applicationDate: '2025-08-15', status: 'Rejected' }
  ];
  SMS.saveData('admissions', admissions);

  // Leaves
  const leaves = [
    { id: 'lv_1', applicantType: 'student', applicantId: students[0].id, applicantName: students[0].name, leaveType: 'Sick Leave', fromDate: '2025-09-08', toDate: '2025-09-09', reason: 'Fever', status: 'Approved', approvedBy: 'usr_teach' },
    { id: 'lv_2', applicantType: 'teacher', applicantId: teachers[7].id, applicantName: teachers[7].name, leaveType: 'Casual Leave', fromDate: today, toDate: today, reason: 'Personal work', status: 'Pending', approvedBy: '' },
    { id: 'lv_3', applicantType: 'staff', applicantId: staff[4].id, applicantName: staff[4].name, leaveType: 'Annual Leave', fromDate: '2025-09-20', toDate: '2025-09-25', reason: 'Family event', status: 'Pending', approvedBy: '' }
  ];
  SMS.saveData('leaves', leaves);

  // Timetable sample
  const timetable = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [
    { period: 1, start: '08:00', end: '08:45' },
    { period: 2, start: '08:45', end: '09:30' },
    { period: 3, start: '09:45', end: '10:30' },
    { period: 4, start: '10:30', end: '11:15' },
    { period: 5, start: '11:30', end: '12:15' },
    { period: 6, start: '12:15', end: '13:00' }
  ];
  // Sample for Grade 5-A
  days.forEach((day, di) => {
    periods.forEach((p, pi) => {
      const sub = subjectList[pi % subjectList.length];
      timetable.push({
        id: `tt_5A_${day}_${p.period}`,
        classId: 'cls_5',
        className: 'Grade 5',
        sectionId: 'sec_5_A',
        sectionName: 'A',
        day: day,
        period: p.period,
        startTime: p.start,
        endTime: p.end,
        subjectName: sub.name,
        teacherName: teachers[pi % teachers.length].name,
        room: 'Room 5A'
      });
    });
  });
  SMS.saveData('timetable', timetable);

  SMS.markInitialized();
  console.log('Demo data seeded successfully for THE SMART MODERN PUBLIC SCHOOL QAMBER');
}

window.seedDemoData = seedDemoData;
