import React, { useState, useMemo, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Stack, Tabs, Slot, useSegments, useRouter } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import { ChatProvider, useChat } from '../src/context/ChatContext';
import { AuthProvider, useAuth } from '../src/context/AuthContext';

function TabScreens() {
  const { unreadCount } = useChat();
  const [isDark, setIsDark] = useState(false);

  const theme = useMemo(() => {
    return isDark ? MD3DarkTheme : MD3LightTheme;
  }, [isDark]);

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Text onPress={() => setIsDark((prev) => !prev)}>
                {isDark ? '🌞' : '🌙'}
              </Text>
            </View>
          ),
          tabBarActiveTintColor: '#4A148C',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tabs.Screen
          name="chat-list"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="chat-bubble" size={size} color={color} />
            ),
            tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contacts',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="contacts" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

function MainNavigator() {
  const segments = useSegments();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isAuthFlow =
    segments[0] === undefined || segments[0] === 'login' || segments[0] === 'register';

  useEffect(() => {
    if (!loading && !user && !isAuthFlow) {
      router.replace('/login');
    }
  }, [user, loading, isAuthFlow, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../assets/loading-animation.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  return isAuthFlow ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Slot />
    </Stack>
  ) : (
    <TabScreens />
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ChatProvider>
          <MainNavigator />
        </ChatProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A148C',
  },
});
// This file is part of the Expo Router documentation.
// It is not intended to be run as a standalone script.