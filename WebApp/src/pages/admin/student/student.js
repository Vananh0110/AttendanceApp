import React from 'react';
import Navbar from '../../../components/Navbar';
import StudentTable from '../../../components/admin/student/StudentTable';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
const Student = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách sinh viên</h1>
          <Button className="bg-blue-500" type="primary">
            <Link to="/student/create">Tạo mới sinh viên</Link>
          </Button>
        </div>
        <StudentTable />
      </div>
    </>
  )
}

export default Student
