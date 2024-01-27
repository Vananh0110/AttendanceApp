import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Appbar, Drawer, Avatar, BottomNavigation, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import TeacherScheduleTable from '../../components/teacher/TeacherScheduleTable';
import TeacherCalendar from '../../components/teacher/TeacherCalendar';
import TeacherReport from '../../components/teacher/TeacherReport';

const TeacherHomeScreen = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false); // State to control the account modal display
  const navigation = useNavigation();

  const getCurrentTitle = () => {
    switch (index) {
      case 0:
        return 'Home';
      case 1:
        return 'Schedule';
      case 2:
        return 'Report';
      default:
        return '';
    }
  };

  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'schedule', title: 'Schedule', icon: 'calendar' },
    { key: 'report', title: 'Report', icon: 'file' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeTab theme={theme} showCalendar={showCalendar} setShowCalendar={setShowCalendar} />,
    schedule: ScheduleTab,
    report: ReportTab,
  });

  const renderIcon = ({ route, color }) => (
    <MaterialCommunityIcons name={route.icon} color={color} size={24} />
  );

  const handleTabPress = (newIndex) => {
    setIndex(newIndex);
  };

  const openAccountModal = () => {
    setShowAccountModal(true);
  };

  const closeAccountModal = () => {
    setShowAccountModal(false);
  };

  const handleLogout = () => {
    navigation.navigate('Login');  
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
        <Appbar.Action icon="menu" color={theme.colors.onSurface} onPress={() => {}} />
        <Appbar.Content
          title={getCurrentTitle()}
          titleStyle={[styles.title, { color: theme.colors.text }]}
        />
        <Appbar.Action
          icon={({ color }) => <Avatar.Icon size={24} icon="account" color={color} />}
          color={theme.colors.onSurface}
          onPress={openAccountModal}
        />
      </Appbar.Header>

      {/* Bottom Navigation */}
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

      {/* Account Modal */}
      <Modal visible={showAccountModal} animationType="slide" transparent>
        <View style={styles.accountModalContainer}>
          <View style={[styles.accountModalContent, { backgroundColor: theme.colors.surface }]}>
            <Text style={styles.accountModalTitle}>Account Options</Text>
            <TouchableOpacity style={styles.accountOption} onPress={() => {}}>
              <Text style={styles.accountOptionText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountOption} onPress={handleLogout}>
              <Text style={styles.accountOptionText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountModalClose} onPress={closeAccountModal}>
              <Text style={styles.accountModalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const HomeTab = ({ theme, showCalendar, setShowCalendar }) => {
  const route = useRoute();
  const userName = route.params?.user?.name;
  const userEmail = route.params?.user?.email;

  return (
    <TeacherCalendar
      theme={theme}
      showCalendar={showCalendar}
      setShowCalendar={setShowCalendar}
      userName={userName}
      userEmail={userEmail}
    />
  );
};

const ScheduleTab = () => {
  const route = useRoute();
  const userEmail = route.params?.user?.email;

  return (
    <View style={styles.scheduleTabContainer}>
      {/* Your code for displaying the teacher's class schedule */}
      <TeacherScheduleTable userEmail={userEmail} />
    </View>
  );
};

const ReportTab = () => {
  const route = useRoute();
  const userEmail = route.params?.user?.email;
  const userName = route.params?.user?.name;
  return <
    TeacherReport userName={userName}
    userEmail={userEmail}
    />;
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
  bottomNavigation: {
    backgroundColor: 'transparent',
    elevation: 2,
  },
  homeTabContainer: {},
  scheduleTabContainer: {
    flex: 1,
  },
  reportTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Account Modal styles
  accountModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  accountModalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  accountModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  accountOption: {
    paddingVertical: 8,
  },
  accountOptionText: {
    fontSize: 16,
  },
  accountModalClose: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  accountModalCloseText: {
    color: 'gray',
  },
});

export default TeacherHomeScreen;
