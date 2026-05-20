import React from 'react';

const STREAK_DAYS = 12;

export default function Topbar({ toggleSidebar, setActivePage }) {
  return (
    <header className="topbar" id="topbar">
      <button className="menu-toggle" id="menuToggle" onClick={toggleSidebar}>
        <span className="material-icons-round">menu</span>
      </button>
      <div className="search-bar" id="searchBar">
        <span className="material-icons-round">search</span>
        <input type="text" placeholder="Search discussions, mentors, resources..." id="globalSearch" />
      </div>
      <div className="topbar-actions">
        <button className="topbar-btn" id="notifBtn" onClick={() => setActivePage('notifications')}>
          <span className="material-icons-round">notifications</span>
          <span className="notif-dot"></span>
        </button>
        <div className="topbar-streak" title={`${STREAK_DAYS} day learning streak`}>
          <span className="topbar-streak-flame">
            <span className="material-icons-round">local_fire_department</span>
          </span>
          <span className="topbar-streak-number">{STREAK_DAYS}</span>
          <span className="topbar-streak-suffix">day streak</span>
        </div>
      </div>
    </header>
  );
}
