export type CategoryKey =
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

export type CategoryInfo = {
  key: CategoryKey
  name: string
  imgUrl: string
}

export interface Category extends Record<CategoryKey, string> {}
export interface Category2 extends Record<CategoryKey, CategoryInfo> {}

export const VIDEO_CATEGORIES: Category = {
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
  uiux: 'Design Systems UX/UI',
}

export const VIDEO_CATEGORIES2: Category2 = {
  algorithms: {
    key: 'algorithms',
    name: 'Algorithms and Data Structures',
    imgUrl: '',
  },
  ai: { key: 'ai', name: 'Artificial Intelligence', imgUrl: '' },
  db: { key: 'db', name: 'Database Management', imgUrl: '' },
  cybersecurity: { key: 'cybersecurity', name: 'Cybersecurity', imgUrl: '' },
  datascience: { key: 'datascience', name: 'Data Science', imgUrl: '' },
  database: { key: 'database', name: 'Database Management', imgUrl: '' },
  frontend: { key: 'frontend', name: 'React JS', imgUrl: '' },
  fullstack: { key: 'fullstack', name: 'Full Stack Development', imgUrl: '' },
  iot: { key: 'iot', name: 'Internet of Things (IoT)', imgUrl: '' },
  ml: { key: 'ml', name: 'Machine Learning', imgUrl: '' },
  mobile: { key: 'mobile', name: 'Mobile App Development', imgUrl: '' },
  os: { key: 'os', name: 'Operating Systems', imgUrl: '' },
  programming: {
    key: 'programming',
    name: 'Java Programming Language',
    imgUrl: '',
  },
  uiux: { key: 'uiux', name: 'Design Systems UX/UI', imgUrl: '' },
}
