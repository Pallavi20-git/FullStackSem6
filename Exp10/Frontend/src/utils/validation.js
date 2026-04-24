/**
 * validation.js
 * Form validation helpers for auth forms.
 */

export const validateUsername = (value) => {
  if (!value || !value.trim()) return 'Username is required.';
  if (value.trim().length < 3) return 'Username must be at least 3 characters.';
  if (value.trim().length > 50) return 'Username must be 50 characters or fewer.';
  return null;
};

export const validatePassword = (value) => {
  if (!value || !value.trim()) return 'Password is required.';
  if (value.length < 4) return 'Password must be at least 4 characters.';
  return null;
};

/** Returns { username: string|null, password: string|null } */
export const validateAuthForm = ({ username, password }) => ({
  username: validateUsername(username),
  password: validatePassword(password),
});

export const hasErrors = (errors) =>
  Object.values(errors).some((e) => e !== null);
