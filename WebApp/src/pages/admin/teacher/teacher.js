import React from 'react'
import Navbar from '../../../components/Navbar'
import TeacherTable from '../../../components/admin/teacher/TeacherTable';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
const Teacher = () => {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách giáo viên</h1>
          <Button className="bg-blue-500" type="primary">
            <Link to="/teacher/create">Tạo mới giáo viên</Link>
          </Button>
        </div>
        <TeacherTable />
      </div>
    </>
  )
}

export default Teacher
