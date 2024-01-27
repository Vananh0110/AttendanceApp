import React, {useState} from 'react';
import {Form, Input, Select, Button, DatePicker, notification} from 'antd';
import axios from 'axios';
import Navbar from '../../Navbar';
import {useNavigate} from 'react-router-dom';

const {Option} = Select;

const CreateStudentPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const response = await axios.post('http://127.0.0.1:8000/api/students', values);

            if(response.status == 201){
                notification.success({
                  message: "Tạo mới thành công",
                  duration: 2,
                  closable: false
                });
        
                form.resetFields();
                navigate("/student");
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
                    name="student_name"
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
                    name="student_code"
                    label="Mã số sinh viên"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập mã số sinh viên',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="student_email"
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
                    <Select>
                        <Option value = "Nam">Nam</Option>
                        <Option value = "Nữ">Nữ</Option>
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
                    <DatePicker style={{ width: "100%" }} />
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

export default CreateStudentPage;