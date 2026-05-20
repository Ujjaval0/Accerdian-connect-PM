import React from 'react';
import { PROFILE_AVATAR } from './aiAssistantData';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'community', icon: 'forum', label: 'Open Community' },
    { id: 'course', icon: 'school', label: 'Course Community' },
    { id: 'studyrooms', icon: 'groups', label: 'Study Rooms' },
    { id: 'messages', icon: 'chat', label: 'Messages' },
    { id: 'profile', icon: 'person', label: 'My Profile' },
    { id: 'referrals', icon: 'workspace_premium', label: 'Referrals' },
    { id: 'leaderboard', icon: 'leaderboard', label: 'Leaderboard' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`} id="sidebar">
      <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', height: 'auto', borderBottom: '1px solid rgba(255,255,255,0.5)' }}>
        <div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#2563EB', lineHeight: 1, letterSpacing: '-1.5px', fontFamily: "'Inter', sans-serif" }}>accredian</div>
          <div style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '1.5px', fontWeight: 500, marginTop: '4px', textTransform: 'lowercase' }}>credentials that matter</div>
        </div>
        <button 
          type="button"
          className="sidebar-collapse-btn" 
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '50%', transition: 'background 0.2s' }}
          title="Collapse Sidebar"
        >
          <span className="material-icons-round">chevron_left</span>
        </button>
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
        <button
          type="button"
          className="sidebar-profile-mini"
          onClick={() => {
            setActivePage('profile');
            if (window.innerWidth <= 768) setIsOpen(false);
          }}
        >
          <img src={PROFILE_AVATAR} alt="Rahul Agarwal" className="sidebar-profile-avatar" />
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">Rahul Agarwal</span>
            <span className="sidebar-profile-meta">View profile</span>
          </div>
          <span className="material-icons-round sidebar-profile-chevron">chevron_right</span>
        </button>
      </div>
    </aside>
  );
}
