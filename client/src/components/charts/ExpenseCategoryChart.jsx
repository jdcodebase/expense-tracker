import { useEffect, useState } from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getExpenseByCategory } from "../../services/reportServices";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCategoryChart = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const currentDate = new Date();

        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const response = await getExpenseByCategory(month, year);

        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Failed to fetch expense categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-400">
          No expenses found for this month.
        </p>
      </div>
    );
  }

  const data = {
    labels: categories.map((category) => category._id),

    datasets: [
      {
        label: "Expenses",
        data: categories.map((category) => category.totalAmount),

        backgroundColor: [
          "#6366f1",
          "#8b5cf6",
          "#a855f7",
          "#d946ef",
          "#ec4899",
          "#3b82f6",
          "#06b6d4",
          "#14b8a6",
        ],

        borderColor: "#ffffff",
        borderWidth: 2,

        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          color: "#475569",
          font: {
            size: 12,
          },
        },
      },

      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;

            return ` ${context.label}: ₹${Number(value).toLocaleString(
              "en-IN",
            )}`;
          },
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpenseCategoryChart;
