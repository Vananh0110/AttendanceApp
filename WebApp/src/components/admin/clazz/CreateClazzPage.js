import React, {useEffect, useState} from 'react';
import {Form, Input, Select, Button, DatePicker, notification} from 'antd';
import axios from 'axios';
import Navbar from '../../Navbar';
import {useNavigate} from 'react-router-dom';

const {Option} = Select;

const CreateClazzPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
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

            setLoading(true);

            const response = await axios.post('http://127.0.0.1:8000/api/clazzes', values);

            if(response.status == 201){
                notification.success({
                  message: "Tạo mới thành công",
                  duration: 2,
                  closable: false
                });
        
                form.resetFields();
                navigate("/class");
              } else {
                notification.error({
                  message: "Đã xảy ra lỗi. Vui lòng thử lại sau",
                  duration: 2,
                  closable: false
                });
              }
        } catch(error) {
            notification.error({
                message: "Đã xảy ra lỗi. Vui lòng thử lại sau",
                duration: 2,
                closable: false
              });
              console.error(error);
            }
    };

    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-4">
            <h1 className="text-3x1 font-bold mb-4">Tạo mới sinh viên</h1>
                <Form form = { form } layout = "vertical" onFinish = {handleSubmit}>
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
                    <Input />
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
                <Form.Item>
                    <Button
                    className="bg-blue-500 text-white px-4  rounded"
                    type="primary"
                    htmlType="submit"
                    >
                        Tạo mới
                    </Button>
          </Form.Item>
                </Form>
        </div>
        </>
    )
}

export default CreateClazzPage;