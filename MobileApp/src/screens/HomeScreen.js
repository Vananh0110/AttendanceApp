import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Appbar, Avatar, BottomNavigation, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Calendar, LocaleConfig} from 'react-native-calendars';

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
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
};

LocaleConfig.defaultLocale = 'en';

const HomeScreen = () => {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'schedule', title: 'Schedule', icon: 'calendar' },
    { key: 'report', title: 'Report', icon: 'file' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeTab,
    schedule: ScheduleTab,
    report: ReportTab,
  });

  const renderIcon = ({ route, color }) => (
    <MaterialCommunityIcons name={route.icon} color={color} size={24} />
  );

  const handleTabPress = (newIndex) => {
    setIndex(newIndex);
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
        <Appbar.Action
          icon="menu"
          color={theme.colors.onSurface}
          onPress={() => {}}
        />
        <Appbar.Content
          title="App Title"
          titleStyle={[styles.title, { color: theme.colors.text }]}
        />
        <Appbar.Action
          icon={({ color }) => (
            <Avatar.Icon size={24} icon="account" color={color} />
          )}
          color={theme.colors.onSurface}
          onPress={() => {}}
        />
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleTabPress}
        renderScene={renderScene}
        renderIcon={renderIcon}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.onSurface}
        barStyle={styles.bottomNavigation}
        labeled={true}
      />
    </View>
  );
};

const HomeTab = () => {
  const [selected, setSelected] = React.useState('');

  return (
    <ScrollView style={styles.homeTabContainer}>
      <View style={styles.calendar}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent:true, selectedDotColor: 'orange'}
          }}
        />
      </View>
    </ScrollView>
  );
};

const ScheduleTab = () => (
  <View style={styles.scheduleTabContainer}>
    <Text>Schedule</Text>
  </View>
);

const ReportTab = () => (
  <View style={styles.reportTabContainer}>
    <Text>Report</Text>
  </View>
);

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
  bottomNavigation: {
    backgroundColor: 'transparent',
    elevation: 2,
  },
  homeTabContainer: {

  },

  scheduleTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;