import React from 'react'
import Navbar from '../../../components/Navbar';
import ClazzTable from '../../../components/admin/clazz/ClazzTable';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
const Course = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách lớp học</h1>
        <Button className="bg-blue-500" type="primary">
          <Link to="/class/create">Tạo lớp mới</Link>
        </Button>
      </div>
      <ClazzTable />
    </div>
  </>
  )
}

export default Course
