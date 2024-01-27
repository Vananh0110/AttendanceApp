import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Table, Space, Tooltip } from 'antd';
import { EditOutlined} from '@ant-design/icons';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import UpdateStudentStatusModal from '../../../components/admin/attendance/UpdateStudentStatusModal';

const AttendanceStudentList = () => {
  const { attendanceDate, clazzCode } = useParams();
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/attendances/student/attendancelist/${attendanceDate}/${clazzCode}`);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (record) => {
    setSelectedStudent(record);
    setUpdateModalVisible(true);
  }

  const handleSearch = (value) => {
    setSearchText(value);
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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
          </Space>
        ),
      },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Điểm danh - Danh sách sinh viên</h1>
        </div>
        <Input.Search
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Table dataSource={filteredStudents} columns={columns} />

        {selectedStudent && (
            <UpdateStudentStatusModal
                visible={updateModalVisible}
                student = {selectedStudent}
                onClose = {() => setUpdateModalVisible(false)}
                fetchStudents={fetchStudents}
            />
        )}
      </div>
    </>
  );
};

export default AttendanceStudentList;
