import React from 'react';
import { PROFILE_AVATAR } from '../aiAssistantData';

export default function Dashboard() {
  return (
    <section className="page active" id="page-dashboard">
      

      {/* Student Summary Card */}
      <div className="summary-card" id="summaryCard">
        <div className="summary-left">
          <div className="summary-avatar">
            <img src={PROFILE_AVATAR} alt="Rahul Agarwal" />
            <div className="online-dot"></div>
          </div>
          <div className="summary-info">
            <h2>Rahul Agarwal</h2>
            <p className="summary-course">PG Program in Data Science & AI</p>
            <p className="summary-cohort">Cohort 42 · Batch Jan 2026</p>
            <div className="summary-badges-row">
              <span className="badge-pill badge-contributor"><span className="material-icons-round">emoji_events</span> Top Contributor</span>
            </div>
          </div>
        </div>
        <div className="summary-right">
          <div className="summary-stat">
            <div className="stat-ring" data-percent="72">
              <svg viewBox="0 0 36 36"><path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path className="ring-fill" stroke-dasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
              <span className="ring-text">72%</span>
            </div>
            <span className="stat-label">Course Progress</span>
          </div>
          <div className="summary-stat">
            <div className="stat-ring" data-percent="85">
              <svg viewBox="0 0 36 36"><path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path className="ring-fill blue" stroke-dasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
              <span className="ring-text">85%</span>
            </div>
            <span className="stat-label">Academic Score</span>
          </div>
          <div className="summary-stat">
            <div className="stat-ring referral" data-percent="68">
              <svg viewBox="0 0 36 36"><path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path className="ring-fill gold" stroke-dasharray="68, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
              <span className="ring-text">68%</span>
            </div>
            <span className="stat-label">Referral Eligibility</span>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dash-grid">
        {/* Upcoming Events (Moved from below) */}
        <div className="dash-card" id="eventsCard">
          <div className="card-header">
            <h3><span className="material-icons-round">event</span> Upcoming Events</h3>
          </div>
          <div className="events-list" id="eventsList">
            <div className="event-item">
              <div className="event-date"><span className="event-day">20</span><span className="event-month">May</span></div>
              <div className="event-info">
                <span className="event-title">Live Class — Neural Networks</span>
                <span className="event-time"><span className="material-icons-round">schedule</span> 7:00 PM IST</span>
              </div>
              <span className="event-tag live">Live</span>
            </div>
            <div className="event-item">
              <div className="event-date"><span className="event-day">22</span><span className="event-month">May</span></div>
              <div className="event-info">
                <span className="event-title">Mentor Session — Dr. Priya Sharma</span>
                <span className="event-time"><span className="material-icons-round">schedule</span> 5:30 PM IST</span>
              </div>
              <span className="event-tag mentor">Mentor</span>
            </div>
            <div className="event-item">
              <div className="event-date"><span className="event-day">25</span><span className="event-month">May</span></div>
              <div className="event-info">
                <span className="event-title">Alumni AMA — Career in Data Science</span>
                <span className="event-time"><span className="material-icons-round">schedule</span> 6:00 PM IST</span>
              </div>
              <span className="event-tag alumni">AMA</span>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="dash-card" id="tasksCard">
          <div className="card-header">
            <h3><span className="material-icons-round">checklist</span> Pending Tasks</h3>
            <span className="card-count">4 pending</span>
          </div>
          <div className="task-list" id="taskList">
            <div className="task-item urgent">
              <div className="task-priority"></div>
              <div className="task-info">
                <span className="task-title">ML Assignment 5 — Ensemble Methods</span>
                <span className="task-due"><span className="material-icons-round">schedule</span> Due in 2 days</span>
              </div>
              <button className="task-action">Open</button>
            </div>
            <div className="task-item high">
              <div className="task-priority"></div>
              <div className="task-info">
                <span className="task-title">Capstone Project — Phase 2 Submission</span>
                <span className="task-due"><span className="material-icons-round">schedule</span> Due in 5 days</span>
              </div>
              <button className="task-action">Open</button>
            </div>
            <div className="task-item medium">
              <div className="task-priority"></div>
              <div className="task-info">
                <span className="task-title">SQL Practice Set 3</span>
                <span className="task-due"><span className="material-icons-round">schedule</span> Due in 1 week</span>
              </div>
              <button className="task-action">Open</button>
            </div>
            <div className="task-item low">
              <div className="task-priority"></div>
              <div className="task-info">
                <span className="task-title">Review Mentor Feedback on EDA Project</span>
                <span className="task-due"><span className="material-icons-round">schedule</span> No deadline</span>
              </div>
              <button className="task-action">Open</button>
            </div>
          </div>
        </div>

        {/* Community Activity */}
        <div className="dash-card" id="communityActivityCard">
          <div className="card-header">
            <h3><span className="material-icons-round">forum</span> Community Activity</h3>
            <a href="#" className="card-link" data-page="community">View All</a>
          </div>
          <div className="activity-feed" id="activityFeed">
            <div className="activity-item">
              <div className="activity-avatar mentor">M</div>
              <div className="activity-content">
                <span className="activity-author">Dr. Priya Sharma</span>
                <span className="activity-text">Posted a new discussion: "Real-world applications of Random Forests"</span>
                <span className="activity-time">25 min ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar student">A</div>
              <div className="activity-content">
                <span className="activity-author">Ankit Verma</span>
                <span className="activity-text">Shared a resource in ML Study Room</span>
                <span className="activity-time">1 hr ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar alumni">S</div>
              <div className="activity-content">
                <span className="activity-author">Sneha Kapoor (Alumni)</span>
                <span className="activity-text">AMA Session: "Breaking into Product Analytics"</span>
                <span className="activity-time">3 hrs ago</span>
              </div>
            </div>
          </div>
        </div>




        {/* Upskill Card */}
        <div className="dash-card upskill-card" id="upskillCard">
          <div className="upskill-content">
            <span className="upskill-tag">Recommended for you</span>
            <h3>Advanced MLOps & Model Deployment</h3>
            <p>Take your ML skills to production. Learn Docker, Kubernetes, and CI/CD for ML pipelines.</p>
            <button className="btn-primary" id="upskillCta">Explore Program <span className="material-icons-round">arrow_forward</span></button>
          </div>
          <div className="upskill-graphic">
            <span className="material-icons-round">rocket_launch</span>
          </div>
        </div>

        {/* Overall Course Progress Section */}
        <div className="dash-card overall-progress-card" style={{gridColumn: "span 3", display: "flex", flexDirection: "column", gap: "24px"}}>
          <div className="card-header" style={{marginBottom: "0"}}>
            <h3><span className="material-icons-round">analytics</span> Overall Course Progress</h3>
          </div>
          
          <div style={{display: "flex", gap: "40px", alignItems: "center", justifyContent: "space-around"}}>
            <div style={{flex: "1", textAlign: "center"}}>
              <div style={{fontSize: "32px", fontWeight: "800", color: "var(--primary)"}}>75%</div>
              <div style={{fontSize: "13px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase", marginBottom: "12px"}}>Course Completed</div>
              <div className="prog-bar" style={{height: "12px"}}><div className="prog-fill" style={{width: "75%", background: "var(--primary)"}}></div></div>
            </div>
            
            <div style={{width: "1px", height: "60px", background: "var(--border)"}}></div>

            <div style={{flex: "1", display: "flex", flexDirection: "column", gap: "16px"}}>
              <div>
                <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginBottom: "6px"}}>
                  <span>Assignments (18/24)</span>
                  <span style={{color: "var(--text-muted)"}}>6 Pending</span>
                </div>
                <div className="prog-bar"><div className="prog-fill" style={{width: "75%", background: "#8B5CF6"}}></div></div>
              </div>
              
              <div>
                <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginBottom: "6px"}}>
                  <span>Projects (5/7)</span>
                  <span style={{color: "var(--text-muted)"}}>2 Pending</span>
                </div>
                <div className="prog-bar"><div className="prog-fill" style={{width: "71%", background: "#3B82F6"}}></div></div>
              </div>
            </div>

            <div style={{width: "1px", height: "60px", background: "var(--border)"}}></div>

            <div style={{flex: "1", textAlign: "center"}}>
              <div style={{fontSize: "32px", fontWeight: "800", color: "#10B981"}}>88%</div>
              <div style={{fontSize: "13px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase"}}>Average Score</div>
              <div style={{fontSize: "12px", color: "#10B981", fontWeight: "600", marginTop: "4px", display: "inline-flex", alignItems: "center", gap: "4px"}}>
                <span className="material-icons-round" style={{fontSize: "14px"}}>trending_up</span> Top 10% of Cohort
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </section>
  );
}
