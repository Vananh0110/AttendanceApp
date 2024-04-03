import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar, { SidebarItem } from '../../../components/Sidebar';
import { CalendarDays, BookText, LogOut } from 'lucide-react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../../App.css';
import ClassModal from '../../../components/student/calendar/ClassModal';
const localizer = momentLocalizer(moment);

const StudentCalendar = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserData = () => {
    const userString = sessionStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    setUser(userData);
    if (userData && userData.email) {
      axios
        .get(
          `http://127.0.0.1:8000/api/getScheduleForStudentCalendar/${userData.email}`
        )
        .then((response) => {
          const apiEvents = response.data.map((event) => {
            const startDateTime = moment(
              `${event.clazz_date} ${event.start_time}`
            );
            const endDateTime = moment(`${event.clazz_date} ${event.end_time}`);

            return {
              title: (
                <div>
                  {event.clazz_code} - {event.destination}
                  <br />
                  {event.course_code} - {event.course_name}
                </div>
              ),
              start: startDateTime.toDate(),
              end: endDateTime.toDate(),
              clazz_code: event.clazz_code,
              destination: event.destination,
              course_code: event.course_code,
              course_name: event.course_name,
              start_time: event.start_time,
              end_time: event.end_time,
              teacher_name: event.teacher_name,
            };
          });

          setEvents(apiEvents);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
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
            to="/student/calendar"
          />
          <SidebarItem icon={<BookText size={20} />} text="Report" />
          <hr className="bg-gray-200" />
          <SidebarItem icon={<LogOut size={20} />} text="Logout" to="/login" />
        </Sidebar>

        <div className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
          <div className="bg-white p-5 m-4 shadow-md rounded-md">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700 }}
              views={['month', 'week', 'day']}
              defaultView="month"
              onSelectEvent={handleEventClick}
            />
          </div>
        </div>
      </div>
      <ClassModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        event={selectedEvent}
      />
    </div>
  );
};

export default StudentCalendar;
