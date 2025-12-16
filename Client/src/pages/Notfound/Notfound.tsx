import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="webpage">
      <div className="section_body">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-orange-500">404</h1>
          <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;