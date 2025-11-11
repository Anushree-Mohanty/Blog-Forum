import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; 

function Navbar({ user, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  const onLogout = () => {
    handleLogout();
    setIsMenuOpen(false); 
    navigate('/'); 
  };

  return (
    <nav className="bg-[#E6E6FA] shadow-md py-4 px-4 flex justify-between items-center relative z-10">
      <Link 
        to="/" 
        className="text-2xl font-bold text-purple-800"
        onClick={() => setIsMenuOpen(false)} 
      >
        💜 Blog Forum
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all">
          Home
        </Link>

        {user ? (
          <>
            <Link
              to="/create"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
            >
              Create Post
            </Link>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* 5. Hamburger Button (Mobile Only) */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            // Close Icon (X)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Menu Icon (Hamburger)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 6. Mobile Menu (Shows when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#E6E6FA] shadow-md md:hidden flex flex-col items-center space-y-4 py-4">
          <Link
            to="/"
            className="w-[200px] text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/create"
                className="w-[200px] text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Create Post
              </Link>
              <button
                onClick={onLogout}
                className="w-[200px] text-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className=" w-[200px] text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;