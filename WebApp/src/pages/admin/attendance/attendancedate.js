import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List } from 'antd';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

const AttendanceDate = () => {
  const { id, clazzCode } = useParams();
  const [attendanceDates, setAttendanceDates] = useState([]);

  const fetchAttendanceDates = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/attendances/getAttendanceDateByClassCode/${clazzCode}`);
      setAttendanceDates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttendanceDates();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Điểm danh - Danh sách ngày điểm danh</h1>
        </div>
        {/* Hiển thị danh sách ngày điểm danh */}
        {attendanceDates.length > 0 ? (
          <List
            bordered
            dataSource={attendanceDates}
            renderItem={item => (
              <List.Item>
                <Link to = {`/attendance/list/${id}/${clazzCode}/${item.attendance_date}`}>
                {item.attendance_date}
                </Link>
              </List.Item>
            )}
          />
        ) : (
          <p>No Data</p>
        )}
      </div>
    </>
  );
};

export default AttendanceDate;
