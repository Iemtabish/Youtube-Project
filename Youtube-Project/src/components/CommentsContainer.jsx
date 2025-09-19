import React, { useState, useEffect } from "react";
import { GOOGLE_API_KEY } from "../../utils.jsx/constants";

const COMMENTS_API = "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=";
const REPLIES_API = "https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key=";

const Comment = ({ data, depth = 0 }) => {
  const { name, text, likes, timeAgo, replies, replyCount, commentId } = data;
  const [showReplies, setShowReplies] = useState(false);
  const [repliesData, setRepliesData] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [liked, setLiked] = useState(false);

  const formatLikes = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return count.toString();
  };

  const fetchReplies = async () => {
    if (repliesData.length > 0) {
      setShowReplies(!showReplies);
      return;
    }

    setLoadingReplies(true);
    try {
      const response = await fetch(`${REPLIES_API}${GOOGLE_API_KEY}&parentId=${commentId}&maxResults=10`);
      if (response.ok) {
        const data = await response.json();
        const replies = data.items.map(item => ({
          id: item.id,
          name: item.snippet.authorDisplayName,
          text: item.snippet.textDisplay,
          likes: item.snippet.likeCount || 0,
          timeAgo: getTimeAgo(item.snippet.publishedAt),
          replies: [],
          replyCount: 0,
          commentId: item.id
        }));
        setRepliesData(replies);
        setShowReplies(true);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setLoadingReplies(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      return diffInHours < 1 ? "now" : `${diffInHours} hours ago`;
    }
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex space-x-3 my-4">
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-gray-900">@{name}</span>
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>

        <div className="text-sm text-gray-900 mb-2 whitespace-pre-line">
          {text}
        </div>

        <div className="flex items-center space-x-4 mb-3">
          <button 
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-1 ${liked ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="text-xs">{formatLikes(likes + (liked ? 1 : 0))}</span>
          </button>
          
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
          </button>

          <button className="text-xs text-gray-600 hover:text-gray-900 font-medium">
            Reply
          </button>
        </div>

        {replyCount > 0 && (
          <button
            onClick={fetchReplies}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-3"
            disabled={loadingReplies}
          >
            {loadingReplies ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            ) : (
              <svg 
                className={`w-4 h-4 transform transition-transform ${showReplies ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span>{formatLikes(replyCount)} {replyCount === 1 ? 'reply' : 'replies'}</span>
          </button>
        )}

        {showReplies && repliesData.length > 0 && (
          <div className={`border-l-2 border-gray-200 ${depth < 2 ? 'ml-6 pl-4' : 'ml-2 pl-2'}`}>
            <CommentsList comments={repliesData} depth={depth + 1} />
          </div>
        )}
      </div>
    </div>
  );
};

const CommentsList = ({ comments, depth = 0 }) => {
  return comments.map((comment) => (
    <Comment key={comment.id} data={comment} depth={depth} />
  ));
};

const CommentsContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId, sortBy]);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${COMMENTS_API}${GOOGLE_API_KEY}&videoId=${videoId}&order=${sortBy}&maxResults=20`
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const realComments = data.items.map(item => ({
          id: item.id,
          name: item.snippet.topLevelComment.snippet.authorDisplayName,
          text: item.snippet.topLevelComment.snippet.textDisplay,
          likes: item.snippet.topLevelComment.snippet.likeCount || 0,
          timeAgo: getTimeAgo(item.snippet.topLevelComment.snippet.publishedAt),
          replies: [],
          replyCount: item.snippet.totalReplyCount || 0,
          commentId: item.snippet.topLevelComment.id
        }));
        setComments(realComments);
      } else {
        setComments([]);
        setError("No comments found for this video");
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError("Unable to load comments. Please check your API key or try again later.");
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      return diffInHours < 1 ? "now" : `${diffInHours} hours ago`;
    }
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + comment.replyCount;
  }, 0);

  if (isLoading) {
    return (
      <div className="w-full mt-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-6">
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">{error}</div>
          <button 
            onClick={fetchComments}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <div className="flex items-center space-x-8 mb-6">
        <h3 className="text-xl font-semibold">
          {totalComments} Comments
        </h3>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
          >
            <option value="relevance">Top comments</option>
            <option value="time">Newest first</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="Your avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full pb-2 border-b border-gray-300 bg-transparent focus:border-gray-600 focus:outline-none text-sm"
          />
          {newComment && (
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setNewComment('')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Comment
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        {comments.length > 0 ? (
          <CommentsList comments={comments} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No comments available for this video
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsContainer;