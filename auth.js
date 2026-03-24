/* ═══════════════════════════════════════════
   SAINT TRUST — AUTHENTICATION SYSTEM
   ═══════════════════════════════════════════ */

const API_BASE = 'https://saint-bank-trust.onrender.com';

// ── CHECK IF USER IS AUTHENTICATED ──
function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

// ── GET AUTH TOKEN ──
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// ── REDIRECT TO LOGIN IF NOT AUTHENTICATED ──
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
  }
}

// ── SIGN IN ──
async function signIn(email, password) {
  try {
    const response = await fetch(`${API_BASE}/api/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Sign in failed');
    }

    const data = await response.json();
    localStorage.setItem('sessionId', data.sessionId);
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

// ── VERIFY TOTP CODE ──
async function verifyTOTP(sessionId, code) {
  try {
    const response = await fetch(`${API_BASE}/api/verify-totp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, code })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'TOTP verification failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.removeItem('sessionId');
    return data;
  } catch (error) {
    console.error('TOTP verification error:', error);
    throw error;
  }
}

// ── VERIFY TOKEN ──
async function verifyToken(token) {
  try {
    const response = await fetch(`${API_BASE}/api/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

// ── SIGN OUT ──
async function signOut() {
  try {
    const token = getAuthToken();
    if (token) {
      await fetch(`${API_BASE}/api/signout`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Sign out error:', error);
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessionId');
    window.location.href = 'login.html';
  }
}

// ── GET ACCOUNT DATA ──
async function getAccountData() {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/api/account`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
      }
      throw new Error('Failed to fetch account data');
    }

    return await response.json();
  } catch (error) {
    console.error('Get account data error:', error);
    throw error;
  }
}

// ── GET TRANSACTIONS ──
async function getTransactions() {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/api/transactions`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
      }
      throw new Error('Failed to fetch transactions');
    }

    return await response.json();
  } catch (error) {
    console.error('Get transactions error:', error);
    throw error;
  }
}

// ── VERIFY PIN ──
async function verifyPIN(pin) {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/api/verify-pin`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pin })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'PIN verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('PIN verification error:', error);
    throw error;
  }
}

// ── PROCESS TRANSFER ──
async function processTransfer(fromAccount, amount, recipientName, bankName, description) {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/api/transfer`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromAccount,
        amount,
        recipientName,
        bankName,
        description
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Transfer failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Transfer error:', error);
    throw error;
  }
}

// ── INITIALIZE AUTH ON PAGE LOAD ──
document.addEventListener('DOMContentLoaded', async () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const publicPages = ['login.html', 'index.html', ''];

  // If on a protected page and not authenticated, redirect to login
  if (!publicPages.includes(currentPage) && !isAuthenticated()) {
    window.location.href = 'login.html';
  }

  // If authenticated, verify token is still valid
  if (isAuthenticated()) {
    const token = getAuthToken();
    const verified = await verifyToken(token);
    if (!verified || !verified.success) {
      localStorage.removeItem('authToken');
      if (!publicPages.includes(currentPage)) {
        window.location.href = 'login.html';
      }
    }
  }
});
