import { useMemo, useState } from "react";

const useTransactionFilters = (transactions) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionCategory =
        transaction.type === "Income"
          ? transaction.source
          : transaction.category;

      const matchesSearch =
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        transactionCategory.toLowerCase().includes(search.toLowerCase());

      const matchesType = type ? transaction.type === type : true;

      const matchesCategory = category
        ? transactionCategory === category
        : true;

      const matchesDate = date
        ? new Date(transaction.date).toISOString().split("T")[0] === date
        : true;

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, search, type, category, date]);

  const clearFilters = () => {
    setSearch("");
    setType("");
    setCategory("");
    setDate("");
  };

  return {
    search,
    setSearch,
    type,
    setType,
    category,
    setCategory,
    date,
    setDate,
    filteredTransactions,
    clearFilters,
  };
};

export default useTransactionFilters;
