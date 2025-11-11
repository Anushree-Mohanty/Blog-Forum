import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Import Tailwind styles
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Import your components
import Home from './components/Home.jsx'
import CreatePost from './components/CreatePost.jsx'
import PostDetails from './components/PostDetails.jsx'
import SignIn from './components/SignIn.jsx'

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is the main layout (with Navbar)
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id', // Dynamic route for post details
        element: <PostDetails />,
      },
      {
        path: '/create',
        element: <CreatePost />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)