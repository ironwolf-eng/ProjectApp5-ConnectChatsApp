import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

export default function WhatsAppLayout({ children }) {
  return (
    <ImageBackground
      source={require('../assets/chat-background.png')} // ✅ asegúrate de tener esta imagen en assets
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // semitransparente para legibilidad
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
