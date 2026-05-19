document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  const pageTitle = document.getElementById('pageTitle');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  
  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Page Navigation Logic
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all
      navItems.forEach(nav => nav.classList.remove('active'));
      pages.forEach(page => page.classList.remove('active'));
      
      // Add active class to clicked nav and corresponding page
      item.classList.add('active');
      const targetPageId = `page-${item.dataset.page}`;
      document.getElementById(targetPageId).classList.add('active');
      
      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
      
      // Trigger animations for rings if on dashboard
      if (item.dataset.page === 'dashboard') {
        animateRings();
        animateBars();
      }
      });
  });

  // Notifications Navigation
  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      pages.forEach(page => page.classList.remove('active'));
      document.getElementById('page-notifications').classList.add('active');
    });
  }

  // Create Room Modal Logic
  const createRoomBtn = document.getElementById('createRoomBtn');
  const createRoomModal = document.getElementById('createRoomModal');
  const closeCreateRoomBtn = document.getElementById('closeCreateRoomBtn');
  const cancelCreateRoomBtn = document.getElementById('cancelCreateRoomBtn');
  const confirmCreateRoomBtn = document.getElementById('confirmCreateRoomBtn');
  const toggleSwitch = document.querySelector('.toggle-switch');

  if (createRoomBtn && createRoomModal) {
    createRoomBtn.addEventListener('click', () => {
      createRoomModal.style.display = 'flex';
    });

    const closeModal = () => { createRoomModal.style.display = 'none'; };
    
    closeCreateRoomBtn.addEventListener('click', closeModal);
    cancelCreateRoomBtn.addEventListener('click', closeModal);
    confirmCreateRoomBtn.addEventListener('click', closeModal);

    createRoomModal.addEventListener('click', (e) => {
      if (e.target === createRoomModal) closeModal();
    });

    if (toggleSwitch) {
      toggleSwitch.addEventListener('click', () => {
        toggleSwitch.classList.toggle('active');
      });
    }
  }

  // Course Community Tabs
  const courseTabs = document.querySelectorAll('.course-tab');
  const courseContents = document.querySelectorAll('.course-tab-content');
  
  courseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      courseTabs.forEach(t => t.classList.remove('active'));
      courseContents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // Animations
  function animateRings() {
    const rings = document.querySelectorAll('.stat-ring .ring-fill');
    rings.forEach(ring => {
      const parent = ring.closest('.stat-ring');
      const percent = parent.dataset.percent;
      // Reset animation
      ring.style.strokeDasharray = `0, 100`;
      setTimeout(() => {
        ring.style.strokeDasharray = `${percent}, 100`;
      }, 100);
    });
  }

  function animateBars() {
    const bars = document.querySelectorAll('.prog-fill');
    bars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  }

  // Initial Animation
  setTimeout(() => {
    animateRings();
  }, 300);

  // Render Open Community Posts
  const postsFeed = document.getElementById('postsFeed');
  const communityFeedView = document.getElementById('communityFeedView');
  const postDetailView = document.getElementById('postDetailView');
  const backToPostsBtn = document.getElementById('backToPostsBtn');
  
  if (backToPostsBtn) {
    backToPostsBtn.addEventListener('click', () => {
      postDetailView.style.display = 'none';
      communityFeedView.style.display = 'block';
    });
  }

  const dummyPosts = [
    {
      id: 1,
      author: 'Dr. Rajesh Kumar',
      avatar: 'DR',
      role: 'mentor',
      time: '19 May',
      title: 'Career AMA: Getting into ML roles at FAANG — this Saturday 6 PM',
      tags: ['#career', '#ml-roles', '#ama', '#faang'],
      badges: [{text: 'Announcement', class: 'badge-announcement'}, {text: '📌 Pinned', class: 'badge-pinned'}],
      content: 'I will be hosting an open AMA session this Saturday for students interested in machine learning roles at top tech companies. Bring your questions about interview prep, portfolio building, and navigating the hiring process. Register using the link in the community resources section.',
      likes: 156,
      comments: 47,
      replies: [
        { author: 'Neha Kumar', avatar: 'NK', time: '2 hours ago', content: 'Super excited for this! Will you be covering system design for ML interviews?' },
        { author: 'Dr. Rajesh Kumar', avatar: 'DR', role: 'mentor', time: '1 hour ago', content: 'Yes, Neha! I will dedicate about 15 minutes specifically to ML system design patterns.' }
      ]
    },
    {
      id: 2,
      author: 'Vikram Patel',
      avatar: 'VP',
      role: 'student',
      time: '5 hours ago',
      title: 'Help understanding Backpropagation in Neural Networks',
      tags: ['#deep-learning', '#neural-networks', '#help'],
      badges: [],
      content: 'Hey everyone, I found this amazing visualization tool for understanding neural network architectures, but I am still struggling a bit with the chain rule application in backpropagation. Can someone explain it simply?',
      likes: 15,
      comments: 3,
      replies: []
    }
  ];

  function renderFeed() {
    if (!postsFeed) return;
    postsFeed.innerHTML = dummyPosts.map(post => `
      <div class="post-card" data-id="${post.id}">
        <div class="post-header">
          <div class="post-author-info">
            <div class="post-avatar" style="background: ${post.role === 'mentor' ? '#2563EB' : post.role === 'alumni' ? '#F59E0B' : 'var(--primary-light)'}">
              ${post.avatar}
            </div>
            <div>
              ${post.badges.map(b => `<span class="post-tag-badge ${b.class}">${b.text}</span>`).join('')}
              <span class="post-name">${post.author} <span style="font-weight:400;color:var(--text-muted)">· ${post.role === 'mentor' ? 'Mentor' : post.role === 'alumni' ? 'Alumni' : 'Student'} · ${post.time}</span></span>
            </div>
          </div>
        </div>
        <div class="post-title-row">${post.title}</div>
        <div class="post-content">
          ${post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
        </div>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
        <div class="post-actions">
          <button class="post-action"><span class="material-icons-round" style="font-size:18px">thumb_up_off_alt</span> ${post.likes} Likes</button>
          <button class="post-action"><span class="material-icons-round" style="font-size:18px">chat_bubble_outline</span> ${post.comments} Replies</button>
        </div>
      </div>
    `).join('');

    // Attach click listeners to post cards
    document.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', () => {
        const postId = parseInt(card.dataset.id);
        const post = dummyPosts.find(p => p.id === postId);
        if (post) openPostDetail(post);
      });
    });
  }

  // Main Composer Post Button
  const postBtn = document.getElementById('postBtn');
  const composerInput = document.getElementById('composerInput');
  if (postBtn && composerInput) {
    postBtn.addEventListener('click', () => {
      const text = composerInput.value.trim();
      if (text) {
        dummyPosts.unshift({
          id: Date.now(),
          author: 'Rahul Agarwal',
          avatar: 'RA',
          role: 'student',
          time: 'Just now',
          title: 'New Discussion',
          tags: ['#general'],
          badges: [],
          content: text,
          likes: 0,
          comments: 0,
          replies: []
        });
        composerInput.value = '';
        renderFeed();
      }
    });
  }

  function openPostDetail(post) {
    communityFeedView.style.display = 'none';
    postDetailView.style.display = 'block';

    const detailContent = document.getElementById('postDetailContent');
    const repliesList = document.getElementById('repliesList');
    const repliesCountText = document.getElementById('repliesCountText');

    detailContent.innerHTML = `
      <div class="post-card detail-card">
        <div class="post-header" style="margin-bottom: 16px;">
          <div class="post-author-info">
            <div class="post-avatar" style="background: ${post.role === 'mentor' ? '#2563EB' : post.role === 'alumni' ? '#F59E0B' : 'var(--primary-light)'}; width: 48px; height: 48px; font-size: 18px;">
              ${post.avatar}
            </div>
            <div>
              ${post.badges.map(b => `<span class="post-tag-badge ${b.class}">${b.text}</span>`).join('')}
              <div class="post-title-row" style="margin-bottom: 4px; font-size: 20px;">${post.title}</div>
              <span class="post-name" style="font-weight:500;color:var(--text-main)">${post.author} <span style="font-weight:400;color:var(--text-muted)">· ${post.role === 'mentor' ? 'Mentor' : post.role === 'alumni' ? 'Alumni' : 'Student'} · ${post.time}</span></span>
            </div>
          </div>
        </div>
        <div class="post-content" style="font-size: 15px;">
          ${post.content}
        </div>
        <div class="post-tags" style="margin-bottom: 24px;">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
        <div class="post-actions" style="border-top: 1px solid var(--border); padding-top: 16px;">
          <button class="post-action"><span class="material-icons-round" style="font-size:20px">thumb_up_off_alt</span> ${post.likes} Likes</button>
          <button class="post-action active"><span class="material-icons-round" style="font-size:20px">chat_bubble_outline</span> ${post.comments} Replies</button>
        </div>
      </div>
    `;

    repliesCountText.innerText = `${post.replies.length} Replies`;

    if (post.replies.length > 0) {
      repliesList.innerHTML = post.replies.map(reply => `
        <div class="reply-item">
          <div class="post-author-info" style="margin-bottom: 8px;">
            <div class="post-avatar" style="width: 32px; height: 32px; font-size: 12px; background: ${reply.role === 'mentor' ? '#2563EB' : 'var(--primary-light)'}">
              ${reply.avatar}
            </div>
            <div>
              <span class="post-name" style="font-size: 14px;">${reply.author} <span style="font-weight:400;color:var(--text-muted)">· ${reply.time}</span></span>
            </div>
          </div>
          <div class="post-content" style="margin-left: 44px; margin-bottom: 0;">
            ${reply.content}
          </div>
        </div>
      `).join('');
    } else {
      repliesList.innerHTML = '<div style="color:var(--text-muted); padding: 20px 0;">No replies yet. Be the first to share your thoughts!</div>';
    }

    // Handle Like Button
    const likeBtn = detailContent.querySelector('.post-action');
    let isLiked = false;
    likeBtn.addEventListener('click', () => {
      if (!isLiked) {
        post.likes++;
        isLiked = true;
        likeBtn.innerHTML = `<span class="material-icons-round" style="font-size:20px">thumb_up</span> ${post.likes} Likes`;
        likeBtn.style.color = 'var(--primary)';
        renderFeed();
      } else {
        post.likes--;
        isLiked = false;
        likeBtn.innerHTML = `<span class="material-icons-round" style="font-size:20px">thumb_up_off_alt</span> ${post.likes} Likes`;
        likeBtn.style.color = '';
        renderFeed();
      }
    });

    // Handle Reply Button
    const replyBtn = document.querySelector('#postDetailView .reply-actions .btn-primary');
    const replyTextarea = document.querySelector('#postDetailView .reply-textarea');
    
    // Remove old event listeners by cloning the button
    const newReplyBtn = replyBtn.cloneNode(true);
    replyBtn.parentNode.replaceChild(newReplyBtn, replyBtn);
    
    replyTextarea.value = ''; // clear textarea
    
    newReplyBtn.addEventListener('click', () => {
      const text = replyTextarea.value.trim();
      if (text) {
        post.replies.push({
          author: 'You',
          avatar: 'U',
          role: 'student',
          time: 'Just now',
          content: text
        });
        post.comments++;
        renderFeed();
        openPostDetail(post); // Refresh view
      }
    });
  }

  // Initial render
  renderFeed();

  // Render Course Modules
  const moduleList = document.getElementById('moduleList');
  if (moduleList) {
    moduleList.innerHTML = [1, 2, 3, 4, 5].map(i => `
      <div class="module-item">
        <div class="module-header">
          <div>
            <div class="module-title"><span class="material-icons-round" style="color:var(--primary)">folder</span> Module ${i}: ${['Python Basics', 'EDA & Stats', 'Machine Learning', 'Deep Learning', 'Capstone'][i-1]}</div>
            <div class="module-meta">
              <span><span class="material-icons-round" style="font-size:14px;vertical-align:middle">description</span> 12 Resources</span>
              <span><span class="material-icons-round" style="font-size:14px;vertical-align:middle">forum</span> ${Math.floor(Math.random() * 30) + 5} Discussions</span>
            </div>
          </div>
          <span class="material-icons-round" style="color:var(--text-muted)">chevron_right</span>
        </div>
      </div>
    `).join('');
  }

  // Render Resources
  const resourceGrid = document.getElementById('resourceGrid');
  if (resourceGrid) {
    resourceGrid.innerHTML = [
      { type: 'pdf', icon: 'picture_as_pdf', name: 'Stats Cheat Sheet', desc: 'Comprehensive guide for probability and statistics.' },
      { type: 'video', icon: 'play_circle', name: 'Live Session Rec', desc: 'Recording of Module 2 Live Session.' },
      { type: 'link', icon: 'link', name: 'Colab Notebook', desc: 'Practice exercises for Pandas.' },
      { type: 'pdf', icon: 'picture_as_pdf', name: 'Project Guidelines', desc: 'Rubric and rules for Capstone Phase 1.' }
    ].map(res => `
      <div class="resource-card">
        <div class="resource-icon ${res.type}">
          <span class="material-icons-round">${res.icon}</span>
        </div>
        <div class="resource-title">${res.name}</div>
        <div class="resource-desc">${res.desc}</div>
        <div class="resource-footer">
          <span style="font-size:12px;color:var(--text-light)">Module 2</span>
          <button style="background:none;border:none;color:var(--primary);cursor:pointer;font-weight:600;font-size:13px">Open</button>
        </div>
      </div>
    `).join('');
  }

  // Render Study Rooms
  const roomsGrid = document.getElementById('roomsGrid');
  if (roomsGrid) {
    const studyRooms = [
      { 
        title: 'PM Case Study Prep', 
        subtitle: 'Product Strategy & Frameworks', 
        desc: 'Practicing STAR format for product case studies. Mock sessions with peer feedback.', 
        joined: 3, 
        total: 6, 
        creator: 'Priya Nair', 
        isJoined: false,
        avatars: ['PR', 'VI', 'ME'],
        hasPomodoro: true
      },
      { 
        title: 'Module 5 Deep Dive', 
        subtitle: 'Neural Networks & Backpropagation', 
        desc: 'Working through Module 5 exercises together. Pomodoro-style — 25 min focus, 5 min break.', 
        joined: 3, 
        total: 8, 
        creator: 'Arjun Sharma', 
        isJoined: false,
        avatars: ['KI', 'MI', 'VI'],
        hasPomodoro: true
      },
      { 
        title: 'EDA Project Workshop', 
        subtitle: 'Exploratory Data Analysis', 
        desc: 'Collaborative session for Module 4 EDA project. Share your approaches and get feedback.', 
        joined: 3, 
        total: 6, 
        creator: 'Kiran Reddy', 
        isJoined: true,
        avatars: ['KI', 'MI', 'AR'],
        hasPomodoro: false
      },
      { 
        title: 'Python Fundamentals Review', 
        subtitle: 'Python for Data Science', 
        desc: 'Reviewing Python basics — list comprehensions, pandas, numpy. Open to all levels.', 
        joined: 5, 
        total: 10, 
        creator: 'Meera Joshi', 
        isJoined: false,
        avatars: ['PR', 'KI', 'MI', 'DR', 'VI'],
        hasPomodoro: false
      }
    ];

    roomsGrid.innerHTML = studyRooms.map(room => `
      <div class="room-card">
        <div class="room-header">
          <div class="room-icon"><span class="material-icons-round">menu_book</span></div>
          <div class="room-titles">
            <h3 class="room-title">${room.title}</h3>
            <span class="room-subtitle">${room.subtitle}</span>
          </div>
          <div class="room-badges">
            ${room.hasPomodoro ? '<span class="badge-pomodoro"><span class="material-icons-round">timer</span> Pomodoro</span>' : ''}
            <span class="badge-active">Active</span>
          </div>
        </div>
        <div class="room-desc">${room.desc}</div>
        <div class="room-stats">
          <div class="room-participants-row">
            <div class="room-participants">
              ${room.avatars.map((av, idx) => `<div class="room-participant-avatar bg-${(idx % 4) + 1}">${av}</div>`).join('')}
            </div>
            <span class="room-join-count">${room.joined}/${room.total} joined</span>
          </div>
          <div class="room-prog-bar">
            <div class="room-prog-fill" style="width: ${(room.joined / room.total) * 100}%"></div>
          </div>
        </div>
        <div class="room-footer">
          <span class="room-creator">Created by ${room.creator}</span>
          ${room.isJoined 
            ? '<button class="btn-room-leave"><span class="material-icons-round" style="font-size: 16px;">logout</span> Leave</button>'
            : '<button class="btn-room-join"><span class="material-icons-round" style="font-size: 16px;">login</span> Join</button>'}
        </div>
      </div>
    `).join('');
  }

  // Render Chat Contacts
  const chatList = document.getElementById('chatList');
  if (chatList) {
    chatList.innerHTML = `
      <div class="chat-contact" style="display: flex; gap: 12px; padding: 12px; border-radius: var(--radius-md); cursor: pointer; transition: 0.2s;">
        <div class="contact-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #2563EB; color: white; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 14px; flex-shrink: 0;">PR</div>
        <div class="contact-info" style="flex: 1; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <div style="font-weight: 600; font-size: 14px; color: var(--text-main);">Priya Nair</div>
            <div style="font-size: 12px; color: var(--text-muted);">08:01 pm</div>
          </div>
          <div style="font-size: 13px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Thanks Priya! That 3Blue1Brown video r...</div>
        </div>
      </div>
      
      <div class="chat-contact active" style="display: flex; gap: 12px; padding: 12px; border-radius: var(--radius-md); cursor: pointer; transition: 0.2s; background: #F1F5F9;">
        <div class="contact-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #2563EB; color: white; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 14px; flex-shrink: 0;">DR</div>
        <div class="contact-info" style="flex: 1; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <div style="font-weight: 600; font-size: 14px; color: var(--text-main);">Dr. Rajesh Kumar</div>
            <div style="font-size: 12px; color: var(--text-muted);">08:01 pm</div>
          </div>
          <div style="font-size: 13px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Arjun — your question in the gradient d...</div>
        </div>
      </div>
      
      <div class="chat-contact" style="display: flex; gap: 12px; padding: 12px; border-radius: var(--radius-md); cursor: pointer; transition: 0.2s;">
        <div class="contact-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #2563EB; color: white; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 14px; flex-shrink: 0;">ME</div>
        <div class="contact-info" style="flex: 1; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <div style="font-weight: 600; font-size: 14px; color: var(--text-main);">Meera Joshi</div>
            <div style="font-size: 12px; color: var(--text-muted);">08:01 pm</div>
          </div>
          <div style="font-size: 13px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Hi Arjun, saw your EDA project draft in t...</div>
        </div>
      </div>
    `;
  }
  
  const chatWindow = document.getElementById('chatWindow');
  if (chatWindow) {
    chatWindow.innerHTML = `
      <!-- Chat Header -->
      <div style="padding: 16px 24px; border-bottom: 1px solid var(--border); display: flex; gap: 12px; align-items: center;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: #2563EB; color: white; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 14px;">DR</div>
        <div>
          <div style="font-weight: 700; font-size: 16px; color: var(--text-main); margin-bottom: 2px;">Dr. Rajesh Kumar</div>
          <div style="font-size: 13px; color: var(--text-muted);">Mentor · & AI</div>
        </div>
      </div>
      
      <!-- Chat Thread -->
      <div style="flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column;">
        
        <div style="display: flex; justify-content: flex-start; margin-bottom: 24px;">
          <div style="max-width: 75%; background: #F1F5F9; border-radius: 12px; border-top-left-radius: 4px; padding: 16px;">
            <div style="font-size: 15px; color: var(--text-main); line-height: 1.6; margin-bottom: 8px;">
              Arjun — your question in the gradient descent thread was excellent. It showed deep thinking. Make sure to submit your Module 5 assignment on time, you are on track for referral eligibility.
            </div>
            <div style="font-size: 12px; color: var(--text-muted);">08:01 pm</div>
          </div>
        </div>
        
      </div>
      
      <!-- Chat Input Area (optional, keeping it simple as per screenshot which cut it off) -->
    `;
  }

  // Profile Data
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = ['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Pandas', 'Scikit-Learn', 'Statistics'].map(s => `<span class="skill-tag">${s}</span>`).join('');
  }

  const projectsList = document.getElementById('projectsList');
  if (projectsList) {
    projectsList.innerHTML = `
      <div class="project-item">
        <div class="project-title">Customer Churn Prediction <span class="project-score">Score: 92/100</span></div>
        <div class="project-desc">Built a Random Forest model to predict telecom customer churn with 88% accuracy.</div>
        <a href="#" class="project-link"><span class="material-icons-round" style="font-size:16px">link</span> View Details</a>
      </div>
      <div class="project-item">
        <div class="project-title">E-commerce Sales Dashboard <span class="project-score">Score: 88/100</span></div>
        <div class="project-desc">Interactive Tableau dashboard analyzing Q3 sales data and customer segments.</div>
        <a href="#" class="project-link"><span class="material-icons-round" style="font-size:16px">link</span> View Details</a>
      </div>
    `;
  }

  const academicStats = document.getElementById('academicStats');
  if (academicStats) {
    academicStats.innerHTML = `
      <div class="acad-stat-box"><div class="acad-stat-val">18</div><div class="acad-stat-label">Assignments</div></div>
      <div class="acad-stat-box"><div class="acad-stat-val">5</div><div class="acad-stat-label">Projects</div></div>
      <div class="acad-stat-box"><div class="acad-stat-val">85%</div><div class="acad-stat-label">Avg Score</div></div>
      <div class="acad-stat-box"><div class="acad-stat-val">Top 10%</div><div class="acad-stat-label">Cohort Rank</div></div>
    `;
  }

  const badgesGrid = document.getElementById('badgesGrid');
  if (badgesGrid) {
    badgesGrid.innerHTML = `
      <div class="badge-card"><div class="badge-icon badge-gold"><span class="material-icons-round">emoji_events</span></div><div class="badge-name">Top Contributor</div></div>
      <div class="badge-card"><div class="badge-icon badge-blue"><span class="material-icons-round">local_fire_department</span></div><div class="badge-name">10 Day Streak</div></div>
      <div class="badge-card"><div class="badge-icon badge-green"><span class="material-icons-round">forum</span></div><div class="badge-name">Helpful Peer</div></div>
    `;
  }

  const referralStatus = document.getElementById('referralStatus');
  if (referralStatus) {
    referralStatus.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px">
        <div class="stat-ring referral" data-percent="68" style="width:50px;height:50px">
          <svg viewBox="0 0 36 36"><path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="ring-fill gold" stroke-dasharray="68, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
          <span class="ring-text">68%</span>
        </div>
        <div>
          <div style="font-weight:600;margin-bottom:4px">On track to unlock referrals</div>
          <div style="font-size:13px;color:var(--text-muted)">Maintain a score >85% and complete Phase 2 project to unlock.</div>
        </div>
      </div>
    `;
  }

  // Referral Center Data
  const refProgress = document.getElementById('referralProgressCard');
  if (refProgress) {
    refProgress.innerHTML = `
      <div class="ref-lock-icon">
        <span class="material-icons-round">lock</span>
      </div>
      <div class="ref-prog-info">
        <h2>Referral Access Locked</h2>
        <p>You're almost there! Complete the remaining requirements to unlock direct career networking with Accredian Alumni.</p>
        <div class="ref-bar-container"><div class="ref-bar-fill"></div></div>
        <div class="ref-milestones">
          <span>68% Completed</span>
          <span>Next Milestone: Phase 2 Capstone</span>
        </div>
      </div>
    `;
  }

  const alumniDirectory = document.getElementById('alumniDirectory');
  if (alumniDirectory) {
    const alumniList = [
      { id: 1, name: 'Rahul Mehta', initials: 'RM', role: 'Senior Data Scientist', comp: 'Google', batch: 'PGPDSAI-2020', desc: 'PGPDSAI 2020 alum. Led ML infrastructure at a startup before joining Google. Passionate about helping Accredian students navigate FAANG interviews and ML engineering careers.', tags: ['Python', 'TensorFlow', 'Large-scale ML', 'Data Infrastructure'], isAvailable: true },
      { id: 2, name: 'Kritika Singh', initials: 'KS', role: 'Product Analyst', comp: 'Swiggy', batch: 'PGPDSAI-2021', desc: 'Specializes in product analytics and A/B testing.', tags: ['SQL', 'Tableau', 'Product Strategy'], isAvailable: false },
      { id: 3, name: 'Praveen Sharma', initials: 'PS', role: 'Machine Learning Eng', comp: 'Amazon', batch: 'PGPDSAI-2019', desc: 'Working on recommendation systems.', tags: ['AWS', 'PyTorch', 'RecSys'], isAvailable: true },
      { id: 4, name: 'Anita Desai', initials: 'AD', role: 'Data Engineer', comp: 'Walmart Labs', batch: 'PGPDSAI-2022', desc: 'Building scalable data pipelines.', tags: ['Spark', 'Airflow', 'GCP'], isAvailable: true }
    ];

    function renderAlumni() {
      alumniDirectory.innerHTML = alumniList.map(al => `
        <div class="alumni-card" style="cursor: pointer;" data-id="${al.id}">
          <div class="alumni-header">
            <div class="alumni-avatar" style="display:flex; justify-content:center; align-items:center; background:var(--primary); color:white; font-weight:bold;">${al.initials}</div>
            <div class="alumni-info">
              <h3>${al.name}</h3>
              <div class="alumni-role">${al.role}</div>
              <div class="alumni-company">${al.comp}</div>
            </div>
          </div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Mentorship: ${al.isAvailable ? 'Available' : 'Unavailable'}</div>
          <button class="btn-outline" style="width:100%;justify-content:center" disabled>Request Referral</button>
        </div>
      `).join('');

      document.querySelectorAll('.alumni-card').forEach(card => {
        card.addEventListener('click', () => {
          const al = alumniList.find(a => a.id === parseInt(card.dataset.id));
          if (al) openAlumniDetail(al);
        });
      });
    }

    renderAlumni();
  }

  const referralsMainView = document.getElementById('referralsMainView');
  const alumniDetailView = document.getElementById('alumniDetailView');
  const backToAlumniBtn = document.getElementById('backToAlumniBtn');
  
  if (backToAlumniBtn) {
    backToAlumniBtn.addEventListener('click', () => {
      alumniDetailView.style.display = 'none';
      referralsMainView.style.display = 'block';
    });
  }

  function openAlumniDetail(al) {
    referralsMainView.style.display = 'none';
    alumniDetailView.style.display = 'block';

    const detailContent = document.getElementById('alumniDetailContent');
    const pctElement = document.querySelector('.stat-ring.referral');
    const pct = pctElement && pctElement.dataset.percent ? parseInt(pctElement.dataset.percent) : 78;

    detailContent.innerHTML = `
      <div class="post-card" style="margin-bottom: 24px; padding: 32px;">
        <div style="display: flex; gap: 24px; align-items: flex-start;">
          <div style="width: 80px; height: 80px; border-radius: 50%; background: #2563EB; color: white; display: flex; justify-content: center; align-items: center; font-size: 28px; font-weight: 700; flex-shrink: 0;">
            ${al.initials}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
              <h2 style="font-size: 24px; font-weight: 700; color: var(--text-main); margin: 0;">${al.name}</h2>
              ${al.isAvailable ? '<span style="background: #2563EB; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">Available for Referrals</span>' : ''}
            </div>
            <div style="font-size: 16px; color: var(--text-muted); margin-bottom: 4px;">${al.role} at ${al.comp}</div>
            <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 24px;">Batch: ${al.batch}</div>
            
            <p style="font-size: 15px; color: var(--text-main); line-height: 1.6; margin-bottom: 24px; margin-top: 0;">
              ${al.desc}
            </p>
            
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
              ${al.tags.map(t => `<span style="background: #F8FAFC; color: var(--text-main); font-size: 13px; font-weight: 600; padding: 6px 12px; border-radius: 4px;">${t}</span>`).join('')}
            </div>
            
            <a href="#" style="color: #2563EB; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span class="material-icons-round" style="font-size: 16px;">open_in_new</span> View LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
      
      <div class="post-card" style="padding: 24px 32px;">
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 20px; color: var(--text-main); margin-top: 0;">Request a Referral</h3>
        
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <span class="material-icons-round" style="color: #F59E0B; font-size: 24px;">lock_outline</span>
          <div>
            <div style="font-size: 16px; font-weight: 600; color: #D97706; margin-bottom: 8px;">Complete eligibility requirements first</div>
            <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">You need to meet the referral criteria before requesting. You are currently at ${pct}%.</div>
            <button class="btn-outline" style="background: white; border-color: var(--border); color: var(--text-main);">View Requirements</button>
          </div>
        </div>
      </div>
    `;
  }

  // Leaderboard Data
  const podium = document.getElementById('leaderboardPodium');
  if (podium) {
    podium.innerHTML = `
      <div class="podium-item rank-2">
        <div class="podium-avatar">RA</div>
        <div class="podium-name">Rahul Agarwal</div>
        <div class="podium-pts">2,620</div>
        <div class="podium-base">2</div>
      </div>
      <div class="podium-item rank-1">
        <span class="material-icons-round podium-crown">crown</span>
        <div class="podium-avatar">NK</div>
        <div class="podium-name">Neha Kumar</div>
        <div class="podium-pts">2,840</div>
        <div class="podium-base">1</div>
      </div>
      <div class="podium-item rank-3">
        <div class="podium-avatar">VP</div>
        <div class="podium-name">Vikram Patel</div>
        <div class="podium-pts">2,410</div>
        <div class="podium-base">3</div>
      </div>
    `;
  }

  const lbTable = document.getElementById('leaderboardTable');
  if (lbTable) {
    let rows = `<div class="lb-table-row lb-table-header"><div>Rank</div><div>Student</div><div>Streak</div><div style="text-align:right">Points</div></div>`;
    
    const users = [
      { r: 4, n: 'Aarav Singh', i: 'AS', s: 8, p: 2150 },
      { r: 5, n: 'Priya Verma', i: 'PV', s: 15, p: 1980 },
      { r: 6, n: 'Siddharth Roy', i: 'SR', s: 5, p: 1840 },
      { r: 7, n: 'Ananya Gupta', i: 'AG', s: 12, p: 1720 },
      { r: 8, n: 'Karan Malhotra', i: 'KM', s: 3, p: 1650 }
    ];

    rows += users.map(u => `
      <div class="lb-table-row">
        <div class="lb-col-rank">#${u.r}</div>
        <div class="lb-col-user"><div class="lb-user-avatar">${u.i}</div> ${u.n}</div>
        <div class="lb-col-streak"><span class="material-icons-round" style="font-size:16px">local_fire_department</span> ${u.s} days</div>
        <div class="lb-col-pts">${u.p} pts</div>
      </div>
    `).join('');

    lbTable.innerHTML = rows;
  }

  // ==== COURSE FEED LOGIC ====
  const coursePostsFeed = document.getElementById('coursePostsFeed');
  const courseFeedView = document.getElementById('courseFeedView');
  const coursePostDetailView = document.getElementById('coursePostDetailView');
  const courseBackToPostsBtn = document.getElementById('courseBackToPostsBtn');
  
  if (courseBackToPostsBtn) {
    courseBackToPostsBtn.addEventListener('click', () => {
      coursePostDetailView.style.display = 'none';
      courseFeedView.style.display = 'block';
    });
  }

  const dummyCoursePosts = [
    {
      id: 101,
      author: 'Dr. Priya Sharma',
      avatar: 'PS',
      role: 'mentor',
      time: '2 hours ago',
      title: 'Module 4 Resources Updated',
      tags: ['#announcement', '#module4'],
      badges: [{text: 'Announcement', class: 'badge-announcement'}],
      content: 'Just uploaded the new materials for Module 4: Advanced Ensemble Methods. Please review the Random Forest implementation case study before our live session on Thursday. I\'ve included both Python and R examples.',
      likes: 24,
      comments: 2,
      replies: [
        { author: 'Rahul Agarwal', avatar: 'RA', role: 'student', time: '1 hour ago', content: 'Thanks Dr. Priya! Are the datasets also uploaded in the portal?' },
        { author: 'Dr. Priya Sharma', avatar: 'PS', role: 'mentor', time: '10 mins ago', content: 'Yes, they are in the Resource Library tab.' }
      ]
    }
  ];

  function renderCourseFeed() {
    if (!coursePostsFeed) return;
    coursePostsFeed.innerHTML = dummyCoursePosts.map(post => `
      <div class="post-card course-post-card" data-id="${post.id}">
        <div class="post-header">
          <div class="post-author-info">
            <div class="post-avatar" style="background: ${post.role === 'mentor' ? '#2563EB' : post.role === 'alumni' ? '#F59E0B' : 'var(--primary-light)'}">
              ${post.avatar}
            </div>
            <div>
              ${post.badges.map(b => `<span class="post-tag-badge ${b.class}">${b.text}</span>`).join('')}
              <span class="post-name">${post.author} <span style="font-weight:400;color:var(--text-muted)">· ${post.role === 'mentor' ? 'Mentor' : post.role === 'alumni' ? 'Alumni' : 'Student'} · ${post.time}</span></span>
            </div>
          </div>
        </div>
        <div class="post-title-row">${post.title}</div>
        <div class="post-content">
          ${post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
        </div>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
        <div class="post-actions">
          <button class="post-action"><span class="material-icons-round" style="font-size:18px">thumb_up_off_alt</span> ${post.likes} Likes</button>
          <button class="post-action"><span class="material-icons-round" style="font-size:18px">chat_bubble_outline</span> ${post.comments} Replies</button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.course-post-card').forEach(card => {
      card.addEventListener('click', () => {
        const postId = parseInt(card.dataset.id);
        const post = dummyCoursePosts.find(p => p.id === postId);
        if (post) openCoursePostDetail(post);
      });
    });
  }

  const coursePostBtn = document.getElementById('coursePostBtn');
  const courseComposerInput = document.getElementById('courseComposerInput');
  if (coursePostBtn && courseComposerInput) {
    coursePostBtn.addEventListener('click', () => {
      const text = courseComposerInput.value.trim();
      if (text) {
        dummyCoursePosts.unshift({
          id: Date.now(),
          author: 'Rahul Agarwal',
          avatar: 'RA',
          role: 'student',
          time: 'Just now',
          title: 'New Course Discussion',
          tags: ['#general'],
          badges: [],
          content: text,
          likes: 0,
          comments: 0,
          replies: []
        });
        courseComposerInput.value = '';
        renderCourseFeed();
      }
    });
  }

  function openCoursePostDetail(post) {
    courseFeedView.style.display = 'none';
    coursePostDetailView.style.display = 'block';

    const detailContent = document.getElementById('coursePostDetailContent');
    const repliesList = document.getElementById('courseRepliesList');
    const repliesCountText = document.getElementById('courseRepliesCountText');

    detailContent.innerHTML = `
      <div class="post-card detail-card">
        <div class="post-header" style="margin-bottom: 16px;">
          <div class="post-author-info">
            <div class="post-avatar" style="background: ${post.role === 'mentor' ? '#2563EB' : post.role === 'alumni' ? '#F59E0B' : 'var(--primary-light)'}; width: 48px; height: 48px; font-size: 18px;">
              ${post.avatar}
            </div>
            <div>
              ${post.badges.map(b => `<span class="post-tag-badge ${b.class}">${b.text}</span>`).join('')}
              <div class="post-title-row" style="margin-bottom: 4px; font-size: 20px;">${post.title}</div>
              <span class="post-name" style="font-weight:500;color:var(--text-main)">${post.author} <span style="font-weight:400;color:var(--text-muted)">· ${post.role === 'mentor' ? 'Mentor' : post.role === 'alumni' ? 'Alumni' : 'Student'} · ${post.time}</span></span>
            </div>
          </div>
        </div>
        <div class="post-content" style="font-size: 15px;">
          ${post.content}
        </div>
        <div class="post-tags" style="margin-bottom: 24px;">
          ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
        </div>
        <div class="post-actions" style="border-top: 1px solid var(--border); padding-top: 16px;">
          <button class="post-action"><span class="material-icons-round" style="font-size:20px">thumb_up_off_alt</span> ${post.likes} Likes</button>
          <button class="post-action active"><span class="material-icons-round" style="font-size:20px">chat_bubble_outline</span> ${post.comments} Replies</button>
        </div>
      </div>
    `;

    repliesCountText.innerText = `${post.replies.length} Replies`;

    if (post.replies.length > 0) {
      repliesList.innerHTML = post.replies.map(reply => `
        <div class="reply-item">
          <div class="post-author-info" style="margin-bottom: 8px;">
            <div class="post-avatar" style="width: 32px; height: 32px; font-size: 12px; background: ${reply.role === 'mentor' ? '#2563EB' : 'var(--primary-light)'}">
              ${reply.avatar}
            </div>
            <div>
              <span class="post-name" style="font-size: 14px;">${reply.author} <span style="font-weight:400;color:var(--text-muted)">· ${reply.time}</span></span>
            </div>
          </div>
          <div class="post-content" style="margin-left: 44px; margin-bottom: 0;">
            ${reply.content}
          </div>
        </div>
      `).join('');
    } else {
      repliesList.innerHTML = '<div style="color:var(--text-muted); padding: 20px 0;">No replies yet. Be the first to share your thoughts!</div>';
    }

    const likeBtn = detailContent.querySelector('.post-action');
    let isLiked = false;
    likeBtn.addEventListener('click', () => {
      if (!isLiked) {
        post.likes++;
        isLiked = true;
        likeBtn.innerHTML = `<span class="material-icons-round" style="font-size:20px">thumb_up</span> ${post.likes} Likes`;
        likeBtn.style.color = 'var(--primary)';
        renderCourseFeed();
      } else {
        post.likes--;
        isLiked = false;
        likeBtn.innerHTML = `<span class="material-icons-round" style="font-size:20px">thumb_up_off_alt</span> ${post.likes} Likes`;
        likeBtn.style.color = '';
        renderCourseFeed();
      }
    });

    const replyBtn = document.querySelector('#coursePostDetailView .reply-actions .btn-primary');
    const replyTextarea = document.querySelector('#coursePostDetailView .reply-textarea');
    
    const newReplyBtn = replyBtn.cloneNode(true);
    replyBtn.parentNode.replaceChild(newReplyBtn, replyBtn);
    
    replyTextarea.value = ''; 
    
    newReplyBtn.addEventListener('click', () => {
      const text = replyTextarea.value.trim();
      if (text) {
        post.replies.push({
          author: 'You',
          avatar: 'U',
          role: 'student',
          time: 'Just now',
          content: text
        });
        post.comments++;
        renderCourseFeed();
        openCoursePostDetail(post);
      }
    });
  }

  renderCourseFeed();
});
