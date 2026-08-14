import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name}
          </h1>

          <p className="mt-1 text-sm text-indigo-100">
            Here's your financial overview
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white hover:text-indigo-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
