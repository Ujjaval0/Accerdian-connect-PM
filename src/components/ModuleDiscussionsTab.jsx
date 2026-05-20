import React from 'react';
import { courseModules } from '../courseData';

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

export default function ModuleDiscussionsTab({
  activeModule,
  activeModulePost,
  moduleDiscussions,
  moduleNewPostText,
  moduleReplyText,
  openModule,
  closeModule,
  setActiveModulePost,
  setModuleNewPostText,
  setModuleReplyText,
  handleModulePostSubmit,
  handleModuleReplySubmit,
  toggleModuleLike,
  renderPostCard,
  statusClass,
}) {
  const [newPostAttachments, setNewPostAttachments] = React.useState([]);
  const [replyAttachments, setReplyAttachments] = React.useState([]);

  const fileInputRef = React.useRef(null);
  const imageInputRef = React.useRef(null);
  const replyFileInputRef = React.useRef(null);
  const replyImageInputRef = React.useRef(null);

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

  const onPostSubmit = () => {
    handleModulePostSubmit(newPostAttachments);
    setNewPostAttachments([]);
  };

  const onReplySubmit = () => {
    handleModuleReplySubmit(replyAttachments);
    setReplyAttachments([]);
  };
  if (!activeModule) {
    return (
      <>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 }}>
          Select a module to view topic-specific discussions, lecture materials, assignments, and files
          shared by mentors and classmates.
        </p>
        <div className="module-list">
          {courseModules.map((mod) => (
            <div
              key={mod.id}
              className="module-item"
              onClick={() => openModule(mod)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModule(mod)}
            >
              <div className="module-header">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div className="module-title">
                      <span className="material-icons-round" style={{ color: 'var(--primary)' }}>
                        {mod.icon}
                      </span>{' '}
                      {mod.title}
                    </div>
                    <span className={`module-status-badge ${statusClass(mod.status)}`}>{mod.status}</span>
                  </div>
                  <p className="module-desc-preview">{mod.description}</p>
                  <div className="module-meta">
                    <span>
                      <span className="material-icons-round" style={{ fontSize: 14, verticalAlign: 'middle' }}>
                        schedule
                      </span>{' '}
                      {mod.duration} · {mod.weekRange}
                    </span>
                    <span>
                      <span className="material-icons-round" style={{ fontSize: 14, verticalAlign: 'middle' }}>
                        description
                      </span>{' '}
                      {mod.resourcesList.length} Resources
                    </span>
                    <span>
                      <span className="material-icons-round" style={{ fontSize: 14, verticalAlign: 'middle' }}>
                        forum
                      </span>{' '}
                      {mod.discussionsList.length} Active threads
                    </span>
                  </div>
                  <div className="module-item-hint">
                    <span className="material-icons-round">touch_app</span> Click to view discussions &amp; resources
                  </div>
                </div>
                <span className="material-icons-round" style={{ color: 'var(--primary)' }}>
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (activeModulePost) {
    return (
      <div>
        <button className="back-btn" onClick={() => setActiveModulePost(null)}>
          <span className="material-icons-round">arrow_back</span> Back to {activeModule.shortTitle}
        </button>
        {renderPostCard(activeModulePost, true, {
          onLike: toggleModuleLike,
          onComment: () => setActiveModulePost(activeModulePost),
        })}
        <div className="replies-header">
          <h4>{activeModulePost.replies.length} Replies</h4>
        </div>
        <div className="reply-composer">
          <div className="reply-composer-title">Add a reply</div>
          <textarea
            placeholder="Share your thoughts or ask a follow-up..."
            className="reply-textarea"
            value={moduleReplyText}
            onChange={(e) => setModuleReplyText(e.target.value)}
          />
          
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
            <button className="btn-primary btn-sm" onClick={onReplySubmit}>
              <span className="material-icons-round" style={{ fontSize: 16, marginRight: 4 }}>
                send
              </span>{' '}
              Post Reply
            </button>
          </div>
        </div>
        <div className="replies-list">
          {activeModulePost.replies.length > 0 ? (
            activeModulePost.replies.map((r, i) => (
              <div key={i} className="reply-item">
                <div className="post-author-info" style={{ marginBottom: 8 }}>
                  <div
                    className="post-avatar"
                    style={{
                      width: 32,
                      height: 32,
                      fontSize: 12,
                      background: r.role === 'mentor' ? '#2563EB' : 'var(--primary-light)',
                    }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <span className="post-name" style={{ fontSize: 14 }}>
                      {r.author}{' '}
                      <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>
                        · {r.role === 'mentor' ? 'Mentor' : 'Student'} · {r.time}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="post-content" style={{ marginLeft: 44, marginBottom: 0 }}>
                  {r.content}
                  {renderAttachments(r.attachments)}
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--text-muted)', padding: '20px 0' }}>No replies yet. Be the first!</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="back-btn" onClick={closeModule}>
        <span className="material-icons-round">arrow_back</span> All modules
      </button>

      <div className="module-detail-header">
        <div className="module-detail-title">
          <span className="material-icons-round" style={{ color: 'var(--primary)', fontSize: 28 }}>
            {activeModule.icon}
          </span>
          {activeModule.title}
          <span className={`module-status-badge ${statusClass(activeModule.status)}`}>
            {activeModule.status}
          </span>
        </div>
        <p className="module-detail-desc">{activeModule.description}</p>
        <div className="module-detail-stats">
          <div className="module-detail-stat">
            <span className="material-icons-round" style={{ fontSize: 18 }}>
              schedule
            </span>
            <span>
              <strong>{activeModule.duration}</strong> · {activeModule.weekRange}
            </span>
          </div>
          <div className="module-detail-stat">
            <span className="material-icons-round" style={{ fontSize: 18 }}>
              folder
            </span>
            <span>
              <strong>{activeModule.resourcesList.length}</strong> resources
            </span>
          </div>
          <div className="module-detail-stat">
            <span className="material-icons-round" style={{ fontSize: 18 }}>
              forum
            </span>
            <span>
              <strong>{moduleDiscussions.length}</strong> discussions
            </span>
          </div>
        </div>
        {activeModule.progress > 0 && (
          <div className="module-detail-progress">
            <div className="module-detail-progress-label">
              <span>Your progress</span>
              <span>{activeModule.progress}%</span>
            </div>
            <div className="module-detail-progress-bar">
              <div
                className="module-detail-progress-fill"
                style={{ width: `${activeModule.progress}%` }}
              />
            </div>
          </div>
        )}
        <div className="module-detail-mentor">
          <div className="module-detail-mentor-avatar">{activeModule.mentorAvatar}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{activeModule.mentor}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{activeModule.mentorRole}</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-main)' }}>
            Topics covered
          </div>
          <div className="module-topics">
            {activeModule.topics.map((t, i) => (
              <span key={i} className="module-topic-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="module-detail-sections">
        <section className="module-detail-section">
          <h3>
            <span className="material-icons-round" style={{ color: 'var(--primary)' }}>
              folder_open
            </span>{' '}
            Module Resources
          </h3>
          <p className="section-hint">
            Lecture notes, notebooks, videos, and assignment files for this module.
          </p>
          <div className="module-resources-list">
            {activeModule.resourcesList.map((res) => (
              <div key={res.id} className="module-resource-row">
                <div className={`resource-icon ${res.type}`}>
                  <span className="material-icons-round">{res.icon}</span>
                </div>
                <div className="module-resource-info">
                  <div className="module-resource-name">{res.name}</div>
                  <div className="module-resource-desc">{res.desc}</div>
                  <div className="module-resource-meta">{res.size}</div>
                </div>
                <a
                  className="module-resource-open"
                  href={res.url}
                  target={res.url.startsWith('http') ? '_blank' : undefined}
                  rel={res.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={(e) => res.url === '#' && e.preventDefault()}
                >
                  {res.type === 'link' ? 'Open link' : 'Download'}{' '}
                  <span className="material-icons-round" style={{ fontSize: 16 }}>
                    open_in_new
                  </span>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="module-detail-section">
          <h3>
            <span className="material-icons-round" style={{ color: 'var(--primary)' }}>
              forum
            </span>{' '}
            Module Discussions
          </h3>
          <p className="section-hint">
            Questions and conversations from classmates and mentors about this module.
          </p>
          <div className="module-discussions-intro">
            <span className="material-icons-round">info</span>
            <span>
              Click any thread below to read the full conversation and reply. Mentors often answer
              assignment and concept questions here.
            </span>
          </div>
          <div className="post-composer" style={{ marginBottom: 20 }}>
            <div className="composer-avatar">RA</div>
            <input
              type="text"
              placeholder={`Ask a question about ${activeModule.shortTitle}...`}
              value={moduleNewPostText}
              onChange={(e) => setModuleNewPostText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onPostSubmit()}
            />
            <div className="composer-actions">
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="composer-btn" title="Attach file" onClick={() => fileInputRef.current.click()}>
                  <span className="material-icons-round">attach_file</span>
                </button>
                <button className="composer-btn" title="Add image" onClick={() => imageInputRef.current.click()}>
                  <span className="material-icons-round">image</span>
                </button>
              </div>
              <button className="btn-primary btn-sm" onClick={onPostSubmit}>
                Post
              </button>
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
          <div className="posts-feed">
            {moduleDiscussions.map((p) => (
              <div key={p.id}>
                {renderPostCard(p, false, {
                  onOpen: setActiveModulePost,
                  onLike: toggleModuleLike,
                  onComment: setActiveModulePost,
                })}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
