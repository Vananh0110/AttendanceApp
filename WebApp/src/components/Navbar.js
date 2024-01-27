import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  SnippetsOutlined,
  ApartmentOutlined,
  LogoutOutlined, // Import the LogoutOutlined icon
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<BookOutlined />}>
          <Link to="/semester">Semester</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileTextOutlined />}>
          <Link to="/course">Course</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/student">Student</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          <Link to="/teacher">Teacher</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ApartmentOutlined />}>
          <Link to="/class">Class</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<SnippetsOutlined />}>
          <Link to="/attendance">Attendance</Link>
        </Menu.Item>
        {/* Add the Logout icon */}
        <Menu.Item key="7" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
