import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
};

LocaleConfig.defaultLocale = 'en';

const StudentCalendar = ({ theme, showCalendar, setShowCalendar, userName, userEmail }) => {
  const [selected, setSelected] = useState('');
  const [scheduleData, setScheduleData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Gọi API khi component được render lần đầu tiên
    fetchData(new Date());
  }, []);
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

  const fetchData = async (date) => {
    try {
      const dateString = formatDate(date);
      const response = await axios.get(`http://127.0.0.1:8000/api/getSchedulesByStudentEmailAndDate/${userEmail}/${dateString}`);
      setScheduleData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDayPress = async (day) => {
    setSelected(day.dateString);
    try {
      const dateString = day.dateString;
      const response = await axios.get(`http://127.0.0.1:8000/api/getSchedulesByStudentEmailAndDate/${userEmail}/${dateString}`);
      setScheduleData(response.data);
    } catch (error) {
      setScheduleData([]);
      console.error('Error fetching data:', error);
    }
  };

  const formatTime = (time) => {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <ScrollView style={styles.homeTabContainer}>
      <View style={styles.userName}>
        <Text style={[styles.userNameText, { color: theme.colors.primary }]}>
          Welcome {userName}
        </Text>
      </View>
      <Card style={[styles.calendarCard, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity
          style={styles.calendarIcon}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <MaterialCommunityIcons
            name={showCalendar ? 'calendar-month' : 'calendar-week'}
            color={theme.colors.primary}
            size={30}
          />
          <Text style={[styles.calendarTextCenter, { color: theme.colors.primary }]}>Calendar</Text>
          <Text style={[styles.calendarText, { color: theme.colors.primary }]}>
            {showCalendar ? 'Show' : 'Hide'}
          </Text>
        </TouchableOpacity>
        {showCalendar ? (
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
            }}
          />
        ) : null}
      </Card>
      {/* Hiển thị dữ liệu chi tiết */}
      {scheduleData.length > 0 ? (
        scheduleData.map((item, index) => (
          <TouchableOpacity
            key = {index}
            onPress={() => 
              navigation.navigate('StudentScheduleDetail', {
                course_name: item.course_name,
                destination: item.destination,
                clazz_code: item.clazz_code,
                start_time: formatTime(item.start_time),
                end_time: formatTime(item.end_time),
                clazz_date: item.clazz_date,
                course_code: item.course_code,
                userName: userName,
                teacher_name: item.teacher_name,
              })
            }
            >
            <Card key={index} style={[styles.scheduleCard, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <Text style={[styles.courseName, { color: theme.colors.accent }]}>
                {item.course_name}
                </Text>
                <Text style={styles.text}>Mã học phần: {item.course_code}</Text>
                <View style={styles.row}>
                  <Text style={styles.text}>Mã lớp: {item.clazz_code}</Text>
                  <Text style={styles.text}>{item.destination}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Thời gian: {formatTime(item.start_time)} - {formatTime(item.end_time)}</Text>
                </View>
                
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))
      ) : (
        <Card style={[styles.noScheduleCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={styles.noScheduleText}>No schedule</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeTabContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  calendarCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    borderRadius: 8,
  },
  calendarIcon: {
    alignItems: 'center',
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  calendarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarTextCenter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
  },
  noScheduleCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  noScheduleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default StudentCalendar;
