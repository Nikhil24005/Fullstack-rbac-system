import { AdminCard } from '../components/AdminCard';
import { Loader } from '../components/Loader';
import { UserCard } from '../components/UserCard';
import { useAuth } from '../hooks/useAuth';
import { useDashboardSummary } from '../hooks/useDashboardSummary';
import { getApiErrorMessage } from '../services/apiError';

export const Dashboard = () => {
  const { user } = useAuth();
  const summaryQuery = useDashboardSummary();

  const showUserCard = user?.role === 'USER' || user?.role === 'ADMIN';
  const showAdminCard = user?.role === 'ADMIN';

  return (
    <main className="page-shell flex-1 py-8 sm:py-10 lg:py-14">
      <section className="glass-card overflow-hidden border-white/10 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-slate-950">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="badge">Dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{user ? `Welcome, ${user.name}` : 'Welcome'}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Signed in as <span className="font-semibold text-white">{user?.email}</span> with the <span className="font-semibold text-white">{user?.role}</span> role.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">
            <p className="text-slate-400">Session status</p>
            <p className="mt-1 text-lg font-semibold text-white">Authenticated</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Role</p>
            <p className="mt-2 text-lg font-semibold text-white">{user?.role}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Token storage</p>
            <p className="mt-2 text-lg font-semibold text-white">localStorage</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">API layer</p>
            <p className="mt-2 text-lg font-semibold text-white">Axios interceptor</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Server summary</p>
              <p className="mt-1 text-lg font-semibold text-white">Dashboard data from the server</p>
            </div>
            {summaryQuery.isLoading ? <Loader label="Fetching dashboard summary..." /> : null}
          </div>

          {summaryQuery.isError ? (
            <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {getApiErrorMessage(summaryQuery.error)}
            </div>
          ) : null}

          {summaryQuery.data ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-400">{summaryQuery.data.title}</p>
                <p className="mt-2 text-base text-white">{summaryQuery.data.subtitle}</p>
              </div>
              {summaryQuery.data.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        {showUserCard ? <UserCard /> : null}
        {showAdminCard ? <AdminCard /> : null}
      </section>
    </main>
  );
};
