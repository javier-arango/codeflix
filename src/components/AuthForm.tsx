import { useState } from 'react';
import styles from '../styles/AuthForm.module.scss';

export default function AuthForm () {
    const isSignup = false;
    // const [setIsLogin, isLogin] = useState(true);
    return (
      <form id={styles.form}>
        <input className={styles.input} type="email" placeholder="Email" />
        <input className={styles.input} type="password" placeholder="Password" />
        {isSignup && (
          <>
            <input className={styles.input} type="email" placeholder="Email" />
            <input className={styles.input} type="email" placeholder="Email" />
          </>
        )}
        <input
          id={styles.submit}
          type="submit"
          value={isSignup ? 'Signup' : 'Login'}
        />
        {isSignup ? (
          <h2>Aleady have an account? Login</h2>
        ) : (
          <h2>Don't have an account? Signup</h2>
        )}
      </form>
    )
}