import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-lg mb-10 px-4 pt-4 sm:px-0">
      <input
        type="text"
        placeholder="Search responses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-full text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500 transition duration-300 shadow-md"
      />
    </div>
  );
};

export default SearchBar;