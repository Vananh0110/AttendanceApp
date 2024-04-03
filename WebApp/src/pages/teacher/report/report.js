import React, { useEffect, useState } from 'react';
import Sidebar, { SidebarItem } from '../../../components/Sidebar';
import {
  CalendarDays,
  BookText,
  LogOut,
  Users,

} from 'lucide-react';
import { Select, Table, Spin, Tooltip } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Option } = Select;

const TeacherReport = () => {
  const [user, setUser] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [classList, setClassList] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchUserData = () => {
    const userString = sessionStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    setUser(userData);
  };

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/semesters');
      setSemesters(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClassList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/getClassTeacherByEmail/${user.email}`
      );
      setClassList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (selectedSemester && user) {
      fetchClassList();
    }
  }, [selectedSemester, user]);

  const columns = [
    {
      title: 'Mã lớp',
      dataIndex: 'clazz_code',
      key: 'clazz_code',
    },
    {
      title: 'Mã học phần',
      dataIndex: 'course_code',
      key: 'course_code',
    },
    {
      title: 'Tên học phần',
      dataIndex: 'course_name',
      key: 'course_name',
    }
  ];

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar user={user}>
          <SidebarItem
            icon={<CalendarDays size={20} />}
            text="Calendars"
            alert
            to="/teacher/calendar"
          />
          <SidebarItem
            icon={<Users size={20} />}
            text="Attendance"
            to="/teacher/attendance"
          />
          <SidebarItem icon={<BookText size={20} />} text="Report" to="/teacher/report" />
          <hr className="bg-gray-200" />
          <SidebarItem icon={<LogOut size={20} />} text="Logout" to="/login" />
        </Sidebar>

        <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
          <div className="p-5 text-2xl font-semibold">
            <span>
              <Link to="/teacher/attendance">Danh sách lớp</Link>
            </span>
          </div>
          <div className="bg-white p-5 m-4 shadow-md rounded-sm">
            <div className="w-40 mb-5">
              <Select
                placeholder="Chọn kỳ học"
                style={{ width: '100%', marginBottom: '10px' }}
                onChange={(value) => setSelectedSemester(value)}
                value={selectedSemester}
                loading={loading}
                defaultValue={
                  semesters.length > 0 ? semesters[0].semester_name : undefined
                }
              >
                {semesters.map((semester) => (
                  <Option key={semester.id} value={semester.semester_name}>
                    {semester.semester_name}
                  </Option>
                ))}
              </Select>
            </div>
            {loading ? (
              <Spin />
            ) : (
              <Table dataSource={classList} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherReport;
