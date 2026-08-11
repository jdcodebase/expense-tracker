import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-10 text-center">
      <span className="mb-4 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
        Personal Finance Management
      </span>
      <h2 className="max-w-3xl text-5xl font-extrabold leading-tight text-gray-900">
        Take Control of Your
        <span className="text-indigo-600"> Finances</span>
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        Track your income and expenses, manage your transactions, and understand
        your spending with clear reports and insightful charts.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/register"
          className="rounded-xl bg-indigo-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-indigo-700"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="rounded-xl border border-indigo-600 px-8 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default Hero;
