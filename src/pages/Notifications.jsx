import React from 'react';

export default function Notifications() {
  return (
    <section className="page active" id="page-notifications">
      
      <div className="page-header" style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
        <div>
          <h1>Notifications</h1>
          <p className="page-subtitle">4 unread</p>
        </div>
        <button className="btn-outline" style={{background: "white", borderColor: "var(--border)", color: "var(--text-main)", marginTop: "4px", display: "flex", alignItems: "center", gap: "8px"}}>
          <span className="material-icons-round" style={{fontSize: "18px"}}>done_all</span> Mark all read
        </button>
      </div>
      
      <div className="notifications-list" style={{display: "flex", flexDirection: "column", gap: "12px"}}>
        <div className="notif-card unread">
          <div className="notif-icon" style={{background: "#EEF2FF", color: "#4F46E5"}}><span className="material-icons-round">chat_bubble_outline</span></div>
          <div className="notif-content">
            <div className="notif-header">
              <span className="notif-title">Dr. Rajesh replied to your post <span className="unread-dot"></span></span>
              <span className="notif-time">2h ago</span>
            </div>
            <div className="notif-desc">Dr. Rajesh Kumar commented on your backpropagation question with a detailed explanation.</div>
            <a href="#" className="notif-link">Click to mark as read</a>
          </div>
        </div>
        
        <div className="notif-card unread">
          <div className="notif-icon" style={{background: "#FEF2F2", color: "#EF4444"}}><span className="material-icons-round">error_outline</span></div>
          <div className="notif-content">
            <div className="notif-header">
              <span className="notif-title">Assignment Due Tomorrow <span className="unread-dot"></span></span>
              <span className="notif-time">2h ago</span>
            </div>
            <div className="notif-desc">Module 5 Assignment is due tomorrow at 11:59 PM. You have not submitted yet.</div>
            <a href="#" className="notif-link">Click to mark as read</a>
          </div>
        </div>
        
        <div className="notif-card">
          <div className="notif-icon" style={{background: "#FFF7ED", color: "#F97316"}}><span className="material-icons-round">local_fire_department</span></div>
          <div className="notif-content">
            <div className="notif-header">
              <span className="notif-title">14-Day Streak Achieved!</span>
              <span className="notif-time">2h ago</span>
            </div>
            <div className="notif-desc">You have maintained a 14-day learning streak. Keep going — 7 more days to reach your milestone badge!</div>
          </div>
        </div>
        
        <div className="notif-card unread">
          <div className="notif-icon" style={{background: "#FAF5FF", color: "#A855F7"}}><span className="material-icons-round">calendar_today</span></div>
          <div className="notif-content">
            <div className="notif-header">
              <span className="notif-title">AMA Session in 2 Hours <span className="unread-dot"></span></span>
              <span className="notif-time">2h ago</span>
            </div>
            <div className="notif-desc">The ML Careers AMA with Rahul Mehta starts in 2 hours. Join the Open Forum to participate.</div>
            <a href="#" className="notif-link">Click to mark as read</a>
          </div>
        </div>
        
        <div className="notif-card">
          <div className="notif-icon" style={{background: "#F0FDF4", color: "#22C55E"}}><span className="material-icons-round">alternate_email</span></div>
          <div className="notif-content">
            <div className="notif-header">
              <span className="notif-title">Priya mentioned you in a post</span>
              <span className="notif-time">2h ago</span>
            </div>
            <div className="notif-desc">Priya Nair mentioned you in the EDA Project discussion thread.</div>
          </div>
        </div>
        
        <div className="notif-card unread">
          <div className="notif-icon" style={{background: "#EFF6FF", color: "#3B82F6"}}><span className="material-icons-round">school</span></div>
          <div className="notif-content">
            <div className="notif-header">
              <span className="notif-title">New alumni available for referrals <span className="unread-dot"></span></span>
              <span className="notif-time">2h ago</span>
            </div>
            <div className="notif-desc">Divya Krishnan from Microsoft is now accepting referral requests in your program domain.</div>
            <a href="#" className="notif-link">Click to mark as read</a>
          </div>
        </div>
      </div>
    
    </section>
  );
}
