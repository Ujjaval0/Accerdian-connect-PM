import React, { useState } from 'react';
import AIAssistant from './AIAssistant';

export default function AIFloatingAssistant() {
  const [launcherHidden, setLauncherHidden] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="ai-floating-root" aria-live="polite">
      {!launcherHidden && (
        <div className={`ai-fab-container ${panelOpen ? 'panel-open' : ''}`}>
          <button
            type="button"
            className="ai-fab-dismiss"
            onClick={() => setLauncherHidden(true)}
            aria-label="Hide assistant"
            title="Hide assistant"
          >
            <span className="material-icons-round">close</span>
          </button>
          <button
            type="button"
            className="ai-fab"
            onClick={() => setPanelOpen(true)}
            aria-label="Open Accredian AI assistant"
            title="Study assistant — summaries & catch-up"
          >
            <span className="ai-fab-glow" aria-hidden="true" />
            <span className="ai-fab-inner">
              <span className="ai-fab-icon">
                <span className="material-icons-round">smart_toy</span>
              </span>
              <span className="ai-fab-text">
                <span className="ai-fab-label">Assistant</span>
                <span className="ai-fab-hint">Tap for summaries</span>
              </span>
            </span>
          </button>
        </div>
      )}

      {launcherHidden && (
        <button
          type="button"
          className={`ai-fab-reveal ${panelOpen ? 'panel-open' : ''}`}
          onClick={() => setLauncherHidden(false)}
          aria-label="Show assistant"
          title="Show assistant"
        >
          <span className="ai-fab-reveal-icon">
            <span className="material-icons-round">smart_toy</span>
          </span>
        </button>
      )}

      <AIAssistant
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}
