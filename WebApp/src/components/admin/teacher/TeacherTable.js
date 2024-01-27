import React, { useEffect, useState } from 'react';
import { Table, Space, Tooltip, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import DeleteTeacherModal from './DeleteTeacherModal';
import UpdateTeacherModal from './UpdateTeacherModal';
const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (record) => {
    setSelectedTeacher(record);
    setUpdateModalVisible(true);
  };

  const handleDelete = (teacher) => {
    setSelectedTeacher(teacher);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setSelectedTeacher(null);
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    setDeleteModalVisible(false);
  };

  const handleEditClick = (record) => {
    setSelectedTeacher(record);
    setModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleUpdateSuccess = (updatedTeacher) => {
    const updatedTeachers = teachers.map((teacher) => {
      if (teacher.id === updatedTeacher.id) {
        return updatedTeacher;
      }
      return teacher;
    });
  };

  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher).some((fieldValue) =>
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
      dataIndex: 'teacher_name',
      key: 'teacher_name',
    },
    {
      title: 'Mã giáo viên',
      dataIndex: 'teacher_code',
      key: 'teacher_code',
    },
    {
      title: 'Email',
      dataIndex: 'teacher_email',
      key: 'teacher_email',
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
        dataSource={filteredTeachers}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleEditClick(record),
        })}
        />

        {selectedTeacher && (
          <UpdateTeacherModal
            visible={updateModalVisible}
            teacher={selectedTeacher}
            onClose={() => setUpdateModalVisible(false)}
            updateSuccess={handleUpdateSuccess}
            fetchTeachers={fetchTeachers}
          />
        )}

        {selectedTeacher && (
          <DeleteTeacherModal
            visible={deleteModalVisible}
            teacher={selectedTeacher}
            onCancel={handleDeleteCancel}
            onDeleteSuccess={handleDeleteSuccess}
            fetchTeachers={fetchTeachers}
          />
        )}
    </>
  );
};

export default TeacherTable;
