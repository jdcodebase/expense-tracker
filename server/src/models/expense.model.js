import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Others",
      ],
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["Cash", "Card", "UPI", "Bank Transfer", "Other"],
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
