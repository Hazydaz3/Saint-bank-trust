/* ══════════════════════════════════════════
   SAINT TRUST — SHARED SIDEBAR RENDERER
   ══════════════════════════════════════════ */

function getSidebarHTML(activePage) {
  const links = [
    { id:'dashboard', label:'Overview', href:'dashboard.html', svg:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
    { id:'transfer', label:'Transfer', href:'transfer.html', svg:'<path d="M5 12h14M12 5l7 7-7 7"/>' },
    { id:'bill', label:'Pay a Bill', href:'bill.html', svg:'<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>' },
    { id:'cards', label:'Cards', href:'cards.html', svg:'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>' },
    { id:'transactions', label:'Transactions', href:'transactions.html', svg:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>' },
  ];
  const wealthLinks = [
    { id:'investments', label:'Investments', href:'investments.html', svg:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
    { id:'savings', label:'Savings Goals', href:'savings.html', svg:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>' },
  ];

  const makeLink = (l) => `
    <a class="sidebar-link ${activePage === l.id ? 'active' : ''}" href="${l.href}" onclick="navTo(event,'${l.href}')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${l.svg}</svg>
      <span>${l.label}</span>
    </a>`;

  return `
    <div class="sidebar-user" style="cursor:pointer;" onclick="openProfileModal()">
      <div class="sidebar-avatar" id="profileAvatar" style="position:relative;overflow:hidden;">DD</div>
      <div class="sidebar-name" id="sidebarName">David Duncan</div>
      <div class="sidebar-tag">Private Client</div>
      <div style="font-size:11px;margin-top:8px;opacity:0.6;">Click to edit profile</div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-label">Banking</div>
      ${links.map(makeLink).join('')}
      <div class="sidebar-section-label">Wealth</div>
      ${wealthLinks.map(makeLink).join('')}
    </nav>
    <div class="sidebar-bottom">
      <a class="sidebar-link ${activePage === 'settings' ? 'active' : ''}" href="settings.html" onclick="navTo(event,'settings.html')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span>Settings</span>
      </a>
      <a class="sidebar-link" onclick="signOut()" style="cursor:pointer;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Sign Out</span>
      </a>
    </div>
  `;
}

function initSidebar(activePage) {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar) sidebar.innerHTML = getSidebarHTML(activePage);
  // Load saved profile
  const savedName = localStorage.getItem('verdantName');
  const savedAvatar = localStorage.getItem('verdantAvatar');
  if (savedName) {
    const el = document.getElementById('sidebarName');
    if (el) el.textContent = savedName;
  }
  if (savedAvatar) {
    const el = document.getElementById('profileAvatar');
    if (el) { el.innerHTML = `<img src="${savedAvatar}" style="width:100%;height:100%;object-fit:cover;">`; }
  }
}

function navTo(e, href) {
  e.preventDefault();
  closeSidebar();
  showPageLoader(() => { window.location.href = href; });
}

function openProfileModal() {
  openModal('profileModal');
  // Pre-fill
  const savedName = localStorage.getItem('verdantName') || 'David Duncan';
  const savedEmail = localStorage.getItem('verdantEmail') || 'david@sainttrust.com';
  const savedPhone = localStorage.getItem('verdantPhone') || '+1 (555) 123-4567';
  const savedAvatar = localStorage.getItem('verdantAvatar');
  document.getElementById('profileEmail').value = savedEmail;
  document.getElementById('profilePhone').value = savedPhone;
  const preview = document.getElementById('profileAvatarPreview');
  if (savedAvatar) {
    preview.innerHTML = `<img src="${savedAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
  } else {
    const initials = savedName.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
    preview.textContent = initials;
  }
}

function saveProfile() {
  const email = document.getElementById('profileEmail').value;
  const phone = document.getElementById('profilePhone').value;
  if (email) localStorage.setItem('verdantEmail', email);
  if (phone) localStorage.setItem('verdantPhone', phone);
  closeModal('profileModal');
  // Update topbar
  const nameEl = document.getElementById('topbarName');
  if (nameEl) nameEl.textContent = localStorage.getItem('verdantName') || 'David Duncan';
  initSidebar(window.ACTIVE_PAGE || 'dashboard');
  showToast('Profile updated successfully');
}

function handleProfilePicUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    localStorage.setItem('verdantAvatar', dataUrl);
    const preview = document.getElementById('profileAvatarPreview');
    if (preview) preview.innerHTML = `<img src="${dataUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    initSidebar(window.ACTIVE_PAGE || 'dashboard');
  };
  reader.readAsDataURL(file);
}

function showToast(msg) {
  let toast = document.getElementById('verdantToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'verdantToast';
    toast.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--slate);color:var(--ivory);padding:12px 24px;border-radius:4px;font-size:13px;z-index:9000;opacity:0;transition:opacity .3s;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}
