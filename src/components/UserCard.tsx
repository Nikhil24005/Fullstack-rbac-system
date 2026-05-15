interface UserCardProps {
  title?: string;
  description?: string;
}

export const UserCard = ({
  title = 'User Content',
  description = 'See the general user area after signing in.',
}: UserCardProps) => {
  return (
    <article className="glass-card h-full border-l-4 border-l-cyan-400">
      <p className="badge mb-4">User</p>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-slate-200 ring-1 ring-white/10">
        This card is available for normal users and admins.
      </div>
    </article>
  );
};
