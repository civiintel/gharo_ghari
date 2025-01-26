import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between h-7">
      {/* Search Bar */}
      <div className="flex items-center space-x-2 w-full max-w-md">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
