import React, { useState } from 'react';

const defaultProfile = {
  name: 'Rahul Agarwal',
  initials: 'RA',
  course: 'PG Program in Data Science & AI',
  location: 'Bangalore, India',
  bio: 'Aspiring data scientist passionate about machine learning and building impactful products. Currently exploring NLP and computer vision. Active community contributor and study group organizer.',
  skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tableau', 'Statistics', 'Machine Learning', 'Deep Learning', 'NLP', 'Data Visualization'],
  linkedin: 'linkedin.com/in/rahulagarwal',
  github: 'github.com/rahulagarwal',
};

const projects = [
  { title: 'Customer Churn Prediction', desc: 'Built an end-to-end ML pipeline using logistic regression and random forest to predict telecom churn with 89% accuracy.', score: '92/100', tags: ['Python', 'Scikit-learn', 'EDA'], link: '#' },
  { title: 'EDA: E-Commerce Sales Analysis', desc: 'Exploratory data analysis on 50K+ transactions — trend analysis, RFM segmentation, and seasonal pattern discovery.', score: '88/100', tags: ['Pandas', 'Matplotlib', 'Seaborn'], link: '#' },
  { title: 'Sentiment Analysis on Product Reviews', desc: 'NLP project using BERT and HuggingFace Transformers to classify product review sentiment with 91% F1 score.', score: '95/100', tags: ['NLP', 'Transformers', 'PyTorch'], link: '#' },
];

const academicStats = [
  { label: 'Overall GPA', value: '3.8' },
  { label: 'Assignments', value: '94%' },
  { label: 'Modules Done', value: '4/5' },
  { label: 'Rank', value: '#12' },
];

const badges = [
  { name: 'Top Contributor', icon: 'forum', color: '#4F46E5', bg: '#EEF2FF', desc: 'Most active in community discussions and helping peers', earned: true },
  { name: 'Helpful Peer', icon: 'thumb_up', color: '#2563EB', bg: '#DBEAFE', desc: 'Replies and answers got the most likes from batchmates', earned: true },
  { name: 'Project Star', icon: 'star', color: '#F59E0B', bg: '#FEF3C7', desc: 'Submitted a high-quality capstone project', earned: true },
  { name: 'Study Streak', icon: 'local_fire_department', color: '#EF4444', bg: '#FEE2E2', desc: '30 Day milestone — consistent daily activity', earned: true, milestone: '30 Day' },
  { name: 'Never Miss a Class', icon: 'event_available', color: '#10B981', bg: '#D1FAE5', desc: 'Attended all live sessions this month', earned: false },
  { name: 'Alumni Approved', icon: 'verified', color: '#8B5CF6', bg: '#EDE9FE', desc: 'An alumni mentor personally endorsed this student — rarest badge', earned: false },
];

const referralCriteria = [
  { label: 'Assignment Completion', value: 94, icon: 'assignment_turned_in', met: true },
  { label: 'Academic Score', value: 82, icon: 'school', met: true },
  { label: 'Project Quality', value: 90, icon: 'star_rate', met: true },
  { label: 'Course Progress', value: 72, icon: 'trending_up', met: false },
];

export default function Profile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...defaultProfile, skillInput: '' });

  const overallProgress = Math.round(referralCriteria.reduce((s, c) => s + c.value, 0) / referralCriteria.length);
  const isEligible = referralCriteria.every(c => c.value >= 80);

  const openEdit = () => {
    setForm({ ...profile, skillInput: '' });
    setEditing(true);
  };

  const saveEdit = () => {
    setProfile({ ...form });
    setEditing(false);
  };

  const addSkill = () => {
    const s = form.skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm({ ...form, skills: [...form.skills, s], skillInput: '' });
    }
  };

  const removeSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
  };

  return (
    <section className="page active" id="page-profile">
      {/* Hero */}
      <div className="profile-hero">
        <div className="profile-cover"></div>
        <div className="profile-main-info">
          <div className="profile-avatar-lg">{profile.initials}</div>
          <div className="profile-details">
            <h1>{profile.name}</h1>
            <p className="profile-course-name">{profile.course}</p>
            <p className="profile-location"><span className="material-icons-round">location_on</span> {profile.location}</p>
            <p className="profile-bio">{profile.bio}</p>
            {(profile.linkedin || profile.github) && (
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                {profile.linkedin && <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-icons-round" style={{ fontSize: 14 }}>link</span>{profile.linkedin}</span>}
                {profile.github && <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-icons-round" style={{ fontSize: 14 }}>code</span>{profile.github}</span>}
              </div>
            )}
          </div>
          <button className="btn-outline" onClick={openEdit}><span className="material-icons-round">edit</span> Edit Profile</button>
        </div>
      </div>

      <div className="profile-grid">
        {/* Skills */}
        <div className="profile-section">
          <h3><span className="material-icons-round">psychology</span> Skills</h3>
          <div className="skills-grid">
            {profile.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
          </div>
        </div>

        {/* Projects */}
        <div className="profile-section">
          <h3><span className="material-icons-round">code</span> Projects</h3>
          <div className="projects-list">
            {projects.map((p, i) => (
              <div key={i} className="project-item">
                <div className="project-title">
                  {p.title}
                  <span className="project-score">{p.score}</span>
                </div>
                <div className="project-desc">{p.desc}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                  {p.tags.map((t, j) => <span key={j} className="post-tag" style={{ fontSize: 11 }}>{t}</span>)}
                </div>
                <a href={p.link} className="project-link"><span className="material-icons-round" style={{ fontSize: 14 }}>open_in_new</span> View Project</a>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Performance */}
        <div className="profile-section">
          <h3><span className="material-icons-round">school</span> Academic Performance</h3>
          <div className="academic-stats">
            {academicStats.map((s, i) => (
              <div key={i} className="acad-stat-box">
                <div className="acad-stat-val">{s.value}</div>
                <div className="acad-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="profile-section">
          <h3><span className="material-icons-round">military_tech</span> Badges & Recognition</h3>
          <div className="prof-badges-list">
            {badges.map((b, i) => (
              <div key={i} className={`prof-badge-item ${b.earned ? 'earned' : 'locked'}`}>
                <div className="prof-badge-icon" style={{ background: b.earned ? b.bg : '#F3F4F6', color: b.earned ? b.color : '#9CA3AF' }}>
                  <span className="material-icons-round">{b.icon}</span>
                </div>
                <div className="prof-badge-info">
                  <span className="prof-badge-name">
                    {b.name}
                    {b.milestone && <span className="prof-badge-milestone">{b.milestone}</span>}
                    {!b.earned && <span className="prof-badge-lock"><span className="material-icons-round" style={{ fontSize: 12 }}>lock</span></span>}
                  </span>
                  <span className="prof-badge-desc">{b.desc}</span>
                </div>
                {b.earned && <span className="material-icons-round prof-badge-check">check_circle</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Referral Eligibility */}
        <div className="profile-section" style={{ gridColumn: 'span 2' }}>
          <h3><span className="material-icons-round">workspace_premium</span> Referral Eligibility</h3>
          <div className="ref-status-card">
            <div className="ref-status-header">
              <div className={`ref-status-badge ${isEligible ? 'eligible' : 'not-yet'}`}>
                <span className="material-icons-round">{isEligible ? 'verified' : 'hourglass_top'}</span>
                {isEligible ? 'Eligible' : 'Not Yet Eligible'}
              </div>
              <div className="ref-overall-progress">
                <span className="ref-overall-label">{overallProgress}% complete</span>
                <div className="ref-overall-bar">
                  <div className="ref-overall-fill" style={{ width: `${overallProgress}%`, background: overallProgress >= 80 ? 'var(--success)' : 'var(--primary)' }}></div>
                </div>
              </div>
            </div>
            <div className="ref-criteria-grid">
              {referralCriteria.map((c, i) => (
                <div key={i} className={`ref-criteria-item ${c.met ? 'met' : ''}`}>
                  <div className="ref-criteria-top">
                    <span className="material-icons-round ref-criteria-icon" style={{ color: c.met ? '#10B981' : 'var(--primary)' }}>{c.icon}</span>
                    <span className="ref-criteria-label">{c.label}</span>
                    <span className={`ref-criteria-val ${c.met ? 'met' : ''}`}>{c.value}%</span>
                  </div>
                  <div className="ref-criteria-bar">
                    <div className="ref-criteria-fill" style={{ width: `${c.value}%`, background: c.met ? '#10B981' : 'var(--primary)' }}></div>
                  </div>
                  {c.met && <span className="material-icons-round ref-criteria-check">check_circle</span>}
                </div>
              ))}
            </div>
            <p className="ref-unlock-msg"><span className="material-icons-round" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }}>lock_open</span> Unlock access to alumni mentor profiles and request career referrals directly.</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="profile-popup-overlay" onClick={() => setEditing(false)}>
          <div className="edit-profile-modal" onClick={e => e.stopPropagation()}>
            <div className="edit-profile-header">
              <h2>Edit Profile</h2>
              <button className="profile-popup-close" onClick={() => setEditing(false)}>
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="edit-profile-body">
              <div className="edit-field">
                <label>Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="modal-input" />
              </div>

              <div className="edit-field">
                <label>Location</label>
                <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="modal-input" placeholder="City, Country" />
              </div>

              <div className="edit-field">
                <label>Bio</label>
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="modal-textarea" rows={3} placeholder="Tell us about yourself..." />
              </div>

              <div className="edit-row">
                <div className="edit-field" style={{ flex: 1 }}>
                  <label>LinkedIn</label>
                  <input type="text" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} className="modal-input" placeholder="linkedin.com/in/..." />
                </div>
                <div className="edit-field" style={{ flex: 1 }}>
                  <label>GitHub</label>
                  <input type="text" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} className="modal-input" placeholder="github.com/..." />
                </div>
              </div>

              <div className="edit-field">
                <label>Skills</label>
                <div className="edit-skills-input-row">
                  <input type="text" value={form.skillInput} onChange={e => setForm({ ...form, skillInput: e.target.value })} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} className="modal-input" placeholder="Add a skill..." style={{ marginBottom: 0, flex: 1 }} />
                  <button className="btn-primary btn-sm" onClick={addSkill} disabled={!form.skillInput.trim()} style={{ height: 40 }}>Add</button>
                </div>
                <div className="edit-skills-tags">
                  {form.skills.map((s, i) => (
                    <span key={i} className="edit-skill-tag">
                      {s}
                      <button onClick={() => removeSkill(s)}><span className="material-icons-round">close</span></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="edit-profile-footer">
              <button className="btn-outline" onClick={() => setEditing(false)} style={{ background: 'white', borderColor: 'var(--border)' }}>Cancel</button>
              <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
