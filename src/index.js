import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { fetchUser } from './features/users/userSlice';
import { fetchPosts } from './features/post/postSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

store.dispatch(fetchUser())
store.dispatch(fetchPosts())

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
);
