import React from 'react'
import Navbar from '../../../components/Navbar';
import SemesterTable from '../../../components/admin/semester/SemesterTable';
const Semester = () => {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách kỳ học</h1>
        </div>
        <SemesterTable/>
      </div>
    </>
  )
}

export default Semester
