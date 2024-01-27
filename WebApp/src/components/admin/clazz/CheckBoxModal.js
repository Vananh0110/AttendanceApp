import React, { useState, useEffect } from 'react';
import { Modal, Table, Spin, Button, Checkbox, message } from 'antd';
import axios from 'axios';

const CheckBoxModal = ({ visible, attendance_date, clazz_code, onClose, teacher_name, teacher_email }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/getStudentListByClazzCode/${clazz_code}`);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (visible) {
      fetchStudents();
    }
  }, [visible, clazz_code]);

  const handleCheckboxChange = (e, studentCode) => {
    const { checked } = e.target;
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentCode]: checked ? 'P' : 'A',
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      const attendanceRecords = students.map((student) => ({
        student_name: student.student_name,
        student_code: student.student_code,
        clazz_code: clazz_code,
        attendance_date: attendance_date,
        teacher_name: teacher_name,
        teacher_email: teacher_email,
        status: attendanceData[student.student_code] || 'A', // Default to 'A' if no status is set
      }));

      console.log('Data to be sent:', attendanceRecords); // Log the data before sending

      // Call API to save attendance data
      await axios.post('http://127.0.0.1:8000/api/attendances/storeList', attendanceRecords);

      message.success('Điểm danh thành công');
      onClose();
    } catch (error) {
      console.log(error);
      message.error('Điểm danh không thành công');
    }
  };

  const columns = [
    {
      title: 'Tên sinh viên',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'student_code',
      key: 'student_code',
    },
    {
      title: 'Điểm danh',
      dataIndex: 'student_code',
      key: 'attendance',
      render: (studentCode) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(e, studentCode)}
          checked={attendanceData[studentCode] === 'P'}
        />
      ),
    },
  ];

  return (
    <Modal
      visible={visible}
      title={`Điểm danh lớp ${clazz_code} ngày ${attendance_date}`}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="save" className = "bg-blue-500" type="primary" onClick={handleSaveAttendance}>
          Lưu
        </Button>,
      ]}
      width={800}
    >
      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={students} columns={columns} />
      )}
    </Modal>
  );
};

export default CheckBoxModal;
