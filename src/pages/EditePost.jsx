import React, { useEffect, useState } from "react";
import Container from "../container/Container";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appWrite/configAp";
import { PostFrom } from "../component";

function EditePost() {
  const [Post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPosts(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    }
  }, [slug, navigate]);

  return Post ? (
    <div className="py-8">
      <Container>
        <PostFrom  post={Post} />
      </Container>
    </div>
  ) : null;
}

export default EditePost;
