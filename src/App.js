import React from 'react';
import PostList from './features/post/PostList';
import AddPostForm from './features/post/AddPostForm';
import SinglePost from './features/post/SinglePost';
import { Routes, Route } from "react-router-dom"
import { Layout } from './components/Layout';
import EditPost from './features/post/EditPost';
import UserPage from './features/users/UserPage';
import UsersList from './features/users/UsersList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

      <Route index element={<PostList />} />

      <Route path='post'>
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePost />} />
        <Route path=":postId/edit" element={<EditPost />} />
      </Route>

      <Route path="user">
        <Route index element={<UsersList />} />
        <Route path=":userId" element={<UserPage />} />
      </Route>

      </Route>
    </Routes>
  );
}



export default App;
