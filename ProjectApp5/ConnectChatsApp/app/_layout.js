import React, { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Tabs } from 'expo-router';
import { View, Button as RNButton } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import 'react-native-get-random-values';

import { ChatProvider, useChat } from '../src/context/ChatContext';
import { AuthProvider } from '../src/context/AuthContext';
import { SettingsProvider, useSettings } from '../src/context/SettingsContext';

function TabScreens() {
  const { unreadCount } = useChat();
  const { theme, setTheme } = useSettings();

  const paperTheme = useMemo(() => {
    return theme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  }, [theme]);

  return (
    <PaperProvider theme={paperTheme}>
      <Tabs
        screenOptions={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <RNButton
                title={theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
                onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
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

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AuthProvider>
          <ChatProvider>
            <TabScreens />
          </ChatProvider>
        </AuthProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
// import { useRouter } from 'expo-router';