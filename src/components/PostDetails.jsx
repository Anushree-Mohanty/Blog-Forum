
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
    <div className="bg-violet-100 p-8 rounded-lg shadow-md break-words overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">Posted on {post.date}</p>
      
      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
        {post.content.replace(/</g, '‹').replace(/>/g, '›')}
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
