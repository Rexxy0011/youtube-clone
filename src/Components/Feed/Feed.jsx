import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

      const response = await fetch(videoList_url);
      const json = await response.json();

      setData(json.items || []);
    } catch (err) {
      console.error("YouTube fetch error:", err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="Feed">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="card"
        >
          <img src={item?.snippet?.thumbnails?.medium?.url} alt="" />
          <h2>{item?.snippet?.title}</h2>
          <h3>{item?.snippet?.channelTitle}</h3>
          <p>
            {value_converter(item?.statistics?.viewCount)} views &bull;{" "}
            {moment(item?.snippet?.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
