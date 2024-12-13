import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function AboutScreen() {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(60);
  const [ledStatus, setLedStatus] = useState('Fetching LED status...');
  const [statusMessage, setStatusMessage] = useState(''); // Display LED status message

  // Countdown timer logic
  useEffect(() => {
    setSeconds(60);
  }, []);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [seconds]);

  // Fetch LED status from ESP32
  useEffect(() => {
    const fetchLedStatus = () => {
      axios
        .get('http://192.168.1.50/ledStatus') // Replace with your ESP32 IP address and endpoint
        .then((response) => {
          if (response.data && response.data.status) {
            setLedStatus(response.data.status);

            // Update the status message based on LED color
            if (response.data.status === 'GREEN') {
              setStatusMessage('LED GREEN: ON');
            } else if (response.data.status === 'RED') {
              setStatusMessage('LED RED: ON');
            } else if (response.data.status === 'BLUE') {
              setStatusMessage('LED BLUE: ON');
            } else {
              setStatusMessage('Invalid LED status');
            }
          } else {
            setLedStatus('Invalid response from ESP32');
            setStatusMessage('Unable to fetch LED status');
          }
        })
        .catch((error) => {
          console.error('Error fetching LED status:', error.message);
          setLedStatus('Error fetching LED status');
          setStatusMessage('Error fetching LED status');
        });
    };

    fetchLedStatus();
    const interval = setInterval(fetchLedStatus, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Timer Section */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Countdown Timer</Text>
        <Text style={styles.value}>{seconds}s</Text>
      </View>

      {/* LED Status Buttons */}
      <View style={styles.ledButtonContainer}>
        <TouchableOpacity
          style={[styles.ledButton, { backgroundColor: 'green' }]}
          onPress={() => setStatusMessage('LED GREEN: ON')}
        >
          <Text style={styles.ledButtonText}>LED GREEN: ON</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ledButton, { backgroundColor: 'red' }]}
          onPress={() => setStatusMessage('LED RED: ON')}
        >
          <Text style={styles.ledButtonText}>LED RED: ON</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ledButton, { backgroundColor: 'blue' }]}
          onPress={() => setStatusMessage('LED BLUE: ON')}
        >
          <Text style={styles.ledButtonText}>LED BLUE: ON</Text>
        </TouchableOpacity>
      </View>

      {/* LED Status Section */}
      <View style={styles.sensorMessageContainer}>
        <Text style={styles.statusMessage}>{statusMessage}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timerContainer: {
    justifyContent: 'center',
    backgroundColor: '#dad5ae',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 50,
  },
  timerText: {
    fontSize: 24,
    color: '#336234',
    textAlign: 'center',
  },
  ledButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  ledButton: {
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ledButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sensorMessageContainer: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  statusMessage: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'gold',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: 100,
  },
  buttonText: {
    textAlign: 'center',
  },
  value: {
    fontSize: 100,
    color: '#434a2a',
    textAlign: 'center',
  },
});

export default AboutScreen;
