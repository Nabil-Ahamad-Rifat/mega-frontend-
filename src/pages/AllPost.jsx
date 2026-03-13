import React, { useEffect, useState } from 'react'
import service from '../appWrite/configAp'
import { PostCard } from '../component'
import Container from '../container/Container'

function AllPost() {
  const [post, setPost] = useState([])

  useEffect(() => {
    service.getPosts([]).then((post) => {
      if (post) {
        setPost(post.documents)
      }
    })
  }, [])

  return (
    <Container>
      {post.map((post) => (
        <PostCard key={post.$id} {...post} />
      ))}
    </Container>
  )
}

export default AllPost