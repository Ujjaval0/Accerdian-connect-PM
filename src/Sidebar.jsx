import React from 'react';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'community', icon: 'forum', label: 'Open Community' },
    { id: 'course', icon: 'school', label: 'Course Community' },
    { id: 'studyrooms', icon: 'groups', label: 'Study Rooms' },
    { id: 'messages', icon: 'chat', label: 'Messages', badge: 3 },
    { id: 'profile', icon: 'person', label: 'My Profile' },
    { id: 'referrals', icon: 'workspace_premium', label: 'Referrals' },
    { id: 'leaderboard', icon: 'leaderboard', label: 'Leaderboard' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="sidebar-brand" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 24px', height: 'auto' }}>
        <div style={{ fontSize: '32px', fontWeight: 800, color: '#2563EB', lineHeight: 1, letterSpacing: '-1.5px', fontFamily: "'Inter', sans-serif" }}>accredian</div>
        <div style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '1.5px', fontWeight: 500, marginTop: '4px', textTransform: 'lowercase' }}>credentials that matter</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <a
            key={item.id}
            href="#"
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item.id);
              if (window.innerWidth <= 768) setIsOpen(false);
            }}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="streak-mini">
          <span className="material-icons-round">local_fire_department</span>
          <span>12 Day Streak</span>
        </div>
      </div>
    </aside>
  );
}
