import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../services/apiError';
import { login as loginUser } from '../services/authService';
import type { AuthCredentials } from '../types/auth';

export const Login = () => {
  const navigate = useNavigate();
  const { setSession, isAuthenticated } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setServerError('');
      setSession(data);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      setServerError(getApiErrorMessage(error));
    },
  });

  return (
    <main className="page-shell flex-1 justify-center py-10 lg:py-14">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="glass-card order-2 lg:order-1">
          <div className="mb-8">
            <p className="badge">Login</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Sign in to your account</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">After login, the token is saved locally and used for protected requests.</p>
          </div>

          {serverError ? (
            <div className="mb-5 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {serverError}
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate>
            <div>
              <label className="label-text" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="jane@example.com"
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address.',
                  },
                })}
              />
              {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email.message}</p> : null}
            </div>

            <div>
              <label className="label-text" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Your password"
                {...register('password', {
                  required: 'Password is required.',
                  minLength: { value: 8, message: 'Password must be at least 8 characters.' },
                })}
              />
              {errors.password ? <p className="mt-2 text-sm text-rose-300">{errors.password.message}</p> : null}
            </div>

            <button className="btn-primary w-full" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Signing in...' : 'Login'}
            </button>

            <p className="text-center text-sm text-slate-400">
              Need an account?{' '}
              <button type="button" className="font-semibold text-cyan-300 hover:text-cyan-200" onClick={() => navigate('/register')}>
                Register
              </button>
            </p>
          </form>
        </div>

        <div className="glass-card order-1 overflow-hidden border-white/10 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-slate-950 lg:order-2">
          <p className="badge">Protected access</p>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Simple login with protected routing.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">The dashboard only opens after authentication, and the UI changes based on the user role.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Auth</p>
              <p className="mt-2 text-lg font-semibold text-white">JWT token</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Routing</p>
              <p className="mt-2 text-lg font-semibold text-white">Protected</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">UX</p>
              <p className="mt-2 text-lg font-semibold text-white">Responsive</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
