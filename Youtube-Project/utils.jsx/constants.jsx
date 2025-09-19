export const GOOGLE_API_KEY = "AIzaSyAm0mmet5K_tG5z6CBTTwnlxuEruiWGmSs";

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&key=" + GOOGLE_API_KEY;

// Working CORS proxy options for suggestions
export const YOUTUBE_SEARCH_SUGGESTIONS_API = 
  "https://api.allorigins.win/raw?url=http%3A//suggestqueries.google.com/complete/search%3Fclient%3Dfirefox%26ds%3Dyt%26q%3D";

// Alternative CORS proxies (backup options)
export const CORS_PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://cors-anywhere.herokuapp.com/"
];