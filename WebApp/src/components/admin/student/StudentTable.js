import React, { useEffect, useState } from 'react';
import { Table, Space, Tooltip, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import DeleteStudentModal from './DeleteStudentModal';
import UpdateStudentModal from './UpdateStudentModal';
const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (record) => {
    setSelectedStudent(record);
    setUpdateModalVisible(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setSelectedStudent(null);
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    setDeleteModalVisible(false);
  };

  const handleEditClick = (record) => {
    setSelectedStudent(record);
    setModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleUpdateSuccess = (updatedStudent) => {
    const updatedStudents = students.map((student) => {
      if (student.id === updatedStudent.id) {
        return updatedStudent;
      }
      return student;
    });
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((fieldValue) =>
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
      title: 'Họ và tên',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'student_code',
      key: 'student_code',
    },
    {
      title: 'Email',
      dataIndex: 'student_email',
      key: 'student_email',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
              <EditOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(record);
                }}
                style={{ marginRight: 8 }}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(record);
                }}
                style={{ color: 'red' }}
              />
            </Tooltip>
        </Space>
      ),
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
        dataSource={filteredStudents}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleEditClick(record),
        })}
        />

        {selectedStudent && (
          <UpdateStudentModal
            visible={updateModalVisible}
            student={selectedStudent}
            onClose={() => setUpdateModalVisible(false)}
            updateSuccess={handleUpdateSuccess}
            fetchStudents={fetchStudents}
          />
        )}

        {selectedStudent && (
          <DeleteStudentModal
            visible={deleteModalVisible}
            student={selectedStudent}
            onCancel={handleDeleteCancel}
            onDeleteSuccess={handleDeleteSuccess}
            fetchStudents={fetchStudents}
          />
        )}
    </>
  );
};

export default StudentTable;
