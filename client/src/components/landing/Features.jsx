import { FaChartPie, FaShieldAlt, FaWallet } from "react-icons/fa";
import { MdReceiptLong, MdSecurity } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";

const features = [
  {
    title: "Expense Tracking",
    description:
      "Record and manage your daily expenses with categories, payment methods, and notes.",
    icon: <MdReceiptLong className="text-4xl text-indigo-600" />,
  },
  {
    title: "Income Management",
    description:
      "Track your income from salary, freelance work, business, gifts, bonuses, and more.",
    icon: <FaWallet className="text-4xl text-indigo-600" />,
  },
  {
    title: "Smart Reports",
    description:
      "View monthly income, expenses, savings, and spending insights in one place.",
    icon: <RiBarChartFill className="text-4xl text-indigo-600" />,
  },
  {
    title: "Expense Analytics",
    description:
      "Understand where your money goes with category-wise and monthly spending charts.",
    icon: <FaChartPie className="text-4xl text-indigo-600" />,
  },
  {
    title: "Secure Authentication",
    description:
      "Keep your financial data protected with JWT authentication and secure cookies.",
    icon: <MdSecurity className="text-4xl text-indigo-600" />,
  },
  {
    title: "Protected Data",
    description:
      "Only authenticated users can access and manage their personal financial records.",
    icon: <FaShieldAlt className="text-4xl text-indigo-600" />,
  },
];

const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <h3 className="mb-12 text-center text-3xl font-bold text-gray-900">
        Features
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-4 text-5xl">{feature.icon}</div>

            <h4 className="mb-2 text-xl font-semibold text-gray-800">
              {feature.title}
            </h4>

            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
