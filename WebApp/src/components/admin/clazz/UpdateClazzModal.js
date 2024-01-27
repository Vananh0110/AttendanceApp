import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const UpdateClazzModal = ({ fetchClazzes, visible, clazz, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedClazz, setUpdatedClazz] = useState(clazz);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get('http://127.0.0.1:8000/api/teachers');
        const courseResponse = await axios.get('http://127.0.0.1:8000/api/courses');
        const semesterResponse = await axios.get('http://127.0.0.1:8000/api/semesters');
        setTeachers(teacherResponse.data);
        setCourses(courseResponse.data);
        setSemesters(semesterResponse.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://127.0.0.1:8000/api/clazzes/${clazz.id}`, values);

      setLoading(false);
      onClose();

      const updatedClazz = { ...clazz, ...values };
      setUpdatedClazz(updatedClazz);
      fetchClazzes();

      notification.success({
        message: 'Cập nhật thành công',
        duration: 2,
        closable: false,
      });
    } catch (error) {
      console.error('Error updating clazz:', error);
      setLoading(false);

      notification.error({
        message: 'Cập nhật không thành công',
        duration: 2,
        closable: false,
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
          clazz_code : updatedClazz?.clazz_code,
          course_id: updatedClazz?.course_id,
          teacher_id: updatedClazz?.teacher_id,
          semester_id: updatedClazz?.semester_id,
        }}
      >
        <Form.Item
          name="clazz_code"
          label="Mã lớp"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã lớp',
            },
          ]}
        >
          <Input placeholder="Nhập mã lớp" />
        </Form.Item>
        <Form.Item
          name="course_id"
          label="Tên học phần"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn tên học phần',
            },
          ]}
        >
            <Select placeholder="Chọn tên học phần">
                {courses.map((course)=> (
                    <Option key={course.id} value={course.id}>
                        {course.course_name}
                    </Option>
                ))}

            </Select>
        </Form.Item>

        <Form.Item
          name="teacher_id"
          label="Tên giáo viên"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn tên giáo viên',
            },
          ]}
        >
            <Select placeholder="Chọn tên giáo viên">
                {teachers.map((teacher)=> (
                    <Option key={teacher.id} value={teacher.id}>
                        {teacher.teacher_name}
                    </Option>
                ))}

            </Select>
        </Form.Item>

        <Form.Item
          name="semester_id"
          label="Kỳ học"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn kỳ học',
            },
          ]}
        >
            <Select placeholder="Chọn kỳ học">
                {semesters.map((semester)=> (
                    <Option key={semester.id} value={semester.id}>
                        {semester.semester_name}
                    </Option>
                ))}

            </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateClazzModal;