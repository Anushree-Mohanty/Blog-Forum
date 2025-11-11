import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { z } from 'zod'; // Import Zod

// Define the schema for post validation
const postSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long' }),
});

function CreatePost() {
  const { addPost, user } = useOutletContext();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState(null);

  // Protected Route: Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/signin'); // Redirect to sign-in if not logged in
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null); // Clear previous errors

    // Validate with Zod
    const result = postSchema.safeParse({ title, content });

    if (!result.success) {
      // Zod errors are complex, .format() makes them easier to display
      setErrors(result.error.format());
    } else {
      // Validation passed
      addPost({ title, content });
      navigate('/'); // Go back to home page
    }
  };

  // If user is null, this component will be blank while it redirects
  if (!user) return null; 

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors?.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title._errors[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors?.content && (
            <p className="text-red-500 text-xs mt-1">{errors.content._errors[0]}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;