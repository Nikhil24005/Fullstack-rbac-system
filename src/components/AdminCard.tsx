interface AdminCardProps {
  title?: string;
  description?: string;
}

export const AdminCard = ({
  title = 'Admin Content',
  description = 'View the parts of the app that are meant for admins only.',
}: AdminCardProps) => {
  return (
    <article className="glass-card h-full border-l-4 border-l-violet-400">
      <p className="badge mb-4">Admin</p>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-slate-200 ring-1 ring-white/10">
        This section stays hidden unless the logged-in user has the ADMIN role.
      </div>
    </article>
  );
};
