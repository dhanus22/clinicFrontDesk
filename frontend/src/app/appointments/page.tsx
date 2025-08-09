"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

// Define the Doctor and Appointment types
interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

interface Appointment {
  id: number;
  time: string;
  status: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [time, setTime] = useState("");
  const router = useRouter();

  // Load list of doctors and set default selected doctor
  async function loadDoctors() {
    try {
      const data = await apiRequest<Doctor[]>("/doctors", "GET"); // ✅ typed
      setDoctors(data);
      if (data.length > 0) {
        setDoctorId(String(data[0].id));
      }
    } catch (error) {
      console.error("Failed to load doctors:", error);
    }
  }

  // Load appointments for the selected doctor
  async function loadAppointments() {
    if (!doctorId) return;
    try {
      const data = await apiRequest<Appointment[]>(`/appointments/doctor/${doctorId}`, "GET"); // ✅ typed
      setAppointments(data);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    }
  }

  // Book a new appointment
  async function bookAppointment() {
    if (!doctorId || !patientId || !time) {
      alert("Please fill doctor, patient and time.");
      return;
    }
    try {
      await apiRequest("/appointments/book", "POST", {
        doctorId: Number(doctorId),
        patientId: Number(patientId),
        time,
      });
      alert("Appointment booked successfully!");
      loadAppointments();
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment");
    }
  }

  // On component mount, check auth and load doctors
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadDoctors();
  }, [router]);

  

  // When doctorId changes, load appointments for that doctor
  useEffect(() => {
    if (doctorId) {
      loadAppointments();
    }
  }, [doctorId, loadAppointments]);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Appointments</h1>

      <div className="mb-4 flex gap-2 flex-wrap">
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="border p-2"
        >
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.specialization}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="border p-2"
        />

        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={bookAppointment}
        >
          Book
        </button>
      </div>

      <button
        onClick={loadAppointments}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Load Appointments
      </button>

      <ul>
        {appointments.length === 0 && <li>No appointments found.</li>}
        {appointments.map((a) => (
          <li key={a.id}>
            {new Date(a.time).toLocaleString()} — {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
