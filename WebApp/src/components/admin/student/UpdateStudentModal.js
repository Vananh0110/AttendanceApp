import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const UpdateStudentModal = ({ fetchStudents, visible, student, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState(student);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Format the date value to "YYYY-MM-DD"
      values.date_of_birth = moment(values.date_of_birth).format('YYYY-MM-DD');

      // Send the update request to the API
      await axios.put(`http://127.0.0.1:8000/api/students/${student.id}`, values);

      setLoading(false);
      onClose();

      // Update the feedback information
      const updatedStudent = { ...student, ...values };
      setUpdatedStudent(updatedStudent);
      fetchStudents();

      // Display success notification
      notification.success({
        message: 'Cập nhật thành công',
        duration: 2,
        closable: false
      });
    } catch (error) {
      console.error('Error updating student:', error);
      setLoading(false);

      // Display error notification
      notification.error({
        message: 'Cập nhật không thành công',
        duration: 2,
        closable: false
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật thông tin sinh viên"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-blue-500 hover:bg-blue-600"
          loading={loading}
          onClick={handleSubmit}
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          student_name : updatedStudent?.student_name,
          student_code : updatedStudent?.student_code,
          student_email : updatedStudent?.student_email,
          gender : updatedStudent?.gender,
          date_of_birth: moment(updatedStudent?.date_of_birth, 'YYYY-MM-DD'),
        }}
      >
        <Form.Item
          name="student_name"
          label="Họ và tên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ và tên',
            },
          ]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="student_code"
          label="Mã số sinh viên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã số sinh viên',
            },
          ]}
        >
          <Input placeholder="Nhập mã số sinh viên" />
        </Form.Item>
        <Form.Item
          name="student_email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email sinh viên',
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn giới tính',
            },
          ]}
        >
          <Select placeholder="Chọn giới tính">
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date_of_birth"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateStudentModal;