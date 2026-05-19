export const dummyPosts = [
  {
    id: 1,
    author: 'Dr. Rajesh Kumar',
    avatar: 'DR',
    role: 'mentor',
    time: '19 May',
    title: 'Career AMA: Getting into ML roles at FAANG — this Saturday 6 PM',
    tags: ['#career', '#ml-roles', '#ama', '#faang'],
    badges: [{text: 'Announcement', class: 'badge-announcement'}, {text: '📌 Pinned', class: 'badge-pinned'}],
    content: 'I will be hosting an open AMA session this Saturday for students interested in machine learning roles at top tech companies. Bring your questions about interview prep, portfolio building, and navigating the hiring process. Register using the link in the community resources section.',
    likes: 156,
    comments: 47,
    replies: [
      { author: 'Neha Kumar', avatar: 'NK', time: '2 hours ago', content: 'Super excited for this! Will you be covering system design for ML interviews?' },
      { author: 'Dr. Rajesh Kumar', avatar: 'DR', role: 'mentor', time: '1 hour ago', content: 'Yes, Neha! I will dedicate about 15 minutes specifically to ML system design patterns.' }
    ]
  },
  {
    id: 2,
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
