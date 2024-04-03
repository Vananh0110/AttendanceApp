import React, { useEffect, useState } from 'react';
import Sidebar, { SidebarItem } from '../../../components/Sidebar';
import {
  CalendarDays,
  BookText,
  LogOut,
  Users,
  ChevronRight,
  SquarePen,
  Save,
} from 'lucide-react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Table, Spin, Select, message } from 'antd';

const { Option } = Select;

const AttendanceClass = () => {
  const { clazzCode } = useParams();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSelects, setShowSelects] = useState({});
  const [selectedValues, setSelectedValues] = useState({});

  const fetchUserData = () => {
    const userString = sessionStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    setUser(userData);
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/getStudentListByClazzCode/${clazzCode}`
      );
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchDates = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/getDateByClassCode/${clazzCode}`
      );
      const extractedDates = response.data.map((item) => item.clazz_date);

      setDates(extractedDates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchStudents();
    fetchDates();
  }, []);

  const handleSelectChange = (value, record, date) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [`${record.student_name}_${record.student_code}_${date}`]: {
        value: value || 'P',
        date,
      },
    }));
  };

  const handleEditClick = (date) => {
    setShowSelects((prevShowSelects) => ({
      ...prevShowSelects,
      [date]: !prevShowSelects[date],
    }));
  };

  const handleSaveClick = async () => {
    try {
      const attendanceData = Object.entries(selectedValues).map(
        ([key, value]) => ({
          teacher_name: user.name,
          teacher_email: user.email,
          clazz_code: clazzCode,
          student_code: key.split('_')[1],
          status: value.value,
          student_name: key.split('_')[0],
          date: value.date,
        })
      );
      console.log(attendanceData);
      await axios.post(
        'http://127.0.0.1:8000/api/attendances/storeList',
        attendanceData
      );
      message.success('Dữ liệu đã được lưu thành công.');
    } catch (error) {
      console.error('Error saving attendance data', error);
      message.error('Có lỗi xảy ra khi lưu dữ liệu.');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'student_code',
      key: 'student_code',
    },
    ...dates.map((date) => ({
      title: (
        <div>
          {date}
          <div className="flex">
            <SquarePen size={18} onClick={() => handleEditClick(date)} />
            <Save className="ms-3" size={18} onClick={handleSaveClick} />
          </div>
        </div>
      ),
      dataIndex: date,
      key: date,
      render: (text, record) => (
        <Select
          value={
            selectedValues[
              `${record.student_name}_${record.student_code}_${date}`
            ]?.value || 'P'
          }
          style={{ width: 120 }}
          onChange={(value) => handleSelectChange(value, record, date)}
          disabled={!showSelects[date]}
        >
          <Option value="A">A</Option>
          <Option value="P">P</Option>
          <Option value="UA">UA</Option>
        </Select>
      ),
    })),
  ];

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Sidebar */}
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
          <SidebarItem icon={<BookText size={20} />} text="Report" />
          <hr className="bg-gray-200" />
          <SidebarItem icon={<LogOut size={20} />} text="Logout" to="/login" />
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
          <div className="p-5 text-2xl font-semibold flex items-center">
            <span>
              <Link to="/teacher/attendance">Danh sách lớp</Link>
            </span>
            <ChevronRight className="ml-3 mr-3" />
            <span> {clazzCode}</span>
          </div>
          <div className="bg-white p-5 m-4 shadow-md rounded-sm">
            <div className="m-4 text-xl font-semibold">
              Danh sách sinh viên ({students.length})
            </div>
            {loading ? (
              <Spin />
            ) : (
              <Table
                dataSource={students}
                columns={columns}
                pagination={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceClass;
