// import { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './components/Navbar';

// function App() {
//   const [posts, setPosts] = useState(() => {
//     const savedPosts = localStorage.getItem('blogPosts');
//     return savedPosts ? JSON.parse(savedPosts) : [];
//   });

//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem('blogUser');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   useEffect(() => {
//     localStorage.setItem('blogPosts', JSON.stringify(posts));
//   }, [posts]);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('blogUser', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('blogUser');
//     }
//   }, [user]);

//   const addPost = (post) => {
//     const newPost = {
//       id: Date.now(),
//       date: new Date().toLocaleDateString(),
//       ...post,
//     };
//     setPosts([newPost, ...posts]);
//   };

//   const deletePost = (id) => {
//     setPosts(posts.filter((post) => post.id !== id));
//   };

//   const handleSignIn = (email) => {
//     setUser({ email });
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <div className="min-h-screen bg-violet-200">
//       <Navbar user={user} handleLogout={handleLogout} />
//       <main className="container mx-auto p-4">
//         <Outlet context={{ posts, user, addPost, deletePost, handleSignIn }} />
//       </main>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('activeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [posts, setPosts] = useState([]);

  // 🔁 Load posts only for the logged-in user
  useEffect(() => {
    if (user?.email) {
      const savedPosts = localStorage.getItem(`posts_${user.email}`);
      setPosts(savedPosts ? JSON.parse(savedPosts) : []);
    } else {
      setPosts([]); // Hide posts when logged out
    }
  }, [user]);

  // 💾 Save posts to localStorage only for that user
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`posts_${user.email}`, JSON.stringify(posts));
    }
  }, [posts, user]);

  // ➕ Add a new post
  const addPost = (post) => {
    const newPost = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...post,
    };
    setPosts([newPost, ...posts]);
  };

  // ❌ Delete post
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // ✅ Sign in existing user
  const handleSignIn = (email) => {
    const activeUser = { email };
    setUser(activeUser);
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
  };

  // 🚪 Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('activeUser');
  };

  return (
    <div className="min-h-screen bg-violet-200">
      <Navbar user={user} handleLogout={handleLogout} />
      <main className="container mx-auto p-4">
        <Outlet context={{ posts, user, addPost, deletePost, handleSignIn }} />
      </main>
    </div>
  );
}

export default App;
