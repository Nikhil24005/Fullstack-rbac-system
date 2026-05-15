import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../services/apiError';
import { register as registerUser } from '../services/authService';
import type { RegisterPayload } from '../types/auth';

export const Register = () => {
  const navigate = useNavigate();
  const { setSession, isAuthenticated } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'USER',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const mutation = useMutation({
    mutationFn: registerUser,
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
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="glass-card flex flex-col justify-between overflow-hidden border-white/10 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-slate-950">
          <div>
            <p className="badge">Create account</p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Create an account and start using the app.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">Register once, get a JWT, and move into the protected dashboard.</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Routes</p>
              <p className="mt-2 text-lg font-semibold text-white">Register</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Security</p>
              <p className="mt-2 text-lg font-semibold text-white">JWT + localStorage</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">UX</p>
              <p className="mt-2 text-lg font-semibold text-white">Responsive UI</p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="mb-8">
            <p className="badge">Sign up</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Create your account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Use a strong password and pick the role that fits your account.</p>
          </div>

          {serverError ? (
            <div className="mb-5 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {serverError}
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate>
            <div>
              <label className="label-text" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="input-field"
                placeholder="Jane Doe"
                {...register('name', {
                  required: 'Name is required.',
                  minLength: { value: 2, message: 'Name must be at least 2 characters.' },
                })}
              />
              {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name.message}</p> : null}
            </div>

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
                placeholder="Minimum 8 characters"
                {...register('password', {
                  required: 'Password is required.',
                  minLength: { value: 8, message: 'Password must be at least 8 characters.' },
                  validate: (value) => {
                    if (!/[A-Z]/.test(value)) return 'Password must include at least one uppercase letter.';
                    if (!/[a-z]/.test(value)) return 'Password must include at least one lowercase letter.';
                    if (!/[0-9]/.test(value)) return 'Password must include at least one number.';
                    return true;
                  },
                })}
              />
              {errors.password ? <p className="mt-2 text-sm text-rose-300">{errors.password.message}</p> : null}
            </div>

            <div>
              <label className="label-text" htmlFor="role">
                Role
              </label>
              <select id="role" className="input-field" {...register('role', { required: true })}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <button className="btn-primary w-full" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating account...' : 'Register'}
            </button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{' '}
              <button type="button" className="font-semibold text-cyan-300 hover:text-cyan-200" onClick={() => navigate('/login')}>
                Login
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};
