import LoginForm from '@/components/login/loginForm';

const Login = () => {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm">
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
