import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    cache: {},           // Suggestions cache: { "react": ["react tutorial", "react hooks"] }
    history: [],         // Search history: [{ query: "react", timestamp: 1634567890 }]
    recentSearches: []   // Recent searches for quick access
  },
  reducers: {
    // Suggestions cache mein add karna
    addToCache: (state, action) => {
      const { query, suggestions } = action.payload;
      state.cache[query] = suggestions;
    },
    
    // Search history mein add karna
    addToHistory: (state, action) => {
      const { query, timestamp } = action.payload;
      
      // Duplicate search remove karo
      state.history = state.history.filter(item => item.query !== query);
      
      // Nayi search add karo at the beginning
      state.history.unshift({
        query,
        timestamp,
        id: Date.now() // Unique ID
      });
      
      // Maximum 50 searches keep karo
      if (state.history.length > 50) {
        state.history = state.history.slice(0, 50);
      }
      
      // Recent searches bhi update karo (last 10)
      state.recentSearches = state.history.slice(0, 10).map(item => item.query);
    },
    
    // Search history clear karna
    clearHistory: (state) => {
      state.history = [];
      state.recentSearches = [];
    },
    
    // Cache clear karna
    clearCache: (state) => {
      state.cache = {};
    },
    
    // Specific search history se remove karna
    removeFromHistory: (state, action) => {
      const queryToRemove = action.payload;
      state.history = state.history.filter(item => item.query !== queryToRemove);
      state.recentSearches = state.history.slice(0, 10).map(item => item.query);
    }
  }
});

export const { 
  addToCache, 
  addToHistory, 
  clearHistory, 
  clearCache, 
  removeFromHistory 
} = searchSlice.actions;

export default searchSlice.reducer;