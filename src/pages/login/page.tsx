import LoginForm from "@/components/login/loginForm";

export default function Login() {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm">
        <LoginForm />
      </div>
    </main>
  );
}
