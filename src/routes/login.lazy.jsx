import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
  component: LoginPage,
})


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, login, isPending, error } = useContext(AuthContext);
  const navigate = useNavigate();



  if (user) {
    navigate({ to: '/app' });
  }



  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);

  };

  const isEmailValid = email.includes('@') && email.length > 5;
  const isPasswordValid = password.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid && !isPending;

  return (
    <div className="flex items-center justify-center bg-[#0d1117] text-white">
      <form onSubmit={handleLogin} className="p-8 bg-gray-900 rounded-lg shadow-xl border border-gray-800">
        <h2 className="text-2xl mb-6 font-bold">Sign in on MergeMind!</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-6 bg-gray-800 rounded border border-gray-700"

          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full p-2 rounded transition ${canSubmit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
        >
          {isPending ? 'Loading...' : 'Enter'}
        </button>
        <div className="mt-4">
          Dont have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate({ to: '/register' })}
          >
            Register
          </span>
        </div>

        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </form>
    </div>
  );
}
