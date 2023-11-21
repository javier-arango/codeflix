export type CategoryKey =
  | 'all'
  | 'algorithms'
  | 'ai'
  | 'db'
  | 'cybersecurity'
  | 'datascience'
  | 'database'
  | 'frontend'
  | 'fullstack'
  | 'iot'
  | 'ml'
  | 'mobile'
  | 'os'
  | 'programming'
  | 'uiux'

export interface Category extends Record<CategoryKey, string> {}

export const VIDEO_CATEGORIES: Category = {
  all: 'All',
  algorithms: 'Algorithms and Data Structures',
  ai: 'Artificial Intelligence',
  db: 'Database Management',
  cybersecurity: 'Cybersecurity',
  datascience: 'Data Science',
  database: 'Database Management',
  frontend: 'React JS',
  fullstack: 'Full Stack Development',
  iot: 'Internet of Things (IoT)',
  ml: 'Machine Learning',
  mobile: 'Mobile App Development',
  os: 'Operating Systems',
  programming: 'Java Programming Language',
  uiux: 'Design Systems UX/UI',
}
