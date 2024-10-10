const isLocalStorageAvailable = () => typeof window !== 'undefined' && window.localStorage;

export const setLocalStorageItem = (key, value) => (isLocalStorageAvailable()
  ? (window.localStorage.setItem(key, value), true)
  : false);

export const getLocalStorageItem = (key) => (
  isLocalStorageAvailable() ? window.localStorage.getItem(key) : null
);

export const deleteLocalStorageItem = (key) => (isLocalStorageAvailable()
  ? (window.localStorage.removeItem(key), true)
  : false);
