import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { formatNumber } from "../utils/util";
import AddTransactionModal from "../components/AddTransactionModal";

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
          <h1
            className={`text-3xl text-center font-bold mb-8 ${
              amounts > 0 ? "text-green-700" : "text-red-900"
            }`}
          >
            $ {formatNumber(amounts.toFixed(2))}
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
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{transaction.title}</h3>
                  <p className="text-sm">{transaction.description}</p>
                  <p className="text-xl font-bold">
                    {transaction.type === "income" ? "+" : "-"}
                    {formatNumber(transaction.amount.toFixed(2))}
                  </p>
                </div>
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

      <AddTransactionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTransaction}
        form={form}
        onChange={handleFormChange}
        formError={formError}
      />
    </div>
  );
}
