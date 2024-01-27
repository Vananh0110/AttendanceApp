import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Điều hướng đến màn hình LoginScreen
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    // Điều hướng đến màn hình RegisterScreen
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../images/Welcome.gif')} style={styles.image} />
      </View>

      <View style={styles.contentContainer}>
        <Title style={styles.title}>Welcome to Attendance App</Title>

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonLoginText}>Login</Text>
        </Button>

        <Button mode="outlined" onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonRegisterText}>Register</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  buttonLoginText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonRegisterText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default WelcomeScreen;
