import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    cache: {},           
    history: [],         
    recentSearches: []   
  },
  reducers: {
    
    addToCache: (state, action) => {
      const { query, suggestions } = action.payload;
      state.cache[query] = suggestions;
    },
    
    
    addToHistory: (state, action) => {
      const { query, timestamp } = action.payload;
      
    
      state.history = state.history.filter(item => item.query !== query);
      
    
      state.history.unshift({
        query,
        timestamp,
        id: Date.now() 
      });
      
      
      if (state.history.length > 50) {
        state.history = state.history.slice(0, 50);
      }
      
      
      state.recentSearches = state.history.slice(0, 10).map(item => item.query);
    },
    

    clearHistory: (state) => {
      state.history = [];
      state.recentSearches = [];
    },
    
     clearCache: (state) => {
      state.cache = {};
    },
    
 
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