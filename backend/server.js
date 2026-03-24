const express = require('express');
const cors = require('cors');
const speakeasy = require('speakeasy');
const path = require('path');
require('dotenv').config();

const app = express();
// Render automatically sets the PORT environment variable
const PORT = process.env.PORT || 3001;

// Middleware
// In production, you can restrict CORS to your frontend URL for better security
app.use(cors());
app.use(express.json());

// ── FIXED TOTP SECRET ──
// It's best to set this in Render's Environment Variables dashboard
const FIXED_SECRET = process.env.TOTP_SECRET || 'KQUDKNCPJZTCGSKPFJHHIMRPOZYF43RSKJMDMVSKMNKGI3KTIA3A';

// ── ACCOUNT DATA ──
const ACCOUNT_DATA = {
  checking: 225000.00,
  savings: 125000.00,
  investment: 550000.00,
  total: 900000.00,
  current: 600000.00
};

// ── USER CREDENTIALS ──
const users = {
  'David11099': {
    password: process.env.USER_PASSWORD || 'Redwood12!',
    pin: process.env.USER_PIN || '1209',
    verified: false,
    name: 'David Duncan',
    bank: 'Saint Trust'
  }
};

// In-memory storage for sessions
const sessions = {};

// In-memory storage for transactions
let transactions = [
  { id:601, icon:'trending-up', name:'Lamborghini', date:'Mar 16, 2026', dateObj: new Date('2026-03-16'), amount:'-$300,000.00', cat:'Automotive', type:'debit', merchant:'Lamborghini', ref:'AUTO-2026-601', status:'Completed', details:'Deposit for Lamborghini Urus', createdAt: new Date(Date.now() - 7*24*60*60*1000) },
  { id:600, icon:'trending-up', name:'Founders Capital Management', date:'Mar 01, 2026', dateObj: new Date('2026-03-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-600', status:'Completed', details:'Investment distribution from Founders Capital Management', createdAt: new Date('2026-03-01') },
  { id:598, icon:'trending-up', name:'Saint Trust Bank', date:'Feb 27, 2026', dateObj: new Date('2026-02-27'), amount:'+$95,420.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-598', status:'Completed', details:'Monthly interest payment', createdAt: new Date('2026-02-27') },
  { id:597, icon:'trending-up', name:'Founders Capital Management', date:'Feb 01, 2026', dateObj: new Date('2026-02-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-597', status:'Completed', details:'Investment distribution from Founders Capital Management', createdAt: new Date('2026-02-01') },
  { id:594, icon:'trending-up', name:'Saint Trust Bank', date:'Jan 22, 2026', dateObj: new Date('2026-01-22'), amount:'+$82,300.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-594', status:'Completed', details:'Monthly interest payment', createdAt: new Date('2026-01-22') },
  { id:591, icon:'trending-up', name:'Founders Capital Management', date:'Jan 01, 2026', dateObj: new Date('2026-01-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-591', status:'Completed', details:'Investment distribution from Founders Capital Management', createdAt: new Date('2026-01-01') },
];

// ── AUTHENTICATION MIDDLEWARE ──
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !sessions[token]) return res.status(401).json({ error: 'Unauthorized' });
  const session = sessions[token];
  if (!session.totpVerified) return res.status(401).json({ error: '2FA not verified' });
  req.session = session;
  next();
};

// ── ENDPOINTS ──
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
  const sessionId = Math.random().toString(36).substring(2, 15);
  sessions[sessionId] = { email, name: user.name, bank: user.bank, createdAt: Date.now(), totpVerified: false };
  res.json({ success: true, sessionId });
});

app.post('/api/verify-totp', (req, res) => {
  const { sessionId, code } = req.body;
  if (!sessionId || !sessions[sessionId]) return res.status(401).json({ error: 'Invalid session' });
  const verified = speakeasy.totp.verify({ secret: FIXED_SECRET, encoding: 'base32', token: code, window: 2 });
  if (!verified) return res.status(401).json({ error: 'Invalid code' });
  sessions[sessionId].totpVerified = true;
  res.json({ success: true, token: sessionId });
});

app.post('/api/verify-token', (req, res) => {
  const { token } = req.body;
  if (!token || !sessions[token] || !sessions[token].totpVerified) return res.status(401).json({ error: 'Invalid token' });
  const session = sessions[token];
  res.json({ success: true, email: session.email, name: session.name, bank: session.bank });
});

app.get('/api/account', requireAuth, (req, res) => {
  res.json({ success: true, account: { holder: 'David Duncan', bank: 'Saint Trust', balances: ACCOUNT_DATA } });
});

app.get('/api/transactions', requireAuth, (req, res) => {
  res.json({ success: true, transactions });
});

app.post('/api/verify-pin', requireAuth, (req, res) => {
  const { pin } = req.body;
  const user = users[req.session.email];
  if (!user || user.pin !== pin) return res.status(401).json({ error: 'Invalid PIN' });
  res.json({ success: true });
});

app.post('/api/transfer', requireAuth, (req, res) => {
  const { fromAccount, amount, recipientName, bankName, description } = req.body;
  const transferAmount = parseFloat(amount);
  if (transferAmount > ACCOUNT_DATA[fromAccount]) return res.status(400).json({ error: 'Insufficient funds' });
  
  const newId = Date.now();
  const newTransaction = {
    id: newId, icon: 'trending-up', name: recipientName,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    dateObj: new Date(), amount: `-$${transferAmount.toLocaleString()}`,
    cat: 'Transfer', type: 'debit', merchant: bankName, ref: `TRN-${newId}`,
    status: 'Pending', details: description || `Transfer to ${recipientName}`, createdAt: new Date()
  };
  transactions.unshift(newTransaction);
  ACCOUNT_DATA[fromAccount] -= transferAmount;
  res.json({ success: true, transaction: newTransaction });
});

app.post('/api/signout', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) delete sessions[token];
  res.json({ success: true });
});

// ── HEALTH CHECK (Required for Render) ──
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
