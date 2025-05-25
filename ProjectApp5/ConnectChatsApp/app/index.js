import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { RFPercentage } from 'react-native-responsive-fontsize';

const screenWidth = Dimensions.get('window').width;

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Animation.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Welcome to ConnectChatsApp
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
          Your messaging platform
        </Text>

        <Button
          mode="contained"
          onPress={() => router.push('/login')}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push('/register')}
          style={[styles.buttonOutlined, { borderColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
        >
          Crear cuenta
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: RFPercentage(4), // ~28px en pantallas normales
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: RFPercentage(2.5), // ~18px
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    width: screenWidth * 0.8, // 80% del ancho
    marginVertical: 10,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonOutlined: {
    width: screenWidth * 0.8,
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonContent: {
    paddingVertical: RFPercentage(1.5), // ~10px vertical
    borderRadius: 30,
  },
});
// //     borderRadius: 30,
// //     elevation: 4,