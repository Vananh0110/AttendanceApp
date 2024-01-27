import React, { useEffect, useState } from 'react';
import { Modal, Table, Spin } from 'antd';
import axios from 'axios';

const ViewStudentListModal = ({ clazz_code, visible, onClose }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const columns = [
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
  ];

  const modalTitle = `Danh sách sinh viên (${students.length})`;

  return (
    <Modal
      visible={visible}
      title={modalTitle}
      onCancel={onClose}
      footer={null}
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

export default ViewStudentListModal;
