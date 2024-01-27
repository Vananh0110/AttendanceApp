import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const UpdateStudentStatusModal = ({ fetchStudents, visible, student, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState(student);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
    
      await axios.put(`http://127.0.0.1:8000/api/attendances/${student.id}`, values);

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
      title="Cập nhật trạng thái điểm danh"
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
          status : updatedStudent?.status,
        }}
      >
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn trạng thái',
            },
          ]}
        >
          <Select>
            <Option value="P">P (Có mặt)</Option>
            <Option value="A">A (Vắng mặt)</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateStudentStatusModal;