
export default {
  addToStorage,
  getFromStorage,
  removeFromStorage
};

export const KEYS = {
  LOGIN_TOKEN: "LOGIN_TOKEN"
};

function addToStorage(key, value) {
  window.localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return window.localStorage.getItem(key);
}

function removeFromStorage(key) {
  return window.localStorage.removeItem(key);
}
