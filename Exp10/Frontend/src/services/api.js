/**
 * api.js
 * Core API service layer — all Fetch calls to the Spring Boot backend.
 * Base URL: http://localhost:8080
 */

const BASE_URL = 'http://localhost:8080';

/* ---- Helpers ---- */

/**
 * Parse response defensively. Returns { data, ok, status }.
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  let data = null;

  try {
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Backend may return plain text for some endpoints
      const text = await response.text();
      // Try to parse as JSON anyway in case Content-Type header is wrong
      try {
        data = JSON.parse(text);
      } catch {
        data = text || null;
      }
    }
  } catch (e) {
    console.warn('[api] Failed to parse response body:', e);
    data = null;
  }

  return { data, ok: response.ok, status: response.status };
};

/**
 * Extract a readable error message from the API response.
 */
const extractErrorMessage = (data, status) => {
  if (!data) {
    if (status === 401) return 'Unauthorized — please log in again.';
    if (status === 403) return 'Access denied.';
    if (status === 404) return 'Resource not found.';
    if (status >= 500) return 'Server error — please try again later.';
    return `Request failed with status ${status}.`;
  }

  // Common Spring Boot error response shapes
  if (typeof data === 'string') return data;
  if (data.message) return data.message;
  if (data.error) return data.error;
  if (data.msg) return data.msg;
  return `Request failed (${status}).`;
};

/**
 * Build Authorization header object for protected requests.
 */
const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/* ---- Auth Endpoints ---- */

/**
 * POST /auth/register
 * Body: { username, password }
 */
export const registerUser = async ({ username, password }) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim(), password }),
    });
  } catch (networkError) {
    throw new Error('Cannot reach the server. Check your network or backend status.');
  }

  const { data, ok, status } = await parseResponse(response);

  if (!ok) {
    throw new Error(extractErrorMessage(data, status));
  }

  return data;
};

/**
 * POST /auth/login
 * Body: { username, password }
 * Expects: { token } or string token in response
 */
export const loginUser = async ({ username, password }) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim(), password }),
    });
  } catch (networkError) {
    throw new Error('Cannot reach the server. Check your network or backend status.');
  }

  const { data, ok, status } = await parseResponse(response);

  if (!ok) {
    throw new Error(extractErrorMessage(data, status));
  }

  // Extract token robustly — backend may return { token } or just the token string
  let token = null;
  if (typeof data === 'string') {
    token = data.trim();
  } else if (data && data.token) {
    token = data.token;
  } else if (data && data.accessToken) {
    token = data.accessToken;
  } else if (data && data.jwt) {
    token = data.jwt;
  }

  if (!token) {
    throw new Error('Login succeeded but no token was returned. Please contact support.');
  }

  return token;
};

/* ---- SOS Endpoints ---- */

/**
 * POST /sos
 * Requires: Bearer token
 * Body: empty object {}  (compatible with Spring Boot)
 */
export const triggerSOS = async (token) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}/sos`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({}),
    });
  } catch (networkError) {
    throw new Error('Cannot reach the server. Check your network or backend status.');
  }

  const { data, ok, status } = await parseResponse(response);

  if (status === 401 || status === 403) {
    // Signal the caller to force logout
    const err = new Error('Session expired. Please log in again.');
    err.code = 'AUTH_EXPIRED';
    throw err;
  }

  if (!ok) {
    throw new Error(extractErrorMessage(data, status));
  }

  return data;
};

/**
 * GET /sos
 * Requires: Bearer token
 * Returns: array of alerts belonging to the logged-in user
 */
export const fetchAlerts = async (token) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}/sos`, {
      method: 'GET',
      headers: authHeaders(token),
    });
  } catch (networkError) {
    throw new Error('Cannot reach the server. Check your network or backend status.');
  }

  const { data, ok, status } = await parseResponse(response);

  if (status === 401 || status === 403) {
    const err = new Error('Session expired. Please log in again.');
    err.code = 'AUTH_EXPIRED';
    throw err;
  }

  if (!ok) {
    throw new Error(extractErrorMessage(data, status));
  }

  // Ensure we always return an array
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.alerts)) return data.alerts;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
};
