import React, { useEffect, useState } from 'react';
import { Modal, Table, Spin } from 'antd';
import moment from 'moment';
import axios from 'axios';

const ClassModal = ({ isOpen, onRequestClose, event }) => {
  const hasEvent = !!event;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasEvent) {
      console.log(event);
      const clazz_code = event.clazz_code;
      console.log(clazz_code);
      const fetchStudents = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/getStudentListByClazzCode/${clazz_code}`
          );
          setStudents(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchStudents();
    }
  }, [hasEvent]);

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

  const startDateTime = hasEvent ? moment(event.start) : null;
  const endDateTime = hasEvent ? moment(event.end) : null;

  return (
    <Modal
      visible={isOpen}
      onCancel={onRequestClose}
      title="Thông tin lớp học"
      footer={null}
      width={800}
    >
      {hasEvent && (
        <>
          <p className="mb-3">
            <strong>Tên học phần: </strong>
            {event.course_name}
          </p>
          <p className="mb-3">
            <strong>Mã học phần: </strong>
            {event.course_code}
          </p>
          <p className="mb-3">
            <strong>Mã lớp: </strong>
            {event.clazz_code}
          </p>
          <p className="mb-3">
            <strong>Giảng viên: </strong>
            {event.teacher_name}
          </p>
          <p className="mb-5">
            <strong>Địa điểm: </strong>
            {event.destination}
          </p>
          <p className="mb-3">
            <strong>Danh sách sinh viên ({students.length})</strong>
          </p>
          {loading ? (
            <Spin />
          ) : (
            <Table dataSource={students} columns={columns} />
          )}
        </>
      )}
    </Modal>
  );
};

export default ClassModal;
