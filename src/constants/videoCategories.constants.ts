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
  name: string
  imgUrl: string
}

export interface Category extends Record<CategoryKey, CategoryInfo> {}

export const VIDEO_CATEGORIES: Category = {
  algorithms: { name: 'Algorithms and Data Structures', imgUrl: '' },
  ai: { name: 'Artificial Intelligence', imgUrl: '' },
  db: { name: 'Database Management', imgUrl: '' },
  cybersecurity: { name: 'Cybersecurity', imgUrl: '' },
  datascience: { name: 'Data Science', imgUrl: '' },
  database: { name: 'Database Management', imgUrl: '' },
  frontend: { name: 'React JS', imgUrl: '' },
  fullstack: { name: 'Full Stack Development', imgUrl: '' },
  iot: { name: 'Internet of Things (IoT)', imgUrl: '' },
  ml: { name: 'Machine Learning', imgUrl: '' },
  mobile: { name: 'Mobile App Development', imgUrl: '' },
  os: { name: 'Operating Systems', imgUrl: '' },
  programming: { name: 'Java Programming Language', imgUrl: '' },
  uiux: { name: 'Design Systems UX/UI', imgUrl: '' },
}
