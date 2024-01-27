import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Text, useTheme } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const theme = useTheme();

  const handleRegister = () => {
    // Xử lý đăng ký tại đây
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    navigation.navigate('Home');
  };

  const handleLogin = () => {
    // Điều hướng đến màn hình LoginScreen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register</Title>

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </Button>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={[styles.loginLink, { color: theme.colors.primary }]} onPress={handleLogin}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  loginText: {
    marginTop: 16,
    textAlign: 'center',
  },
  loginLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
