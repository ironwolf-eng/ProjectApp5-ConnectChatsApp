import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Localization from 'expo-localization';


const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [notificationsEnabled, language, theme]);

  useEffect(() => {
    if (notificationsEnabled) {
      registerForPushNotificationsAsync();
    }
  }, [notificationsEnabled]);

  const loadSettings = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('@language');
      if (storedLanguage) {
        setLanguage(storedLanguage);
        i18n.locale = storedLanguage;
      } else {
        const deviceLanguage = Localization.locale.split('-')[0]; // 'es' or 'en'
        setLanguage(deviceLanguage);
        i18n.locale = deviceLanguage;
        await AsyncStorage.setItem('@language', deviceLanguage);
      }

      const storedTheme = await AsyncStorage.getItem('@theme');
      if (storedTheme) setTheme(storedTheme);

      const storedNotifications = await AsyncStorage.getItem('@notificationsEnabled');
      if (storedNotifications !== null) setNotificationsEnabled(storedNotifications === 'true');
    } catch (err) {
      console.error('❌ Failed to load settings', err);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('@language', language);
      await AsyncStorage.setItem('@theme', theme);
      await AsyncStorage.setItem('@notificationsEnabled', String(notificationsEnabled));
    } catch (err) {
      console.error('❌ Failed to save settings', err);
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.locale = lang;
  };

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission for notifications not granted!');
      setNotificationsEnabled(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        notificationsEnabled,
        setNotificationsEnabled,
        language,
        setLanguage: changeLanguage,
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
// This custom hook provides a simple interface for managing app settings, including notifications, language, and theme.
// It uses AsyncStorage to persist settings across app restarts and Expo Notifications for push notifications.