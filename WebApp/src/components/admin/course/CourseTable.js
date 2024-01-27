import React, { useEffect, useState } from 'react';
import { Table, Space, Tooltip, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import DeleteCourseModal from './DeleteCourseModal';
import UpdateCourseModal from './UpdateCourseModal';
const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

  const handleEdit = (record) => {
    setSelectedCourse(record);
    setUpdateModalVisible(true);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setSelectedCourse(null);
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    setDeleteModalVisible(false);
  };

  const handleEditClick = (record) => {
    setSelectedCourse(record);
    setModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleUpdateSuccess = (updatedCourse) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === updatedCourse.id) {
        return updatedCourse;
      }
      return course;
    });
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
        dataSource={filteredCourses}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleEditClick(record),
        })}
        />

        {selectedCourse && (
          <UpdateCourseModal
            visible={updateModalVisible}
            course={selectedCourse}
            onClose={() => setUpdateModalVisible(false)}
            updateSuccess={handleUpdateSuccess}
            fetchCourses={fetchCourses}
          />
        )}

        {selectedCourse && (
          <DeleteCourseModal
            visible={deleteModalVisible}
            course={selectedCourse}
            onCancel={handleDeleteCancel}
            onDeleteSuccess={handleDeleteSuccess}
            fetchCourses={fetchCourses}
          />
        )}
    </>
  );
};

export default CourseTable;
