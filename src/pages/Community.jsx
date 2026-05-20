import React, { useState, useRef } from 'react';
import { dummyPosts } from '../data';

const mentorsInit = [
  { id: 'm1', name: 'Dr. Priya Sharma', initials: 'PS', role: 'ML & AI Lead', course: 'PGPDSAI', color: '#8B5CF6', online: true, bio: 'Expert in deep learning and NLP. 10+ years industry experience at Google and Microsoft Research.', skills: ['Deep Learning', 'NLP', 'TensorFlow', 'Research'], isFollowing: false, isFriend: false },
  { id: 'm2', name: 'Rajesh Kumar', initials: 'RK', role: 'Data Engineering', course: 'PGPDSAI', color: '#2563EB', online: true, bio: 'Senior Data Engineer specializing in large-scale data pipelines and real-time analytics systems.', skills: ['Spark', 'Kafka', 'AWS', 'Python'], isFollowing: true, isFriend: false },
  { id: 'm3', name: 'Dr. Ananya Rao', initials: 'AR', role: 'Statistics & Analytics', course: 'PGP Business Analytics', color: '#0891B2', online: false, bio: 'PhD in Statistics from IISc. Specializes in Bayesian inference and causal analysis.', skills: ['R', 'Bayesian Stats', 'Causal Inference', 'SAS'], isFollowing: false, isFriend: false },
];

const studentsInit = [
  { id: 's1', name: 'Priya Nair', initials: 'PR', course: 'PGPDSAI', cohort: 'Cohort 2026', color: '#2563EB', online: true, bio: 'Aspiring data scientist passionate about neural networks and computer vision.', skills: ['Python', 'PyTorch', 'OpenCV'], isFollowing: false, isFriend: false },
  { id: 's2', name: 'Vikram Patel', initials: 'VP', course: 'PGPDSAI', cohort: 'Cohort 2026', color: '#8B5CF6', online: false, bio: 'Career switcher from finance. Focused on ML and quantitative analysis.', skills: ['Python', 'SQL', 'Tableau'], isFollowing: true, isFriend: false },
  { id: 's3', name: 'Meera Joshi', initials: 'ME', course: 'PGP Business Analytics', cohort: 'Cohort 2025', color: '#10B981', online: true, bio: 'Product analyst with 3 years experience. Upskilling in advanced analytics and machine learning.', skills: ['Excel', 'SQL', 'Power BI', 'Python'], isFollowing: false, isFriend: true },
  { id: 's4', name: 'Kiran Reddy', initials: 'KI', course: 'PGPDSAI', cohort: 'Cohort 2026', color: '#F59E0B', online: true, bio: 'Enthusiastic about exploratory data analysis and visualization. Team player.', skills: ['Python', 'Matplotlib', 'Seaborn', 'Pandas'], isFollowing: false, isFriend: false },
  { id: 's5', name: 'Aarav Singh', initials: 'AS', course: 'PGP Data Engineering', cohort: 'Cohort 2026', color: '#EF4444', online: false, bio: 'Building scalable data infrastructure. Interested in real-time streaming and ETL.', skills: ['Spark', 'Airflow', 'Kafka', 'AWS'], isFollowing: false, isFriend: false },
  { id: 's6', name: 'Sneha Gupta', initials: 'SG', course: 'PGP Business Analytics', cohort: 'Cohort 2025', color: '#EC4899', online: true, bio: 'Marketing analytics professional transitioning to a data-driven strategy role.', skills: ['Google Analytics', 'SQL', 'Tableau', 'A/B Testing'], isFollowing: true, isFriend: true },
  { id: 's7', name: 'Rohan Mehta', initials: 'RM', course: 'PGPDSAI', cohort: 'Cohort 2026', color: '#6366F1', online: false, bio: 'Freshgrad with a knack for competitive programming and ML research papers.', skills: ['Python', 'C++', 'TensorFlow', 'LaTeX'], isFollowing: false, isFriend: false },
  { id: 's8', name: 'Divya Krishnan', initials: 'DK', course: 'PGP Data Engineering', cohort: 'Cohort 2025', color: '#0EA5E9', online: true, bio: 'Full-stack developer pivoting to data engineering. Loves building robust pipelines.', skills: ['Python', 'Docker', 'PostgreSQL', 'dbt'], isFollowing: false, isFriend: false },
  { id: 's9', name: 'Amit Verma', initials: 'AV', course: 'PGP Business Analytics', cohort: 'Cohort 2026', color: '#14B8A6', online: false, bio: 'Operations manager exploring analytics to drive business decisions.', skills: ['Excel', 'SQL', 'Looker'], isFollowing: false, isFriend: false },
  { id: 's10', name: 'Nisha Sharma', initials: 'NS', course: 'PGPDSAI', cohort: 'Cohort 2025', color: '#A855F7', online: true, bio: 'Aspiring AI researcher. Currently working on an NLP capstone project.', skills: ['Python', 'HuggingFace', 'NLP', 'Transformers'], isFollowing: false, isFriend: false },
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

export default function Community() {
  const [posts, setPosts] = useState(dummyPosts);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const getFilteredPosts = () => {
    switch (activeFilter) {
      case 'Mentor Posts':
        return posts.filter(p => p.role === 'mentor');
      case 'Trending':
        return posts.filter(p => p.likes >= 50 || p.isTrending);
      case 'Resources':
        return posts.filter(p => 
          (p.attachments && p.attachments.length > 0) || 
          p.tags.some(t => t.toLowerCase().includes('resource') || t.toLowerCase().includes('notes') || t.toLowerCase().includes('sheet') || t.toLowerCase().includes('guide')) ||
          p.badges.some(b => b.text.toLowerCase().includes('resource'))
        );
      case 'AMA Sessions':
        return posts.filter(p => 
          p.tags.some(t => t.toLowerCase().includes('ama')) || 
          p.badges.some(b => b.text.toLowerCase().includes('ama'))
        );
      default:
        return posts;
    }
  };

  const [activePost, setActivePost] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [profilePopup, setProfilePopup] = useState(null);
  const [mentors, setMentors] = useState(mentorsInit);
  const [students, setStudents] = useState(studentsInit);
  
  const [newPostAttachments, setNewPostAttachments] = useState([]);
  const [replyAttachments, setReplyAttachments] = useState([]);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const replyFileInputRef = useRef(null);
  const replyImageInputRef = useRef(null);

  React.useEffect(() => {
    const handleOpenPost = (e) => {
      const { postId } = e.detail;
      const post = posts.find(p => p.id === Number(postId));
      if (post) {
        setActivePost(post);
      } else {
        setActivePost(null);
      }
    };
    const handleShowProfile = (e) => {
      const { user } = e.detail;
      if (user) {
        setProfilePopup(user);
      }
    };
    window.addEventListener('community-open-post', handleOpenPost);
    window.addEventListener('community-show-profile', handleShowProfile);
    return () => {
      window.removeEventListener('community-open-post', handleOpenPost);
      window.removeEventListener('community-show-profile', handleShowProfile);
    };
  }, [posts]);

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

  const handlePostSubmit = () => {
    if (!newPostText.trim() && newPostAttachments.length === 0) return;
    const newPost = {
      id: Date.now(),
      author: 'Rahul Agarwal',
      avatar: 'RA',
      role: 'student',
      time: 'Just now',
      title: 'New Discussion',
      tags: ['#general'],
      badges: [],
      content: newPostText,
      attachments: newPostAttachments,
      likes: 0,
      comments: 0,
      replies: []
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostAttachments([]);
  };

  const handleReplySubmit = () => {
    if ((!replyText.trim() && replyAttachments.length === 0) || !activePost) return;
    const updatedPost = { ...activePost };
    updatedPost.replies.push({
      author: 'Rahul Agarwal',
      avatar: 'RA',
      role: 'student',
      time: 'Just now',
      content: replyText,
      attachments: replyAttachments
    });
    updatedPost.comments += 1;
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setActivePost(updatedPost);
    setReplyText('');
    setReplyAttachments([]);
  };

  const toggleLike = (post) => {
    const updatedPost = { ...post };
    updatedPost.likes = updatedPost.isLiked ? updatedPost.likes - 1 : updatedPost.likes + 1;
    updatedPost.isLiked = !updatedPost.isLiked;
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    if (activePost && activePost.id === updatedPost.id) {
      setActivePost(updatedPost);
    }
  };

  const openProfile = (person, type) => {
    setProfilePopup({ ...person, type });
  };

  const closeProfile = () => {
    setProfilePopup(null);
  };

  const toggleFollow = (id) => {
    const updateList = (list) => list.map(p => p.id === id ? { ...p, isFollowing: !p.isFollowing } : p);
    setMentors(updateList);
    setStudents(updateList);
    if (profilePopup && profilePopup.id === id) setProfilePopup(p => ({ ...p, isFollowing: !p.isFollowing }));
  };

  const toggleFriend = (id) => {
    const updateList = (list) => list.map(p => p.id === id ? { ...p, isFriend: !p.isFriend } : p);
    setMentors(updateList);
    setStudents(updateList);
    if (profilePopup && profilePopup.id === id) setProfilePopup(p => ({ ...p, isFriend: !p.isFriend }));
  };

  return (
    <section className="page active" id="page-community">
      <div className="page-header">
        <h1>Open Community</h1>
        <p className="page-subtitle">Connect with students across all programs</p>
      </div>
      <div className="community-layout">
        <div className="community-main">
          
          {!activePost ? (
            <div id="communityFeedView">
              <div className="post-composer">
                <div className="composer-avatar">RA</div>
                <input 
                  type="text" 
                  placeholder="Start a discussion, ask a question, or share a resource..." 
                  value={newPostText}
                  onChange={e => setNewPostText(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handlePostSubmit()}
                />
                <div className="composer-actions">
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="composer-btn" title="Attach file" onClick={() => fileInputRef.current.click()}>
                      <span className="material-icons-round">attach_file</span>
                    </button>
                    <button className="composer-btn" title="Add image" onClick={() => imageInputRef.current.click()}>
                      <span className="material-icons-round">image</span>
                    </button>
                    <button className="composer-btn" title="Add poll"><span className="material-icons-round">poll</span></button>
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
              <div className="feed-filters">
                <button 
                  className={`filter-chip ${activeFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('All')}
                >
                  All Posts
                </button>
                <button 
                  className={`filter-chip ${activeFilter === 'Mentor Posts' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('Mentor Posts')}
                >
                  Mentor Posts
                </button>
                <button 
                  className={`filter-chip ${activeFilter === 'Trending' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('Trending')}
                >
                  Trending
                </button>
                <button 
                  className={`filter-chip ${activeFilter === 'Resources' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('Resources')}
                >
                  Resources
                </button>
                <button 
                  className={`filter-chip ${activeFilter === 'AMA Sessions' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('AMA Sessions')}
                >
                  AMA Sessions
                </button>
              </div>
              
              <div className="posts-feed">
                {getFilteredPosts().length > 0 ? getFilteredPosts().map(post => (
                  <div key={post.id} className="post-card" onClick={() => setActivePost(post)} style={{cursor: 'pointer'}}>
                    <div className="post-header">
                      <div className="post-author-info">
                        <div className="post-avatar" style={{background: post.role === 'mentor' ? '#2563EB' : post.role === 'alumni' ? '#F59E0B' : 'var(--primary-light)'}}>
                          {post.avatar}
                        </div>
                        <div>
                          {post.badges.map((b, i) => <span key={i} className={`post-tag-badge ${b.class}`}>{b.text}</span>)}
                          <span className="post-name">
                            {post.author} <span style={{fontWeight: 400, color: 'var(--text-muted)'}}>· {post.role === 'mentor' ? 'Mentor' : post.role === 'alumni' ? 'Alumni' : 'Student'} · {post.time}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="post-title-row">{post.title}</div>
                    <div className="post-content">
                      {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
                    </div>
                    {renderAttachments(post.attachments)}
                    <div className="post-tags">
                      {post.tags.map((tag, i) => <span key={i} className="post-tag">{tag}</span>)}
                    </div>
                    <div className="post-actions" onClick={e => e.stopPropagation()}>
                      <button className={`post-action ${post.isLiked ? 'active' : ''}`} onClick={() => toggleLike(post)}>
                        <span className="material-icons-round" style={{fontSize: 18}}>{post.isLiked ? 'thumb_up' : 'thumb_up_off_alt'}</span> {post.likes} Likes
                      </button>
                      <button className="post-action" onClick={() => setActivePost(post)}>
                        <span className="material-icons-round" style={{fontSize: 18}}>chat_bubble_outline</span> {post.comments} Replies
                      </button>
                    </div>
                  </div>
                )) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    <span className="material-icons-round" style={{ fontSize: 48, marginBottom: 12, display: 'block', color: 'var(--border)' }}>forum</span>
                    No posts found matching this category.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div id="postDetailView">
              <button className="back-btn" onClick={() => setActivePost(null)}>
                <span className="material-icons-round">arrow_back</span> Back to posts
              </button>
              
              <div className="post-card detail-card">
                <div className="post-header" style={{marginBottom: 16}}>
                  <div className="post-author-info">
                    <div className="post-avatar" style={{background: activePost.role === 'mentor' ? '#2563EB' : activePost.role === 'alumni' ? '#F59E0B' : 'var(--primary-light)', width: 48, height: 48, fontSize: 18}}>
                      {activePost.avatar}
                    </div>
                    <div>
                      {activePost.badges.map((b, i) => <span key={i} className={`post-tag-badge ${b.class}`}>{b.text}</span>)}
                      <div className="post-title-row" style={{marginBottom: 4, fontSize: 20}}>{activePost.title}</div>
                      <span className="post-name" style={{fontWeight: 500, color: 'var(--text-main)'}}>
                        {activePost.author} <span style={{fontWeight: 400, color: 'var(--text-muted)'}}>· {activePost.role === 'mentor' ? 'Mentor' : activePost.role === 'alumni' ? 'Alumni' : 'Student'} · {activePost.time}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="post-content" style={{fontSize: 15}}>
                  {activePost.content}
                </div>
                {renderAttachments(activePost.attachments)}
                <div className="post-tags" style={{marginBottom: 24}}>
                  {activePost.tags.map((tag, i) => <span key={i} className="post-tag">{tag}</span>)}
                </div>
                <div className="post-actions" style={{borderTop: '1px solid var(--border)', paddingTop: 16}}>
                  <button className={`post-action ${activePost.isLiked ? 'active' : ''}`} onClick={() => toggleLike(activePost)}>
                    <span className="material-icons-round" style={{fontSize: 20}}>{activePost.isLiked ? 'thumb_up' : 'thumb_up_off_alt'}</span> {activePost.likes} Likes
                  </button>
                  <button className="post-action active">
                    <span className="material-icons-round" style={{fontSize: 20}}>chat_bubble_outline</span> {activePost.comments} Replies
                  </button>
                </div>
              </div>
              
              <div className="replies-header">
                <h4>{activePost.replies.length} Replies</h4>
              </div>
              
              <div className="reply-composer">
                <div className="reply-composer-title">Add a reply</div>
                <textarea 
                  placeholder="Share your thoughts or answer this question..." 
                  className="reply-textarea"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                ></textarea>
                
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
                    <span className="material-icons-round" style={{fontSize: 16, marginRight: 4}}>send</span> Post Reply
                  </button>
                </div>
              </div>
              
              <div className="replies-list">
                {activePost.replies.length > 0 ? activePost.replies.map((reply, i) => (
                  <div key={i} className="reply-item">
                    <div className="post-author-info" style={{marginBottom: 8}}>
                      <div className="post-avatar" style={{width: 32, height: 32, fontSize: 12, background: reply.role === 'mentor' ? '#2563EB' : 'var(--primary-light)'}}>
                        {reply.avatar}
                      </div>
                      <div>
                        <span className="post-name" style={{fontSize: 14}}>
                          {reply.author} <span style={{fontWeight: 400, color: 'var(--text-muted)'}}>· {reply.time}</span>
                        </span>
                      </div>
                    </div>
                    <div className="post-content" style={{marginLeft: 44, marginBottom: 0}}>
                      {reply.content}
                      {renderAttachments(reply.attachments)}
                    </div>
                  </div>
                )) : (
                  <div style={{color: 'var(--text-muted)', padding: '20px 0'}}>No replies yet. Be the first to share your thoughts!</div>
                )}
              </div>
            </div>
          )}
          
        </div>
        <div className="community-sidebar">
          <div className="sidebar-card">
            <h4><span className="material-icons-round">local_fire_department</span> Trending Topics</h4>
            <div className="trending-list">
              <a href="#" className="trending-item">#MachineLearning <span>128 posts</span></a>
              <a href="#" className="trending-item">#CapstoneProject <span>94 posts</span></a>
              <a href="#" className="trending-item">#SQLTips <span>76 posts</span></a>
              <a href="#" className="trending-item">#CareerAdvice <span>65 posts</span></a>
              <a href="#" className="trending-item">#DataVisualization <span>52 posts</span></a>
            </div>
          </div>
          <div className="sidebar-card">
            <h4><span className="material-icons-round">groups</span> Active Study Rooms</h4>
            <div className="active-rooms">
              <div className="room-mini"><span className="room-dot"></span> ML Study Group <span className="room-count">8 studying</span></div>
              <div className="room-mini"><span className="room-dot"></span> SQL Practice <span className="room-count">5 studying</span></div>
              <div className="room-mini"><span className="room-dot"></span> Python Basics <span className="room-count">12 studying</span></div>
            </div>
          </div>

          {/* Top Mentors */}
          <div className="sidebar-card">
            <h4><span className="material-icons-round">star</span> Top Mentors</h4>
            <div className="mentor-list-mini">
              {mentors.map(mentor => (
                <div
                  key={mentor.id}
                  className="mentor-mini clickable-profile"
                  onClick={() => openProfile(mentor, 'mentor')}
                >
                  <div className="mentor-mini-avatar" style={{ background: mentor.color, position: 'relative' }}>
                    {mentor.initials}
                    {mentor.online && <span className="profile-online-dot"></span>}
                  </div>
                  <div>
                    <span className="mentor-mini-name">{mentor.name}</span>
                    <span className="mentor-mini-role">{mentor.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students */}
          <div className="sidebar-card">
            <h4><span className="material-icons-round">school</span> Students <span className="students-online-count">{students.filter(s => s.online).length} online</span></h4>
            <div className="students-list-mini">
              {students.map(student => (
                <div
                  key={student.id}
                  className="student-mini clickable-profile"
                  onClick={() => openProfile(student, 'student')}
                >
                  <div className="student-mini-avatar" style={{ background: student.color }}>
                    {student.initials}
                    {student.online && <span className="profile-online-dot"></span>}
                  </div>
                  <div className="student-mini-info">
                    <span className="student-mini-name">{student.name}</span>
                    <span className="student-mini-course">{student.course}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Popup Modal */}
      {profilePopup && (
        <div className="profile-popup-overlay" onClick={closeProfile}>
          <div className="profile-popup-card" onClick={e => e.stopPropagation()}>
            <button className="profile-popup-close" onClick={closeProfile}>
              <span className="material-icons-round">close</span>
            </button>

            <div className="profile-popup-cover" style={{ background: `linear-gradient(135deg, ${profilePopup.color}, ${profilePopup.color}99)` }}></div>

            <div className="profile-popup-body">
              <div className="profile-popup-avatar" style={{ background: profilePopup.color }}>
                {profilePopup.initials}
                {profilePopup.online && <span className="profile-popup-online"></span>}
              </div>

              <h3 className="profile-popup-name">{profilePopup.name}</h3>
              <span className="profile-popup-role-badge" style={{ background: profilePopup.type === 'mentor' ? '#EEF2FF' : '#F0FDF4', color: profilePopup.type === 'mentor' ? '#4F46E5' : '#16A34A' }}>
                <span className="material-icons-round" style={{ fontSize: 14 }}>{profilePopup.type === 'mentor' ? 'verified' : 'person'}</span>
                {profilePopup.type === 'mentor' ? 'Mentor' : 'Student'}
              </span>

              <div className="profile-popup-details">
                <div className="profile-popup-detail-row">
                  <span className="material-icons-round">school</span>
                  <span>{profilePopup.course}</span>
                </div>
                {profilePopup.type === 'mentor' && profilePopup.role && (
                  <div className="profile-popup-detail-row">
                    <span className="material-icons-round">work</span>
                    <span>{profilePopup.role}</span>
                  </div>
                )}
                {profilePopup.type === 'student' && profilePopup.cohort && (
                  <div className="profile-popup-detail-row">
                    <span className="material-icons-round">groups</span>
                    <span>{profilePopup.cohort}</span>
                  </div>
                )}
                <div className="profile-popup-detail-row">
                  <span className="material-icons-round">{profilePopup.online ? 'wifi' : 'wifi_off'}</span>
                  <span style={{ color: profilePopup.online ? '#16A34A' : 'var(--text-muted)' }}>{profilePopup.online ? 'Online now' : 'Offline'}</span>
                </div>
              </div>

              {profilePopup.bio && (
                <p className="profile-popup-bio">{profilePopup.bio}</p>
              )}

              {profilePopup.skills && profilePopup.skills.length > 0 && (
                <div className="profile-popup-skills">
                  <span className="profile-popup-skills-label">Skills</span>
                  <div className="profile-popup-skills-list">
                    {profilePopup.skills.map((skill, i) => (
                      <span key={i} className="profile-popup-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="profile-popup-actions">
                <button className={profilePopup.isFollowing ? 'btn-outline' : 'btn-primary btn-sm'} style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => toggleFollow(profilePopup.id)}>
                  <span className="material-icons-round" style={{ fontSize: 16 }}>{profilePopup.isFollowing ? 'check' : 'person_add'}</span> {profilePopup.isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className={profilePopup.isFriend ? 'btn-outline' : 'btn-primary btn-sm'} style={{ padding: '8px 16px', fontSize: 13, background: profilePopup.isFriend ? undefined : '#10B981' }} onClick={() => toggleFriend(profilePopup.id)}>
                  <span className="material-icons-round" style={{ fontSize: 16 }}>{profilePopup.isFriend ? 'how_to_reg' : 'group_add'}</span> {profilePopup.isFriend ? 'Friends' : 'Add Friend'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
