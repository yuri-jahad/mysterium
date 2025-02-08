/*
 * LocalStorage management utilities
 * Simple localStorage wrapper with type safety and error handling
 */

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  if (!key) return;
  const storage = localStorage.getItem(key);
  if (!storage) return;
  try {
    return JSON.parse(storage);
  } catch {
    return;
  }
};

export const updateLocalStorageValue = <T extends Record<string, unknown>>(
  key: string,
  updates: Partial<T>
): void => {
  if (!key) return;
  const storage = getFromLocalStorage(key);
  if (!storage) return;
  const newStorage = {
    ...storage,
    ...updates,
  };
  saveToLocalStorage(key, newStorage);
};
