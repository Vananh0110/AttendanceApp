import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Semester from './pages/admin/semester/semester';
import Course from './pages/admin/course/course';
import Student from './pages/admin/student/student';
import Teacher from './pages/admin/teacher/teacher';
import Attendance from './pages/admin/attendance/attendance';
import Login from './pages/login/login';
import Clazz from './pages/admin/clazz/clazz';
import CreateStudentPage from './components/admin/student/CreateStudentPage';
import CreateTeacherPage from './components/admin/teacher/CreateTeacherPage';
import CreateCoursePage from './components/admin/course/CreateCoursePage';
import CreateClazzPage from './components/admin/clazz/CreateClazzPage';
import AttendanceClassTeacher from './pages/admin/attendance/attendanceclassteacher';
import AttendanceDate from './pages/admin/attendance/attendancedate';
import AttendanceStudentList from './pages/admin/attendance/attendancestudentlist';
import TeacherCalendar from './pages/teacher/calendar/calendar';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/semester" element={<Semester />} />
          <Route path="/course" element={<Course />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/class" element={<Clazz />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/student/create" element={<CreateStudentPage />} />
          <Route path="/teacher/create" element={<CreateTeacherPage />} />
          <Route path="/course/create" element={<CreateCoursePage />} />
          <Route path="class/create" element={<CreateClazzPage />} />
          <Route
            path="attendance/list/:id"
            element={<AttendanceClassTeacher />}
          />
          <Route
            path="attendance/list/:id/:clazzCode"
            element={<AttendanceDate />}
          />
          <Route
            path="attendance/list/:id/:clazzCode/:attendanceDate"
            element={<AttendanceStudentList />}
          />

          {/* Teacher */}
          <Route path="/teacher/calendar" element={<TeacherCalendar />} />
          {/* Student */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
