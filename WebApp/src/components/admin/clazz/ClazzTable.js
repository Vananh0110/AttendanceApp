import React, { useState, useEffect } from 'react';
import { Table, Space, Tooltip, Input, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import axios from 'axios';
import DeleteClazzModal from './DeleteClazzModal';
import UpdateClazzModal from './UpdateClazzModal';
import ViewStudentListModal from './ViewStudentListModal';
import ViewScheduleModal from './ViewScheduleModal';

const { confirm } = Modal;

const ClazzTable = () => {
  const [clazzes, setClazzes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedClazz, setSelectedClazz] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [viewStudentsModalVisible, setViewStudentsModalVisible] = useState(false);
  const [viewScheduleModalVisible, setViewScheduleModalVisible] = useState(false);

  const fetchClazzes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/detail-clazz');
      setClazzes(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchClazzes();
  }, []);

  const handleEdit = (record) => {
    setSelectedClazz(record);
    setUpdateModalVisible(true);
  };

  const handleDelete = (clazz) => {
    setSelectedClazz(clazz);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setSelectedClazz(null);
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    setDeleteModalVisible(false);
  };

  const handleEditClick = (record) => {
    setSelectedClazz(record);
    setModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleViewStudents = (record) => {
    setSelectedClazz(record);
    setViewStudentsModalVisible(true);
  };

  const handleViewSchedule = (record) => {
    setSelectedClazz(record);
    setViewScheduleModalVisible(true);
  };

  const handleUpdateSuccess = (updatedClazz) => {
    const updatedClazzes = clazzes.map((clazz) => {
      if (clazz.id === updatedClazz.id) {
        return updatedClazz;
      }
      return clazz;
    });
    setClazzes(updatedClazzes);
  };

  const filteredClazzes = clazzes.filter((clazz) =>
    Object.values(clazz).some((fieldValue) =>
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
      title: 'Mã lớp',
      dataIndex: 'clazz_code',
      key: 'clazz_code',
    },
    {
      title: 'Tên học phần',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher_name',
      key: 'teacher_name',
    },
    {
      title: 'Email Giáo viên',
      dataIndex: 'teacher_email',
      key: 'teacher_email',
    },
    {
      title: 'Kỳ học',
      dataIndex: 'semester_name',
      key: 'semester_name',
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
          <Tooltip title="Danh sách sinh viên">
            <UserOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleViewStudents(record);
              }}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="Thời khóa biểu">
            <ScheduleOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleViewSchedule(record);
              }}
              style={{ marginRight: 8 }}
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
        dataSource={filteredClazzes}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleEditClick(record),
        })}
      />

      {selectedClazz && (
        <UpdateClazzModal
          visible={updateModalVisible}
          clazz={selectedClazz}
          onClose={() => setUpdateModalVisible(false)}
          updateSuccess={handleUpdateSuccess}
          fetchClazzes={fetchClazzes}
        />
      )}

      {selectedClazz && (
        <DeleteClazzModal
          visible={deleteModalVisible}
          clazz={selectedClazz}
          onCancel={handleDeleteCancel}
          onDeleteSuccess={handleDeleteSuccess}
          fetchClazzes={fetchClazzes}
        />
      )}

      {selectedClazz && (
        <ViewStudentListModal
          visible={viewStudentsModalVisible}
          clazz_code={selectedClazz.clazz_code}
          onClose={() => setViewStudentsModalVisible(false)}
        />
      )}

      {selectedClazz && (
        <ViewScheduleModal
          clazz={selectedClazz}
          visible={viewScheduleModalVisible}
          onClose={() => setViewScheduleModalVisible(false)}
          teacher_name = {selectedClazz.teacher_name}
          teacher_email = {selectedClazz.teacher_email}
        />
      )}
    </>
  );
};

export default ClazzTable;
