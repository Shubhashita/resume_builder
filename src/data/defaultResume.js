export const MARGIN_OPTIONS = [0, 1, 2, 3, 5, 7, 10]

export function clampMargin(value, fallback = 10) {
  const n = Number(value)
  return MARGIN_OPTIONS.includes(n) ? n : fallback
}

export const DEFAULT_RESUME = {
  meta: {
    template: 'two-column',
    themeId: 'minimal-black',
    accent: '',
    fontHeading: '',
    fontBody: '',
    fileName: 'shubhashita-singh-resume',
    marginV: 10,
    marginH: 10,
  },
  personal: {
    fullName: 'Shubhashita Singh',
    jobTitle: 'Software Engineer',
    email: 'shubhashita.aes@gmail.com',
    phone: '4919119881886',
    location: 'Bangalore, Karnataka',
    website: 'ishubhashita.web.app',
    linkedin: 'linkedin.com/in/shubhashita-singh',
    github: '',
    summary:
      'Software Engineer with experience building scalable backend systems and full-stack web applications. Skilled in Node.js, React, and cloud technologies, with a track record of improving performance, security, and user experience.',
  },
  experience: [
    {
      id: crypto.randomUUID(),
      role: 'Software Engineer',
      company: 'NexoraX Technologies Pvt. Ltd',
      location: 'Nagpur, Maharashtra',
      start: '01/2026',
      end: 'Present',
      bullets: [
        'Boosted API throughput by 35% through Node.js optimization and efficient MongoDB data modeling, supporting monthly transactions',
        'Secured multi-tenant access for 10K+ users using RBAC, JWT authentication, and bcrypt encryption',
        'Integrated Razorpay payment workflows with automated WhatsApp notifications, simplifying billing for 10K+ active users',
      ],
    },
    {
      id: crypto.randomUUID(),
      role: 'Software Development Engineer Intern',
      company: 'Techdome Solution Pvt. Ltd',
      location: 'Indore, Madhya Pradesh',
      start: '07/2025',
      end: '12/2025',
      bullets: [
        'Developed 8 production-ready web applications using React.js, Next.js, and Tailwind CSS, improving mobile responsiveness by 25%',
        'Converted Figma screens into reusable React components, reducing duplicate UI development and accelerating feature delivery',
        'Designed Prisma schemas and executed database migrations supporting application modules with reliable API integration',
      ],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      degree: 'Bachelor of Technology in Information Technology',
      school: 'Oriental Institute of Science and Technology',
      location: 'Bhopal, Madhya Pradesh',
      start: '10/2021',
      end: '05/2025',
      details: 'CGPA: 8.94 / 10.00',
    },
  ],
  skills: [
    { id: crypto.randomUUID(), category: 'Programming Languages', items: 'JavaScript, Python, Java, C++' },
    { id: crypto.randomUUID(), category: 'Frontend', items: 'React.js, Next.js, Tailwind CSS, HTML5, CSS3, MaterialUI, Bootstrap' },
    { id: crypto.randomUUID(), category: 'Backend', items: 'Node.js, Express.js, RESTful APIs, Socket.IO' },
    { id: crypto.randomUUID(), category: 'Databases', items: 'MongoDB, PostgreSQL, MySQL, Redis' },
    { id: crypto.randomUUID(), category: 'Tools', items: 'Git, GitHub, Postman, Jira, VS Code' },
    { id: crypto.randomUUID(), category: 'Cloud & DevOps', items: 'Docker, AWS, CI/CD' },
    { id: crypto.randomUUID(), category: 'AI & LLM Tools', items: 'Google Gemini API, OpenAI API, RAG, AI Integration' },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: 'Finance & Tax Platform',
      year: '2025',
      tech: 'Node.js, Express.js, MongoDB, Redis, WhatsApp Business API',
      bullets: [
        'Delivered RESTful APIs supporting financial transactions with reliable performance',
        'Optimized MongoDB indexing and schema design, reducing database query latency by 25%',
        'Automated customer communication through a WhatsApp Business bot handling 5,000+ monthly conversations',
        'Implemented RBAC, JWT authentication, and secure encryption to protect multi-tenant environments',
        'Managed Redis queues and scheduled jobs to execute background tasks daily',
        'Integrated AI-powered tax assistance to provide contextual financial guidance',
      ],
    },
    {
      id: crypto.randomUUID(),
      name: 'AI Personal Knowledge Assistant',
      year: '2026',
      tech: 'Node.js, React.js, Next.js, Express.js, MongoDB, Google Gemini API',
      bullets: [
        'Architected an AI-powered knowledge platform for managing notes, documents, and tasks through a unified interface',
        'Engineered a Retrieval-Augmented Generation (RAG) pipeline using Google Gemini API to generate context-aware answers from uploaded PDF and DOCX files',
        'Reduced AI response time and API usage through Redis caching and distributed IP-based rate limiting',
        'Integrated Cloudinary storage with optimistic UI updates to deliver a fast and seamless user experience',
      ],
    },
  ],
  certifications: [
    { id: crypto.randomUUID(), name: 'Introduction to Generative AI', issuer: 'Google Cloud', date: '' },
    { id: crypto.randomUUID(), name: 'Frontend Developer (React)', issuer: 'HackerRank', date: '' },
    { id: crypto.randomUUID(), name: 'Artificial Intelligence', issuer: 'IBM Coursera', date: '' },
  ],
  languages: [],
}

export function createEmptyResume(template = 'two-column') {
  return {
    ...structuredClone(DEFAULT_RESUME),
    meta: { ...DEFAULT_RESUME.meta, template },
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  }
}
