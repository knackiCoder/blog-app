import { useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUser } from "../users/userSlice";

import React from 'react'

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const user = useSelector(selectAllUser)

    const [ title, setTitle ] = useState(post?.title)
    const [ content, setContent ] = useState(post?.body)
    const [ userId, setUserId ] = useState(post?.userId)
    const [ requestStatus, setRequestStatus ] = useState("idle")

    const dispatch = useDispatch();

    if(!post) {
      return (
          <h2>Post not found</h2>
      )
  }

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onUserChange = (e) => setUserId(e.target.value)

  const canSave = [ title, content, userId ].every(Boolean) && requestStatus === "idle"

  const onSaveClicked = (e) => {
    e.preventDefault() 
    if(canSave) {
      try {
        setRequestStatus("pending")
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap();

        setTitle("")
        setContent("");
        setUserId("")
        navigate(`/post/${postId}`)
      } catch (err) {
        console.log("failed to save the post", err)
      } finally {
        setRequestStatus('idle')
      }
    }        
}

const userOption = user.map(user => (
  <option key={user.id} value={user.id}>
    {user.name}
  </option>
))


const onDeletePost = (e) => {
  e.preventDefault() 
  if(canSave) {
    try {
      setRequestStatus("pending")
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("")
      setContent("");
      setUserId("")
      navigate("/")
    } catch (err) {
      console.log("failed to save the post", err)
    } finally {
      setRequestStatus('idle')
    }
  }        
}

return (
  <>
  <h1>Add new post</h1>
  <form>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Post Title</label>
      <input 
      name="title"
      value={title}
      onChange={onTitleChange}
      type="text"
      className="form-control" 
      id="exampleInputEmail1" 
      aria-describedby="emailHelp" />
      
    </div>
    
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Author</label>
      <select
      name="author"
      value={userId}
      onChange={onUserChange}
      type="text" 
      className="form-control" 
      id="exampleInputEmail1">
        <option value=""></option>
        {userOption}
      </select>
      
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Content</label>
      <input 
      name="content"
      value={content}
      onChange={onContentChange}
      type="text" 
      className="form-control" 
      id="exampleInputEmail1" 
      aria-describedby="emailHelp" />
      
    </div>
    <div className='d-grid gap-2'>
    <button disabled={!canSave} onClick={onSaveClicked} type="submit" className="btn btn-primary">Save post</button>

    <button onClick={onDeletePost} type="submit" className="btn btn-secondary">Delete post</button>
    </div>
  </form>
  </>
)
}

export default EditPost
