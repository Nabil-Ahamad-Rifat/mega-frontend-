import React, {useEffect, useState} from 'react'
import {Container, PostFrom} from '../component'
import service from "../appWrite/configAp";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostFrom post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
