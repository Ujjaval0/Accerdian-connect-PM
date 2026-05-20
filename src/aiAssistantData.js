/** Mock context for the Accredian AI assistant (rule-based, no external API). */

export const PROFILE_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect fill='%234F6AF6' width='80' height='80' rx='40'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Inter' font-size='32' font-weight='700'%3ERA%3C/text%3E%3C/svg%3E";

export const AI_QUICK_ACTIONS = [
  { id: 'last_week', label: 'Last week recap', icon: 'history' },
  { id: 'missed', label: 'What did I miss?', icon: 'priority_high' },
  { id: 'upcoming', label: 'Upcoming events', icon: 'event' },
  { id: 'missed_classes', label: 'Classes I missed', icon: 'videocam_off' },
  { id: 'summarize', label: 'Summarize for me', icon: 'short_text' },
];

const RESPONSES = {
  last_week: `**Last week (May 12–18) — short recap**

• **Live classes:** Module 1 NumPy & Pandas deep dive (May 12) — recording is in Module 1 resources.
• **Community:** 8 new threads in Python for Data Science; Dr. Meena answered missing-values questions.
• **Assignments:** You submitted Assignment 1 on time; peer reviews are open until May 21.
• **Engagement:** You posted 2 replies and joined 1 study room session (Pandas Study Group).

**Bottom line:** Strong week on Module 1; no overdue items from last week.`,

  missed: `**What you may have missed**

• **Assignment:** Module 5 Assignment due **tomorrow 11:59 PM** — not submitted yet.
• **Discussion:** Dr. Rajesh replied to your backpropagation question (2h ago).
• **Event:** Alumni AMA on Product Analytics — you RSVP'd but session was yesterday; **recording posted** in Resource Library.
• **Office hours:** Dr. Meena's Friday session — slides uploaded under Module 1.

**Action:** Prioritize Module 5 Assignment, then check mentor reply in Messages.`,

  upcoming: `**Important events coming up**

| Date | Event |
|------|--------|
| **May 20** | Live Class — Neural Networks · 7:00 PM IST |
| **May 22** | Mentor Session — Dr. Priya Sharma · 5:30 PM IST |
| **May 22** | ML Assignment 3 deadline (extended) · 11:59 PM |
| **May 25** | Alumni AMA — Careers in Data Science · 6:00 PM IST |

**This week:** 1 live class, 1 mentor session, 1 assignment deadline. Set reminders for May 20 & 22.`,

  missed_classes: `**Classes you missed (with catch-up)**

1. **May 15 — Linear Regression Live (Module 3)**  
   Recording: Resource Library → "Live Session: Linear Regression" (58 min).  
   Key topics: OLS, residuals, sklearn fit/predict.

2. **May 17 — EDA Case Study Walkthrough (Module 2)**  
   Recording available; mentor posted summary in Module 2 discussions.

3. **May 18 — Optional Q&A (no attendance required)**  
   No recording — slides only in Module 1 resources.

**Tip:** Watch May 15 session before Thursday's Neural Networks class.`,

  summarize: `I can turn long updates into short bullets. Try pasting text, or ask about:

• **Last week** — activity recap  
• **Missed** — deadlines & replies you skipped  
• **Upcoming** — next classes & events  
• **Missed classes** — recordings & what to review  

Example: *"Summarize my notifications"* → I'll list only unread items that need action.`,

  summarize_notifications: `**Notifications — summarized (4 unread)**

1. **Urgent:** Module 5 Assignment due tomorrow — not submitted.
2. **Mentor:** Dr. Rajesh replied to your post — read before next class.
3. **Event:** AMA in 2 hours — join Open Forum if attending.
4. **Referrals:** 2 new alumni available for outreach.

**Skip for now:** Streak milestone (informational only).`,

  default: `I'm your **Accredian study assistant**. I help with:

• What happened **last week**
• What you **missed** (deadlines, replies, recordings)
• **Upcoming** classes & events
• **Missed classes** and where to find recordings
• **Short summaries** of long updates

Use the quick buttons below or type things like "last week", "what did I miss", or "upcoming events".`,
};

export function getAIResponse(input) {
  const text = (input || '').toLowerCase().trim();
  if (!text) return RESPONSES.default;

  if (/last\s*week|recap|week\s*summary/.test(text)) return RESPONSES.last_week;
  if (/miss(ed)?|didn.?t|overdue|behind|catch\s*up/.test(text) && !/class|lecture|live/.test(text))
    return RESPONSES.missed;
  if (/upcoming|coming|next\s*event|schedule|calendar/.test(text)) return RESPONSES.upcoming;
  if (/missed\s*class|class\s*miss|recording|lecture\s*miss|live\s*class/.test(text))
    return RESPONSES.missed_classes;
  if (/notif|notification/.test(text)) return RESPONSES.summarize_notifications;
  if (/summar|short|tldr|brief|condense/.test(text)) return RESPONSES.summarize;

  if (/hello|hi|hey|help/.test(text)) return RESPONSES.default;

  return `I focus on **course updates and summaries**. Try:\n\n• "What happened last week?"\n• "What did I miss?"\n• "Upcoming events"\n• "Classes I missed"\n\nOr tap a quick action below.`;
}

export function getAIResponseByAction(actionId) {
  return RESPONSES[actionId] || RESPONSES.default;
}
