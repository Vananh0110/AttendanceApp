import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme, Card } from 'react-native-paper';
import axios from 'axios';

const StudentScheduleTable = ({ userEmail }) => {
  const theme = useTheme();
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/getSchedulesByStudentEmail/${userEmail}`);
        setScheduleData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userEmail]);

  // Định dạng lại start_time và end_time
  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}`);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <ScrollView style={styles.container}>
      {scheduleData.map((item, index) => (
        <Card key={index} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title title={item.day_of_week} titleStyle={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.primary,
            }} />
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
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    marginVertical: 8,
    elevation: 2, // Độ nổi của card (shadow)
    borderRadius: 8, // Bo góc của card
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
});

export default StudentScheduleTable;
