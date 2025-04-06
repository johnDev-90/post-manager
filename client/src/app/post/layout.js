import React from "react";
import Link from "next/link";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Mi Blog</h1>
          <nav>
            <Link
              href="/newPost"
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              Create new post.
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default layout;
