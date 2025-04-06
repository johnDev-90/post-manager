"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = { userName, password };
    if (Object.values(user).includes("")) {
      Swal.fire({
        text: "Please fill in all required fields!",
        icon: "error",
      });
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user, {
        withCredentials: true,
      })
      .then((response) => {
        Swal.fire({
          text: response.data.message,
          icon: "success",
        }).then(() => {
          router.push("/post");
        });
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            text: error.response.data.message || "An error occurred",
            icon: "error",
          });
        } else if (error.request) {
          Swal.fire({
            text: "No response received from server",
            icon: "error",
          });
        } else {
          Swal.fire({
            text: "Error setting up request: " + error.message,
            icon: "error",
          });
        }
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
