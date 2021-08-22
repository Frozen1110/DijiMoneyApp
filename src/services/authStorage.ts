import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthStorage_KEY_PREFIX = '@AuthStorage:';

let dataMemory: Record<string, string> = {};

export class AuthStorage {
  static syncPromise: Promise<void> | null = null;
  /**
   * This is used to set a specific item in storage
   */
  static setItem(key: string, value: string) {
    AsyncStorage.setItem(AuthStorage_KEY_PREFIX + key, value);
    dataMemory[key] = value;
    return dataMemory[key];
  }

  /**
   * This is used to get a specific key from storage
   */
  static getItem(key: string) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key)
      ? dataMemory[key]
      : undefined;
  }

  /**
   * This is used to remove an item from storage
   */
  static removeItem(key: string) {
    AsyncStorage.removeItem(AuthStorage_KEY_PREFIX + key);
    return delete dataMemory[key];
  }

  /**
   * This is used to clear the storage
   */
  static clear() {
    dataMemory = {};
    return dataMemory;
  }

  /**
   * Will sync the AuthStorage data from AsyncStorage to storageWindow AuthStorage
   */
  static sync() {
    if (!AuthStorage.syncPromise) {
      AuthStorage.syncPromise = new Promise((res, rej) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) {
            rej(errKeys);
          }
          const memoryKeys = (keys || []).filter(key =>
            key.startsWith(AuthStorage_KEY_PREFIX),
          );
          AsyncStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) {
              rej(err);
            }
            (stores || []).map((result, index, store) => {
              const key = store[index][0];
              const value = store[index][1];
              const memoryKey = key.replace(AuthStorage_KEY_PREFIX, '');
              if (value !== null) {
                dataMemory[memoryKey] = value;
              }
            });
            res();
          });
        });
      });
    }
    return AuthStorage.syncPromise;
  }
}
