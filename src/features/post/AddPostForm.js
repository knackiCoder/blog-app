import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postSlice'
import { selectAllUser } from '../users/userSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ addRequestStatus, setaddRequestStatus ] = useState('idle')

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)
    const onUserChange = (e) => setUserId(e.target.value)

    const canSave = [ title, content, userId ].every(Boolean) && addRequestStatus === "idle"

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const users = useSelector(selectAllUser); 
  

    const onSaveClicked = (e) => {
        e.preventDefault() 
        if(canSave) {
          try {
            setaddRequestStatus("pending")
            dispatch(addNewPost({ title, body: content, userId})).unwrap();
  
            setTitle("")
            setContent("");
            setUserId("")
            navigate("/")
          } catch (err) {
            console.log("failed to save the post", err)
          } finally {
            setaddRequestStatus('idle')
          }
        }        
    }

    const userOption = users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))

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
      <button disabled={!canSave} onClick={onSaveClicked} type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
    </>
  )
}

export default AddPostForm