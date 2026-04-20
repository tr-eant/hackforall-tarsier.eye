// ============================================================
//  tarsier.eye — auth.js
//  Shared authentication module (client-side mock auth)
//  Demo credentials: demo@tarsier.eye / tarsier123
// ============================================================

const AUTH_KEY = "tarsierEyeAuth";
const AUTH_EXPIRY_KEY = "tarsierEyeAuthExpiry";
const REMEMBER_KEY = "tarsierEyeRemember";

// ── MOCK CREDENTIALS ────────────────────────────────────────
const VALID_USERS = [
    { email: "demo@tarsier.eye", password: "tarsier123", name: "Explorer" },
    { email: "admin@tarsier.eye", password: "admin123", name: "Admin" },
];

// ── AUTH HELPERS ─────────────────────────────────────────────
function isAuthenticated() {
    const token = localStorage.getItem(AUTH_KEY);
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    if (!token) return false;
    if (expiry && Date.now() > Number(expiry)) {
        clearAuth();
        return false;
    }
    return true;
}

function getAuthUser() {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function setAuth(user, remember = false) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email: user.email, name: user.name }));
    // Session lasts 24h, or 30 days if "remember me"
    const duration = remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    localStorage.setItem(AUTH_EXPIRY_KEY, String(Date.now() + duration));
    if (remember) localStorage.setItem(REMEMBER_KEY, user.email);
}

function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_EXPIRY_KEY);
}

function logout() {
    clearAuth();
    window.location.href = "login.html";
}

function attemptLogin(email, password) {
    const user = VALID_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    return user || null;
}

// ── ROUTE GUARDS ────────────────────────────────────────────
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

function redirectIfAuth() {
    if (isAuthenticated()) {
        window.location.href = "index.html";
        return true;
    }
    return false;
}
