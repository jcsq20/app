import { IAppLocalStorage } from './types';

export class AppLocalStorage {
  // [name: string]: any;
  // eslint-disable-next-line class-methods-use-this
  get length() {
    return localStorage.length;
  }

  static clear(): void {
    localStorage.clear();
  }

  static key(index: number): string | null {
    return localStorage.key(index);
  }

  static removeItem(key: keyof IAppLocalStorage): void {
    localStorage.removeItem(key);
  }

  static setItem = <T extends keyof IAppLocalStorage>(
    key: T,
    value: IAppLocalStorage[T]
  ) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static getItem = <T extends keyof IAppLocalStorage>(
    key: T
  ): IAppLocalStorage[T] | undefined => {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : undefined;
    } catch {
      return undefined;
    }
  };
}
