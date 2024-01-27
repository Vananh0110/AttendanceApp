import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListCourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((fieldValue) =>
      String(fieldValue).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên học phần',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Mã học phần',
      dataIndex: 'course_code',
      key: 'course_code',
    },
  ];

  return (
    <>
      <Input.Search
        placeholder="Tìm kiếm"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />

      <Table
        dataSource={filteredCourses}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            // Chuyển đến trang AttendanceClassTeacher khi người dùng nhấp vào hàng
            window.location.href = `/attendance/list/${record.id}`;
          },
        })}
      />
    </>
  );
};

export default ListCourseTable;
