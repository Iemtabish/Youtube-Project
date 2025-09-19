import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../utils.jsx/AppSlice";
import { addToCache, addToHistory } from "../../utils.jsx/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchCache = useSelector((store) => store.search);
  
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]); 
      } else {
        fetchYouTubeSuggestions();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const fetchYouTubeSuggestions = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      // JSONP approach - bypasses CORS completely
      const callbackName = `jsonp_callback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const promise = new Promise((resolve, reject) => {
        // Create script element
        const script = document.createElement('script');
        
        // Set up the callback function
        window[callbackName] = (data) => {
          try {
            // Clean up
            document.head.removeChild(script);
            delete window[callbackName];
            resolve(data);
          } catch (error) {
            reject(error);
          }
        };
        
        // Handle script errors
        script.onerror = () => {
          document.head.removeChild(script);
          delete window[callbackName];
          reject(new Error('JSONP script failed to load'));
        };
        
        // Set script source with callback
        script.src = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(searchQuery)}&callback=${callbackName}`;
        
        // Add script to head
        document.head.appendChild(script);
        
        // Timeout after 5 seconds
        setTimeout(() => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
            delete window[callbackName];
            reject(new Error('JSONP timeout'));
          }
        }, 5000);
      });
      
      const data = await promise;
      
      // Parse the response
      if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
        const fetchedSuggestions = data[1].map(item => {
          return Array.isArray(item) ? item[0] : item;
        }).filter(Boolean);
        
        setSuggestions(fetchedSuggestions.slice(0, 10));
        
        // Redux store mein search query aur suggestions cache karo
        dispatch(addToCache({
          query: searchQuery,
          suggestions: fetchedSuggestions.slice(0, 10)
        }));
      } else {
        setSuggestions([]);
      }
      
    } catch (error) {
      console.error("Error fetching YouTube suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const dispatch = useDispatch();
   
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      performSearch(searchQuery);
    }
  };

  const performSearch = (query) => {
    console.log("Searching for:", query);
    
    // Redux store mein search history add karo
    dispatch(addToHistory({
      query: query.trim(),
      timestamp: Date.now()
    }));
    
    // Add your search logic here
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-lg bg-white sticky top-0 z-40">
      <div className="flex items-center cursor-pointer" onClick={toggleMenuHandler}>
        <img
          className="h-8 cursor-pointer hover:bg-gray-100 p-1 rounded"
          alt="menu"
          src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png"
        />
        <a href="/" className="flex items-center">
          <img
            className="h-16 ml-2"
            alt="youtube logo"
            src="https://www.gstatic.com/youtube/img/promos/fa28f252e8d007f9458234a71306c659affec45a2651d58a3d9577595fea5418_244x112.webp"
          />
        </a>
      </div>
      
      <div className="flex items-center relative">
        <div className="relative">
          <div className="flex">
            <input
              className="w-[30rem] p-2 bg-white border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 px-4 text-base"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button 
              className="px-6 py-2 bg-gray-50 border border-gray-300 border-l-0 rounded-r-full hover:bg-gray-100 transition-colors flex items-center justify-center"
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
            >
              🔍
            </button>
          </div>
          
          {showSuggestions && (
            <div className="absolute top-full left-0 bg-white w-full rounded-lg shadow-xl border border-gray-200 z-50 mt-1 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-3 text-gray-500 text-center flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                  Loading suggestions...
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center transition-colors"
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="mr-3 text-gray-400 text-base">🔍</span>
                      <span className="text-gray-900 flex-1">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              ) : searchQuery.trim() && !isLoading && (
                <div className="px-4 py-3 text-gray-500 text-center text-sm">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
          <span className="text-xl">⋮</span>
        </div>
        <button className="flex items-center border border-blue-300 rounded-full py-2 px-4 text-blue-600 hover:bg-blue-50 transition-colors">
          <span className="mr-2">👤</span>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Head;