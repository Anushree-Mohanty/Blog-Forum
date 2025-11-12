import { Link, useOutletContext } from "react-router-dom";
import bgImage from "../assets/img1.jpg";

function Home() {
  const { posts, deletePost, user } = useOutletContext();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center py-12 px-4 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {user ? (
        
        <>
          <h1 className="text-4xl font-bold mb-8 text-black drop-shadow-lg">
            Blog Posts
          </h1>

          <div className="max-w-3xl w-full space-y-6">
            {posts.length === 0 ? (
              <p className="text-gray-100 text-center text-lg">
                No posts yet. Be the first to create one!
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/90 p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
                >
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">
                    Posted on {post.date}
                  </p>
                  <p className="text-gray-700 mb-4 break-words">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/post/${post.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      Read More
                    </Link>
                    {user && (
                      <button
                        onClick={() => deletePost(post.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-black drop-shadow-lg">
            Blog Posts
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-lg">
            Please{" "}
            <Link to="/signup" className="font-bold underline hover:text-white">
              Sign Up
            </Link>{" "}
            to see the posts.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;