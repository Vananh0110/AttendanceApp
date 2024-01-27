import React, {useState} from 'react';
import {Form, Input, Select, Button, DatePicker, notification} from 'antd';
import axios from 'axios';
import Navbar from '../../Navbar';
import {useNavigate} from 'react-router-dom';

const {Option} = Select;

const CreateTeacherPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const response = await axios.post('http://127.0.0.1:8000/api/teachers', values);

            if(response.status == 201){
                notification.success({
                  message: "Tạo mới thành công",
                  duration: 2,
                  closable: false
                });
        
                form.resetFields();
                navigate("/teacher");
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
                    name="teacher_name"
                    label="Họ và tên"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập họ và tên',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="teacher_code"
                    label="Mã giáo viên"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập mã giáo viên',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="teacher_email"
                    label="Email"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập email',
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

export default CreateTeacherPage;