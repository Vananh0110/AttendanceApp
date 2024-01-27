import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ToastAndroid, Alert } from 'react-native';
import { Appbar, useTheme, Checkbox, Button } from 'react-native-paper';
import axios from 'axios';

const CheckBoxScreen = ({ route, navigation }) => {
  const { course_name, destination, clazz_code, start_time, end_time, userName, userEmail, course_code, studentList, clazz_date } = route.params;
  const theme = useTheme();
  const [checkboxState, setCheckboxState] = useState(() =>
    // Khởi tạo mảng trạng thái checkbox với giá trị mặc định là false cho tất cả sinh viên
    studentList.map((student) => ({ student_code: student.student_code, checked: false }))
  );

  // Xử lý khi người dùng thay đổi trạng thái checkbox
  const handleCheckboxChange = (studentCode) => {
    setCheckboxState((prevState) =>
      prevState.map((item) =>
        item.student_code === studentCode ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Handle Go Back
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoHome = () =>{
    navigation.navigate('TeacherHome');
  }
  const handleSaveAttendance = async () => {
    try {
      // Chuẩn bị dữ liệu điểm danh để gửi đến máy chủ
      const attendanceData = studentList.map((student, index) => ({
        student_name: student.student_name,
        student_code: student.student_code,
        status: checkboxState[index].checked ? 'P' : 'A',
        attendance_date: clazz_date,
        teacher_name: userName,
        teacher_email: userEmail,
        clazz_code: clazz_code,
      }));
  
      // Gửi dữ liệu điểm danh đến máy chủ sử dụng phương thức POST
      const response = await axios.post('http://127.0.0.1:8000/api/attendances/storeList', attendanceData);
      console.log('Attendance Data:', response.data);

      // console.log(attendanceData);

      Alert.alert(
        'Success',
        'You have successfully saved the attendance!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } catch (error) {
      // Xử lý bất kỳ lỗi nào xuất hiện trong quá trình gửi yêu cầu API (tuỳ chọn)
      // Ví dụ: bạn có thể hiển thị thông báo lỗi cho người dùng
      console.error('Error saving attendance:', error);
    }
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
        <Appbar.Action icon="arrow-left" color={theme.colors.onSurface} onPress={handleGoBack} />
        <Appbar.Content
          title="Attendance" // Set the App Title for the ScheduleDetailScreen
          titleStyle={[styles.title, { color: theme.colors.text }]}
        />
        <Appbar.Action icon="home" color={theme.colors.onSurface} onPress={handleGoHome}/>
      </Appbar.Header>

      {/* Student List */}
      <Text style={[styles.titleList, { color: theme.colors.primary }]}>
        {`Danh sách sinh viên (${studentList.length})`}
      </Text>
      <ScrollView>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeaderCell, { color: theme.colors.primary }]}>Tên sinh viên</Text>
            <Text style={[styles.tableHeaderCell, { color: theme.colors.primary }]}>Mã số sinh viên</Text>
            <Text style={[styles.tableHeaderCell, { color: theme.colors.primary }]}>Điểm danh</Text>
          </View>

          {/* Table Body */}
          {studentList.map((student, index) => (
            <View key={student.student_code} style={styles.tableRow}>
              <Text style={styles.tableCell}>{student.student_name}</Text>
              <Text style={styles.tableCell}>{student.student_code}</Text>
              <Checkbox.Android
                status={checkboxState[index].checked ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange(student.student_code)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Button */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSaveAttendance}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  tableContainer: {
    marginHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  tableHeaderCell: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 16,
  },
  titleList: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  button: {
    margin: 16,
  },
});

export default CheckBoxScreen;
