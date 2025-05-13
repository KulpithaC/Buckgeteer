import React from "react";

export default function AddTransactionModal({
  show,
  onClose,
  onSubmit,
  form,
  onChange,
  formError,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="ปิด"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Add Transaction
        </h2>
        {formError && (
          <div className="bg-red-50 text-red-500 p-2 rounded mb-2 text-center">
            {formError}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title *</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded p-2"
              value={form.title}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Amount *</label>
            <input
              type="number"
              name="amount"
              className="w-full border rounded p-2"
              value={form.amount}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Type *</label>
            <select
              name="type"
              className="w-full border rounded p-2"
              value={form.type}
              onChange={onChange}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              className="w-full border rounded p-2"
              value={form.category}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              className="w-full border rounded p-2"
              value={form.date}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 font-semibold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
