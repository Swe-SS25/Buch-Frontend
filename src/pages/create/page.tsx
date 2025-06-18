import CreateBookForm from '@/components/create/CreateBookForm';

export function Create() {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm">
        <CreateBookForm />
      </div>
    </main>
  );
}
