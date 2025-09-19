import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closemenu } from "../../utils.jsx/AppSlice";
import { GOOGLE_API_KEY } from "../../utils.jsx/constants";
import RelatedVideos from "./RelatedVideos"; 
import CommentsContainer from "./CommentsContainer";

const VIDEO_DETAILS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoDetails, setVideoDetails] = useState(null);
  const [likeStatus, setLikeStatus] = useState(null);
  const likeIcon = "https://www.svgrepo.com/show/506603/thumbs-up-fill.svg";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closemenu());
    if (videoId) {
      getVideoDetails();
    }
  }, [videoId]);

  const getVideoDetails = async () => {
    const data = await fetch(VIDEO_DETAILS_API + GOOGLE_API_KEY + "&id=" + videoId);
    const json = await data.json();
    setVideoDetails(json.items[0]);
  };

  // Improved view count formatting to match YouTube exactly
  const formatViews = (views) => {
    const num = parseInt(views);
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + "B views";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M views";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K views";
    }
    return num.toLocaleString() + " views";
  };

  // Improved like count formatting
  const formatLikes = (likes) => {
    const num = parseInt(likes);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1).replace(/\.0$/, '') + "K";
    }
    return num.toLocaleString();
  };
  
  const getTimeDifference = (publishedDate) => {
    const published = new Date(publishedDate);
    const now = new Date();
    const diffInMilliseconds = now - published;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        return diffInMinutes < 1 ? "now" : `${diffInMinutes} minutes ago`;
      }
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }
  };

  const handleLike = () => {
    setLikeStatus(prevStatus => (prevStatus === 'liked' ? null : 'liked'));
  };

  const handleDislike = () => {
    setLikeStatus(prevStatus => (prevStatus === 'disliked' ? null : 'disliked'));
  };

  if (!videoDetails) return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );

  const { snippet, statistics } = videoDetails;
  const { channelTitle, title, publishedAt, description } = snippet;

  return (
    <div className="w-full">
      <div className="flex flex-col xl:flex-row gap-4 p-4">
        {/* Main Video Section */}
        <div className="flex-1 min-w-0">
          <iframe
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg"
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/* Video Title */}
          <h1 className="font-bold text-xl lg:text-2xl mt-4 text-gray-900 leading-tight">
            {title}
          </h1>

          {/* Video Stats and Actions */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-3 gap-4">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-3"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                alt="Channel Thumbnail"
              />
              <div className="flex flex-col">
                <h2 className="text-base font-semibold text-gray-900">{channelTitle}</h2>
                <div className="flex items-center text-sm text-gray-600 space-x-1">
                  <span>{formatViews(statistics.viewCount)}</span>
                  <span>•</span>
                  <span>{getTimeDifference(publishedAt)}</span>
                </div>
              </div>
              <button className="ml-4 px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-full overflow-hidden">
                <button
                  onClick={handleLike}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                    likeStatus === 'liked' 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {formatLikes(statistics.likeCount)}
                </button>
                <div className="w-px bg-gray-300"></div>
                <button
                  onClick={handleDislike}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                    likeStatus === 'disliked' 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                </button>
              </div>
              
              <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>

              <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save
              </button>
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <div className="text-sm text-gray-700 line-clamp-3">
              {description && description.split('\n').slice(0, 3).map((line, index) => (
                <p key={index} className="mb-1">{line}</p>
              ))}
            </div>
            <button className="text-sm font-medium text-gray-900 hover:text-gray-700 mt-2">
              Show more
            </button>
          </div>

          {/* Comments Section */}
          <CommentsContainer videoId={videoId} />
        </div>
        
        {/* Sidebar - Related Videos */}
        <div className="w-full lg:w-96">
          <RelatedVideos videoTitle={title} />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;