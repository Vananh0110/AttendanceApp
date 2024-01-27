import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

const FaceRecognitionScreen = ({ route, navigation }) => {
  // Get the course details from the route params
  const { course_name, destination, clazz_code, start_time, end_time, userName, course_code } = route.params;
  const theme = useTheme();
  // Handle Go Back
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
          title="Face Recognition" // Set the App Title for the ScheduleDetailScreen
          titleStyle={[styles.title, { color: theme.colors.text }]}
        />
      </Appbar.Header>
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
});

export default FaceRecognitionScreen;
