/**
 * tokenStorage.js
 * Thin wrapper around localStorage for JWT management.
 */

const TOKEN_KEY = 'sos_auth_token';

export const saveToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('[tokenStorage] Failed to save token:', e);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('[tokenStorage] Failed to read token:', e);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('[tokenStorage] Failed to remove token:', e);
  }
};

export const hasToken = () => Boolean(getToken());
