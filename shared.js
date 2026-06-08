/*
   SAINT TRUST PRIVATE BANKING — SHARED JAVASCRIPT
   ═══════════════════════════════════════════ */

// ── TRANSACTION DATA (2025–2026) ──
const allTransactionsData = [
  // 2026 transactions (current year)
  { id:601, icon:'trending-up', name:'Adecco Company', date:'Jun 06, 2026', dateObj: new Date('2026-06-06'), amount:'-$300,000.00', cat:'Automotive', type:'debit', merchant:'Lamborghini', ref:'AUTO-2026-601', status:'Completed', details:'Deposit from Adecco Company' },
  { id:600, icon:'trending-up', name:'Adecco Company', date:'Jun 04, 2026', dateObj: new Date('2026-06-04'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-600', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:598, icon:'trending-up', name:'Saint Trust Bank', date:'Jun 04, 2026', dateObj: new Date('2026-06-04'), amount:'+$95,420.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-598', status:'Completed', details:'Monthly interest payment' },
  { id:597, icon:'trending-up', name:'Adecco Company', date:'Jun 03, 2026', dateObj: new Date('2026-06-03'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-597', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:594, icon:'trending-up', name:'Saint Trust Bank', date:'Jun 01, 2026', dateObj: new Date('2026-06-01'), amount:'+$82,300.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-594', status:'Completed', details:'Monthly interest payment' },
  { id:591, icon:'trending-up', name:'Adecco Capital Management', date:'Jun 01, 2026', dateObj: new Date('2026-06-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-591', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  // 2025 transactions
  { id:492, icon:'trending-up', name:'Saint Trust Bank', date:'May 30, 2026', dateObj: new Date('2026-05-30'), amount:'+$89,753.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-492', status:'Completed', details:'Interest' },
  { id:590, icon:'trending-up', name:'Adecco Capital Management', date:'May 30, 2026', dateObj: new Date('2026-05-30'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-590', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:477, icon:'trending-up', name:'Saint Trust Bank', date:'May 30, 2026', dateObj: new Date('2026-05-30'), amount:'+$78,638.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-477', status:'Completed', details:'Interest' },
  { id:589, icon:'trending-up', name:'Adecco Capital Management', date:'  May 30, 2026', dateObj: new Date('2026-05-30'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-589', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:463, icon:'trending-up', name:'Saint Trust Bank', date:'May 30, 2026', dateObj: new Date('2026-05-30'), amount:'+$37,986.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-463', status:'Completed', details:'Interest' },
  { id:588, icon:'trending-up', name:'Adecco Capital Management', date:'May 29, 2026', dateObj: new Date('2026-05-29'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-588', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:457, icon:'trending-up', name:'Employer', date:'May 26, 2026', dateObj: new Date('2026-05-26'), amount:'+$68,420.00', cat:'Income', type:'credit', merchant:'Employer', ref:'INC-2026-457', status:'Completed', details:'Salary' },
  { id:587, icon:'trending-up', name:'Adecco Capital Management', date:'May 23, 2026', dateObj: new Date('2026-05-23'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Adecco Capital Management', ref:'ADE-2026-587', status:'Completed', details:'Investment distribution from Adecco Capital Management' },
  { id:586, icon:'trending-up', name:'Adecco Capital Management', date:'May 21, 2026', dateObj: new Date('2026-05-21'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Adecco Capital Management', ref:'ADE-2026-586', status:'Completed', details:'Investment distribution from Adecco Capital Management' },
  { id:466, icon:'trending-up', name:'Saint Trust Bank', date:'May 19, 2026', dateObj: new Date('2026-05-19'), amount:'+$28,926.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-466', status:'Completed', details:'Interest' },
  { id:585, icon:'trending-up', name:'Founders Capital Management', date:'May 17, 2026', dateObj: new Date('2026-05-17'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-585', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:460, icon:'trending-up', name:'Saint Trust Bank', date:'May 15, 2026', dateObj: new Date('2026-05-15'), amount:'+$58,438.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-460', status:'Completed', details:'Interest' },
  { id:584, icon:'trending-up', name:'Adecco Capital Management', date:'May 12, 2026', dateObj: new Date('2026-05-12'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Adecco Capital Management', ref:'ADE-2026-584', status:'Completed', details:'Investment distribution from Adecco Capital Management' },
  { id:583, icon:'trending-up', name:'Adecco Capital Management', date:'May 8, 2026', dateObj: new Date('2026-05-08'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Adecco Capital Management', ref:'ADE-2026-583', status:'Completed', details:'Investment distribution from Adecco Capital Management' },
  { id:582, icon:'trending-up', name:'Adecco Company', date:'May 5, 2026', dateObj: new Date('2026-05-05'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Adecco Company', ref:'ADE-2026-582', status:'Completed', details:'Investment distribution from Adecco Company' },
  { id:581, icon:'trending-up', name:'Adecco Company', date:'May 2, 2026', dateObj: new Date('2026-05-02'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Adecco Company', ref:'ADE-2026-581', status:'Completed', details:'Investment distribution from Adecco Company' },
];

// ── HELPER FUNCTIONS ──
function getIconColor(category) {
  const colors = {
    'Income': '#4CAF50',
    'Travel': '#2196F3',
    'Shopping': '#FF9800',
    'Dining': '#E91E63',
    'Investment': '#9C27B0',
    'Services': '#00BCD4',
    'Automotive': '#F44336',
  };
  return colors[category] || '#757575';
}

function getIconSVG(icon) {
  const icons = {
    'trending-up': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
  };
  return icons[icon] || '';
}

// ── SHARED UI FUNCTIONS ──
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar) {
    sidebar.classList.remove('open');
  }
}

function showPageLoader(callback) {
  const overlay = document.getElementById('pageLoadOverlay');
  if (overlay) {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    overlay.style.display = 'flex';
    setTimeout(() => {
      if (callback) callback();
    }, 300);
  } else if (callback) {
    callback();
  }
}

function showToast(message) {
  console.log('Toast:', message);
  alert(message);
}

function navigateTo(page) {
  showPageLoader(() => {
    window.location.href = page;
  });
}

// ── AUTH FUNCTIONS ──
function signOut() {
  showPageLoader(() => {
    // Clear authentication data
    localStorage.removeItem('verdantAuth');
    // Redirect to login page
    window.location.href = 'login.html';
  });
}
