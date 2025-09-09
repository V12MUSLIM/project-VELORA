import { Link } from "react-router-dom";

const BreadcrumbNavigation = ({ items, className = "" }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <svg 
              className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          
          {item.href && index !== items.length - 1 ? (
            <Link
              to={item.href}
              className="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white 
                         transition-colors duration-200 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={
                index === items.length - 1
                  ? "text-black dark:text-white font-medium"
                  : "text-gray-500 dark:text-gray-500"
              }
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;