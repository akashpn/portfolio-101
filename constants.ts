import { Section, SectionId, SectionTheme, Project } from './types';

export const THEMES: Record<string, SectionTheme> = {
  blue: { blobClass: 'bg-blue-500', glowColor: 'rgba(59, 130, 246, 0.2)' },
  pink: { blobClass: 'bg-pink-500', glowColor: 'rgba(236, 72, 153, 0.2)' },
  teal: { blobClass: 'bg-teal-500', glowColor: 'rgba(20, 184, 166, 0.2)' },
  amber: { blobClass: 'bg-amber-400', glowColor: 'rgba(251, 191, 36, 0.2)' },
  red: { blobClass: 'bg-red-500', glowColor: 'rgba(239, 68, 68, 0.25)' },
};

export const SECTIONS: Section[] = [
  { id: SectionId.About, name: 'About', theme: THEMES.blue },
  { id: SectionId.Projects, name: 'Projects', theme: THEMES.pink },
  { id: SectionId.Skills, name: 'Skills', theme: THEMES.amber },
  { id: SectionId.Contact, name: 'Contact', theme: THEMES.red },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    name: 'STT Enhanced',
    description: 'A real-time, low-latency Speech-to-Text (STT) transcription and audio intelligence API using FastAPI.',
    url: 'https://github.com/akashpn/stt-enhanced',
    icon: 'music',
    tags: ['Python', 'FastAPI', 'Machine Learning', 'WebSockets']
  },
  {
    id: 2,
    name: 'Gestura',
    description: 'A library to control the computer cursor through hand gestures, using OpenCV and Mediapipe for tracking.',
    url: 'https://github.com/akashpn/gestura',
    icon: 'eye',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Mediapipe']
  },
  {
    id: 3,
    name: 'Quotient',
    description: 'A modern, full-stack web application that clones the popular Q&A platform, Quora, using the MERN stack.',
    url: 'https://github.com/akashpn/quotient',
    icon: 'code',
    tags: ['React', 'Node.js', 'MongoDB', 'Full-Stack']
  },
];

// FIX: Add EXPERIENCE_DATA to be consumed by the Experience component.
export const EXPERIENCE_DATA = [
  {
    date: '2021 - Present',
    role: 'Senior Frontend Engineer',
    company: 'Tech Innovations Inc.',
    description: 'Leading the development of a next-generation web platform using React, TypeScript, and GraphQL. Focused on performance, accessibility, and creating a seamless user experience.'
  },
  {
    date: '2019 - 2021',
    role: 'Web Developer',
    company: 'Digital Solutions Co.',
    description: 'Built and maintained client websites and web applications. Collaborated with designers and backend developers to deliver high-quality products.'
  },
  {
    date: '2018 - 2019',
    role: 'Junior Developer',
    company: 'Startup Hub',
    description: 'Gained hands-on experience with full-stack development, working with a variety of technologies in a fast-paced agile environment.'
  }
];


export const SKILLS_CATEGORIES = [
  'Programming Languages',
  'Frameworks & Technologies',
  'Machine Learning & Data',
  'Systems, Cloud & Tools',
];

export const SKILLS_DATA_GRAPH = [
  // Programming Languages
  { id: 'python', name: 'Python', category: 'Programming Languages', relations: ['flask', 'fastapi', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib', 'librosa', 'jupyter'] },
  { id: 'java', name: 'Java', category: 'Programming Languages', relations: [] },
  { id: 'javascript', name: 'JavaScript', category: 'Programming Languages', relations: ['react', 'nodejs', 'websockets', 'html-css'] },
  { id: 'html-css', name: 'HTML/CSS', category: 'Programming Languages', relations: ['react', 'javascript'] },

  // Frameworks & Technologies
  { id: 'flask', name: 'Flask', category: 'Frameworks & Technologies', relations: ['python', 'api-integration'] },
  { id: 'fastapi', name: 'FastAPI', category: 'Frameworks & Technologies', relations: ['python', 'api-integration'] },
  { id: 'nodejs', name: 'Node.js', category: 'Frameworks & Technologies', relations: ['javascript', 'websockets', 'api-integration'] },
  { id: 'react', name: 'React', category: 'Frameworks & Technologies', relations: ['javascript', 'html-css'] },
  { id: 'docker', name: 'Docker', category: 'Frameworks & Technologies', relations: ['aws', 'gcp', 'load-balancing'] },
  { id: 'tensorflow-lite', name: 'TensorFlow Lite', category: 'Frameworks & Technologies', relations: ['tensorflow', 'model-quantization'] },
  { id: 'websockets', name: 'WebSockets', category: 'Frameworks & Technologies', relations: ['javascript', 'nodejs'] },

  // Machine Learning & Data
  { id: 'tensorflow', name: 'TensorFlow', category: 'Machine Learning & Data', relations: ['python', 'pytorch', 'tensorflow-lite', 'huggingface', 'model-quantization'] },
  { id: 'pytorch', name: 'PyTorch', category: 'Machine Learning & Data', relations: ['python', 'tensorflow', 'huggingface'] },
  { id: 'scikit-learn', name: 'Scikit-Learn', category: 'Machine Learning & Data', relations: ['python', 'pandas', 'numpy', 'feature-engineering'] },
  { id: 'huggingface', name: 'HuggingFace', category: 'Machine Learning & Data', relations: ['python', 'tensorflow', 'pytorch'] },
  { id: 'pandas', name: 'Pandas', category: 'Machine Learning & Data', relations: ['python', 'numpy', 'scikit-learn', 'jupyter'] },
  { id: 'numpy', name: 'NumPy', category: 'Machine Learning & Data', relations: ['python', 'pandas', 'scikit-learn', 'matplotlib'] },
  { id: 'matplotlib', name: 'Matplotlib', category: 'Machine Learning & Data', relations: ['python', 'numpy', 'jupyter'] },
  { id: 'librosa', name: 'Librosa', category: 'Machine Learning & Data', relations: ['python'] },
  { id: 'model-quantization', name: 'Model Quantization', category: 'Machine Learning & Data', relations: ['tensorflow', 'tensorflow-lite'] },
  { id: 'feature-engineering', name: 'Feature Engineering', category: 'Machine Learning & Data', relations: ['scikit-learn', 'pandas'] },
  
  // Systems, Cloud & Tools
  { id: 'aws', name: 'AWS', category: 'Systems, Cloud & Tools', relations: ['docker', 'gcp', 'load-balancing'] },
  { id: 'gcp', name: 'Google Cloud', category: 'Systems, Cloud & Tools', relations: ['docker', 'aws', 'load-balancing'] },
  { id: 'api-integration', name: 'API Integration', category: 'Systems, Cloud & Tools', relations: ['flask', 'fastapi', 'nodejs'] },
  { id: 'load-balancing', name: 'Load Balancing', category: 'Systems, Cloud & Tools', relations: ['aws', 'gcp', 'docker'] },
  { id: 'git', name: 'Git', category: 'Systems, Cloud & Tools', relations: ['vscode'] },
  { id: 'vscode', name: 'VS Code', category: 'Systems, Cloud & Tools', relations: ['git'] },
  { id: 'jupyter', name: 'Jupyter', category: 'Systems, Cloud & Tools', relations: ['python', 'pandas', 'matplotlib'] },
  { id: 'mysql', name: 'MySQL', category: 'Systems, Cloud & Tools', relations: [] },
  { id: 'bash', name: 'Bash', category: 'Systems, Cloud & Tools', relations: [] },
];