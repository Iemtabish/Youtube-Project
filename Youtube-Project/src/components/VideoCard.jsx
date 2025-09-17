import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  
  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M views";
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(0) + "K views";
    }
    return views + " views";
  };

  return (
    <div className="p-2 m-2 w-72 shadow-lg screen cursor-pointer">
      <img
        className="rounded-lg w-full"
        alt="thumbnail"
        src={thumbnails.medium.url}
      />
      <ul className="py-2">
        <li className="font-bold line-clamp-2 text-ellipsis overflow-hidden">
          {title}
        </li>
        <li className="text-gray-600 text-sm">
          {channelTitle}
        </li>
        <li className="text-gray-600 text-sm">
          {formatViews(statistics.viewCount)}
        </li>
      </ul>
    </div>
  );
};

export default VideoCard;