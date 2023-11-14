import Image from 'next/image'
import styles from '../styles/Auth.module.scss'
import authImage from '../../public/assets/test-online.svg'
import AuthForm from './AuthForm'

export default function Auth() {
  return (
    <section id={styles.auth}>
      <div id={styles.container} className="container">
        <div id={styles.messageCont}>
          <h2 id={styles.message}>
            Take the first step that will help you achieve your goals in your
            learning experience
          </h2>
          <Image id={styles.image} src={authImage} alt="Learning picture" />
        </div>
        <div id={styles.authCont}>
          <AuthForm />
        </div>
      </div>
    </section>
  )
}
