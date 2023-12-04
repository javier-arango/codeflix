import type { CategoryInfo, CategoryKey } from 'types'
import algoImage from '../../public/assets/algorithms.jpg'
import cyberImage from '../../public/assets/cybersecurity.jpg'
import dbImage from '../../public/assets/database.png'
import dataScienceImage from '../../public/assets/datascience.webp'
import frontImage from '../../public/assets/frontend.jpg'
import fullImage from '../../public/assets/fullstack.jpg'
import iotImage from '../../public/assets/iot.webp'
import programmingImage from '../../public/assets/java.jpeg'
import mlImage from '../../public/assets/ml.webp'
import mobileImage from '../../public/assets/mobile.png'
import osImage from '../../public/assets/os.jpeg'
import uiuxImage from '../../public/assets/uiux.jpg'

export interface Category extends Record<CategoryKey, string> {}
export interface Category2 extends Record<CategoryKey, CategoryInfo> {}
export interface Category2 extends Record<CategoryKey, CategoryInfo> {}

export const VIDEO_CATEGORIES: Category = {
  algorithms: 'Algorithms and Data Structures',
  ai: 'Artificial Intelligence',
  db: 'Database Management',
  cybersecurity: 'Cybersecurity',
  datascience: 'Data Science',
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
    img: algoImage,
  },
  ai: { key: 'ai', name: 'Artificial Intelligence', img: algoImage },
  db: { key: 'db', name: 'Database Management', img: dbImage },
  cybersecurity: {
    key: 'cybersecurity',
    name: 'Cybersecurity',
    img: cyberImage,
  },
  datascience: {
    key: 'datascience',
    name: 'Data Science',
    img: dataScienceImage,
  },
  frontend: { key: 'frontend', name: 'React JS', img: frontImage },
  fullstack: {
    key: 'fullstack',
    name: 'Full Stack Development',
    img: fullImage,
  },
  iot: { key: 'iot', name: 'Internet of Things (IoT)', img: iotImage },
  ml: { key: 'ml', name: 'Machine Learning', img: mlImage },
  mobile: {
    key: 'mobile',
    name: 'Mobile App Development',
    img: mobileImage,
  },
  os: { key: 'os', name: 'Operating Systems', img: osImage },
  programming: {
    key: 'programming',
    name: 'Java Programming Language',
    img: programmingImage,
  },
  uiux: { key: 'uiux', name: 'Design Systems UX/UI', img: uiuxImage },
}
