import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, List, useTheme, IconButton } from 'react-native-paper';
import axios from 'axios';

const StudentReport = ({ userName, userEmail }) => {
  const theme = useTheme();
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [classCodes, setClassCodes] = useState([]);
  const [selectedClassCode, setSelectedClassCode] = useState('');
  const [students, setStudents] = useState([]);

  // Function to fetch attendance dates for the teacher
  const fetchAttendanceDates = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/attendances/student/dates/${userName}`);
      setAttendanceDates(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching attendance dates:', error);
    }
  };

  // Function to fetch class codes for the selected date
  const fetchClassCodes = async (attendanceDate) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/attendances/student/clazzcode/${userName}/${attendanceDate}`);
      setClassCodes(response.data);
    } catch (error) {
      console.error('Error fetching class codes:', error);
    }
  };

  // Function to fetch students for the selected class code
  const fetchStudents = async (attendanceDate, clazzCode) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/attendances/student/attendancelist/${attendanceDate}/${clazzCode}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    // Fetch attendance dates when the component mounts
    fetchAttendanceDates();
  }, []);

  // Function to handle date selection
  const handleDateSelect = (attendanceDate) => {
    setSelectedDate(attendanceDate);
    setClassCodes([]);
    setSelectedClassCode('');
    setStudents([]);
    fetchClassCodes(attendanceDate);
  };

  // Function to handle class code selection
  const handleClassCodeSelect = (clazzCode) => {
    setSelectedClassCode(clazzCode);
    fetchStudents(selectedDate, clazzCode);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Appbar.Header
        style={styles.appbar}
        theme={{
          colors: {
            surface: theme.colors.surface,
            onSurface: theme.colors.onSurface,
          },
          elevation: 0,
        }}
      >
        <Appbar.Content
          title="Attendance Report"
          titleStyle={[styles.title, { color: theme.colors.text }]}
        />
      </Appbar.Header>

      {/* Attendance Dates */}
      <ScrollView>
        <List.Section>
          <List.Subheader style={styles.subheader}>Attendance Dates</List.Subheader>
          {attendanceDates.map((date) => (
            <TouchableOpacity key={date.attendance_date} onPress={() => handleDateSelect(date.attendance_date)}>
              <View style={styles.card}>
                <Text style={styles.dateText}>{date.attendance_date}</Text>
                <IconButton
                  icon="chevron-down"
                  color={theme.colors.primary}
                  size={24}
                  onPress={() => handleDateSelect(date.attendance_date)}
                />
              </View>
            </TouchableOpacity>
          ))}
        </List.Section>

        {/* Class Codes */}
        {selectedDate && (
          <List.Section>
            <List.Subheader style={styles.subheader}>Class Codes</List.Subheader>
            {classCodes.map((clazzCode) => (
              <TouchableOpacity key={clazzCode.clazz_code} onPress={() => handleClassCodeSelect(clazzCode.clazz_code)}>
                <View style={styles.card}>
                  <Text style={styles.classCodeText}>{clazzCode.clazz_code}</Text>
                  <IconButton
                    icon="chevron-down"
                    color={theme.colors.primary}
                    size={24}
                    onPress={() => handleClassCodeSelect(clazzCode.clazz_code)}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </List.Section>
        )}

        {/* Students */}
        {selectedClassCode && (
          <List.Section>
            <List.Subheader style={styles.subheader}>Students</List.Subheader>
            {students.map((student) => (
              <List.Item
                key={student.student_code}
                title={student.student_name}
                description={`${student.student_code} (${student.status})`}
              />
            ))}
          </List.Section>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: 'bold',
  },
  subheader: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontSize: 16,
  },
  classCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentReport;
