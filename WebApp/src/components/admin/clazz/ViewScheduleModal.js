import React, { useState, useEffect } from 'react';
import { Modal, Table, Space, Tooltip, Input } from 'antd';
import { CheckSquareOutlined, CameraOutlined } from '@ant-design/icons';
import CheckBoxModal from './CheckBoxModal';
import axios from 'axios';

const ViewScheduleModal = ({ clazz, visible, onClose, teacher_name, teacher_email }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCheckBoxModalVisible, setViewCheckBoxModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/getScheduleByClazzId/${clazz.id}`);
        setSchedules(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (visible) {
      fetchSchedules();
    }
  }, [visible, clazz]);

  const handleCheckBoxClick = (record) => {
    setSelectedSchedule(record);
    setViewCheckBoxModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredSchedules = schedules.filter((schedule) =>
    Object.values(schedule).some((fieldValue) =>
      String(fieldValue).toLowerCase().includes(searchText.toLowerCase())
    )
  );


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Thứ trong tuần',
      dataIndex: 'day_of_week',
      key: 'day_of_week',
    },
    {
      title: 'Ngày',
      dataIndex: 'clazz_date',
      key: 'clazz_date',
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_time',
      key: 'start_time',
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'end_time',
      key: 'end_time',
    },
    {
      title: 'Phòng học',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Tooltip title="Checkbox">
            <CheckSquareOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleCheckBoxClick(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Face Recognition">
            <CameraOutlined />
          </Tooltip>
        </Space>
      ),
    },

  ];

  

  return (
    <Modal
      visible={visible}
      title="Thời khóa biểu"
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <Input.Search
        placeholder="Tìm kiếm"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={filteredSchedules} columns={columns} />

      {selectedSchedule && (
        <CheckBoxModal
          visible={viewCheckBoxModalVisible}
          attendance_date={selectedSchedule.clazz_date}
          clazz_code={clazz.clazz_code}
          onClose={() => setViewCheckBoxModalVisible(false)}
          teacher_name = {teacher_name}
          teacher_email = {teacher_email}
        />
      )}
    </Modal>
  );
};

export default ViewScheduleModal;