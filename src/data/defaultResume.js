import { DEFAULT_PAGE_SIZE } from './pageSizes'

export const MARGIN_OPTIONS = [0, 1, 2, 3, 5, 7, 10]

export function clampMargin(value, fallback = 10) {
  const n = Number(value)
  return MARGIN_OPTIONS.includes(n) ? n : fallback
}

export const DEFAULT_RESUME = {
  meta: {
    template: 'two-column',
    pageSize: DEFAULT_PAGE_SIZE,
    themeId: 'minimal-black',
    accent: '',
    fontHeading: '',
    fontBody: '',
    fileName: 'alex-chen-resume',
    marginV: 10,
    marginH: 10,
  },
  personal: {
    fullName: 'Alex Chen',
    jobTitle: 'Senior Data Scientist',
    email: 'alex.chen@example.com',
    phone: '(206) 555-0198',
    location: 'Seattle, WA',
    website: 'alexc-data.dev',
    linkedin: 'linkedin.com/in/alex-chen-data',
    github: 'github.com/alexc-ds',
    summary:
      'Results-driven Data Scientist with over 5 years of experience in developing machine learning models and predictive analytics to solve complex business problems. Proven track record in increasing revenue and operational efficiency through data-driven insights and A/B testing.',
  },
  experience: [
    {
      id: crypto.randomUUID(),
      role: 'Senior Data Scientist',
      company: 'Quantum Retail Solutions',
      location: 'Seattle, WA',
      start: '03/2021',
      end: 'Present',
      bullets: [
        'Developed a customer churn prediction model using XGBoost, improving retention strategies and reducing churn rate by 15%',
        'Led a team of 3 analysts to design and implement a dynamic pricing algorithm, generating a 7% increase in quarterly revenue',
        'Built an automated reporting dashboard in Tableau connected to Snowflake data warehouse, saving 20 hours of manual reporting per week',
      ],
    },
    {
      id: crypto.randomUUID(),
      role: 'Data Analyst',
      company: 'Stellar Logistics',
      location: 'Chicago, IL',
      start: '06/2018',
      end: '02/2021',
      bullets: [
        'Analyzed supply chain data using Python (Pandas/NumPy) to identify bottlenecks, reducing average delivery time by 12%',
        'Designed and executed A/B tests for website layout optimizations, resulting in a 22% increase in conversion rates',
        'Collaborated with engineering teams to deploy machine learning models via Docker containers into production environments',
      ],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      degree: 'Master of Science in Data Science',
      school: 'University of Washington',
      location: 'Seattle, WA',
      start: '09/2016',
      end: '05/2018',
      rightLabel: 'GPA',
      rightValue: '3.85 / 4.00',
      details: '',
    },
    {
      id: crypto.randomUUID(),
      degree: 'Bachelor of Science in Statistics',
      school: 'University of Illinois',
      location: 'Urbana-Champaign, IL',
      start: '08/2012',
      end: '05/2016',
      rightLabel: 'Honors',
      rightValue: 'Cum Laude',
      details: '',
    }
  ],
  skills: [
    { id: crypto.randomUUID(), category: 'Languages & Frameworks', items: 'Python, R, SQL, Scala, TensorFlow, PyTorch, Scikit-Learn' },
    { id: crypto.randomUUID(), category: 'Data & BI Tools', items: 'Tableau, Power BI, Apache Spark, Snowflake, BigQuery' },
    { id: crypto.randomUUID(), category: 'Cloud & MLOps', items: 'AWS (SageMaker, EC2, S3), Docker, MLflow, Git, CI/CD' },
    { id: crypto.randomUUID(), category: 'Statistical Methods', items: 'Regression Analysis, Hypothesis Testing, Time Series Forecasting, NLP' },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: 'E-commerce Recommendation Engine',
      year: '2023',
      tech: 'Python, PyTorch, AWS, Redis',
      bullets: [
        'Built a collaborative filtering recommendation system for an online marketplace with 2M+ active users',
        'Deployed model endpoints using FastAPI, achieving sub-50ms latency for real-time suggestions',
        'Improved user engagement metrics (click-through rate) by 18% during a 3-month A/B testing phase',
      ],
    },
    {
      id: crypto.randomUUID(),
      name: 'Social Media Sentiment Analyzer',
      year: '2020',
      tech: 'Python, NLTK, Flask, PostgreSQL',
      bullets: [
        'Scraped and processed over 500,000 tweets to gauge public sentiment on tech product launches',
        'Utilized natural language processing techniques (TF-IDF, VADER) to classify sentiments with 88% accuracy',
        'Created a web interface to visualize sentiment trends over time for marketing stakeholders',
      ],
    },
  ],
  certifications: [
    { id: crypto.randomUUID(), name: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services', date: '2022' },
    { id: crypto.randomUUID(), name: 'Deep Learning Specialization', issuer: 'Coursera (deeplearning.ai)', date: '2020' },
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
