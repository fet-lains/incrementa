export enum IStorageUserKeys {
  locale = 'locale',
}

class UserStorage {
  getLocale(): string {
    return JSON.parse(localStorage.getItem(IStorageUserKeys.locale) ?? 'Eng');
  }
  setLocale(locale: string) {
    localStorage.setItem(IStorageUserKeys.locale, JSON.stringify(locale));
  }
}

export const userStorage = new UserStorage();
