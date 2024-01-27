import React, { useEffect, useState } from 'react';
import Sidebar, { SidebarItem } from '../../../components/Sidebar';
import { LayoutDashboard, CalendarDays, BookText } from 'lucide-react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const events = [
    {
      title: 'Event 1',
      start: new Date(2024, 0, 27),
      end: new Date(2024, 0, 28),
    },
    {
      title: 'Event 2',
      start: new Date(2024, 0, 28),
      end: new Date(2024, 0, 29),
    },
    // Add more events as needed
  ];

  return (
    <div className="bg-white p-5 m-4 shadow-md rounded-md">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
      />
    </div>
  );
};

const TeacherCalendar = () => {
  const [user, setUser] = useState(null);

  const fetchUserData = () => {
    const userString = sessionStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    console.log(userData);
    setUser(userData);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar user={user}>
          <SidebarItem
            icon={<CalendarDays size={20} />}
            text="Calendars"
            alert
          />
          <SidebarItem icon={<BookText size={20} />} text="Report" />
        </Sidebar>

        <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default TeacherCalendar;
