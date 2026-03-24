/*
   SAINT TRUST PRIVATE BANKING — SHARED JAVASCRIPT
   ═══════════════════════════════════════════ */

// ── TRANSACTION DATA (2025–2026) ──
const allTransactionsData = [
  // 2026 transactions (current year)
  { id:601, icon:'trending-up', name:'Lamborghini', date:'Mar 16, 2026', dateObj: new Date('2026-03-16'), amount:'-$300,000.00', cat:'Automotive', type:'debit', merchant:'Lamborghini', ref:'AUTO-2026-601', status:'Completed', details:'Deposit for Lamborghini Urus' },
  { id:600, icon:'trending-up', name:'Founders Capital Management', date:'Mar 01, 2026', dateObj: new Date('2026-03-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-600', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:598, icon:'trending-up', name:'Saint Trust Bank', date:'Feb 27, 2026', dateObj: new Date('2026-02-27'), amount:'+$95,420.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-598', status:'Completed', details:'Monthly interest payment' },
  { id:597, icon:'trending-up', name:'Founders Capital Management', date:'Feb 01, 2026', dateObj: new Date('2026-02-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-597', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:594, icon:'trending-up', name:'Saint Trust Bank', date:'Jan 22, 2026', dateObj: new Date('2026-01-22'), amount:'+$82,300.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2026-594', status:'Completed', details:'Monthly interest payment' },
  { id:591, icon:'trending-up', name:'Founders Capital Management', date:'Jan 01, 2026', dateObj: new Date('2026-01-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2026-591', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  // 2025 transactions
  { id:492, icon:'trending-up', name:'Saint Trust Bank', date:'Dec 27, 2025', dateObj: new Date('2025-12-27'), amount:'+$89,753.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-492', status:'Completed', details:'Interest' },
  { id:590, icon:'trending-up', name:'Founders Capital Management', date:'Dec 01, 2025', dateObj: new Date('2025-12-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-590', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:477, icon:'trending-up', name:'Saint Trust Bank', date:'Dec 19, 2025', dateObj: new Date('2025-12-19'), amount:'+$78,638.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-477', status:'Completed', details:'Interest' },
  { id:589, icon:'trending-up', name:'Founders Capital Management', date:'Nov 01, 2025', dateObj: new Date('2025-11-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-589', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:463, icon:'trending-up', name:'Saint Trust Bank', date:'Nov 18, 2025', dateObj: new Date('2025-11-18'), amount:'+$37,986.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-463', status:'Completed', details:'Interest' },
  { id:588, icon:'trending-up', name:'Founders Capital Management', date:'Oct 01, 2025', dateObj: new Date('2025-10-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-588', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:457, icon:'trending-up', name:'Employer', date:'Oct 10, 2025', dateObj: new Date('2025-10-10'), amount:'+$68,420.00', cat:'Income', type:'credit', merchant:'Employer', ref:'INC-2025-457', status:'Completed', details:'Salary' },
  { id:587, icon:'trending-up', name:'Founders Capital Management', date:'Sep 01, 2025', dateObj: new Date('2025-09-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-587', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:586, icon:'trending-up', name:'Founders Capital Management', date:'Aug 01, 2025', dateObj: new Date('2025-08-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-586', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:466, icon:'trending-up', name:'Saint Trust Bank', date:'Aug 31, 2025', dateObj: new Date('2025-08-31'), amount:'+$28,926.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-466', status:'Completed', details:'Interest' },
  { id:585, icon:'trending-up', name:'Founders Capital Management', date:'Jul 01, 2025', dateObj: new Date('2025-07-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-585', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:460, icon:'trending-up', name:'Saint Trust Bank', date:'Jul 28, 2025', dateObj: new Date('2025-07-28'), amount:'+$58,438.00', cat:'Income', type:'credit', merchant:'Saint Trust Bank', ref:'INC-2025-460', status:'Completed', details:'Interest' },
  { id:584, icon:'trending-up', name:'Founders Capital Management', date:'Jun 01, 2025', dateObj: new Date('2025-06-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-584', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:583, icon:'trending-up', name:'Founders Capital Management', date:'May 01, 2025', dateObj: new Date('2025-05-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-583', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:582, icon:'trending-up', name:'Founders Capital Management', date:'Apr 01, 2025', dateObj: new Date('2025-04-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-582', status:'Completed', details:'Investment distribution from Founders Capital Management' },
  { id:581, icon:'trending-up', name:'Founders Capital Management', date:'Mar 01, 2025', dateObj: new Date('2025-03-01'), amount:'+$150,000.00', cat:'Income', type:'credit', merchant:'Founders Capital Management', ref:'FCM-2025-581', status:'Completed', details:'Investment distribution from Founders Capital Management' },
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
