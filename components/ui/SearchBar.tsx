import React from "react";
import { FiSearch } from "react-icons/fi"; // Make sure to install react-icons

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-lg mb-10 px-4 pt-4 sm:px-0">
      <div className="relative">
        <input
          type="text"
          placeholder="Search responses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-lg"
        />
        <FiSearch className="absolute left-4 top-1/2 
                            transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
        <div className="absolute inset-y-0 right-4 sm:right-0 flex items-center pr-3 pointer-events-none">
        </div>
    </div>
  );
};

export default SearchBar;