import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AIFloatingAssistant from './components/AIFloatingAssistant';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Course from './pages/Course';
import StudyRooms from './pages/Studyrooms';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Referrals from './pages/Referrals';
import Leaderboard from './pages/Leaderboard';
import Notifications from './pages/Notifications';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'community': return <Community />;
      case 'course': return <Course />;
      case 'studyrooms': return <StudyRooms />;
      case 'messages': return <Messages />;
      case 'profile': return <Profile />;
      case 'referrals': return <Referrals />;
      case 'leaderboard': return <Leaderboard />;
      case 'notifications': return <Notifications />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      <main className="main-content" id="mainContent">
        <Topbar toggleSidebar={toggleSidebar} setActivePage={setActivePage} />
        {renderPage()}
        <AIFloatingAssistant />
      </main>
    </>
  );
}
