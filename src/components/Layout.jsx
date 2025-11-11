import Navbar from "./Navbar";

function Layout({ children, user, handleLogout }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img1.jpg')" }}
    >
      <div className="backdrop-blur-sm min-h-screen flex flex-col">
        <Navbar user={user} handleLogout={handleLogout} />

        <main className="flex-grow container mx-auto px-4 py-6 bg-white/50 rounded-2xl shadow-lg">
          {children}
        </main>

        <footer className="text-center py-4 text-gray-700 text-sm bg-white/40 backdrop-blur-md mt-6 rounded-t-2xl">
          © 2025 Blog Forum. All Rights Reserved 💜
        </footer>
      </div>
    </div>
  );
}

export default Layout;
