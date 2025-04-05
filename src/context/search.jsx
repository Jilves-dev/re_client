import { useState, createContext, useContext, useEffect } from "react";

const SearchContext = createContext();

const innitialState = {
  address: "",
  action: "Buy",
  type: "House",
  price: "",
  priceRange: [0, 1000000],
  results: [],
  page: "",
  loading: false,
};

/*const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(innitialState);

  //console.log("SearchProvider render", { search, innitialState });

  useEffect(() => {
   // console.log("Search state updated:", search);
  }, [search]); // 🔥 Tulostaa vain kun `search` muuttuu, ei ääretöntä silmukkaa!

  return (
    <SearchContext.Provider value={[search, setSearch, innitialState]}>
      {children}
    </SearchContext.Provider>
  );
};*/

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(innitialState);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/api/search`, {
        params: query,
      });
      setSearch((prev) => ({
        ...prev,
        results: response.data,
        page: '/search',
        loading: false,
      }));
    } catch (error) {
      console.error("Search error:", error);
      setSearch((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <SearchContext.Provider value={[search, setSearch, handleSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };