import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [amounts, setAmounts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("/transactions");
        setTransactions(res.data);
        const total = res.data.reduce((acc, transaction) => {
          return (
            acc + (transaction.type === "income" ? 1 : -1) * transaction.amount
          );
        }, 0);
        setAmounts(total);
        setLoading(false);
      } catch (err) {
        setError("โหลดข้อมูลไม่สำเร็จ");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.title || !form.amount || !form.type) {
      setFormError("กรุณากรอกข้อมูลที่จำเป็น");
      return;
    }
    try {
      await axios.post("/transactions", {
        ...form,
        amount: Number(form.amount),
        date: form.date || undefined,
      });
      setShowModal(false);
      setForm({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });
      window.location.reload();
    } catch (err) {
      setFormError("บันทึกข้อมูลไม่สำเร็จ");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md h-[600px] bg-white shadow-md rounded-2xl p-8 flex flex-col">
          <h1 className="text-5xl text-center text-green-700 font-bold mb-6">
            $ {amounts.toFixed(2)}
          </h1>

          {loading && <p>กำลังโหลด...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ul className="space-y-3 flex-1 overflow-y-auto">
            {transactions.length === 0 && !loading && (
              <div className="flex flex-1 items-center justify-center h-full">
                <p className="text-gray-400 text-center w-full">
                  ยังไม่มีรายการ
                </p>
              </div>
            )}
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className={`p-4 rounded-md shadow-md ${
                  transaction.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <h3 className="text-lg font-semibold">{transaction.title}</h3>
                <p className="text-sm">{transaction.description}</p>
                <p className="text-xl font-bold">
                  {transaction.type === "income" ? "+" : "-"} $
                  {transaction.amount.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <button
        className="fixed bottom-8 right-8 bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg hover:bg-green-800 transition z-50"
        onClick={() => setShowModal(true)}
        aria-label="เพิ่มรายการ"
      >
        +
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
              aria-label="ปิด"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
              เพิ่มรายการ
            </h2>
            {formError && (
              <div className="bg-red-50 text-red-500 p-2 rounded mb-2 text-center">
                {formError}
              </div>
            )}
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">ชื่อรายการ *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border rounded p-2"
                  value={form.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">จำนวนเงิน *</label>
                <input
                  type="number"
                  name="amount"
                  className="w-full border rounded p-2"
                  value={form.amount}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">ประเภท *</label>
                <select
                  name="type"
                  className="w-full border rounded p-2"
                  value={form.type}
                  onChange={handleFormChange}
                  required
                >
                  <option value="income">รายรับ</option>
                  <option value="expense">รายจ่าย</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">หมวดหมู่</label>
                <input
                  type="text"
                  name="category"
                  className="w-full border rounded p-2"
                  value={form.category}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">วันที่</label>
                <input
                  type="date"
                  name="date"
                  className="w-full border rounded p-2"
                  value={form.date}
                  onChange={handleFormChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 font-semibold"
              >
                บันทึก
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
