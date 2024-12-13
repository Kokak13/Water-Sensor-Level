import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  ImageBackground 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Adjust based on your project structure

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('About');
    } catch (error) {
      console.error('Error signing up: ', error.message);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login functionality not implemented yet.');
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://wallpapers.com/images/hd/dark-green-fern-plants-pclw350z9m1rc7nx.jpg' }}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#7cccc7" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: '#fff' }]} // Text color white
            placeholder="Email"
            placeholderTextColor="#fff" // Placeholder color white
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#7cccc7" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: '#fff' }]} // Text color white
            placeholder="Password"
            placeholderTextColor="#fff" // Placeholder color white
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#7cccc7" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: '#fff' }]} // Text color white
            placeholder="Confirm Password"
            placeholderTextColor="#fff" // Placeholder color white
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <Text style={styles.linkText}>
          Log in with{' '}
          <Text 
            style={styles.googleLink} 
            onPress={handleGoogleLogin}>
            Google
          </Text>
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole screen
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    bottom: 20,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0A6522',
  },
  inputContainer: {
    top: 86,
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderWidth: 1,
    borderColor: '#0A6522',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    top: 100,
    borderWidth: 1,
    borderColor: '#0A6522',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 300,
    marginBottom: 14,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  orText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    top: 100,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    top: 100,
  },
  googleLink: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
