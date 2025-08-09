"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Front Desk Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold transition-colors"
          onClick={() => router.push("/queue")}
        >
          Manage Queue
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded font-semibold transition-colors"
          onClick={() => router.push("/appointments")}
        >
          Manage Appointments
        </button>
      </div>
    </div>
  );
}
