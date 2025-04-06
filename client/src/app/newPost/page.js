"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const page = () => {
  const [title, setTile] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const postContent = { title, content };
    if (Object.values(postContent).includes("")) {
      Swal.fire({
        text: "Please fill in all required fields!",
        icon: "error",
      });

      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/new`,
        postContent,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const result = response.data;

      Swal.fire({
        text: result.message,
        icon: "success",
      }).then(() => {
        router.push("/post");
      });

      setTile("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Crear Nuevo Post
        </h2>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Título
          </label>
          <input
            value={title}
            onChange={(e) => setTile(e.target.value)}
            type="text"
            id="title"
            name="title"
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Contenido
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
            name="content"
            required
            rows="6"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Crear Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
