import React, {useState} from 'react';
import {Form, Input, Select, Button, DatePicker, notification} from 'antd';
import axios from 'axios';
import Navbar from '../../Navbar';
import {useNavigate} from 'react-router-dom';

const {Option} = Select;

const CreateCoursePage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const response = await axios.post('http://127.0.0.1:8000/api/courses', values);

            if(response.status == 201){
                notification.success({
                  message: "Tạo mới thành công",
                  duration: 2,
                  closable: false
                });
        
                form.resetFields();
                navigate("/course");
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
            <h1 className="text-3x1 font-bold mb-4">Tạo học phần mới</h1>
                <Form form = { form } layout = "vertical" onFinish = {handleSubmit}>
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
                    <Input />
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
                    <Input />
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

export default CreateCoursePage;