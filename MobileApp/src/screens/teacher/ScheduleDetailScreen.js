import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Appbar, Avatar, Card, useTheme, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ScheduleDetailScreen = ({ route }) => {
  const { course_name, destination, clazz_code, start_time, end_time, userName, userEmail, course_code, clazz_date } = route.params;
  const theme = useTheme();
  const navigation = useNavigation();
  const [studentList, setStudentList] = useState([]);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [useFaceRecognition, setUseFaceRecognition] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleAttendanceOptions = () => {
    setShowAttendanceModal(true);
  };

  const handleStudentInfo = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleAttendanceModalClose = () => {
    setShowAttendanceModal(false);
  };

  const handleStudentModalClose = () => {
    setShowStudentModal(false);
  };

  const handleAttendanceTypeSelect = (useFaceRecognition) => {
    setUseFaceRecognition(useFaceRecognition);
    setShowAttendanceModal(false);

    if (useFaceRecognition) {
      navigation.navigate('FaceRecognition', {
        course_name,
        destination,
        clazz_code,
        start_time,
        end_time,
        userName,
        course_code,
        studentList,
        clazz_date,
        userEmail,
      });
    } else {
      navigation.navigate('CheckBox', {
        course_name,
        destination,
        clazz_code,
        start_time,
        end_time,
        userName,
        course_code,
        studentList,
        clazz_date,
        userEmail,
      });
    }
  };

  const fetchStudentList = async (clazzCode) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/getStudentListByClazzCode/${clazzCode}`);
      const data = await response.json();
      setStudentList(data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  useEffect(() => {
    fetchStudentList(clazz_code);
  }, []);

  return (
    <ScrollView style={styles.container}>
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
          title="Schedule Detail"
          titleStyle={[styles.title, { color: theme.colors.text }]}
        />
        <Appbar.Action
          icon="account-check"
          color={theme.colors.onSurface}
          onPress={handleAttendanceOptions}
        />
      </Appbar.Header>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title="Thông tin chi tiết lớp"
          titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
        />
        <Card.Content>
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            <Text style={styles.detailLabel}>Tên học phần:</Text> {course_name}
          </Text>
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            <Text style={styles.detailLabel}>Mã học phần:</Text> {course_code}
          </Text>
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            <Text style={styles.detailLabel}>Mã lớp:</Text> {clazz_code}
          </Text>
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            <Text style={styles.detailLabel}>Địa điểm:</Text> {destination}
          </Text>
          <Text style={[styles.detailText, { color: theme.colors.text }]}>
            <Text style={styles.detailLabel}>Thời gian:</Text> {start_time} - {end_time}
          </Text>
        </Card.Content>
      </Card>
      <Text style={[styles.titleList, {color: theme.colors.primary }]}>
        {`Danh sách sinh viên (${studentList.length})`}
      </Text>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface, marginTop: 16 }]}>
        <Card.Content>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { color: theme.colors.primary }]}>Tên sinh viên</Text>
              <Text style={[styles.tableHeaderCell, { color: theme.colors.primary }]}>Mã số sinh viên</Text>
            </View>

            {/* Table Body */}
            {studentList.map((student) => (
              <TouchableOpacity
                key={student.student_code}
                style={styles.tableRow}
                onPress={() => handleStudentInfo(student)}
              >
                <Text style={styles.tableCell}>{student.student_name}</Text>
                <Text style={styles.tableCell}>{student.student_code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Attendance Options Modal */}
      <Modal visible={showAttendanceModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>Chọn hình thức điểm danh</Text>
              <IconButton
                icon="close"
                size={24}
                style={styles.modalCloseIcon}
                onPress={handleAttendanceModalClose}
              />
            </View>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleAttendanceTypeSelect(false)}
            >
              <Text style={styles.modalOptionText}>Checkbox</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleAttendanceTypeSelect(true)}
            >
              <Text style={styles.modalOptionText}>Face Recognition</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Student Information Modal */}
      <Modal visible={showStudentModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>Thông tin sinh viên</Text>
              <IconButton
                icon="close"
                size={24}
                style={styles.modalCloseIcon}
                onPress={handleStudentModalClose}
              />
            </View>
            {selectedStudent && (
              <View style={styles.studentInfo}>
                <Text style={styles.studentInfoLabel}>Tên sinh viên:</Text>
                <Text style={[styles.studentInfoText, { color: theme.colors.text }]}>
                  {selectedStudent.student_name}
                </Text>
                <Text style={styles.studentInfoLabel}>Mã số sinh viên:</Text>
                <Text style={[styles.studentInfoText, { color: theme.colors.text }]}>
                  {selectedStudent.student_code}
                </Text>
                <Text style={styles.studentInfoLabel}>Email:</Text>
                <Text style={[styles.studentInfoText, { color: theme.colors.text }]}>
                  {selectedStudent.student_email}
                </Text>
                <Text style={styles.studentInfoLabel}>Giới tính:</Text>
                <Text style={[styles.studentInfoText, { color: theme.colors.text }]}>
                  {selectedStudent.gender}
                </Text>
                <Text style={styles.studentInfoLabel}>Ngày sinh:</Text>
                <Text style={[styles.studentInfoText, { color: theme.colors.text }]}>
                  {selectedStudent.date_of_birth}
                </Text>
                {/* Add other student information here */}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  card: {
    marginHorizontal: 16,
    elevation: 2,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 24,
    marginTop: 8,
  },
  detailLabel: {
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCloseIcon: {
    marginRight: -12,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  // Student Information Modal styles
  studentInfoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  studentInfoText: {
    fontSize: 16,
    paddingBottom: 8,
  },
});

export default ScheduleDetailScreen;
