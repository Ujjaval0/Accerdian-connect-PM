import React, { useState, useEffect, useRef } from 'react';
import { studyRooms as initialRooms } from '../data';

const fakeParticipants = [
  { name: 'Priya Nair', initials: 'PR', color: '#2563EB', cameraOn: true },
  { name: 'Vikram Patel', initials: 'VP', color: '#8B5CF6', cameraOn: false },
  { name: 'Kiran Reddy', initials: 'KI', color: '#F59E0B', cameraOn: true },
  { name: 'Meera Joshi', initials: 'ME', color: '#10B981', cameraOn: true },
  { name: 'Rohan Mehta', initials: 'RM', color: '#6366F1', cameraOn: false },
  { name: 'Nisha Sharma', initials: 'NS', color: '#A855F7', cameraOn: true },
  { name: 'Amit Desai', initials: 'AD', color: '#0EA5E9', cameraOn: true },
];

export default function Studyrooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(8);
  const [pomodoro, setPomodoro] = useState(true);

  // Call state
  const [activeRoomIdx, setActiveRoomIdx] = useState(null);
  const [permissionDialog, setPermissionDialog] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const videoRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  // Attach camera stream
  useEffect(() => {
    if (activeRoomIdx !== null && cameraOn && videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [cameraOn, activeRoomIdx, localStream]);

  // Cleanup stream on unmount or disconnect
  useEffect(() => {
    return () => {
      if (localStream) localStream.getTracks().forEach(t => t.stop());
    };
  }, [localStream]);

  const joinRoom = (idx) => {
    if (activeRoomIdx !== null) return; // already in a room
    setPermissionDialog(idx);
  };

  const confirmJoin = async () => {
    const idx = permissionDialog;
    setPermissionDialog(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setLocalStream(stream);
      setCameraOn(true);
    } catch {
      setLocalStream(null);
      setCameraOn(false);
    }
    const updated = [...rooms];
    updated[idx].isJoined = true;
    updated[idx].joined += 1;
    updated[idx].avatars.push('RA');
    setRooms(updated);
    setActiveRoomIdx(idx);
    setChatMessages([
      { sender: 'system', text: 'You joined the room. Camera is on, mic is permanently muted.', time: now() },
    ]);
  };

  const disconnectCall = () => {
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    setLocalStream(null);
    const updated = [...rooms];
    if (activeRoomIdx !== null && updated[activeRoomIdx]) {
      updated[activeRoomIdx].isJoined = false;
      updated[activeRoomIdx].joined -= 1;
      updated[activeRoomIdx].avatars = updated[activeRoomIdx].avatars.filter(a => a !== 'RA');
    }
    setRooms(updated);
    setActiveRoomIdx(null);
    setChatMessages([]);
    setChatOpen(false);
    setCameraOn(true);
  };

  const toggleCamera = async () => {
    if (cameraOn) {
      if (localStream) localStream.getTracks().forEach(t => t.stop());
      setLocalStream(null);
      setCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setLocalStream(stream);
        setCameraOn(true);
      } catch {
        setCameraOn(false);
      }
    }
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'You', text: chatInput.trim(), time: now() }]);
    setChatInput('');
    // Simulated reply
    setTimeout(() => {
      const p = fakeParticipants[Math.floor(Math.random() * fakeParticipants.length)];
      const replies = ['Great point! 👍', 'Let me check that...', 'I agree!', 'Can you share the link?', 'Nice one 🎉', 'Got it, thanks!', 'Working on it now.'];
      setChatMessages(prev => [...prev, { sender: p.name, text: replies[Math.floor(Math.random() * replies.length)], time: now() }]);
    }, 1500 + Math.random() * 2000);
  };

  const now = () => {
    const d = new Date();
    const h = d.getHours() % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, '0');
    const ap = d.getHours() >= 12 ? 'pm' : 'am';
    return `${h}:${m} ${ap}`;
  };

  const handleCreateRoom = () => {
    if (!roomName.trim() || !subject.trim()) return;
    setRooms([{ title: roomName, subtitle: subject, desc: description || 'Collaborative study session.', joined: 1, total: parseInt(maxParticipants) || 8, creator: 'Rahul Agarwal', isJoined: true, avatars: ['RA'], hasPomodoro: pomodoro }, ...rooms]);
    setIsModalOpen(false);
    setRoomName(''); setSubject(''); setDescription(''); setMaxParticipants(8); setPomodoro(true);
  };

  const activeRoom = activeRoomIdx !== null ? rooms[activeRoomIdx] : null;
  const roomParticipants = activeRoom ? fakeParticipants.slice(0, activeRoom.joined - 1) : [];

  // ── In-call view ──
  if (activeRoomIdx !== null && activeRoom) {
    return (
      <section className="page active" id="page-studyrooms" style={{ position: 'relative', height: '100%', overflow: 'hidden', padding: 0 }}>
        <div className="vc-container">
          {/* Main area */}
          <div className="vc-main">
            {/* Header */}
            <div className="vc-header">
              <div className="vc-header-left">
                <span className="material-icons-round" style={{ color: 'var(--primary)', fontSize: 20 }}>menu_book</span>
                <div>
                  <h3 className="vc-room-title">{activeRoom.title}</h3>
                  <span className="vc-room-sub">{activeRoom.subtitle} · {activeRoom.joined} in room</span>
                </div>
              </div>
              <div className="vc-header-right">
                <button className="vc-ctrl-btn" onClick={() => setChatOpen(!chatOpen)} title="Chat">
                  <span className="material-icons-round">chat</span>
                </button>
              </div>
            </div>

            {/* Video grid */}
            <div className="vc-grid">
              {/* My video */}
              <div className="vc-tile me">
                {cameraOn && localStream ? (
                  <video ref={videoRef} autoPlay muted playsInline className="vc-video" />
                ) : (
                  <div className="vc-avatar-placeholder" style={{ background: '#4F46E5' }}>RA</div>
                )}
                <div className="vc-tile-label">
                  <span className="vc-tile-name">You</span>
                  <span className="material-icons-round vc-mic-off">mic_off</span>
                </div>
              </div>

              {/* Other participants */}
              {roomParticipants.map((p, i) => (
                <div key={i} className="vc-tile">
                  {p.cameraOn ? (
                    <div className="vc-fake-video" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)` }}>
                      <div className="vc-avatar-placeholder" style={{ background: p.color, width: 64, height: 64, fontSize: 22 }}>{p.initials}</div>
                    </div>
                  ) : (
                    <div className="vc-avatar-placeholder" style={{ background: p.color }}>{p.initials}</div>
                  )}
                  <div className="vc-tile-label">
                    <span className="vc-tile-name">{p.name}</span>
                    <span className="material-icons-round vc-mic-off">mic_off</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="vc-controls">
              <button className={`vc-ctrl-btn ${cameraOn ? 'on' : 'off'}`} onClick={toggleCamera} title={cameraOn ? 'Turn off camera' : 'Turn on camera'}>
                <span className="material-icons-round">{cameraOn ? 'videocam' : 'videocam_off'}</span>
              </button>
              <button className="vc-ctrl-btn off disabled" title="Mic permanently muted" disabled>
                <span className="material-icons-round">mic_off</span>
              </button>
              <button className="vc-ctrl-btn disconnect" onClick={disconnectCall} title="Disconnect">
                <span className="material-icons-round">call_end</span>
              </button>
              <button className={`vc-ctrl-btn ${chatOpen ? 'on' : ''}`} onClick={() => setChatOpen(!chatOpen)} title="Toggle chat">
                <span className="material-icons-round">chat</span>
              </button>
            </div>
          </div>

          {/* Chat sidebar */}
          {chatOpen && (
            <div className="vc-chat">
              <div className="vc-chat-header">
                <h4>Room Chat</h4>
                <button className="vc-chat-close" onClick={() => setChatOpen(false)}>
                  <span className="material-icons-round">close</span>
                </button>
              </div>
              <div className="vc-chat-messages">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`vc-chat-msg ${msg.sender === 'system' ? 'system' : msg.sender === 'You' ? 'me' : ''}`}>
                    {msg.sender !== 'system' && <span className="vc-chat-sender">{msg.sender}</span>}
                    <span className="vc-chat-text">{msg.text}</span>
                    <span className="vc-chat-time">{msg.time}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="vc-chat-input-area">
                <input type="text" placeholder="Type a message..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} className="vc-chat-input" />
                <button className="vc-chat-send" onClick={sendChat} disabled={!chatInput.trim()}>
                  <span className="material-icons-round">send</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Room list view ──
  return (
    <section className="page active" id="page-studyrooms" style={{ position: 'relative', height: '100%', overflowY: 'auto' }}>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1>Study Rooms</h1>
          <p className="page-subtitle">Join a peer study session or start your own</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ marginTop: "4px" }}>
          <span className="material-icons-round" style={{ fontSize: "18px", marginRight: "6px" }}>add</span> Create Room
        </button>
      </div>

      <div className="rooms-grid">
        {rooms.map((room, idx) => {
          const pct = (room.joined / room.total) * 100;
          return (
            <div key={idx} className="room-card">
              <div className="room-header">
                <div className="room-icon"><span className="material-icons-round">menu_book</span></div>
                <div className="room-title-area">
                  <div className="room-title">{room.title}</div>
                  <div className="room-subtitle">{room.subtitle}</div>
                </div>
                <div className="room-tags">
                  {room.hasPomodoro && <span className="room-tag pomodoro"><span className="material-icons-round" style={{ fontSize: 14 }}>timer</span> Pomodoro</span>}
                  <span className="room-tag active-tag">Active</span>
                </div>
              </div>
              <div className="room-desc">{room.desc}</div>
              <div className="room-stats">
                <div className="room-avatars">
                  {room.avatars.map((av, i) => <div key={i} className="room-avatar-mini">{av}</div>)}
                </div>
                <span className="room-count-text">{room.joined}/{room.total} joined</span>
              </div>
              <div className="room-progress-bar"><div className="room-progress-fill" style={{ width: `${pct}%` }}></div></div>
              <div className="room-footer">
                <span className="room-creator">Created by {room.creator}</span>
                <button
                  className="btn-primary"
                  onClick={() => joinRoom(idx)}
                  disabled={activeRoomIdx !== null || room.joined >= room.total}
                  style={activeRoomIdx !== null ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  <span className="material-icons-round" style={{ fontSize: 18, marginRight: 6 }}>videocam</span> Join
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permission Dialog */}
      {permissionDialog !== null && (
        <div className="profile-popup-overlay" onClick={() => setPermissionDialog(null)}>
          <div className="vc-permission-card" onClick={e => e.stopPropagation()}>
            <div className="vc-perm-icon"><span className="material-icons-round">videocam</span></div>
            <h3>Join "{rooms[permissionDialog].title}"?</h3>
            <p>Your camera will be turned on and mic will stay muted. You can toggle your camera anytime during the session.</p>
            <div className="vc-perm-info">
              <div><span className="material-icons-round" style={{ fontSize: 16, color: '#10B981' }}>videocam</span> Camera — On by default</div>
              <div><span className="material-icons-round" style={{ fontSize: 16, color: '#EF4444' }}>mic_off</span> Microphone — Always muted</div>
            </div>
            <div className="vc-perm-actions">
              <button className="btn-outline" onClick={() => setPermissionDialog(null)} style={{ background: 'white', borderColor: 'var(--border)' }}>Cancel</button>
              <button className="btn-primary" onClick={confirmJoin}>
                <span className="material-icons-round" style={{ fontSize: 18, marginRight: 6 }}>login</span> Join Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Room Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex', zIndex: 1000 }}>
          <div className="modal-container">
            <div className="modal-header">
              <h2>Create a Study Room</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><span className="material-icons-round">close</span></button>
            </div>
            <div className="modal-body">
              <input type="text" className="modal-input" placeholder="Room name" value={roomName} onChange={e => setRoomName(e.target.value)} />
              <input type="text" className="modal-input" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
              <textarea className="modal-textarea" placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)}></textarea>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Max Participants</div>
                  <input type="number" className="modal-input" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} style={{ width: "80px", marginBottom: "0" }} min="2" max="50" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px", cursor: 'pointer' }} onClick={() => setPomodoro(!pomodoro)}>
                  <div className={`toggle-switch ${pomodoro ? 'active' : ''}`}><div className="toggle-knob"></div></div>
                  <span style={{ fontSize: "15px", fontWeight: "600" }}>Pomodoro Timer</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setIsModalOpen(false)} style={{ background: "white", borderColor: "var(--border)" }}>Cancel</button>
              <button className="btn-primary" onClick={handleCreateRoom} disabled={!roomName.trim() || !subject.trim()}>Create Room</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
