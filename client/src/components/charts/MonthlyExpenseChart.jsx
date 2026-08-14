import { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getMonthlyExpenseTrend } from "../../services/reportServices";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyExpenseChart = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyExpenseTrend = async () => {
      try {
        const year = new Date().getFullYear();

        const response = await getMonthlyExpenseTrend(year);

        setMonthlyExpenses(response.data.data.monthlyExpenses);
      } catch (error) {
        console.error("Failed to fetch monthly expense trend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyExpenseTrend();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: monthlyExpenses.map((item) => monthNames[item._id.month - 1]),

    datasets: [
      {
        label: "Expenses",
        data: monthlyExpenses.map((item) => item.totalExpenses),
        backgroundColor: "rgba(59, 130, 246, 0.75)",
        borderColor: "rgb(37, 99, 235)",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(37, 99, 235, 0.9)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString("en-IN")}`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#64748b",
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "#e2e8f0",
        },

        ticks: {
          color: "#64748b",

          callback: (value) => `₹${Number(value).toLocaleString("en-IN")}`,
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyExpenseChart;
