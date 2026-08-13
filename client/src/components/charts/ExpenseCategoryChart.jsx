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
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
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
