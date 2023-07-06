export enum IStorageUserKeys {
  locale = 'locale',
}

class UserStorage {
  getLocale(): string {
    return localStorage.getItem(IStorageUserKeys.locale) ?? 'ru';
  }
  setLocale(locale: string) {
    localStorage.setItem(IStorageUserKeys.locale, locale);
  }
}

export const userStorage = new UserStorage();
