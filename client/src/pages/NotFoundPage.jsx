import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-136px)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl my-4">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;