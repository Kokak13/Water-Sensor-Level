import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const HomepageScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://wallpapers.com/images/hd/dark-green-fern-plants-pclw350z9m1rc7nx.jpg' }} // Replace with your image URL
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.subHeader}>Create Account</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* Sign Up button */}
          <TouchableOpacity 
            style={styles.buttonPrimary} 
            onPress={() => navigation.navigate('Signup')} // Navigate to Signup screen
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Log In button */}
          <TouchableOpacity 
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('Login')} // Navigate to Login screen
          >
            <Text style={styles.buttonTextSecondary}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerContainer: {
    marginTop: 200,
    alignItems: 'center',
  },
  subHeader: {
    top: 200,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0A6522',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 80,
  },
  buttonPrimary: {
    borderColor: '#0A6522',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 28,
    width: '34%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff', // Changed to white
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#0A6522',
    paddingVertical: 15,
    borderRadius: 28,
    width: '34%',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#fff', // Changed to white
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomepageScreen;
