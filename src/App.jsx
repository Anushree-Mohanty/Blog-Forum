import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  // State for posts, initializing from local storage
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  // State for user, initializing from local storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('blogUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Effect to save posts to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  // Effect to save/remove user from local storage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('blogUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('blogUser');
    }
  }, [user]);

  // --- State Handler Functions ---

  const addPost = (post) => {
    // Add a unique ID and date
    const newPost = { id: Date.now(), date: new Date().toLocaleDateString(), ...post };
    setPosts([newPost, ...posts]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleSignIn = (email) => {
    // In a real app, you'd verify password. Here, we just set the user.
    setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
  };

// ... (imports and component logic)

  return (
    // CHANGE THIS LINE
    <div className="min-h-screen bg-violet-200">
      <Navbar user={user} handleLogout={handleLogout} />
      <main className="container mx-auto p-4">
        <Outlet context={{ posts, user, addPost, deletePost, handleSignIn }} />
      </main>
    </div>
  )
}

export default App
