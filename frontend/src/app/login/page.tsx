"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = await apiRequest("/auth/login", "POST", { username, password });
      // Assert the type of data to access access_token
      const accessToken = (data as { access_token: string }).access_token;
      localStorage.setItem("token", accessToken);
      router.push("/dashboard");
    } catch (err: unknown) {
      // Safely handle error with unknown type
      if (err instanceof Error) {
        alert("Login failed: " + err.message);
      } else {
        alert("Login failed: Unknown error");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md border border-gray-200"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png" // Put your clinic logo in public/logo.png
            alt="Clinic Logo"
            width={60}
            height={60}
            className="mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">Clinic Front Desk</h1>
          <p className="text-gray-500 text-sm mt-1">
            Please login to manage appointments
          </p>
        </div>

        {/* Username */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />

        {/* Password */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 p-2 w-full rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
