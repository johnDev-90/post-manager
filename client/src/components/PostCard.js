import React from "react";
import { formatFechaToYYYYMMDD } from "@/helpers/helpers";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:bg-gray-100">
      <div className="cursor-pointer p-4 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {formatFechaToYYYYMMDD(post.created_at)}
          </p>
          <p className="text-gray-700 mt-4">{post.content}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/post/${post.id}`}
            className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            View Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
