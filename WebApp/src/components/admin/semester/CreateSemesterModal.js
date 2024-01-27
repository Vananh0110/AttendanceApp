import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const UpdateSemesterModal = ({ fetchSemesters, visible, semester, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedSemester, setUpdatedSemester] = useState(semester);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      values.semester_start_date = moment(values.semester_start_date).format('YYYY-MM-DD');
      values.semester_end_date = moment(values.semester_end_date).format('YYYY-MM-DD');

      await axios.put(`http://127.0.0.1:8000/api/semesters/${semester.id}`, values);

      setLoading(false);
      onClose();

      // Update the feedback information
      const updatedSemester = { ...semester, ...values };
      setUpdatedSemester(updatedSemester);
      fetchSemesters();

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
      title="Cập nhật thông tin kỳ học"
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
          semester_name : updatedSemester?.semester_name,
          semester_start_date : updatedSemester?.semester_start_date,
          semester_end_date : updatedSemester?.semester_end_date,
        }}
      >
        <Form.Item
          name="semester_name"
          label="Tên học phần"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên kỳ học',
            },
          ]}
        >
          <Input placeholder="Nhập tên kỳ học" />
        </Form.Item>

        <Form.Item
          name="semester_start_date"
          label="Ngày bắt đầu"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="semester_start_date"
          label="Ngày kết thúc"
        >
          <DatePicker />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default UpdateSemesterModal;