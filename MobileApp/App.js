import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TeacherHomeScreen from './src/screens/teacher/TeacherHomeScreen'
import StudentHomeScreen from './src/screens/student/StudentHomeScreen'
import ScheduleDetailScreen from './src/screens/teacher/ScheduleDetailScreen';
import FaceRecognitionScreen from './src/screens/teacher/FaceRecognitionScreen';
import CheckBoxScreen from './src/screens/teacher/CheckBoxScreen';
import StudentScheduleDetailScreen from './src/screens/student/StudentScheduleDetailScreen';
import StudentListScreen from './src/screens/teacher/StudentListScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentHome"
          component={StudentHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeacherHome"
          component={TeacherHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleDetail"
          component={ScheduleDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FaceRecognition"
          component={FaceRecognitionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckBox"
          component={CheckBoxScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentScheduleDetail"
          component={StudentScheduleDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
