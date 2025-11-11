// import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';

// function PostDetails() {
//   const { id } = useParams(); // Get the 'id' from the URL
//   const { posts } = useOutletContext();

//   // Find the post with the matching ID
//   // Note: useParams() returns a string, so we convert post.id to string or id to number
//   const post = posts.find((p) => p.id.toString() === id);

//   // If post is not found, redirect to home
//   if (!post) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md">
//       <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//       <p className="text-gray-500 text-sm mb-6">Posted on {post.date}</p>
//       {/* Use whitespace-pre-wrap to respect newlines in the content */}
//       <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
//         {post.content}
//       </p>
//       <Link
//         to="/"
//         className="inline-block mt-8 text-indigo-600 hover:underline"
//       >
//         &larr; Back to all posts
//       </Link>
//     </div>
//   );
// }

// export default PostDetails;

import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams(); 
  const { posts } = useOutletContext();

  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    // This is the line that changed
    <div className="bg-violet-100 p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">Posted on {post.date}</p>
      
      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>
      <Link
        to="/"
        className="inline-block mt-8 text-indigo-600 hover:underline"
      >
        &larr; Back to all posts
      </Link>
    </div>
  );
}

export default PostDetails;
