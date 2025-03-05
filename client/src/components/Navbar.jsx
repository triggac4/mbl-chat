import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaComments } from "react-icons/fa";
import { useCheckAuth, useLogout } from "../hooks/useAuth";
import { useGetUnreadMessageCount } from "../hooks/useMessages";
import { useSocketConnection } from "../hooks/useSockets";
const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useCheckAuth();
  const logout = useLogout();
  const { data, refetch } = useGetUnreadMessageCount();
  console.log({ data });
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useSocketConnection({
    onNewMessage: () => {
      refetch();
    },
  });
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-800 hidden md:inline">
              MessagingApp
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
                >
                  <FaComments />

                  <span>Messages</span>
                  {data?.unreadMessageCount && (
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                      {data?.unreadMessageCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
                >
                  <FaUserCircle />
                  <span>{username}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
