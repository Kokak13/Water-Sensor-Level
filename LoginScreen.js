import React, { useState } from "react";
import { 
  View, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  ImageBackground 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("About"); // Navigate to the About screen
      })
      .catch(() => {
        Alert.alert("Error", "Invalid credentials");
      });
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Google login functionality not implemented yet.");
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.wallpaperscraft.ru/image/single/listia_zelenyj_rastenie_122801_168x300.jpg" }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#7cccc7" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc" // Set placeholder color
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#7cccc7" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc" // Set placeholder color
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.orglaz}>or</Text>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Log in with </Text>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <Text style={styles.googleLink}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional overlay effect
    paddingHorizontal: 16,
  },
  inputContainer: {
    top: 120,
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    borderWidth: 1,
    borderColor: '#0A6522',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#fff", // Text color set to white
  },
  icon: {
    marginRight: 10,
  },
  orglaz: {
    top: 156,
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    top: 130,
    borderWidth: 1,
    borderColor: '#0A6522',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 300,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    top: 150,
  },
  linkText: {
    fontSize: 18,
    color: "#fff",
  },
  googleLink: {
    fontSize: 16,
    color: "#fff", // Google blue color
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
