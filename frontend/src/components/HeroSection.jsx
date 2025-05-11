import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-green-50 min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12">
      <h1 className="text-4xl md:text-6xl font-bold text-green-800 leading-tight mb-6">
        บริหารเงินอย่างชาญฉลาด
        <br />
        กับ Buckgeteer
      </h1>
      <p className="text-green-700 text-lg md:text-xl mb-8 max-w-2xl">
        จัดการรายรับรายจ่ายของคุณอย่างง่ายดาย พร้อมฟีเจอร์สุดล้ำ
        เพื่ออนาคตทางการเงินที่มั่นคง
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/register"
          className="bg-green-700 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-600 transition"
        >
          เริ่มต้นใช้งาน
        </Link>
        <Link
          to="/login"
          className="border-2 border-green-700 text-green-700 font-semibold py-3 px-6 rounded-full hover:bg-green-100 transition"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    </section>
  );
}
