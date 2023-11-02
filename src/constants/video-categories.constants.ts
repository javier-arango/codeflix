export type CategoryKey =
  | 'algorithms'
  | 'ai'
  | 'backend'
  | 'blockchain'
  | 'cloud'
  | 'cybersecurity'
  | 'datascience'
  | 'database'
  | 'devops'
  | 'frontend'
  | 'fullstack'
  | 'gamedev'
  | 'graphics'
  | 'iot'
  | 'ml'
  | 'mobile'
  | 'network'
  | 'os'
  | 'programming'
  | 'software'
  | 'web'
  | 'uiux'

export interface Category extends Record<CategoryKey, string> {}

export const VIDEO_CATEGORIES: Category = {
  algorithms: 'Algorithms and Data Structures',
  ai: 'Artificial Intelligence',
  backend: 'Backend Development',
  blockchain: 'Blockchain',
  cloud: 'Cloud Computing',
  cybersecurity: 'Cybersecurity',
  datascience: 'Data Science',
  database: 'Database Management',
  devops: 'DevOps',
  frontend: 'Frontend Development',
  fullstack: 'Full Stack Development',
  gamedev: 'Game Development',
  graphics: 'Graphics and Visualization',
  iot: 'Internet of Things (IoT)',
  ml: 'Machine Learning',
  mobile: 'Mobile App Development',
  network: 'Network and Systems Administration',
  os: 'Operating Systems',
  programming: 'Programming Languages',
  software: 'Software Engineering',
  web: 'Web Development',
  uiux: 'UI/UX Design',
}
