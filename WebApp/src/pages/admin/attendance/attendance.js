import React from 'react'
import Navbar from '../../../components/Navbar';
import ListCourseTable from '../../../components/admin/attendance/ListCourseTable';
const Attendance = () => {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Điểm danh</h1>
      </div>
      <ListCourseTable/>
    </div>
    </>
  )
}

export default Attendance
