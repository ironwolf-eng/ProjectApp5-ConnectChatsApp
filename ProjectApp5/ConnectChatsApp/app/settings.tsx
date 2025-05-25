import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { List, Divider, Button, Text } from 'react-native-paper';
import { useTranslation } from '../src/hooks/useTranslation';
import { useSettings } from '../src/context/SettingsContext';

export default function SettingsScreen() {
  const { t } = useTranslation();
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
    <View style={styles.container}>
      <Text style={styles.header}>{t('settings')}</Text>
      <List.Section>
        <List.Subheader>{t('preferences')}</List.Subheader>

        <List.Item
          title={t('notifications')}
          description={notificationsEnabled ? t('enabled') : t('disabled')}
          right={() => (
            <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
          )}
        />

        <Divider />

        <List.Item
          title={t('language')}
          description={language === 'es' ? 'Español' : 'English'}
          right={() => (
            <Button onPress={toggleLanguage} compact>
              {t('change')}
            </Button>
          )}
        />

        <Divider />

        <List.Item
          title={t('theme')}
          description={theme === 'light' ? t('light') : t('dark')}
          right={() => (
            <Button onPress={toggleTheme} compact>
              {t('switch')}
            </Button>
          )}
        />
      </List.Section>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('currentLanguage')}: {language.toUpperCase()}</Text>
        <Text style={styles.footerText}>{t('currentTheme')}: {theme}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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