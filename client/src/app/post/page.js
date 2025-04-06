"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import PostCard from "@/components/PostCard";

const page = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  console.log(posts);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          {
            withCredentials: true,
          },
        );

        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, []);

  const post = {
    title: "Título de la Publicación",
    content:
      "Este es el contenido de la publicación. Aquí puedes agregar más detalles sobre el tema.",
    date: "6 de abril de 2025",
    userName: "Usuario123",
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <h2>Nada que mostrar</h2>
      )}
    </div>
  );
};

export default page;
