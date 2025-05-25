import React from 'react';
import { View, StyleSheet, Switch, ImageBackground } from 'react-native';
import { List, Divider, Button, Text } from 'react-native-paper';
import { useSettings } from '../src/context/SettingsContext';

export default function SettingsScreen() {
  const {
    notificationsEnabled,
    setNotificationsEnabled,
    language,
    setLanguage,
    theme,
    setTheme,
  } = useSettings();

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ImageBackground
      source={require('../assets/chat-background.png')} // ✅ usa aquí tu imagen real (ajusta el nombre)
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Settings</Text>
        <List.Section>
          <List.Subheader>Preferences</List.Subheader>

          <List.Item
            title="Notifications"
            description={notificationsEnabled ? 'Enabled' : 'Disabled'}
            right={() => (
              <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
            )}
          />

          <Divider />

          <List.Item
            title="Language"
            description={language === 'es' ? 'Español' : 'English'}
            right={() => (
              <Button onPress={toggleLanguage} compact>
                Change
              </Button>
            )}
          />

          <Divider />

          <List.Item
            title="Theme"
            description={theme === 'light' ? 'Light' : 'Dark'}
            right={() => (
              <Button onPress={toggleTheme} compact>
                Switch
              </Button>
            )}
          />
        </List.Section>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Current Language: {language.toUpperCase()}</Text>
          <Text style={styles.footerText}>Current Theme: {theme}</Text>
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparente para mejor lectura
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
  },
});
//     color: 'gray',