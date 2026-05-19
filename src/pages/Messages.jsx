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

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [chatData, setChatData] = useState(conversations);
  const messagesEndRef = useRef(null);

  const filteredConversations = chatData.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConversation = chatData.find(c => c.id === activeChat);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages?.length]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeChat) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    const timeStr = `${displayHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    setChatData(prev => prev.map(conv => {
      if (conv.id === activeChat) {
        return {
          ...conv,
          messages: [...conv.messages, {
            id: conv.messages.length + 1,
            sender: 'me',
            text: messageInput.trim(),
            time: timeStr,
            isMe: true
          }],
          lastMessage: messageInput.trim().length > 38
            ? messageInput.trim().substring(0, 38) + '...'
            : messageInput.trim(),
          time: timeStr
        };
      }
      return conv;
    }));

    setMessageInput('');
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
          <div className="msg-sidebar-header">
            <div className="msg-search">
              <span className="material-icons-round">search</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
              <div className="msg-chat-messages">
                {activeConversation.messages.map(msg => (
                  <div key={msg.id} className={`msg-bubble-row ${msg.isMe ? 'me' : 'them'}`}>
                    {!msg.isMe && (
                      <div className="msg-bubble-avatar" style={{ background: msg.avatarColor }}>
                        {msg.avatar}
                      </div>
                    )}
                    <div className={`msg-bubble ${msg.isMe ? 'me' : 'them'}`}>
                      <p>{msg.text}</p>
                      <span className="msg-bubble-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="msg-chat-input-area">
                <button className="msg-input-btn" title="Attach file">
                  <span className="material-icons-round">attach_file</span>
                </button>
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
                  disabled={!messageInput.trim()}
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
