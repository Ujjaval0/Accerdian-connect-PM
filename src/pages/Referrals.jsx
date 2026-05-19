import React from 'react';
import { alumniList } from '../data';

const referralCriteria = [
  { label: 'Assignment Completion', value: 94, icon: 'assignment_turned_in', met: true },
  { label: 'Academic Score', value: 82, icon: 'school', met: true },
  { label: 'Project Quality', value: 90, icon: 'star_rate', met: true },
  { label: 'Course Progress', value: 72, icon: 'trending_up', met: false },
];

export default function Referrals() {
  const overallProgress = Math.round(referralCriteria.reduce((s, c) => s + c.value, 0) / referralCriteria.length);
  const isEligible = referralCriteria.every(c => c.value >= 80);

  return (
    <section className="page active" id="page-referrals">
      <div className="page-header">
        <h1>Referral Center</h1>
        <p className="page-subtitle">Connect with alumni for career opportunities</p>
      </div>

      {/* Eligibility Card */}
      <div className="ref-status-card" style={{ marginBottom: 32 }}>
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

      {/* Alumni Directory */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Alumni Network</h2>
      <div className="alumni-directory">
        {alumniList.map(alum => (
          <div key={alum.id} className={`alumni-card ${!isEligible ? 'locked' : ''}`}>
            <div className="alumni-header">
              <div className="alumni-avatar-circle" style={{ background: alum.isAvailable ? '#2563EB' : '#9CA3AF' }}>
                {alum.initials}
                {alum.isAvailable && <span className="profile-online-dot"></span>}
              </div>
              <div className="alumni-info">
                <h3>{alum.name}</h3>
                <span className="alumni-role">{alum.role}</span>
                <span className="alumni-company">{alum.comp}</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>{alum.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {alum.tags.map((t, j) => <span key={j} className="skill-tag" style={{ fontSize: 11, padding: '3px 8px' }}>{t}</span>)}
            </div>
            {isEligible ? (
              <button className="btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                <span className="material-icons-round" style={{ fontSize: 16 }}>connect_without_contact</span> Request Referral
              </button>
            ) : (
              <div style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', fontWeight: 600 }}>Complete eligibility to unlock</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
