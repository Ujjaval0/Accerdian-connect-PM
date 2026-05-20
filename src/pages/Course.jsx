import React, { useState, useRef } from 'react';
import { coursePosts as initialPosts, courseResources, courseAnnouncements, courseModules } from '../courseData';
import ModuleDiscussionsTab from '../components/ModuleDiscussionsTab';

const courseMentors = [
  { id: 'cm1', name: 'Dr. Priya Sharma', initials: 'PS', role: 'ML & AI Lead', course: 'PGPDSAI', color: '#8B5CF6', online: true, bio: 'Expert in deep learning and NLP. 10+ years at Google and Microsoft Research.', skills: ['Deep Learning', 'NLP', 'TensorFlow', 'Research'] },
  { id: 'cm2', name: 'Rajesh Kumar', initials: 'RK', role: 'Data Engineering & DL', course: 'PGPDSAI', color: '#2563EB', online: true, bio: 'Senior Data Scientist at Amazon. Specializes in deep learning infrastructure.', skills: ['Spark', 'PyTorch', 'AWS', 'Python'] },
  { id: 'cm3', name: 'Dr. Meena Iyer', initials: 'MI', role: 'Statistics & EDA', course: 'PGPDSAI', color: '#0891B2', online: false, bio: 'PhD in Applied Statistics. Teaches Modules 1-2 on Python and EDA.', skills: ['R', 'Python', 'Pandas', 'Statistics'] },
];

const courseStudents = [
  { id: 'cs1', name: 'Priya Nair', initials: 'PR', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#2563EB', online: true, bio: 'Passionate about neural networks and computer vision.', skills: ['Python', 'PyTorch', 'OpenCV'], isFollowing: false, isFriend: false },
  { id: 'cs2', name: 'Vikram Patel', initials: 'VP', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#8B5CF6', online: false, bio: 'Career switcher from finance. Focused on ML.', skills: ['Python', 'SQL', 'Tableau'], isFollowing: true, isFriend: false },
  { id: 'cs3', name: 'Kiran Reddy', initials: 'KI', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#F59E0B', online: true, bio: 'EDA and visualization enthusiast.', skills: ['Python', 'Matplotlib', 'Seaborn'], isFollowing: false, isFriend: true },
  { id: 'cs4', name: 'Rohan Mehta', initials: 'RM', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#6366F1', online: false, bio: 'Competitive programmer exploring ML research.', skills: ['Python', 'C++', 'TensorFlow'], isFollowing: false, isFriend: false },
  { id: 'cs5', name: 'Nisha Sharma', initials: 'NS', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#A855F7', online: true, bio: 'Working on an NLP capstone project.', skills: ['Python', 'HuggingFace', 'NLP'], isFollowing: true, isFriend: true },
  { id: 'cs6', name: 'Amit Desai', initials: 'AD', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#10B981', online: true, bio: 'Loves pandas and data wrangling challenges.', skills: ['Python', 'Pandas', 'SQL'], isFollowing: false, isFriend: false },
  { id: 'cs7', name: 'Neha Kumar', initials: 'NK', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#EC4899', online: false, bio: 'Aspiring ML engineer with a stats background.', skills: ['Python', 'Scikit-learn', 'Stats'], isFollowing: false, isFriend: false },
  { id: 'cs8', name: 'Siddharth Roy', initials: 'SR', course: 'PGPDSAI', cohort: 'Cohort 42', color: '#0EA5E9', online: true, bio: 'Data storytelling and visualization nerd.', skills: ['Tableau', 'Python', 'D3.js'], isFollowing: false, isFriend: false },
];

const renderAttachments = (attachments) => {
  if (!attachments || attachments.length === 0) return null;
  return (
    <div className="post-attachments" onClick={e => e.stopPropagation()}>
      {attachments.map((att) => {
        if (att.type === 'image') {
          return (
            <img 
              key={att.id || att.name} 
              src={att.url} 
              alt={att.name} 
              className="post-image-attachment" 
              onClick={() => window.open(att.url, '_blank')}
            />
          );
        } else {
          return (
            <a 
              key={att.id || att.name} 
              href={att.url} 
              download={att.name} 
              className="post-file-attachment"
            >
              <div className="post-file-icon">
                <span className="material-icons-round">description</span>
              </div>
              <div className="post-file-info">
                <span className="post-file-name">{att.name}</span>
                <span className="post-file-size">{att.size}</span>
              </div>
              <span className="material-icons-round post-file-download-icon">download</span>
            </a>
          );
        }
      })}
    </div>
  );
};

export default function Course() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState(initialPosts);
  const [activePost, setActivePost] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [profilePopup, setProfilePopup] = useState(null);
  const [students, setStudents] = useState(courseStudents);
  const [activeModule, setActiveModule] = useState(null);
  const [moduleDiscussions, setModuleDiscussions] = useState([]);
  const [activeModulePost, setActiveModulePost] = useState(null);
  const [moduleReplyText, setModuleReplyText] = useState('');
  const [moduleNewPostText, setModuleNewPostText] = useState('');

  const [newPostAttachments, setNewPostAttachments] = useState([]);
  const [replyAttachments, setReplyAttachments] = useState([]);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const replyFileInputRef = useRef(null);
  const replyImageInputRef = useRef(null);

  const handleFileChange = (e, target) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size > 1024 * 1024 
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' 
        : (file.size / 1024).toFixed(1) + ' KB',
      type: file.type.startsWith('image/') ? 'image' : 'file',
      url: URL.createObjectURL(file)
    }));
    
    if (target === 'post') {
      setNewPostAttachments(prev => [...prev, ...newFiles]);
    } else if (target === 'reply') {
      setReplyAttachments(prev => [...prev, ...newFiles]);
    }
    // reset input
    e.target.value = '';
  };

  const removeAttachment = (id, target) => {
    if (target === 'post') {
      setNewPostAttachments(prev => prev.filter(att => att.id !== id));
    } else if (target === 'reply') {
      setReplyAttachments(prev => prev.filter(att => att.id !== id));
    }
  };

  const openModule = (mod) => {
    setActiveModule(mod);
    setModuleDiscussions(mod.discussionsList.map((d) => ({ ...d })));
    setActiveModulePost(null);
    setModuleReplyText('');
    setModuleNewPostText('');
  };

  const closeModule = () => {
    setActiveModule(null);
    setActiveModulePost(null);
    setModuleReplyText('');
    setModuleNewPostText('');
  };

  React.useEffect(() => {
    const handleOpenPost = (e) => {
      const { tab, postId, moduleId, modulePostId } = e.detail;
      if (tab) {
        setActiveTab(tab);
      }
      if (postId) {
        const post = posts.find(p => p.id === Number(postId));
        if (post) {
          setActivePost(post);
        } else {
          setActivePost(null);
        }
      } else {
        setActivePost(null);
      }
      if (moduleId) {
        const mod = courseModules.find(m => m.id === Number(moduleId));
        if (mod) {
          // Instead of openModule local variable TDZ, we duplicate simple state changes or call it here
          setActiveModule(mod);
          setModuleDiscussions(mod.discussionsList.map((d) => ({ ...d })));
          setActiveModulePost(null);
          setModuleReplyText('');
          setModuleNewPostText('');
          
          if (modulePostId) {
            const mPost = mod.discussionsList.find(p => p.id === Number(modulePostId));
            if (mPost) {
              setActiveModulePost(mPost);
            }
          }
        }
      }
    };
    const handleShowProfile = (e) => {
      const { user } = e.detail;
      if (user) {
        setProfilePopup({ ...user, type: 'mentor' });
      }
    };
    window.addEventListener('course-open-post', handleOpenPost);
    window.addEventListener('course-show-profile', handleShowProfile);
    return () => {
      window.removeEventListener('course-open-post', handleOpenPost);
      window.removeEventListener('course-show-profile', handleShowProfile);
    };
  }, [posts]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setActivePost(null);
    if (tab !== 'modules') closeModule();
  };

  const handlePostSubmit = () => {
    if (!newPostText.trim() && newPostAttachments.length === 0) return;
    setPosts([{ id: Date.now(), author: 'Rahul Agarwal', avatar: 'RA', role: 'student', time: 'Just now', title: 'New Course Discussion', tags: ['#general', '#pgp-ds-ai'], badges: [], content: newPostText, attachments: newPostAttachments, likes: 0, comments: 0, replies: [] }, ...posts]);
    setNewPostText('');
    setNewPostAttachments([]);
  };

  const handleReplySubmit = () => {
    if ((!replyText.trim() && replyAttachments.length === 0) || !activePost) return;
    const updatedPost = { ...activePost };
    updatedPost.replies.push({ author: 'Rahul Agarwal', avatar: 'RA', role: 'student', time: 'Just now', content: replyText, attachments: replyAttachments });
    updatedPost.comments += 1;
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setActivePost(updatedPost);
    setReplyText('');
    setReplyAttachments([]);
  };

  const toggleLike = (post) => {
    const updatedPost = { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked };
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    if (activePost && activePost.id === updatedPost.id) setActivePost(updatedPost);
  };

  const toggleModuleLike = (post) => {
    const updatedPost = { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked };
    setModuleDiscussions(moduleDiscussions.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    if (activeModulePost && activeModulePost.id === updatedPost.id) setActiveModulePost(updatedPost);
  };

  const handleModuleReplySubmit = (attachments = []) => {
    if ((!moduleReplyText.trim() && attachments.length === 0) || !activeModulePost) return;
    const updatedPost = { ...activeModulePost };
    updatedPost.replies.push({
      author: 'Rahul Agarwal',
      avatar: 'RA',
      role: 'student',
      time: 'Just now',
      content: moduleReplyText,
      attachments: attachments
    });
    updatedPost.comments += 1;
    setModuleDiscussions(moduleDiscussions.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setActiveModulePost(updatedPost);
    setModuleReplyText('');
  };

  const handleModulePostSubmit = (attachments = []) => {
    if (!moduleNewPostText.trim() && attachments.length === 0) return;
    if (!activeModule) return;
    const newPost = {
      id: Date.now(),
      author: 'Rahul Agarwal',
      avatar: 'RA',
      role: 'student',
      time: 'Just now',
      title: `New discussion in ${activeModule.shortTitle}`,
      tags: [`#module${activeModule.id}`, '#discussion'],
      badges: [],
      content: moduleNewPostText,
      attachments: attachments,
      likes: 0,
      comments: 0,
      replies: [],
    };
    setModuleDiscussions([newPost, ...moduleDiscussions]);
    setModuleNewPostText('');
  };

  const statusClass = (status) => {
    if (status === 'In Progress') return 'in-progress';
    if (status === 'Upcoming') return 'upcoming';
    return 'locked';
  };

  const openProfile = (person, type) => setProfilePopup({ ...person, type });
  const closeProfile = () => setProfilePopup(null);

  const toggleFollow = (id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, isFollowing: !s.isFollowing } : s));
    if (profilePopup && profilePopup.id === id) setProfilePopup(p => ({ ...p, isFollowing: !p.isFollowing }));
  };

  const toggleFriend = (id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, isFriend: !s.isFriend } : s));
    if (profilePopup && profilePopup.id === id) setProfilePopup(p => ({ ...p, isFriend: !p.isFriend }));
  };

  const renderPostCard = (post, isDetail = false, { onOpen, onLike, onComment } = {}) => {
    const open = onOpen || (() => setActivePost(post));
    const like = onLike || (() => toggleLike(post));
    const comment = onComment || (() => open(post));
    return (
    <div className={`post-card ${isDetail ? 'detail-card' : ''}`} onClick={!isDetail ? () => open(post) : undefined} style={!isDetail ? {cursor:'pointer'} : undefined}>
      <div className="post-header" style={isDetail ? {marginBottom:16} : undefined}>
        <div className="post-author-info">
          <div className="post-avatar" style={{background: post.role==='mentor'?'#2563EB':post.role==='alumni'?'#F59E0B':'var(--primary-light)', ...(isDetail?{width:48,height:48,fontSize:18}:{})}}>{post.avatar}</div>
          <div>
            {post.badges.map((b,i) => <span key={i} className={`post-tag-badge ${b.class}`}>{b.text}</span>)}
            {isDetail && <div className="post-title-row" style={{marginBottom:4,fontSize:20}}>{post.title}</div>}
            <span className="post-name" style={isDetail?{fontWeight:500,color:'var(--text-main)'}:undefined}>
              {post.author} <span style={{fontWeight:400,color:'var(--text-muted)'}}>· {post.role==='mentor'?'Mentor':'Student'} · {post.time}</span>
            </span>
          </div>
        </div>
      </div>
      {!isDetail && <div className="post-title-row">{post.title}</div>}
      <div className="post-content" style={isDetail?{fontSize:15}:undefined}>{isDetail ? post.content : (post.content.length>150 ? post.content.substring(0,150)+'...' : post.content)}</div>
      {renderAttachments(post.attachments)}
      <div className="post-tags" style={isDetail?{marginBottom:24}:undefined}>{post.tags.map((t,i) => <span key={i} className="post-tag">{t}</span>)}</div>
      <div className="post-actions" onClick={e=>e.stopPropagation()} style={isDetail?{borderTop:'1px solid var(--border)',paddingTop:16}:undefined}>
        <button className={`post-action ${post.isLiked?'active':''}`} onClick={()=>like(post)}>
          <span className="material-icons-round" style={{fontSize:isDetail?20:18}}>{post.isLiked?'thumb_up':'thumb_up_off_alt'}</span> {post.likes} Likes
        </button>
        <button className={`post-action ${isDetail?'active':''}`} onClick={()=>comment(post)}>
          <span className="material-icons-round" style={{fontSize:isDetail?20:18}}>chat_bubble_outline</span> {post.comments} Replies
        </button>
      </div>
    </div>
    );
  };

  return (
    <section className="page active" id="page-course">
      <div className="page-header">
        <h1>Course Community</h1>
        <p className="page-subtitle">PG Program in Data Science & AI — Cohort 42</p>
      </div>

      <div className="course-tabs">
        <button className={`course-tab ${activeTab==='feed'?'active':''}`} onClick={()=>switchTab('feed')}>Course Feed</button>
        <button className={`course-tab ${activeTab==='modules'?'active':''}`} onClick={()=>switchTab('modules')}>Module Discussions</button>
        <button className={`course-tab ${activeTab==='resources'?'active':''}`} onClick={()=>switchTab('resources')}>Resource Library</button>
        <button className={`course-tab ${activeTab==='announcements'?'active':''}`} onClick={()=>switchTab('announcements')}>Announcements</button>
      </div>

      <div className="community-layout">
        <div className="community-main">
          {activeTab === 'feed' && (
            <div className="course-tab-content active" id="tab-feed">
              {!activePost ? (
                <div>
                  <div className="post-composer">
                    <div className="composer-avatar">RA</div>
                    <input type="text" placeholder="Start a discussion, ask a question, or share a resource..." value={newPostText} onChange={e=>setNewPostText(e.target.value)} onKeyPress={e=>e.key==='Enter'&&handlePostSubmit()} />
                    <div className="composer-actions">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="composer-btn" title="Attach file" onClick={() => fileInputRef.current.click()}>
                          <span className="material-icons-round">attach_file</span>
                        </button>
                        <button className="composer-btn" title="Add image" onClick={() => imageInputRef.current.click()}>
                          <span className="material-icons-round">image</span>
                        </button>
                        <button className="composer-btn" title="Poll"><span className="material-icons-round">poll</span></button>
                      </div>
                      <button className="btn-primary btn-sm" onClick={handlePostSubmit}>Post</button>
                    </div>

                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      onChange={(e) => handleFileChange(e, 'post')}
                      multiple
                    />
                    <input 
                      type="file" 
                      ref={imageInputRef} 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => handleFileChange(e, 'post')}
                      multiple
                    />

                    {newPostAttachments.length > 0 && (
                      <div className="composer-attachments-preview">
                        {newPostAttachments.map((att) => (
                          <div key={att.id} className="composer-attachment-item">
                            {att.type === 'image' ? (
                              <img src={att.url} alt={att.name} className="composer-attachment-img" />
                            ) : (
                              <div className="composer-attachment-icon">
                                <span className="material-icons-round" style={{ fontSize: 18 }}>description</span>
                              </div>
                            )}
                            <div className="composer-attachment-info">
                              <span className="composer-attachment-name">{att.name}</span>
                              <span className="composer-attachment-size">{att.size}</span>
                            </div>
                            <button className="composer-attachment-remove" onClick={() => removeAttachment(att.id, 'post')}>
                              <span className="material-icons-round">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="posts-feed">{posts.map(p => <div key={p.id}>{renderPostCard(p)}</div>)}</div>
                </div>
              ) : (
                <div>
                  <button className="back-btn" onClick={()=>setActivePost(null)}><span className="material-icons-round">arrow_back</span> Back to posts</button>
                  {renderPostCard(activePost, true)}
                  <div className="replies-header"><h4>{activePost.replies.length} Replies</h4></div>
                  
                  <div className="reply-composer">
                    <div className="reply-composer-title">Add a reply</div>
                    <textarea placeholder="Share your thoughts..." className="reply-textarea" value={replyText} onChange={e=>setReplyText(e.target.value)}></textarea>
                    
                    <input 
                      type="file" 
                      ref={replyFileInputRef} 
                      style={{ display: 'none' }} 
                      onChange={(e) => handleFileChange(e, 'reply')}
                      multiple
                    />
                    <input 
                      type="file" 
                      ref={replyImageInputRef} 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => handleFileChange(e, 'reply')}
                      multiple
                    />

                    {replyAttachments.length > 0 && (
                      <div style={{ margin: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {replyAttachments.map((att) => (
                          <div key={att.id} className="composer-attachment-item">
                            {att.type === 'image' ? (
                              <img src={att.url} alt={att.name} className="composer-attachment-img" />
                            ) : (
                              <div className="composer-attachment-icon">
                                <span className="material-icons-round" style={{ fontSize: 18 }}>description</span>
                              </div>
                            )}
                            <div className="composer-attachment-info">
                              <span className="composer-attachment-name">{att.name}</span>
                              <span className="composer-attachment-size">{att.size}</span>
                            </div>
                            <button className="composer-attachment-remove" onClick={() => removeAttachment(att.id, 'reply')}>
                              <span className="material-icons-round">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="reply-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="composer-btn" title="Attach file" onClick={() => replyFileInputRef.current.click()}>
                          <span className="material-icons-round" style={{ fontSize: 20 }}>attach_file</span>
                        </button>
                        <button className="composer-btn" title="Add image" onClick={() => replyImageInputRef.current.click()}>
                          <span className="material-icons-round" style={{ fontSize: 20 }}>image</span>
                        </button>
                      </div>
                      <button className="btn-primary btn-sm" onClick={handleReplySubmit}>
                        <span className="material-icons-round" style={{fontSize:16,marginRight:4}}>send</span> Post Reply
                      </button>
                    </div>
                  </div>
                  
                  <div className="replies-list">
                    {activePost.replies.length > 0 ? activePost.replies.map((r,i) => (
                      <div key={i} className="reply-item">
                        <div className="post-author-info" style={{marginBottom:8}}>
                          <div className="post-avatar" style={{width:32,height:32,fontSize:12,background:r.role==='mentor'?'#2563EB':'var(--primary-light)'}}>{r.avatar}</div>
                          <div><span className="post-name" style={{fontSize:14}}>{r.author} <span style={{fontWeight:400,color:'var(--text-muted)'}}>· {r.time}</span></span></div>
                        </div>
                        <div className="post-content" style={{marginLeft:44,marginBottom:0}}>
                          {r.content}
                          {renderAttachments(r.attachments)}
                        </div>
                      </div>
                    )) : <div style={{color:'var(--text-muted)',padding:'20px 0'}}>No replies yet. Be the first!</div>}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="course-tab-content active" id="tab-modules">
              <ModuleDiscussionsTab
                activeModule={activeModule}
                activeModulePost={activeModulePost}
                moduleDiscussions={moduleDiscussions}
                moduleNewPostText={moduleNewPostText}
                moduleReplyText={moduleReplyText}
                openModule={openModule}
                closeModule={closeModule}
                setActiveModulePost={setActiveModulePost}
                setModuleNewPostText={setModuleNewPostText}
                setModuleReplyText={setModuleReplyText}
                handleModulePostSubmit={handleModulePostSubmit}
                handleModuleReplySubmit={handleModuleReplySubmit}
                toggleModuleLike={toggleModuleLike}
                renderPostCard={renderPostCard}
                statusClass={statusClass}
              />
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="course-tab-content active" id="tab-resources">
              <div className="resource-grid">
                {courseResources.map(res => (
                  <div key={res.id} className="resource-card">
                    <div className={`resource-icon ${res.type}`}><span className="material-icons-round">{res.icon}</span></div>
                    <div className="resource-title">{res.name}</div>
                    <div className="resource-desc">{res.desc}</div>
                    <div className="resource-footer">
                      <span style={{fontSize:12,color:'var(--text-light)'}}>{res.module}</span>
                      <button style={{background:'none',border:'none',color:'var(--primary)',cursor:'pointer',fontWeight:600,fontSize:13}}>Open</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="course-tab-content active" id="tab-announcements">
              <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                {courseAnnouncements.map(ann => (
                  <div key={ann.id} className="post-card" style={{borderLeft:'4px solid var(--primary)',borderRadius:'8px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                      <h3 style={{fontSize:'18px',fontWeight:700,margin:0}}>{ann.title}</h3>
                      <span style={{fontSize:'13px',color:'var(--text-muted)',fontWeight:600}}>{ann.date}</span>
                    </div>
                    <p style={{fontSize:'15px',lineHeight:1.6,marginBottom:'16px'}}>{ann.content}</p>
                    <div style={{fontSize:'13px',color:'var(--text-muted)'}}>Posted by <strong>{ann.author}</strong></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar — only on feed & modules tabs */}
        {(activeTab === 'feed' || activeTab === 'modules') && (
        <div className="community-sidebar">
          {/* Course Mentors */}
          <div className="sidebar-card">
            <h4><span className="material-icons-round">star</span> Course Mentors</h4>
            <div className="mentor-list-mini">
              {courseMentors.map(m => (
                <div key={m.id} className="mentor-mini clickable-profile" onClick={() => openProfile(m, 'mentor')}>
                  <div className="mentor-mini-avatar" style={{background:m.color,position:'relative'}}>
                    {m.initials}
                    {m.online && <span className="profile-online-dot"></span>}
                  </div>
                  <div>
                    <span className="mentor-mini-name">{m.name}</span>
                    <span className="mentor-mini-role">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Students */}
          <div className="sidebar-card">
            <h4><span className="material-icons-round">school</span> Classmates <span className="students-online-count">{students.filter(s=>s.online).length} online</span></h4>
            <div className="students-list-mini">
              {students.map(s => (
                <div key={s.id} className="student-mini clickable-profile" onClick={() => openProfile(s, 'student')}>
                  <div className="student-mini-avatar" style={{background:s.color}}>
                    {s.initials}
                    {s.online && <span className="profile-online-dot"></span>}
                  </div>
                  <div className="student-mini-info">
                    <span className="student-mini-name">{s.name}</span>
                    <span className="student-mini-course">{s.cohort}</span>
                  </div>
                  {s.isFriend && <span className="material-icons-round" style={{fontSize:14,color:'var(--primary)',marginLeft:'auto'}} title="Friend">how_to_reg</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Profile Popup Modal */}
      {profilePopup && (
        <div className="profile-popup-overlay" onClick={closeProfile}>
          <div className="profile-popup-card" onClick={e=>e.stopPropagation()}>
            <button className="profile-popup-close" onClick={closeProfile}><span className="material-icons-round">close</span></button>
            <div className="profile-popup-cover" style={{background:`linear-gradient(135deg, ${profilePopup.color}, ${profilePopup.color}99)`}}></div>
            <div className="profile-popup-body">
              <div className="profile-popup-avatar" style={{background:profilePopup.color}}>
                {profilePopup.initials}
                {profilePopup.online && <span className="profile-popup-online"></span>}
              </div>
              <h3 className="profile-popup-name">{profilePopup.name}</h3>
              <span className="profile-popup-role-badge" style={{background:profilePopup.type==='mentor'?'#EEF2FF':'#F0FDF4',color:profilePopup.type==='mentor'?'#4F46E5':'#16A34A'}}>
                <span className="material-icons-round" style={{fontSize:14}}>{profilePopup.type==='mentor'?'verified':'person'}</span>
                {profilePopup.type==='mentor'?'Mentor':'Student'}
              </span>
              <div className="profile-popup-details">
                <div className="profile-popup-detail-row"><span className="material-icons-round">school</span><span>{profilePopup.course}</span></div>
                {profilePopup.type==='mentor' && profilePopup.role && <div className="profile-popup-detail-row"><span className="material-icons-round">work</span><span>{profilePopup.role}</span></div>}
                {profilePopup.type==='student' && profilePopup.cohort && <div className="profile-popup-detail-row"><span className="material-icons-round">groups</span><span>{profilePopup.cohort}</span></div>}
                <div className="profile-popup-detail-row"><span className="material-icons-round">{profilePopup.online?'wifi':'wifi_off'}</span><span style={{color:profilePopup.online?'#16A34A':'var(--text-muted)'}}>{profilePopup.online?'Online now':'Offline'}</span></div>
              </div>
              {profilePopup.bio && <p className="profile-popup-bio">{profilePopup.bio}</p>}
              {profilePopup.skills && profilePopup.skills.length>0 && (
                <div className="profile-popup-skills">
                  <span className="profile-popup-skills-label">Skills</span>
                  <div className="profile-popup-skills-list">{profilePopup.skills.map((sk,i) => <span key={i} className="profile-popup-skill-tag">{sk}</span>)}</div>
                </div>
              )}
              <div className="profile-popup-actions">
                {profilePopup.type === 'student' ? (
                  <>
                    <button className={profilePopup.isFollowing ? 'btn-outline' : 'btn-primary btn-sm'} style={{padding:'8px 16px',fontSize:13}} onClick={()=>toggleFollow(profilePopup.id)}>
                      <span className="material-icons-round" style={{fontSize:16}}>{profilePopup.isFollowing?'check':'person_add'}</span> {profilePopup.isFollowing?'Following':'Follow'}
                    </button>
                    <button className={profilePopup.isFriend ? 'btn-outline' : 'btn-primary btn-sm'} style={{padding:'8px 16px',fontSize:13,background:profilePopup.isFriend?undefined:'#10B981',boxShadow:profilePopup.isFriend?undefined:'0 2px 8px rgba(16,185,129,0.3)'}} onClick={()=>toggleFriend(profilePopup.id)}>
                      <span className="material-icons-round" style={{fontSize:16}}>{profilePopup.isFriend?'how_to_reg':'group_add'}</span> {profilePopup.isFriend?'Friends':'Add Friend'}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-primary btn-sm"><span className="material-icons-round" style={{fontSize:16}}>chat</span> Message</button>
                    <button className="btn-outline" style={{padding:'8px 16px',fontSize:13}}><span className="material-icons-round" style={{fontSize:16}}>person_add</span> Follow</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
