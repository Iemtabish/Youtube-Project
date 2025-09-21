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

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

 
  const [selectedFile, setSelectedFile] = useState(null);

 
  const handleUpload = () => {
    setisModalOpen(true);  
    setIsOpen(false);
  };

 
  const closeModal = () => {
    setisModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

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
      const callbackName = `jsonp_callback_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        window[callbackName] = (data) => {
          try {
            document.head.removeChild(script);
            delete window[callbackName];
            resolve(data);
          } catch (error) {
            reject(error);
          }
        };

        script.onerror = () => {
          document.head.removeChild(script);
          delete window[callbackName];
          reject(new Error("JSONP script failed to load"));
        };

        script.src = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
          searchQuery
        )}&callback=${callbackName}`;

        document.head.appendChild(script);

        setTimeout(() => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
            delete window[callbackName];
            reject(new Error("JSONP timeout"));
          }
        }, 5000);
      });

      const data = await promise;

      if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
        const fetchedSuggestions = data[1]
          .map((item) => {
            return Array.isArray(item) ? item[0] : item;
          })
          .filter(Boolean);

        setSuggestions(fetchedSuggestions.slice(0, 10));

        dispatch(
          addToCache({
            query: searchQuery,
            suggestions: fetchedSuggestions.slice(0, 10),
          })
        );
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

    dispatch(
      addToHistory({
        query: query.trim(),
        timestamp: Date.now(),
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
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
    <>
    <div className="flex justify-between items-center p-4 shadow-lg bg-white sticky top-0 z-40">
      {/* Left section: Menu and Logo */}
      <div className="flex items-center space-x-4">
        <img
          className="h-8 cursor-pointer hover:bg-gray-100 p-1 rounded"
          alt="menu"
          onClick={toggleMenuHandler}
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

      {/* Middle section: Search bar and suggestions */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-2xl">
          <div className="flex">
            <input
              className="w-full p-2 bg-white border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 px-4 text-base"
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
              ) : (
                searchQuery.trim() &&
                !isLoading && (
                  <div className="px-4 py-3 text-gray-500 text-center text-sm">
                    No suggestions found
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={toggleDropDown}
            className="flex items-center bg-gray-200 cursor-pointer rounded-full py-2 px-4 text-black hover:bg-blue-50 transition-colors"
          >
            + Create
          </button>
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1">
                <div onClick={handleUpload}>
                  <button
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <svg
                      className="h-5 w-5 mr-3 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Upload video
                  </button>
                </div>
                <button
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <svg
                    className="h-5 w-5 mr-3 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                  </svg>
                  Go live
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="size-6 text-gray-600"
          >
            <path
              fillRule="evenodd"
              d="M12 5a4 4 0 0 0-8 0v2.379a1.5 1.5 0 0 1-.44 1.06L2.294 9.707a1 1 0 0 0-.293.707V11a1 1 0 0 0 1 1h2a3 3 0 1 0 6 0h2a1 1 0 0 0 1-1v-.586a1 1 0 0 0-.293-.707L12.44 8.44A1.5 1.5 0 0 1 12 7.38V5Zm-5.5 7a1.5 1.5 0 0 0 3 0h-3Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
          <span className="text-xl">⋮</span>
        </div>
        <a
          href="https://accounts.google.com/"
          target="_blank"
          className="flex items-center border border-blue-300 rounded-full py-2 px-4 text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <span className="mr-2">👤</span>
          Sign in
        </a>
      </div>
    </div>

    
    {isModalOpen && (
      <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Upload videos</h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drag and drop video files to upload
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Your videos will be private until you publish them.
                </p>
                <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />
                  SELECT FILES
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-2 hover:bg-gray-200 rounded-full"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log("Uploading:", selectedFile.name);
                      closeModal();
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
            <div className="mt-8 pt-6 border-t text-xs text-gray-500">
              <p>
                By submitting your videos to YouTube, you acknowledge that you agree to YouTube's{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline">Community Guidelines</a>.
              </p>
              <p className="mt-2">
                Please be sure not to violate others' copyright or privacy rights.{' '}
                <a href="#" className="text-blue-600 hover:underline">Learn more</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Head;