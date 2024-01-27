import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const UpdateCourseModal = ({ fetchCourses, visible, course, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState(course);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://127.0.0.1:8000/api/courses/${course.id}`, values);

      setLoading(false);
      onClose();

      // Update the feedback information
      const updatedCourse = { ...course, ...values };
      setUpdatedCourse(updatedCourse);
      fetchCourses();

      // Display success notification
      notification.success({
        message: 'Cập nhật thành công',
        duration: 2,
        closable: false
      });
    } catch (error) {
      console.error('Error updating course:', error);
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
      title="Cập nhật thông tin học phần"
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
          course_name : updatedCourse?.course_name,
          course_code : updatedCourse?.course_code,
        }}
      >
        <Form.Item
          name="course_name"
          label="Tên học phần"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên học phần',
            },
          ]}
        >
          <Input placeholder="Nhập tên học phần" />
        </Form.Item>

        <Form.Item
          name="course_code"
          label="Mã học phần"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã học phần',
            },
          ]}
        >
          <Input placeholder="Nhập mã học phần" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCourseModal;