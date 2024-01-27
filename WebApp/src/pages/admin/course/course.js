import React from 'react'
import Navbar from '../../../components/Navbar';
import CourseTable from '../../../components/admin/course/CourseTable';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
const Course = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách học phần</h1>
        <Button className="bg-blue-500" type="primary">
          <Link to="/course/create">Tạo học phần mới</Link>
        </Button>
      </div>
      <CourseTable />
    </div>
  </>
  )
}

export default Course
