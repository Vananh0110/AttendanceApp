import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Table } from 'antd';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

const AttendanceClassTeacher = () => {
  const { id } = useParams();
  const [clazzes, setClazzes] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchClazzes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/clazz/getClassTeacherByCourseId/${id}`);
      setClazzes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClazzes();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredClazzes = clazzes.filter((clazz) =>
    Object.values(clazz).some((fieldValue) =>
      String(fieldValue).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Mã lớp',
      dataIndex: 'clazz_code',
      key: 'clazz_code',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher_name',
      key: 'teacher_name',
    },
    {
      title: 'Email giáo viên',
      dataIndex: 'teacher_email',
      key: 'teacher_email',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Điểm danh - Danh sách các lớp</h1>
        </div>
        <Input.Search
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Table
          dataSource={filteredClazzes}
          columns={columns}
          onRow={(record) => ({
            onClick: () => {
              window.location.href = `/attendance/list/${id}/${record.clazz_code}`;
            },
          })}
        />
      </div>
    </>
  );
};

export default AttendanceClassTeacher;
