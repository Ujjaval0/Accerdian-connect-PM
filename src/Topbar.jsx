import React from 'react';

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
        <div className="topbar-avatar" id="topbarAvatar">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect fill='%234F6AF6' width='80' height='80' rx='40'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Inter' font-size='32' font-weight='700'%3ERA%3C/text%3E%3C/svg%3E" alt="Rahul Agarwal" />
        </div>
      </div>
    </header>
  );
}
