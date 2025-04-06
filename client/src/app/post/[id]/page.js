"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

const page = () => {
  const [post, setPost] = useState({});

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getPost();
  }, []);

  async function getPost(params) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const result = await response.json();

    setPost(result);
  }

  return (
    <div>
      <PostCard key={post.id} post={post} />
    </div>
  );
};

export default page;
