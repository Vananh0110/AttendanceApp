import React, { useEffect, useState } from 'react';
import { Table, Space, Tooltip, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import DeleteSemesterModal from './DeleteSemesterModal';
import UpdateSemesterModal from './UpdateSemesterModal';
const SemesterTable = () => {
  const [semesters, setSemesters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchSemesters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/semesters');
      setSemesters(response.data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleEdit = (record) => {
    setSelectedSemester(record);
    setUpdateModalVisible(true);
  };

  const handleDelete = (semester) => {
    setSelectedSemester(semester);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setSelectedSemester(null);
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    setDeleteModalVisible(false);
  };

  const handleEditClick = (record) => {
    setSelectedSemester(record);
    setModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleUpdateSuccess = (updatedSemester) => {
    const updatedSemesters = semesters.map((semester) => {
      if (semester.id === updatedSemester.id) {
        return updatedSemester;
      }
      return semester;
    });
  };

  const filteredSemesters = semesters.filter((semester) =>
    Object.values(semester).some((fieldValue) =>
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
      title: 'Tên kỳ học',
      dataIndex: 'semester_name',
      key: 'semester_name',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'semester_start_date',
      key: 'semester_start_date',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'semester_end_date',
      key: 'semester_end_date',
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
        dataSource={filteredSemesters}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleEditClick(record),
        })}
        />

        {selectedSemester && (
          <UpdateSemesterModal
            visible={updateModalVisible}
            semester ={selectedSemester}
            onClose={() => setUpdateModalVisible(false)}
            updateSuccess={handleUpdateSuccess}
            fetchSemesters={fetchSemesters}
          />
        )}

        {selectedSemester && (
          <DeleteSemesterModal
            visible={deleteModalVisible}
            semester={selectedSemester}
            onCancel={handleDeleteCancel}
            onDeleteSuccess={handleDeleteSuccess}
            fetchSemesters={fetchSemesters}
          />
        )}
    </>
  );
};

export default SemesterTable;
