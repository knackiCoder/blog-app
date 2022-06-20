import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPost } from '../post/postSlice'
import { selectUserById } from './userSlice'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const postForUser = useSelector(state => {
        const AllPost = selectAllPost(state)
        return AllPost.filter(post => post.userId === Number(userId))
    });

    const postTitle = postForUser.map(post => (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    ))
  return (
    <>
    <h1>{user?.name}</h1>
    <ol>{postTitle}</ol>
    </>
  )
}

export default UserPage