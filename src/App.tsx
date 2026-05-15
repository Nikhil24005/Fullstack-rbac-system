import { Navbar } from './components/Navbar';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-royal/25 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-aurora/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-mint/15 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <AppRoutes />
      </div>
    </div>
  );
}
