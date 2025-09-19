import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../../utils.jsx/constants";

const RelatedVideos = ({ videoTitle }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    if (videoTitle) {
      searchForRelatedVideos();
    }
  }, [videoTitle]);

  const searchForRelatedVideos = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + "&q=" + encodeURIComponent(videoTitle));
    const json = await data.json();
    setRelatedVideos(json.items);
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold">Related Videos</h2>
      {relatedVideos.map((video) => (
        <Link to={"/watch?v=" + video.id.videoId} key={video.id.videoId}>
          <div className="flex">
            <img 
              className="rounded-lg w-40" 
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title} 
            />
            <div className="ml-2">
              <h3 className="font-semibold text-sm">{video.snippet.title}</h3>
              <p className="text-xs text-gray-600">{video.snippet.channelTitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideos;