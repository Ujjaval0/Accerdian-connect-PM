import React, { useState, useRef, useEffect } from 'react';

const conversations = [
  {
    id: 1,
    name: 'Priya Nair',
    avatar: 'PR',
    avatarColor: '#2563EB',
    role: 'Peer · PGPDSAI',
    lastMessage: 'Thanks Priya! That 3Blue1Brown video r...',
    time: '08:01 pm',
    online: true,
    messages: [
      { id: 1, sender: 'Priya Nair', avatar: 'PR', avatarColor: '#2563EB', text: 'Hey Arjun! Have you started the Module 5 assignment yet?', time: '07:45 pm', isMe: false },
      { id: 2, sender: 'me', text: 'Yeah, just started yesterday. The backpropagation part is tricky.', time: '07:48 pm', isMe: true },
      { id: 3, sender: 'Priya Nair', avatar: 'PR', avatarColor: '#2563EB', text: 'I found this amazing 3Blue1Brown video on neural networks that really helped me visualize it. Want me to share?', time: '07:52 pm', isMe: false },
      { id: 4, sender: 'me', text: 'Yes please! That would be super helpful.', time: '07:55 pm', isMe: true },
      { id: 5, sender: 'Priya Nair', avatar: 'PR', avatarColor: '#2563EB', text: 'Here you go: https://youtu.be/3Blue1Brown_neural_networks — Chapter 3 specifically covers the chain rule and gradient descent really well.', time: '07:58 pm', isMe: false },
      { id: 6, sender: 'me', text: 'Thanks Priya! That 3Blue1Brown video really clarified things. The visualization of gradients flowing through the network was exactly what I needed.', time: '08:01 pm', isMe: true }
    ]
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    avatar: 'DR',
    avatarColor: '#2563EB',
    role: 'Mentor · & AI',
    lastMessage: 'Arjun — your question in the gradient d...',
    time: '08:01 pm',
    online: false,
    messages: [
      { id: 1, sender: 'Dr. Rajesh Kumar', avatar: 'DR', avatarColor: '#2563EB', text: 'Arjun — your question in the gradient descent thread was excellent. It showed deep thinking. Make sure to submit your Module 5 assignment on time, you are on track for referral eligibility.', time: '08:01 pm', isMe: false }
    ]
  },
  {
    id: 3,
    name: 'Meera Joshi',
    avatar: 'ME',
    avatarColor: '#2563EB',
    role: 'Peer · PGPDSAI',
    lastMessage: 'Hi Arjun, saw your EDA project draft in t...',
    time: '08:01 pm',
    online: true,
    messages: [
      { id: 1, sender: 'Meera Joshi', avatar: 'ME', avatarColor: '#2563EB', text: 'Hi Arjun, saw your EDA project draft in the study room. The visualizations look great! Have you considered adding a correlation heatmap?', time: '07:30 pm', isMe: false },
      { id: 2, sender: 'me', text: 'Thanks Meera! That\'s a great suggestion. I\'ll add one using seaborn.', time: '07:45 pm', isMe: true },
      { id: 3, sender: 'Meera Joshi', avatar: 'ME', avatarColor: '#2563EB', text: 'Also, you might want to look into plotly for interactive charts. It really makes the EDA stand out in presentations.', time: '08:01 pm', isMe: false }
    ]
  },
  {
    id: 4,
    name: 'Vikram Patel',
    avatar: 'VP',
    avatarColor: '#8B5CF6',
    role: 'Peer · PGPDSAI',
    lastMessage: 'Can you share your notes from today\'s...',
    time: '06:30 pm',
    online: false,
    messages: [
      { id: 1, sender: 'Vikram Patel', avatar: 'VP', avatarColor: '#8B5CF6', text: 'Hey Arjun, can you share your notes from today\'s live session? I had to miss it due to a conflict.', time: '06:15 pm', isMe: false },
      { id: 2, sender: 'me', text: 'Sure, I\'ll send them over. We covered ensemble methods — random forests and gradient boosting.', time: '06:20 pm', isMe: true },
      { id: 3, sender: 'Vikram Patel', avatar: 'VP', avatarColor: '#8B5CF6', text: 'Can you share your notes from today\'s session? I want to review before the quiz.', time: '06:30 pm', isMe: false }
    ]
  },
  {
    id: 5,
    name: 'Kiran Reddy',
    avatar: 'KI',
    avatarColor: '#10B981',
    role: 'Peer · PGPDSAI',
    lastMessage: 'Study room at 9 PM tonight? We need to...',
    time: '05:45 pm',
    online: true,
    messages: [
      { id: 1, sender: 'Kiran Reddy', avatar: 'KI', avatarColor: '#10B981', text: 'Study room at 9 PM tonight? We need to finish the EDA project collab.', time: '05:30 pm', isMe: false },
      { id: 2, sender: 'me', text: 'I\'m in! Let me wrap up the current visualization and I\'ll join.', time: '05:35 pm', isMe: true },
      { id: 3, sender: 'Kiran Reddy', avatar: 'KI', avatarColor: '#10B981', text: 'Perfect. I\'ll set up the Pomodoro timer — 25 min focus blocks.', time: '05:45 pm', isMe: false }
    ]
  }
];

const initialFriendRequests = [
  { id: 101, name: 'Sanjana Sen', avatar: 'SS', avatarColor: '#EC4899', course: 'Data Science · PGPDSAI', time: '10 mins ago' },
  { id: 102, name: 'Rohan Deshmukh', avatar: 'RD', avatarColor: '#F59E0B', course: 'Product Management · PGPM', time: '2 hours ago' },
  { id: 103, name: 'Aditi Verma', avatar: 'AV', avatarColor: '#10B981', course: 'Machine Learning · Cohort 42', time: '1 day ago' }
];

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [chatData, setChatData] = useState(conversations);
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState([]);
  
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleAcceptRequest = (req) => {
    const newConv = {
      id: req.id,
      name: req.name,
      avatar: req.avatar,
      avatarColor: req.avatarColor,
      role: `Peer · ${req.course.split(' · ')[1] || req.course}`,
      lastMessage: 'You are now connected! Say hi 👋',
      time: 'Just now',
      online: true,
      messages: [
        { id: 1, sender: req.name, avatar: req.avatar, avatarColor: req.avatarColor, text: `Hey there! I saw you are active in the Study Rooms. Let's connect here!`, time: 'Just now', isMe: false }
      ]
    };
    setChatData(prev => [newConv, ...prev]);
    setFriendRequests(prev => prev.filter(r => r.id !== req.id));
    setActiveChat(req.id);
    setShowFriendRequests(false);
  };

  const handleRejectRequest = (id) => {
    setFriendRequests(prev => prev.filter(r => r.id !== id));
  };

  const filteredConversations = chatData.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConversation = chatData.find(c => c.id === activeChat);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages?.length]);

  const handleFileSelect = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeStr = sizeMB > 0.1 ? `${sizeMB} MB` : `${(file.size / 1024).toFixed(0)} KB`;
    const fileUrl = URL.createObjectURL(file);

    const newAttachment = {
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: file.name,
      type: type,
      size: sizeStr,
      url: fileUrl
    };

    setSelectedAttachments(prev => [...prev, newAttachment]);
    e.target.value = '';
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() && selectedAttachments.length === 0) return;
    if (!activeChat) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    const timeStr = `${displayHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const attachmentPayload = [...selectedAttachments];

    setChatData(prev => prev.map(conv => {
      if (conv.id === activeChat) {
        let previewText = messageInput.trim();
        if (!previewText && attachmentPayload.length > 0) {
          previewText = attachmentPayload[0].type === 'image' ? 'Sent a photo 📷' : 'Sent an attachment 📎';
        }

        return {
          ...conv,
          messages: [...conv.messages, {
            id: conv.messages.length + 1,
            sender: 'me',
            text: messageInput.trim(),
            time: timeStr,
            isMe: true,
            attachments: attachmentPayload
          }],
          lastMessage: previewText.length > 38
            ? previewText.substring(0, 38) + '...'
            : previewText,
          time: timeStr
        };
      }
      return conv;
    }));

    setMessageInput('');
    setSelectedAttachments([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="page active" id="page-messages">
      <div className="msg-layout">
        {/* Left Sidebar — Conversation List */}
        <div className="msg-sidebar">
          <div className="msg-sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
            <div className="msg-search" style={{ flex: 1 }}>
              <span className="material-icons-round">search</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              type="button"
              className="msg-notif-bell-btn"
              onClick={() => setShowFriendRequests(!showFriendRequests)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '50%',
                transition: 'all 0.2s',
              }}
              title="Friend Requests"
            >
              <span className="material-icons-round" style={{ fontSize: '24px' }}>notifications</span>
              {friendRequests.length > 0 && (
                <span className="msg-bell-badge" style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  background: 'var(--danger)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white'
                }}>
                  {friendRequests.length}
                </span>
              )}
            </button>

            {showFriendRequests && (
              <div className="friend-requests-dropdown" style={{
                position: 'absolute',
                top: '56px',
                right: '0',
                width: '320px',
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 200,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>Friend Requests</h4>
                  <span style={{ fontSize: '12px', background: '#EEF2FF', color: '#4338CA', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                    {friendRequests.length} Pending
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                  {friendRequests.length > 0 ? friendRequests.map(req => (
                    <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '8px', background: '#F8FAFC' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: req.avatarColor || 'var(--primary-light)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        flexShrink: 0
                      }}>
                        {req.avatar}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.course}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        <button 
                          type="button"
                          onClick={() => handleAcceptRequest(req)}
                          style={{ border: 'none', background: 'var(--success)', color: 'white', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'opacity 0.2s' }}
                          title="Accept"
                          onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                          onMouseOut={e => e.currentTarget.style.opacity = '1'}
                        >
                          <span className="material-icons-round" style={{ fontSize: '16px' }}>check</span>
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleRejectRequest(req.id)}
                          style={{ border: 'none', background: '#EF4444', color: 'white', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'opacity 0.2s' }}
                          title="Decline"
                          onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                          onMouseOut={e => e.currentTarget.style.opacity = '1'}
                        >
                          <span className="material-icons-round" style={{ fontSize: '16px' }}>close</span>
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div style={{ textAlign: 'center', padding: '24px 8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      <span className="material-icons-round" style={{ fontSize: '32px', color: 'var(--border)', marginBottom: '8px', display: 'block' }}>group_add</span>
                      No new friend requests
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="msg-conversation-list">
            {filteredConversations.map(conv => (
              <div
                key={conv.id}
                className={`msg-conversation-item ${activeChat === conv.id ? 'active' : ''}`}
                onClick={() => setActiveChat(conv.id)}
              >
                <div className="msg-conv-avatar" style={{ background: conv.avatarColor }}>
                  {conv.avatar}
                  {conv.online && <span className="msg-online-dot"></span>}
                </div>
                <div className="msg-conv-info">
                  <div className="msg-conv-top">
                    <span className="msg-conv-name">{conv.name}</span>
                    <span className="msg-conv-time">{conv.time}</span>
                  </div>
                  <p className="msg-conv-preview">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Chat Window */}
        <div className="msg-chat-panel">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="msg-chat-header">
                <div className="msg-chat-header-left">
                  <div className="msg-chat-avatar" style={{ background: activeConversation.avatarColor }}>
                    {activeConversation.avatar}
                  </div>
                  <div className="msg-chat-header-info">
                    <h3>{activeConversation.name}</h3>
                    <span className="msg-chat-role">{activeConversation.role}</span>
                  </div>
                </div>
                <div className="msg-chat-header-actions">
                  <button className="msg-header-btn" title="Search in conversation">
                    <span className="material-icons-round">search</span>
                  </button>
                  <button className="msg-header-btn" title="More options">
                    <span className="material-icons-round">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="msg-chat-messages" style={{ overflowY: 'auto' }}>
                {activeConversation.messages.map(msg => (
                  <div key={msg.id} className={`msg-bubble-row ${msg.isMe ? 'me' : 'them'}`}>
                    {!msg.isMe && (
                      <div className="msg-bubble-avatar" style={{ background: msg.avatarColor }}>
                        {msg.avatar}
                      </div>
                    )}
                    <div className={`msg-bubble ${msg.isMe ? 'me' : 'them'}`}>
                      {msg.text && <p style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.text}</p>}
                      
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="msg-bubble-attachments" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          marginTop: msg.text ? '8px' : '0',
                          minWidth: '180px',
                          maxWidth: '100%'
                        }}>
                          {msg.attachments.map((att, idx) => {
                            if (att.type === 'image') {
                              return (
                                <div key={idx} className="msg-attachment-image-wrapper" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', background: '#F1F5F9' }}>
                                  <img 
                                    src={att.url} 
                                    alt={att.name} 
                                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
                                    onClick={() => window.open(att.url, '_blank')}
                                  />
                                </div>
                              );
                            }
                            return (
                              <a 
                                key={idx}
                                href={att.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="msg-attachment-file"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  padding: '8px 12px',
                                  background: msg.isMe ? 'rgba(255,255,255,0.15)' : '#F1F5F9',
                                  borderRadius: '8px',
                                  textDecoration: 'none',
                                  color: msg.isMe ? 'white' : 'var(--text-main)',
                                  border: msg.isMe ? 'none' : '1px solid var(--border)'
                                }}
                              >
                                <span className="material-icons-round" style={{ fontSize: '20px', color: msg.isMe ? 'white' : 'var(--text-muted)' }}>
                                  description
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                                  <span style={{ fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {att.name}
                                  </span>
                                  <span style={{ fontSize: '10px', opacity: 0.8 }}>
                                    {att.size}
                                  </span>
                                </div>
                                <span className="material-icons-round" style={{ fontSize: '18px', opacity: 0.8 }}>
                                  download
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      )}

                      <span className="msg-bubble-time" style={{ display: 'block', marginTop: '4px', textAlign: 'right', fontSize: '9px', opacity: 0.7 }}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Attachments Preview */}
              {selectedAttachments.length > 0 && (
                <div className="msg-attachments-preview" style={{
                  display: 'flex',
                  gap: '8px',
                  padding: '12px 16px',
                  background: '#F8FAFC',
                  borderTop: '1px solid var(--border)',
                  flexWrap: 'wrap'
                }}>
                  {selectedAttachments.map((att, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'white',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      position: 'relative'
                    }}>
                      <span className="material-icons-round" style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
                        {att.type === 'image' ? 'image' : 'description'}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-main)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {att.name}
                        </span>
                        <span style={{ fontSize: '9px', color: 'var(--text-light)' }}>{att.size}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSelectedAttachments(prev => prev.filter((_, i) => i !== idx))}
                        style={{ border: 'none', background: 'none', color: 'var(--text-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                        title="Remove"
                      >
                        <span className="material-icons-round" style={{ fontSize: '14px' }}>close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <div className="msg-chat-input-area">
                <button className="msg-input-btn" title="Attach file" onClick={() => fileInputRef.current?.click()}>
                  <span className="material-icons-round">attach_file</span>
                </button>
                <button className="msg-input-btn" title="Add photo" onClick={() => imageInputRef.current?.click()}>
                  <span className="material-icons-round">image</span>
                </button>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={(e) => handleFileSelect(e, 'file')} 
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={imageInputRef} 
                  style={{ display: 'none' }} 
                  onChange={(e) => handleFileSelect(e, 'image')} 
                />

                <input
                  type="text"
                  className="msg-chat-input"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button className="msg-input-btn" title="Emoji">
                  <span className="material-icons-round">sentiment_satisfied_alt</span>
                </button>
                <button
                  className="msg-send-btn"
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim() && selectedAttachments.length === 0}
                >
                  <span className="material-icons-round">send</span>
                </button>
              </div>
            </>
          ) : (
            <div className="msg-empty-state">
              <div className="msg-empty-icon">
                <span className="material-icons-round">forum</span>
              </div>
              <h3>Your Messages</h3>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
