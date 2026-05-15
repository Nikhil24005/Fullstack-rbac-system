import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
  ].join(' ');

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="page-shell flex min-h-0 flex-row items-center justify-between py-4">
        <NavLink to="/dashboard" className="group flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-royal via-aurora to-mint font-black text-white shadow-glow">
            A
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">Auth Demo</p>
            <p className="text-lg font-semibold text-white">Role Based Dashboard</p>
          </div>
        </NavLink>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 sm:inline-flex">
                {user.name} · {user.role}
              </span>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <button className="btn-secondary px-4 py-2 text-sm" onClick={handleLogout} type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
