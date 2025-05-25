import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useXMPP } from '../src/hooks/useXMPP';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const { connect } = useXMPP();
  const router = useRouter();
  const theme = useTheme();

  const handleRegister = async () => {
    setStatus('🔧 Creating account...');
    setLoading(true);
    try {
      const success = await connect(username, password);
      if (success) {
        setStatus('✅ Account created! Redirecting...');
        router.replace('/chat-list');
      } else {
        setStatus('❌ Failed to create account.');
      }
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
      >
        Create Account
      </Button>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#00695C',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 12,
    borderRadius: 30,
  },
  status: {
    marginTop: 16,
    textAlign: 'center',
    color: '#D32F2F',
  },
});
// This screen allows users to create a new account by entering a username and password.
// It uses the `useXMPP` hook to connect to the XMPP server and handle account creation.