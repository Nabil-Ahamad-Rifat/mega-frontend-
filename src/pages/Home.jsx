import React, { useEffect, useState } from "react";
import service from "../appWrite/configAp";
import Container from "./../container/Container";
import { PostCard } from "../component";

function Home() {
  const [Post, setPost] = useState([]);
  useEffect(() => {
    service.getPosts().then((post) => {
      if (post) {
        setPost(post.documents);
      }
    });
  }, []);

  if (!Post || Post.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center ">
        <h2>No posts available</h2>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {Post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
