import React, { useState, useRef, useEffect } from 'react';
import { AI_QUICK_ACTIONS, getAIResponse, getAIResponseByAction } from '../aiAssistantData';

function formatMessage(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className={line.startsWith('•') || line.startsWith('|') ? 'ai-msg-line' : 'ai-msg-para'}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  });
}

export default function AIAssistant({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: getAIResponseByAction('default'),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, typing]);

  const addAssistantMessage = (text) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text }]);
      setTyping(false);
    }, 500);
  };

  const sendUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    addAssistantMessage(getAIResponse(trimmed));
  };

  const handleQuickAction = (actionId) => {
    const action = AI_QUICK_ACTIONS.find((a) => a.id === actionId);
    if (!action) return;
    setMessages((prev) => [...prev, { role: 'user', text: action.label }]);
    addAssistantMessage(getAIResponseByAction(actionId));
  };

  if (!open) return null;

  return (
    <>
      <div className="ai-assistant-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="ai-assistant-panel" role="dialog" aria-label="AI Assistant">
        <header className="ai-assistant-header">
          <div className="ai-assistant-title">
            <span className="ai-assistant-icon">
              <span className="material-icons-round">smart_toy</span>
            </span>
            <div>
              <h2>Study Assistant</h2>
              <p>Quick summaries · catch-up · deadlines</p>
            </div>
          </div>
          <button type="button" className="ai-assistant-close" onClick={onClose} aria-label="Minimize chat">
            <span className="material-icons-round">expand_more</span>
          </button>
        </header>

        <div className="ai-quick-actions">
          {AI_QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              className="ai-quick-chip"
              onClick={() => handleQuickAction(action.id)}
            >
              <span className="material-icons-round">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>

        <div className="ai-messages" ref={listRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`ai-message ${msg.role}`}>
              {msg.role === 'assistant' && (
                <span className="ai-message-avatar">
                  <span className="material-icons-round">smart_toy</span>
                </span>
              )}
              <div className="ai-message-bubble">{formatMessage(msg.text)}</div>
            </div>
          ))}
          {typing && (
            <div className="ai-message assistant">
              <span className="ai-message-avatar">
                <span className="material-icons-round">smart_toy</span>
              </span>
              <div className="ai-message-bubble ai-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <footer className="ai-assistant-footer">
          <input
            type="text"
            placeholder="Ask: last week, what did I miss, upcoming..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendUserMessage(input)}
          />
          <button
            type="button"
            className="btn-primary btn-sm ai-send-btn"
            onClick={() => sendUserMessage(input)}
            disabled={!input.trim()}
          >
            <span className="material-icons-round">send</span>
          </button>
        </footer>
      </aside>
    </>
  );
}
