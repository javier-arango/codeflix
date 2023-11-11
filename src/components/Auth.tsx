import Image from 'next/image';
import styles from '../styles/Auth.module.scss';
import authImage from '../../public/assets/test-online.svg';

export default function Auth () {
    return (
      <section id={styles.auth}>
        <div id={styles.container} className="container">
          <div id={styles.messageCont}>
            <h1 id={styles.message}>Message</h1>
            <Image id={styles.image} src={authImage} alt="Learning picture" />
          </div>
          <div id={styles.authCont}></div>
        </div>
      </section>
    )
}