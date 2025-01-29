/*
 Storage management utilities
 Simple localStorage wrapper with type safety and error handling
*/

export const setStorage = <T>(storageName: string, value: T): void => {
  if (!storageName) return;
  localStorage.setItem(storageName, JSON.stringify(value));
};

export const getStorage = (storageName: string) => {
  if (!storageName) return;
  const storage = localStorage.getItem(storageName);
  if (!storage) return;
  try {
    return JSON.parse(storage);
  } catch {
    return;
  }
};

export const updateStorageElements = <T extends Record<string, unknown>>(
  storageName: string,
  elements: Partial<T>
): void => {
  if (!storageName) return;
  const storage = getStorage(storageName);
  if (!storage) return;
  const newStorage = {
    ...storage,
    ...elements,
  };
  setStorage(storageName, newStorage);
};
