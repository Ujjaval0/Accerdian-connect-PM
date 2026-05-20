export const dummyPosts = [
  {
    id: 1,
    author: 'Dr. Rajesh Kumar',
    avatar: 'RK',
    role: 'mentor',
    time: '19 May',
    title: 'Career AMA: Getting into ML roles at FAANG — this Saturday 6 PM',
    tags: ['#career', '#ml-roles', '#ama', '#faang'],
    badges: [{text: 'Announcement', class: 'badge-announcement'}, {text: '📌 Pinned', class: 'badge-pinned'}, {text: 'AMA', class: 'badge-ama'}],
    content: 'I will be hosting an open AMA session this Saturday for students interested in machine learning roles at top tech companies. Bring your questions about interview prep, portfolio building, and navigating the hiring process. Register using the link in the community resources section.',
    likes: 156,
    comments: 47,
    isTrending: true,
    replies: [
      { author: 'Neha Kumar', avatar: 'NK', time: '2 hours ago', content: 'Super excited for this! Will you be covering system design for ML interviews?' },
      { author: 'Dr. Rajesh Kumar', avatar: 'RK', role: 'mentor', time: '1 hour ago', content: 'Yes, Neha! I will dedicate about 15 minutes specifically to ML system design patterns.' }
    ]
  },
  {
    id: 2,
    author: 'Dr. Priya Sharma',
    avatar: 'PS',
    role: 'mentor',
    time: '18 May',
    title: 'ML System Design Cheat Sheet & Reference Architecture (PDF)',
    tags: ['#ml-system-design', '#cheat-sheet', '#resources', '#architecture'],
    badges: [{text: 'Resource', class: 'badge-resource'}, {text: 'Mentor', class: 'badge-mentor'}],
    content: 'Hi everyone, I have compiled a comprehensive reference sheet containing system design architectures for common machine learning tasks (Recommendation Engines, Search Rankers, and Ads CTR prediction). It covers data ingestion, candidate generation, ranking pipelines, and model evaluation metrics. Let me know if this helps you in your case studies!',
    attachments: [
      { id: 'ml-sys-pdf', name: 'ML_System_Design_CheatSheet.pdf', size: '2.4 MB', type: 'file', url: '#' }
    ],
    likes: 184,
    comments: 29,
    isTrending: true,
    replies: [
      { author: 'Siddharth Roy', avatar: 'SR', time: '1 day ago', content: 'This is pure gold! The evaluation metrics summary on page 3 is exactly what I needed for the assignment.' },
      { author: 'Dr. Priya Sharma', avatar: 'PS', role: 'mentor', time: '18 hours ago', content: 'Glad to hear that, Siddharth! Let me know if you need any clarification on the NDCG vs MAP metric comparisons.' }
    ]
  },
  {
    id: 3,
    author: 'Vikram Patel',
    avatar: 'VP',
    role: 'student',
    time: '5 hours ago',
    title: 'Help understanding Backpropagation in Neural Networks',
    tags: ['#deep-learning', '#neural-networks', '#help'],
    badges: [],
    content: 'Hey everyone, I found this amazing visualization tool for understanding neural network architectures, but I am still struggling a bit with the chain rule application in backpropagation. Can someone explain it simply?',
    likes: 15,
    comments: 3,
    replies: []
  },
  {
    id: 4,
    author: 'Rajesh Kumar',
    avatar: 'RK',
    role: 'mentor',
    time: '17 May',
    title: 'AMA Session: Transitioning from Software Engineering to Data Engineering',
    tags: ['#data-engineering', '#career-transition', '#ama', '#mentor-ama'],
    badges: [{text: 'AMA', class: 'badge-ama'}, {text: 'Mentor', class: 'badge-mentor'}],
    content: 'Ask me anything about switching careers! Many software engineers struggle with transitioning to core data engineering (Spark, Kafka, distributed databases, scheduling tools like Airflow). Ask your questions below and I will answer them throughout the day.',
    likes: 84,
    comments: 32,
    isTrending: false,
    replies: [
      { author: 'Vikram Patel', avatar: 'VP', time: '2 days ago', content: 'Which language should I prioritize: Scala or Python? Most data pipelines seem to use Python now.' },
      { author: 'Rajesh Kumar', avatar: 'RK', role: 'mentor', time: '1 day ago', content: 'Python is great for writing PySpark and Airflow DAGs. However, Scala is highly valued for optimized Spark core jobs. I recommend starting with Python as the learning curve is easier, then picking up Scala basics.' }
    ]
  },
  {
    id: 5,
    author: 'Priya Nair',
    avatar: 'PN',
    role: 'student',
    time: '16 May',
    title: 'Handwritten Mathematics for Deep Learning Notes',
    tags: ['#math-for-ml', '#notes', '#deep-learning', '#handwritten'],
    badges: [{text: 'Resource', class: 'badge-resource'}],
    content: 'I uploaded my personal study notes covering the linear algebra, multivariate calculus, and probability concepts needed for deep learning (gradient descent derivation, matrix multiplication dimensions, covariance matrix). Let me know if you find them helpful!',
    attachments: [
      { id: 'math-notes-pdf', name: 'Linear_Algebra_Calculus_For_DL.pdf', size: '4.8 MB', type: 'file', url: '#' }
    ],
    likes: 215,
    comments: 63,
    isTrending: true,
    replies: []
  },
  {
    id: 6,
    author: 'Amit Desai',
    avatar: 'AD',
    role: 'student',
    time: '15 May',
    title: 'How I landed a Data Analyst Internship at Swiggy — My Experience',
    tags: ['#interview-prep', '#sql', '#success-story', '#data-analyst'],
    badges: [{text: 'Popular', class: 'badge-popular'}],
    content: 'Wanted to share my Swiggy interview experience and some tips on preparing SQL and product metrics. Focus heavily on SQL joins, window functions, case statement queries, and basic A/B testing concepts. I have attached the practice sheet of SQL questions that helped me the most during my preparation.',
    attachments: [
      { id: 'sql-prep-xlsx', name: 'Swiggy_SQL_Practice_Questions.xlsx', size: '320 KB', type: 'file', url: '#' }
    ],
    likes: 312,
    comments: 89,
    isTrending: true,
    replies: []
  },
  {
    id: 7,
    author: 'Nisha Sharma',
    avatar: 'NS',
    role: 'student',
    time: '14 May',
    title: 'Study Guide: Top Python Decorators you must know',
    tags: ['#python', '#decorators', '#cheatsheet', '#resources'],
    badges: [{text: 'Resource', class: 'badge-resource'}],
    content: 'A quick resource list of useful built-in decorators in Python (@property, @classmethod, @staticmethod) and custom implementations like timer decorators and memoization wrappers. Super useful for optimizing code!',
    likes: 42,
    comments: 11,
    replies: []
  },
  {
    id: 8,
    author: 'Rahul Mehta (Alumni)',
    avatar: 'RM',
    role: 'alumni',
    time: '12 May',
    title: 'Alumni AMA: How to excel in the Accredian Capstone Project',
    tags: ['#capstone', '#project', '#ama', '#alumni'],
    badges: [{text: 'AMA', class: 'badge-ama'}],
    content: 'Hey everyone, I am an alum of Cohort 38. We did our capstone project on Customer Churn Prediction using advanced tree-based models and deployed it on AWS. Ask me anything about selecting a project theme, working in a group, and pitching your model to stakeholders!',
    likes: 92,
    comments: 41,
    isTrending: true,
    replies: []
  }
];


export const studyRooms = [
  { title: 'PM Case Study Prep', subtitle: 'Product Strategy & Frameworks', desc: 'Practicing STAR format for product case studies.', joined: 3, total: 6, creator: 'Priya Nair', isJoined: false, avatars: ['PR', 'VI', 'ME'], hasPomodoro: true },
  { title: 'Module 5 Deep Dive', subtitle: 'Neural Networks & Backpropagation', desc: 'Working through Module 5 exercises together.', joined: 3, total: 8, creator: 'Arjun Sharma', isJoined: false, avatars: ['KI', 'MI', 'VI'], hasPomodoro: true },
  { title: 'EDA Project Workshop', subtitle: 'Exploratory Data Analysis', desc: 'Collaborative session for Module 4 EDA project.', joined: 3, total: 6, creator: 'Kiran Reddy', isJoined: true, avatars: ['KI', 'MI', 'AR'], hasPomodoro: false },
  { title: 'Python Fundamentals Review', subtitle: 'Python for Data Science', desc: 'Reviewing Python basics — list comprehensions, pandas, numpy.', joined: 5, total: 10, creator: 'Meera Joshi', isJoined: false, avatars: ['PR', 'KI', 'MI', 'DR', 'VI'], hasPomodoro: false }
];

export const alumniList = [
  { id: 1, name: 'Rahul Mehta', initials: 'RM', role: 'Senior Data Scientist', comp: 'Google', batch: 'PGPDSAI-2020', desc: 'PGPDSAI 2020 alum. Led ML infrastructure at a startup before joining Google. Passionate about helping Accredian students navigate FAANG interviews and ML engineering careers.', tags: ['Python', 'TensorFlow', 'Large-scale ML', 'Data Infrastructure'], isAvailable: true },
  { id: 2, name: 'Kritika Singh', initials: 'KS', role: 'Product Analyst', comp: 'Swiggy', batch: 'PGPDSAI-2021', desc: 'Specializes in product analytics and A/B testing.', tags: ['SQL', 'Tableau', 'Product Strategy'], isAvailable: false },
  { id: 3, name: 'Praveen Sharma', initials: 'PS', role: 'Machine Learning Eng', comp: 'Amazon', batch: 'PGPDSAI-2019', desc: 'Working on recommendation systems.', tags: ['AWS', 'PyTorch', 'RecSys'], isAvailable: true },
  { id: 4, name: 'Anita Desai', initials: 'AD', role: 'Data Engineer', comp: 'Walmart Labs', batch: 'PGPDSAI-2022', desc: 'Building scalable data pipelines.', tags: ['Spark', 'Airflow', 'GCP'], isAvailable: true }
];

export const usersLeaderboard = [
  { r: 4, n: 'Aarav Singh', i: 'AS', s: 8, p: 2150 },
  { r: 5, n: 'Priya Verma', i: 'PV', s: 15, p: 1980 },
  { r: 6, n: 'Siddharth Roy', i: 'SR', s: 5, p: 1840 },
  { r: 7, n: 'Ananya Gupta', i: 'AG', s: 12, p: 1720 },
  { r: 8, n: 'Karan Malhotra', i: 'KM', s: 3, p: 1650 }
];
