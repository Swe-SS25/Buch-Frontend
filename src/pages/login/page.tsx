import LoginForm from '@/components/login/loginForm';
import styles from './login.module.css';

const Login = () => {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
