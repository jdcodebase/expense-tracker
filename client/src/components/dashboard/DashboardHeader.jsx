import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Here's your financial overview
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
