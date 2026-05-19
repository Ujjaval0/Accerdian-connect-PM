export const coursePosts = [
  {
    id: 101,
    author: 'Dr. Priya Sharma',
    avatar: 'PS',
    role: 'mentor',
    time: '2 hours ago',
    title: 'Module 4 Resources Updated: Advanced Ensemble Methods',
    tags: ['#announcement', '#module4', '#machine-learning'],
    badges: [{text: 'Announcement', class: 'badge-announcement'}],
    content: 'Just uploaded the new materials for Module 4: Advanced Ensemble Methods. Please review the Random Forest implementation case study before our live session on Thursday. I\'ve included both Python and R examples for the implementation.',
    likes: 24,
    comments: 2,
    replies: [
      { author: 'Vikram Patel', avatar: 'VP', role: 'student', time: '1 hour ago', content: 'Thanks Dr. Priya! Will the live session cover Gradient Boosting as well?' },
      { author: 'Dr. Priya Sharma', avatar: 'PS', role: 'mentor', time: '45 mins ago', content: 'Yes, Vikram. We will spend the second half on XGBoost and LightGBM.' }
    ]
  },
  {
    id: 102,
    author: 'Amit Desai',
    avatar: 'AD',
    role: 'student',
    time: '5 hours ago',
    title: 'Question regarding Pandas merge vs join',
    tags: ['#python', '#pandas', '#module2'],
    badges: [],
    content: 'I am working on the EDA assignment and getting confused between pd.merge() and df.join(). When should I use which? Does merge only work on columns and join on indexes?',
    likes: 8,
    comments: 1,
    replies: [
      { author: 'Neha Kumar', avatar: 'NK', role: 'student', time: '3 hours ago', content: 'Basically yes! merge() is more versatile and can join on any columns (like SQL joins), while join() defaults to joining on the index. I usually just stick to merge() for everything.' }
    ]
  }
];

export const courseModules = [
  { id: 1, title: 'Module 1: Python for Data Science', resources: 12, discussions: 34, icon: 'code' },
  { id: 2, title: 'Module 2: Statistics & EDA', resources: 15, discussions: 42, icon: 'bar_chart' },
  { id: 3, title: 'Module 3: Supervised Machine Learning', resources: 20, discussions: 56, icon: 'model_training' },
  { id: 4, title: 'Module 4: Advanced Ensemble Methods', resources: 8, discussions: 12, icon: 'account_tree' },
  { id: 5, title: 'Module 5: Deep Learning Foundations', resources: 5, discussions: 4, icon: 'psychology' }
];

export const courseResources = [
  { id: 1, type: 'pdf', icon: 'picture_as_pdf', name: 'Probability & Stats Cheat Sheet', desc: 'Comprehensive guide for probability distributions and hypothesis testing.', module: 'Module 2' },
  { id: 2, type: 'video', icon: 'play_circle', name: 'Live Session: Linear Regression', desc: 'Recording of Module 3 Live Session explaining OLS.', module: 'Module 3' },
  { id: 3, type: 'link', icon: 'link', name: 'Colab: Pandas Exercises', desc: 'Practice exercises for Data Manipulation with Pandas.', module: 'Module 1' },
  { id: 4, type: 'pdf', icon: 'picture_as_pdf', name: 'Capstone Project Guidelines', desc: 'Rubric and rules for Capstone Phase 1 submission.', module: 'General' },
  { id: 5, type: 'video', icon: 'play_circle', name: 'Random Forest Walkthrough', desc: 'Step-by-step implementation of Random Forest from scratch.', module: 'Module 4' }
];

export const courseAnnouncements = [
  { id: 1, title: 'Assignment 3 Deadline Extended', date: 'May 18, 2026', content: 'Due to several requests, the deadline for the Machine Learning Assignment 3 has been extended to May 22, 11:59 PM IST.', author: 'Admin Team' },
  { id: 2, title: 'Upcoming Hackathon: Data for Good', date: 'May 15, 2026', content: 'Accredian is hosting a weekend hackathon next month. Form teams of 3-4 and solve a real-world predictive modeling problem. Registration opens tomorrow!', author: 'Admin Team' },
  { id: 3, title: 'New Mentor Onboarding', date: 'May 10, 2026', content: 'Please welcome Rajesh Kumar, Senior Data Scientist at Amazon, who joins us as a mentor for the Deep Learning modules starting next week.', author: 'Admin Team' }
];
