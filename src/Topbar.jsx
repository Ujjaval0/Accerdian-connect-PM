import React, { useState, useEffect, useRef, useMemo } from 'react';
import { alumniList, dummyPosts, studyRooms } from './data';
import { courseModules, courseResources, coursePosts } from './courseData';

const STREAK_DAYS = 12;

export default function Topbar({ toggleSidebar, setActivePage }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Collect all searchable items
  const allSearchableItems = useMemo(() => {
    const items = [];

    // 1. Pages/Sections
    const PAGES = [
      { type: 'page', title: 'Dashboard', desc: 'Overview of courses, tasks, and streaks', page: 'dashboard', icon: 'dashboard' },
      { type: 'page', title: 'Open Community', desc: 'Discussions, trending topics, resources and AMAs', page: 'community', icon: 'forum' },
      { type: 'page', title: 'Course Community', desc: 'Course discussions, modules, lecture recordings', page: 'course', icon: 'school' },
      { type: 'page', title: 'Study Rooms', desc: 'Group sessions, co-working with Pomodoro timers', page: 'studyrooms', icon: 'groups' },
      { type: 'page', title: 'Messages', desc: 'Direct chats, friend requests, and inbox notifications', page: 'messages', icon: 'chat' },
      { type: 'page', title: 'My Profile', desc: 'View skills, academic stats, badges, and capstone progress', page: 'profile', icon: 'person' },
      { type: 'page', title: 'Referrals Center', desc: 'Refer friends to earn Accredian rewards', page: 'referrals', icon: 'card_giftcard' },
      { type: 'page', title: 'Leaderboard', desc: 'Daily/weekly study points ranking', page: 'leaderboard', icon: 'leaderboard' },
      { type: 'page', title: 'Notifications', desc: 'Activity feed alerts and system messages', page: 'notifications', icon: 'notifications' }
    ];
    items.push(...PAGES);

    // 2. Mentors
    const courseMentors = [
      { id: 'cm1', name: 'Dr. Priya Sharma', initials: 'PS', role: 'ML & AI Lead', course: 'PGPDSAI', color: '#8B5CF6', online: true, bio: 'Expert in deep learning and NLP. 10+ years at Google and Microsoft Research.', skills: ['Deep Learning', 'NLP', 'TensorFlow', 'Research'] },
      { id: 'cm2', name: 'Rajesh Kumar', initials: 'RK', role: 'Data Engineering & DL', course: 'PGPDSAI', color: '#2563EB', online: true, bio: 'Senior Data Scientist at Amazon. Specializes in deep learning infrastructure.', skills: ['Spark', 'PyTorch', 'AWS', 'Python'] },
      { id: 'cm3', name: 'Dr. Meena Iyer', initials: 'MI', role: 'Statistics & EDA', course: 'PGPDSAI', color: '#0891B2', online: false, bio: 'PhD in Applied Statistics. Teaches Modules 1-2 on Python and EDA.', skills: ['R', 'Python', 'Pandas', 'Statistics'] },
    ];
    courseMentors.forEach(m => {
      items.push({
        type: 'mentor',
        title: m.name,
        desc: `${m.role} (Course Mentor) · ${m.course}`,
        page: 'course',
        icon: 'verified',
        mentorData: { ...m, type: 'mentor' }
      });
    });

    alumniList.forEach(a => {
      items.push({
        type: 'mentor',
        title: `${a.name} (Alumni)`,
        desc: `${a.role} at ${a.comp} · Batch ${a.batch}`,
        page: 'community',
        icon: 'school',
        mentorData: { id: `al-${a.id}`, name: a.name, initials: a.initials, role: `${a.role} at ${a.comp}`, course: a.batch, color: '#4F46E5', online: a.isAvailable, bio: a.desc, type: 'mentor' }
      });
    });

    // 3. Discussions
    dummyPosts.forEach(p => {
      items.push({
        type: 'discussion',
        id: p.id,
        title: p.title || p.content.slice(0, 60) + '...',
        desc: `Open Community · by ${p.author}`,
        page: 'community',
        postId: p.id,
        icon: 'forum'
      });
    });

    coursePosts.forEach(p => {
      items.push({
        type: 'discussion',
        id: p.id,
        title: p.title || p.content.slice(0, 60) + '...',
        desc: `Course Feed · by ${p.author}`,
        page: 'course',
        tab: 'feed',
        postId: p.id,
        icon: 'forum'
      });
    });

    courseModules.forEach(mod => {
      if (mod.discussionsList) {
        mod.discussionsList.forEach(p => {
          items.push({
            type: 'discussion',
            id: `mod-${mod.id}-${p.id}`,
            title: p.title || p.content.slice(0, 60) + '...',
            desc: `Module Discussion (${mod.shortTitle}) · by ${p.author}`,
            page: 'course',
            tab: 'modules',
            moduleId: mod.id,
            modulePostId: p.id,
            icon: 'forum'
          });
        });
      }
    });

    // 4. Resources & Files
    courseResources.forEach(r => {
      items.push({
        type: 'resource',
        id: `cr-${r.id}`,
        title: r.name,
        desc: `${r.module} Resource · ${r.desc}`,
        page: 'course',
        tab: 'resources',
        icon: r.type === 'pdf' ? 'picture_as_pdf' : r.type === 'video' ? 'play_circle' : 'link',
        url: '#'
      });
    });

    courseModules.forEach(mod => {
      if (mod.resourcesList) {
        mod.resourcesList.forEach(r => {
          items.push({
            type: 'resource',
            id: r.id,
            title: r.name,
            desc: `${mod.shortTitle} Resource · ${r.desc} (${r.size})`,
            page: 'course',
            tab: 'modules',
            moduleId: mod.id,
            icon: r.icon || 'insert_drive_file',
            url: r.url
          });
        });
      }
    });

    dummyPosts.forEach(p => {
      if (p.attachments) {
        p.attachments.forEach(att => {
          items.push({
            type: 'resource',
            id: att.id,
            title: att.name,
            desc: `Attached to: "${p.title || 'Community post'}" (${att.size})`,
            page: 'community',
            postId: p.id,
            icon: att.type === 'image' ? 'image' : 'description',
            url: att.url
          });
        });
      }
    });

    // 5. Study Rooms
    studyRooms.forEach((room, idx) => {
      items.push({
        type: 'studyroom',
        id: `sr-${idx}`,
        title: room.title,
        desc: `${room.subtitle} · ${room.desc} (${room.joined}/${room.total} members)`,
        page: 'studyrooms',
        icon: 'groups'
      });
    });

    return items;
  }, []);

  // Filter items matching the query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allSearchableItems.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, allSearchableItems]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < filteredResults.length) {
        handleItemClick(filteredResults[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item) => {
    // 1. Navigate to the page
    setActivePage(item.page);

    // 2. Dispatch events for deep navigation
    if (item.type === 'discussion') {
      if (item.page === 'course') {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('course-open-post', {
            detail: {
              tab: item.tab,
              postId: item.postId,
              moduleId: item.moduleId,
              modulePostId: item.modulePostId
            }
          }));
        }, 50);
      } else if (item.page === 'community') {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('community-open-post', {
            detail: { postId: item.postId }
          }));
        }, 50);
      }
    } else if (item.type === 'mentor') {
      setTimeout(() => {
        const eventName = item.page === 'course' ? 'course-show-profile' : 'community-show-profile';
        window.dispatchEvent(new CustomEvent(eventName, {
          detail: { user: item.mentorData }
        }));
      }, 50);
    } else if (item.type === 'resource') {
      if (item.page === 'course') {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('course-open-post', {
            detail: {
              tab: item.tab,
              moduleId: item.moduleId
            }
          }));
          if (item.url && item.url !== '#') {
            window.open(item.url, '_blank');
          }
        }, 50);
      } else if (item.page === 'community') {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('community-open-post', {
            detail: { postId: item.postId }
          }));
        }, 50);
      }
    }

    setQuery('');
    setIsOpen(false);
  };

  return (
    <header className="topbar" id="topbar">
      <button className="menu-toggle" id="menuToggle" onClick={toggleSidebar}>
        <span className="material-icons-round">menu</span>
      </button>
      <div className="search-bar" id="searchBar" ref={searchRef}>
        <span className="material-icons-round">search</span>
        <input 
          type="text" 
          placeholder="Search discussions, mentors, resources..." 
          id="globalSearch"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {isOpen && filteredResults.length > 0 && (
          <div className="search-dropdown-menu">
            <div className="search-dropdown-header">
              <span>Search Results ({filteredResults.length})</span>
              <kbd>Esc to dismiss</kbd>
            </div>
            <div className="search-dropdown-body">
              {filteredResults.map((item, idx) => (
                <div 
                  key={idx}
                  className={`search-dropdown-item ${idx === highlightedIndex ? 'highlighted' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="material-icons-round search-item-icon">{item.icon}</span>
                  <div className="search-item-info">
                    <div className="search-item-title">
                      {item.title}
                      <span className="search-item-badge">{item.type}</span>
                    </div>
                    <div className="search-item-desc">{item.desc}</div>
                  </div>
                  <span className="material-icons-round search-item-arrow">chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isOpen && query.trim() && filteredResults.length === 0 && (
          <div className="search-dropdown-menu">
            <div className="search-no-results">
              <span className="material-icons-round">search_off</span>
              <div className="search-no-results-text">No results found for "{query}"</div>
              <div className="search-no-results-hint">Try searching for pages, file attachments, mentors or discussions</div>
            </div>
          </div>
        )}
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
