import React from 'react';
import { courseModules } from '../courseData';

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
          <div className="reply-actions">
            <button className="btn-primary btn-sm" onClick={handleModuleReplySubmit}>
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
              onKeyPress={(e) => e.key === 'Enter' && handleModulePostSubmit()}
            />
            <div className="composer-actions">
              <button className="btn-primary btn-sm" onClick={handleModulePostSubmit}>
                Post
              </button>
            </div>
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
