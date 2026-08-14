import DashboardAnalytics from "../../components/dashboard/DashboardAnalytics";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import SummaryCards from "../../components/dashboard/SummaryCards";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <SummaryCards />
        </section>

        <QuickActions />

        <section className="mt-6">
          <DashboardAnalytics />
        </section>

        <section className="mt-6">
          <RecentTransactions />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
