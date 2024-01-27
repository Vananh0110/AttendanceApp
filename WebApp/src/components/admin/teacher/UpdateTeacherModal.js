import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const UpdateTeacherModal = ({ fetchTeachers, visible, teacher, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedTeacher, setUpdatedTeacher] = useState(teacher);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://127.0.0.1:8000/api/teachers/${teacher.id}`, values);

      setLoading(false);
      onClose();

      // Update the feedback information
      const updatedTeacher = { ...teacher, ...values };
      setUpdatedTeacher(updatedTeacher);
      fetchTeachers();

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
      title="Cập nhật thông tin giáo viên"
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
          teacher_name : updatedTeacher?.teacher_name,
          teacher_code : updatedTeacher?.teacher_code,
          teacher_email : updatedTeacher?.teacher_email,
        }}
      >
        <Form.Item
          name="teacher_name"
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
          name="teacher_code"
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
          name="teacher_email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email giáo viên',
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTeacherModal;