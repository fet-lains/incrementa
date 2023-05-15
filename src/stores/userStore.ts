import { defineStore } from 'pinia';

import { userStorage } from '@/storage/userStorage';
import { useI18n } from 'vue-i18n';

export default defineStore('user', () => {
  const { locale } = useI18n();

  const getLocale = () => {
    const localeLocal = userStorage.getLocale();

    if (!localeLocal) return;

    locale.value = localeLocal;
  };
  const setLocale = () => {
    locale.value = locale.value === 'ru' ? 'en' : 'ru';

    userStorage.setLocale(locale.value);
  };

  return {
    locale,
    getLocale,
    setLocale,
  };
});
