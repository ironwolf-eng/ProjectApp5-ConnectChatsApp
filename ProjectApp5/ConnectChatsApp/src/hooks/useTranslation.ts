import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export const useTranslation = () => {
  const { language } = useSettings();
  const [locale, setLocale] = useState(language);

  useEffect(() => {
    i18n.locale = language;
    setLocale(language);
  }, [language]);

  const t = (key: string, options?: object) => i18n.t(key, options);

  return { t, locale };
};
//       alert('❌ No permission for notifications');
//       return;