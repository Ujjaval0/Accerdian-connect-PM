import React, { useState } from 'react';

const communityData = {
  week: [
    { rank: 1, name: 'Nisha Sharma', batch: 'PGPDSAI · Cohort 42', initials: 'NS', color: '#A855F7', points: 842, change: 2, badges: ['Top Contributor', 'Helpful Peer'] },
    { rank: 2, name: 'Priya Nair', batch: 'PGPDSAI · Cohort 42', initials: 'PR', color: '#2563EB', points: 780, change: 0, badges: ['Top Contributor'] },
    { rank: 3, name: 'Sneha Gupta', batch: 'PGP BA · Cohort 38', initials: 'SG', color: '#EC4899', points: 715, change: 3, badges: ['Helpful Peer'] },
    { rank: 4, name: 'Rohan Mehta', batch: 'PGPDSAI · Cohort 42', initials: 'RM', color: '#6366F1', points: 698, change: -1, badges: ['Study Streak'] },
    { rank: 5, name: 'Divya Krishnan', batch: 'PGP DE · Cohort 35', initials: 'DK', color: '#0EA5E9', points: 650, change: 1, badges: ['Top Contributor'] },
    { rank: 6, name: 'Amit Verma', batch: 'PGP BA · Cohort 38', initials: 'AV', color: '#14B8A6', points: 612, change: -2, badges: [] },
    { rank: 7, name: 'Kiran Reddy', batch: 'PGPDSAI · Cohort 42', initials: 'KI', color: '#F59E0B', points: 590, change: 4, badges: ['Helpful Peer'] },
    { rank: 8, name: 'Meera Joshi', batch: 'PGP BA · Cohort 38', initials: 'ME', color: '#10B981', points: 548, change: 0, badges: [] },
    { rank: 9, name: 'Aarav Singh', batch: 'PGP DE · Cohort 35', initials: 'AS', color: '#EF4444', points: 510, change: -1, badges: [] },
    { rank: 10, name: 'Rahul Agarwal', batch: 'PGPDSAI · Cohort 42', initials: 'RA', color: '#4F46E5', points: 485, change: 3, badges: ['Project Star'] },
  ],
  month: [
    { rank: 1, name: 'Priya Nair', batch: 'PGPDSAI · Cohort 42', initials: 'PR', color: '#2563EB', points: 3240, change: 0, badges: ['Top Contributor', 'Helpful Peer'] },
    { rank: 2, name: 'Nisha Sharma', batch: 'PGPDSAI · Cohort 42', initials: 'NS', color: '#A855F7', points: 3100, change: 1, badges: ['Top Contributor'] },
    { rank: 3, name: 'Divya Krishnan', batch: 'PGP DE · Cohort 35', initials: 'DK', color: '#0EA5E9', points: 2880, change: -1, badges: ['Study Streak'] },
    { rank: 4, name: 'Sneha Gupta', batch: 'PGP BA · Cohort 38', initials: 'SG', color: '#EC4899', points: 2750, change: 2, badges: ['Helpful Peer'] },
    { rank: 5, name: 'Rohan Mehta', batch: 'PGPDSAI · Cohort 42', initials: 'RM', color: '#6366F1', points: 2600, change: 0, badges: [] },
    { rank: 6, name: 'Rahul Agarwal', batch: 'PGPDSAI · Cohort 42', initials: 'RA', color: '#4F46E5', points: 2480, change: 3, badges: ['Project Star'] },
    { rank: 7, name: 'Kiran Reddy', batch: 'PGPDSAI · Cohort 42', initials: 'KI', color: '#F59E0B', points: 2350, change: -2, badges: [] },
    { rank: 8, name: 'Meera Joshi', batch: 'PGP BA · Cohort 38', initials: 'ME', color: '#10B981', points: 2200, change: 1, badges: [] },
  ],
  all: [
    { rank: 1, name: 'Priya Nair', batch: 'PGPDSAI · Cohort 42', initials: 'PR', color: '#2563EB', points: 12480, change: 0, badges: ['Top Contributor', 'Helpful Peer'] },
    { rank: 2, name: 'Divya Krishnan', batch: 'PGP DE · Cohort 35', initials: 'DK', color: '#0EA5E9', points: 11200, change: 0, badges: ['Top Contributor', 'Study Streak'] },
    { rank: 3, name: 'Nisha Sharma', batch: 'PGPDSAI · Cohort 42', initials: 'NS', color: '#A855F7', points: 10850, change: 1, badges: ['Helpful Peer'] },
    { rank: 4, name: 'Sneha Gupta', batch: 'PGP BA · Cohort 38', initials: 'SG', color: '#EC4899', points: 9400, change: -1, badges: ['Helpful Peer'] },
    { rank: 5, name: 'Rohan Mehta', batch: 'PGPDSAI · Cohort 42', initials: 'RM', color: '#6366F1', points: 8900, change: 0, badges: ['Project Star'] },
    { rank: 6, name: 'Rahul Agarwal', batch: 'PGPDSAI · Cohort 42', initials: 'RA', color: '#4F46E5', points: 7600, change: 2, badges: ['Project Star'] },
  ],
};

const cohortData = {
  week: [
    { rank: 1, name: 'Vikram Patel', batch: 'PGPDSAI · Cohort 42', initials: 'VP', color: '#8B5CF6', points: 560, change: 1, badges: ['Project Star'], star: true },
    { rank: 2, name: 'Priya Nair', batch: 'PGPDSAI · Cohort 42', initials: 'PR', color: '#2563EB', points: 540, change: -1, badges: ['Never Miss a Class'], star: true },
    { rank: 3, name: 'Nisha Sharma', batch: 'PGPDSAI · Cohort 42', initials: 'NS', color: '#A855F7', points: 520, change: 0, badges: ['Study Streak'], star: true },
    { rank: 4, name: 'Kiran Reddy', batch: 'PGPDSAI · Cohort 42', initials: 'KI', color: '#F59E0B', points: 480, change: 2, badges: [] },
    { rank: 5, name: 'Rohan Mehta', batch: 'PGPDSAI · Cohort 42', initials: 'RM', color: '#6366F1', points: 460, change: -1, badges: [] },
    { rank: 6, name: 'Rahul Agarwal', batch: 'PGPDSAI · Cohort 42', initials: 'RA', color: '#4F46E5', points: 440, change: 1, badges: ['Project Star'] },
    { rank: 7, name: 'Amit Desai', batch: 'PGPDSAI · Cohort 42', initials: 'AD', color: '#10B981', points: 410, change: 0, badges: [] },
    { rank: 8, name: 'Neha Kumar', batch: 'PGPDSAI · Cohort 42', initials: 'NK', color: '#EC4899', points: 385, change: -2, badges: [] },
  ],
  month: [
    { rank: 1, name: 'Priya Nair', batch: 'PGPDSAI · Cohort 42', initials: 'PR', color: '#2563EB', points: 2100, change: 0, badges: ['Never Miss a Class'], star: true },
    { rank: 2, name: 'Vikram Patel', batch: 'PGPDSAI · Cohort 42', initials: 'VP', color: '#8B5CF6', points: 1980, change: 1, badges: ['Project Star'], star: true },
    { rank: 3, name: 'Nisha Sharma', batch: 'PGPDSAI · Cohort 42', initials: 'NS', color: '#A855F7', points: 1860, change: -1, badges: ['Study Streak'], star: true },
    { rank: 4, name: 'Rahul Agarwal', batch: 'PGPDSAI · Cohort 42', initials: 'RA', color: '#4F46E5', points: 1750, change: 2, badges: [] },
    { rank: 5, name: 'Kiran Reddy', batch: 'PGPDSAI · Cohort 42', initials: 'KI', color: '#F59E0B', points: 1680, change: 0, badges: [] },
    { rank: 6, name: 'Rohan Mehta', batch: 'PGPDSAI · Cohort 42', initials: 'RM', color: '#6366F1', points: 1590, change: -1, badges: [] },
  ],
  all: [
    { rank: 1, name: 'Priya Nair', batch: 'PGPDSAI · Cohort 42', initials: 'PR', color: '#2563EB', points: 8400, change: 0, badges: ['Never Miss a Class', 'Project Star'] },
    { rank: 2, name: 'Vikram Patel', batch: 'PGPDSAI · Cohort 42', initials: 'VP', color: '#8B5CF6', points: 7900, change: 0, badges: ['Project Star'] },
    { rank: 3, name: 'Nisha Sharma', batch: 'PGPDSAI · Cohort 42', initials: 'NS', color: '#A855F7', points: 7600, change: 1, badges: ['Study Streak'] },
    { rank: 4, name: 'Kiran Reddy', batch: 'PGPDSAI · Cohort 42', initials: 'KI', color: '#F59E0B', points: 6800, change: -1, badges: [] },
    { rank: 5, name: 'Rahul Agarwal', batch: 'PGPDSAI · Cohort 42', initials: 'RA', color: '#4F46E5', points: 6200, change: 2, badges: ['Project Star'] },
  ],
};

const badgeIcons = {
  'Top Contributor': 'forum',
  'Helpful Peer': 'thumb_up',
  'Project Star': 'star',
  'Study Streak': 'local_fire_department',
  'Never Miss a Class': 'event_available',
  'Alumni Approved': 'verified',
};

const badgeColors = {
  'Top Contributor': '#4F46E5',
  'Helpful Peer': '#2563EB',
  'Project Star': '#F59E0B',
  'Study Streak': '#EF4444',
  'Never Miss a Class': '#10B981',
  'Alumni Approved': '#8B5CF6',
};

export default function Leaderboard() {
  const [board, setBoard] = useState('community');
  const [timeFilter, setTimeFilter] = useState('week');

  const data = board === 'community' ? communityData : cohortData;
  const list = data[timeFilter] || data.week;

  // Split into Top 3 and remaining
  const top1 = list.find(s => s.rank === 1);
  const top2 = list.find(s => s.rank === 2);
  const top3 = list.find(s => s.rank === 3);
  const remaining = list.filter(s => s.rank > 3);

  // Find user's stats
  const myStats = list.find(s => s.initials === 'RA') || {
    rank: 6,
    name: 'Rahul Agarwal',
    points: board === 'cohort' ? 440 : (timeFilter === 'week' ? 485 : (timeFilter === 'month' ? 2480 : 7600)),
    change: board === 'cohort' ? 1 : 3,
    badges: ['Project Star'],
    batch: 'PGPDSAI · Cohort 42'
  };

  return (
    <section className="page active" id="page-leaderboard" style={{ paddingBottom: 40 }}>
      <div className="page-header">
        <h1>Leaderboard</h1>
        <p className="page-subtitle">{board === 'community' ? 'Top contributors across all Accredian programs' : 'PG Program in Data Science & AI — Cohort 42'}</p>
      </div>

      {/* Control Panel Grid */}
      <div className="lb-controls-container">
        {/* Board Switcher */}
        <div className="lb-switcher">
          <button className={`lb-switch-btn ${board === 'community' ? 'active' : ''}`} onClick={() => { setBoard('community'); setTimeFilter('week'); }}>
            <span className="material-icons-round" style={{ fontSize: 18 }}>public</span> Global Community
          </button>
          <button className={`lb-switch-btn ${board === 'cohort' ? 'active' : ''}`} onClick={() => { setBoard('cohort'); setTimeFilter('week'); }}>
            <span className="material-icons-round" style={{ fontSize: 18 }}>school</span> Cohort Classroom
          </button>
        </div>

        {/* Time Filters */}
        <div className="feed-filters" style={{ margin: 0 }}>
          {['week', 'month', 'all'].map(f => (
            <button key={f} className={`filter-chip ${timeFilter === f ? 'active' : ''}`} onClick={() => setTimeFilter(f)}>
              {f === 'week' ? 'This Week' : f === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Reward Progress Bar Section */}
      <div className="lb-rewards-overview">
        <div className="lb-reward-summary-card">
          <div className="lb-reward-icon">
            <span className="material-icons-round">emoji_events</span>
          </div>
          <div className="lb-reward-info">
            <span className="lb-reward-title">Your Rank Standing</span>
            <div className="lb-reward-row">
              <div className="lb-reward-stat">
                <span className="label">Rank</span>
                <span className="value">#{myStats.rank}</span>
              </div>
              <div className="lb-reward-divider"></div>
              <div className="lb-reward-stat">
                <span className="label">Total Points</span>
                <span className="value">{myStats.points.toLocaleString()} <span className="pts-suffix">pts</span></span>
              </div>
              <div className="lb-reward-divider"></div>
              <div className="lb-reward-stat">
                <span className="label">Streak Bonus</span>
                <span className="value-streak">
                  <span className="material-icons-round">local_fire_department</span> +15%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lb-reward-progress-card">
          <div className="lb-reward-progress-header">
            <span>Next Reward Milestone</span>
            <span className="progress-percent">
              {board === 'cohort' ? 'Level 2: Certified Expert' : 'Level 2: Community Contributor'}
            </span>
          </div>
          <div className="lb-progress-bar-container">
            <div className="lb-progress-bar" style={{ width: `${Math.min(100, Math.max(30, (myStats.points / (board === 'cohort' ? 1000 : (timeFilter === 'week' ? 1000 : (timeFilter === 'month' ? 4000 : 15000)))) * 100))}%` }}></div>
          </div>
          <div className="lb-reward-progress-footer">
            <span>{myStats.points.toLocaleString()} pts / {(board === 'cohort' ? 1000 : (timeFilter === 'week' ? 1000 : (timeFilter === 'month' ? 4000 : 15000))).toLocaleString()} pts</span>
            <span>Unlocked at next milestone</span>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="lb-info">
        <span className="material-icons-round" style={{ fontSize: 16 }}>info_outline</span>
        {board === 'community'
          ? 'Points from community discussions, answered replies, shared notes/files, study room hours, and AMA session participation.'
          : 'Points from assignment submissions, project grades, module discussions, class attendance, and curriculum progression.'}
      </div>

      {/* Visual Podium for Top 3 */}
      <div className="lb-podium">
        {/* 2nd Place */}
        {top2 && (
          <div className="lb-podium-card rank-2">
            <div className="lb-podium-crown">🥈</div>
            <div className="lb-podium-avatar-wrapper">
              <div className="lb-podium-avatar" style={{ background: top2.color }}>
                {top2.initials}
              </div>
              <div className="lb-podium-rank-badge">2</div>
            </div>
            <h3 className="lb-podium-name">{top2.name}</h3>
            <span className="lb-podium-batch">{top2.batch.split('·')[0]}</span>
            <div className="lb-podium-points">{top2.points.toLocaleString()} <span className="pts">pts</span></div>
            {top2.badges.length > 0 && (
              <span className="lb-podium-badge-tag">{top2.badges[0]}</span>
            )}
          </div>
        )}

        {/* 1st Place */}
        {top1 && (
          <div className="lb-podium-card rank-1">
            <div className="lb-podium-crown">👑</div>
            <div className="lb-podium-avatar-wrapper">
              <div className="lb-podium-avatar" style={{ background: top1.color }}>
                {top1.initials}
              </div>
              <div className="lb-podium-rank-badge">1</div>
            </div>
            <h3 className="lb-podium-name">{top1.name}</h3>
            <span className="lb-podium-batch">{top1.batch.split('·')[0]}</span>
            <div className="lb-podium-points">{top1.points.toLocaleString()} <span className="pts">pts</span></div>
            {top1.badges.length > 0 && (
              <span className="lb-podium-badge-tag active">{top1.badges[0]}</span>
            )}
          </div>
        )}

        {/* 3rd Place */}
        {top3 && (
          <div className="lb-podium-card rank-3">
            <div className="lb-podium-crown">🥉</div>
            <div className="lb-podium-avatar-wrapper">
              <div className="lb-podium-avatar" style={{ background: top3.color }}>
                {top3.initials}
              </div>
              <div className="lb-podium-rank-badge">3</div>
            </div>
            <h3 className="lb-podium-name">{top3.name}</h3>
            <span className="lb-podium-batch">{top3.batch.split('·')[0]}</span>
            <div className="lb-podium-points">{top3.points.toLocaleString()} <span className="pts">pts</span></div>
            {top3.badges.length > 0 && (
              <span className="lb-podium-badge-tag">{top3.badges[0]}</span>
            )}
          </div>
        )}
      </div>

      {/* Leaderboard Table List */}
      <div className="lb-list-header">
        <span style={{ width: 36, textAlign: 'center' }}>Rank</span>
        <span style={{ flex: 1, paddingLeft: 52 }}>Student</span>
        <span className="lb-header-badges" style={{ width: 120, textAlign: 'left' }}>Specialization Badge</span>
        <span style={{ width: 90, textAlign: 'right' }}>Score</span>
        <span style={{ width: 48, textAlign: 'center' }}>Change</span>
      </div>

      <div className="lb-list">
        {remaining.map((s, i) => {
          const isMe = s.initials === 'RA';
          return (
            <div key={i} className={`lb-row ${isMe ? 'me' : ''} ${s.star && board === 'cohort' && timeFilter !== 'all' ? 'star' : ''}`}>
              {/* Rank */}
              <div className="lb-rank">
                <span className="lb-rank-num">{s.rank}</span>
              </div>

              {/* Avatar */}
              <div className="lb-avatar" style={{ background: s.color }}>{s.initials}</div>

              {/* Info */}
              <div className="lb-info-col">
                <span className="lb-name">
                  {s.name}
                  {isMe && <span className="lb-you-tag">You</span>}
                  {s.star && board === 'cohort' && timeFilter !== 'all' && <span className="lb-star-tag">⭐ Week's Star</span>}
                </span>
                <span className="lb-batch">{s.batch}</span>
              </div>

              {/* Badges */}
              <div className="lb-badges">
                {s.badges.slice(0, 1).map((b, j) => (
                  <span key={j} className="lb-badge-text-tag" style={{ border: `1px solid ${badgeColors[b]}22`, background: `${badgeColors[b]}0b`, color: badgeColors[b] }}>
                    <span className="material-icons-round" style={{ fontSize: 13 }}>{badgeIcons[b] || 'emoji_events'}</span>
                    {b}
                  </span>
                ))}
                {s.badges.length === 0 && (
                  <span className="lb-badge-text-tag empty">
                    <span className="material-icons-round" style={{ fontSize: 13 }}>workspace_premium</span>
                    Aspiring Star
                  </span>
                )}
              </div>

              {/* Points */}
              <div className="lb-points">{s.points.toLocaleString()} <span className="lb-pts-label">pts</span></div>

              {/* Change */}
              <div className="lb-change">
                {s.change > 0 && <span className="lb-up-pill"><span className="material-icons-round">arrow_upward</span>{s.change}</span>}
                {s.change < 0 && <span className="lb-down-pill"><span className="material-icons-round">arrow_downward</span>{Math.abs(s.change)}</span>}
                {s.change === 0 && <span className="lb-same">—</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
