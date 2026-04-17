import { createContext, useContext, useState } from "react";

// ✅ Create search context
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // ✅ Single state: the search query string
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// ✅ Custom hook for search
export const useSearch = () => useContext(SearchContext);