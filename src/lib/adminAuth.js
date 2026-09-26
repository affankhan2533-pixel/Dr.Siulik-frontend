// Admin Authentication Utilities for Dr. Siulik's Dental Care

const TOKEN_KEY = 'siulik_admin_token';
const USER_KEY = 'siulik_admin_user';

export const getAdminToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const getAdminUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAdminSession = (token, user = { username: 'admin' }) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('admin-auth-change'));
};

export const clearAdminSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('admin-auth-change'));
};

export const isAdminAuthenticated = () => {
  return Boolean(getAdminToken());
};
