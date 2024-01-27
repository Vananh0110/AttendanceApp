import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Appbar, List, useTheme, RadioButton } from 'react-native-paper';
import axios from 'axios';

const StudentListScreen = ({ route }) => {
  const theme = useTheme();
  const { teacherEmail, attendanceDate, clazzCode } = route.params;
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  // Function to fetch students for the selected class code
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/attendances/students/${teacherEmail}/${attendanceDate}/${clazzCode}`);
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    // Fetch students when the component mounts
    fetchStudents();
  }, []);

  // Function to filter students by status
  const handleFilterChange = (status) => {
    setStatusFilter(status);
    if (status === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) => student.status === status);
      setFilteredStudents(filtered);
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
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Class ${clazzCode}`} />
      </Appbar.Header>

      {/* Student Count and Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.studentCountText}>Total Students: {filteredStudents.length}</Text>
        <View style={styles.radioGroup}>
          <Text style={styles.filterText}>Filter by Status:</Text>
          <RadioButton.Group onValueChange={handleFilterChange} value={statusFilter}>
            <View style={styles.radioOption}>
              <RadioButton value="A" color={theme.colors.primary} />
              <Text style={styles.radioText}>Absent</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="P" color={theme.colors.primary} />
              <Text style={styles.radioText}>Present</Text>
            </View>
          </RadioButton.Group>
        </View>
      </View>

      {/* Student List */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.student_code}
        renderItem={({ item }) => (
          <List.Item
            key={item.student_code}
            title={item.student_name}
            description={`Code: ${item.student_code}, Status: ${item.status}`}
          />
        )}
      />
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
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  studentCountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterText: {
    fontSize: 16,
    marginRight: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 16,
  },
});

export default StudentListScreen;
