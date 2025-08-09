"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface QueueItem {
  id: number;
  queueNumber: number;
  patientName: string;
  status: string;
}

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [patientName, setPatientName] = useState<string>("");

  async function loadQueue() {
    try {
      const data = await apiRequest<QueueItem[]>("/queue", "GET");
      setQueue(data);
    } catch (error) {
      console.error("Failed to load queue:", error);
    }
  }

  async function addPatient() {
    if (!patientName.trim()) return;
    try {
      await apiRequest("/queue", "POST", { patientName });
      setPatientName("");
      loadQueue();
    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  }

  async function updateStatus(id: number, status: string) {
    try {
      await apiRequest(`/queue/${id}/status`, "PATCH", { status });
      loadQueue();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  useEffect(() => {
    loadQueue();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Queue Management
      </h1>

      {/* Add Patient Form */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={addPatient}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
        >
          ➕ Add to Queue
        </button>
      </div>

      {/* Queue Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">Queue #</th>
              <th className="px-4 py-3">Patient Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 font-semibold text-gray-800">
                  {item.queueNumber}
                </td>
                <td className="px-4 py-2 text-gray-800">{item.patientName}</td>
                <td className="px-4 py-2 text-gray-700">{item.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => updateStatus(item.id, "with doctor")}
                  >
                    With Doctor
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => updateStatus(item.id, "completed")}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
            {queue.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No patients in queue
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
