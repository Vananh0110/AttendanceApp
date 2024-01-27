import React, {useState} from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TextInput, Button, Text, Title, useTheme } from 'react-native-paper';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [roleId, setRoleId] = React.useState(null);
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Invalid input. Please enter a valid email and password.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });

      if (response && response.data) {
        console.log(response.data.user.role_id);
        setRoleId(response.data.user.role_id);
        if(response.data.user.role_id === 2) {
          navigation.navigate('TeacherHome', { user: response.data.user });
        } else if (response.data.user.role_id === 3) {
          navigation.navigate('StudentHome', { user: response.data.user });
        }
        // navigation.navigate('Home');
      } else {
        console.log('Failed');
        setError('Login failed. Please try again later.');
      }
    } catch (error) {
      setError('Login failed. Please try again later.');
    }
  };

  const handleForgotPassword = () => {
    // Xử lý khi người dùng nhấn vào "Forgot your password?"
    console.log('Forgot password');
  };

  const handleRegister = () => {
    // Điều hướng đến màn hình RegisterScreen
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login to your account</Title>

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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
          Forgot your password?
        </Text>
      </View>

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>

      <Text style={[styles.registerText]}>
        Don't have an account?{' '}
        <Text style={[styles.registerLink, { color: theme.colors.primary }]} onPress={handleRegister}>
          Register
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 16,
    textAlign: 'center',
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
