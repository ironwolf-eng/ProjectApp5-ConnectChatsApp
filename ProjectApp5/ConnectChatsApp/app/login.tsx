import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useXMPP } from '../src/hooks/useXMPP';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext'; // ✅ importamos el contexto de auth

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const { connect } = useXMPP();
  const { login } = useAuth(); // ✅ usamos login del contexto
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    setStatus('🔌 Connecting...');
    setLoading(true);
    try {
      const success = await connect(username, password);
      if (success) {
        login(username); // ✅ guardamos el usuario en el contexto global
        setStatus('✅ Login successful! Redirecting...');
        router.replace('/chat-list');
      } else {
        setStatus('❌ Login failed. Check credentials.');
      }
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ConnectChats Login</Text>
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
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
      >
        Login
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
    color: '#4A148C',
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
//   },
//   },