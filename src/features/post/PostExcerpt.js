import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';


const PostExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <div className="card mt-3">
      <div className="card-body">
          <h1>{post.title}</h1>
          <p>{post.body.substring(0, 75)}</p>
          <h3><PostAuthor userId={post.userId} /></h3>
          <p><TimeAgo timestamp={post.date}/></p>
          <ReactionButton post={post}/>
      </div>
    </div>
  )
}

export default PostExcerpt