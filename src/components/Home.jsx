import axios from "axios";
import { React } from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import VideoCard from "./VideoCard";


const Home = () => {
  const [Videos, setVideos] = useState([]);
  const [Search, setSearch] = useState("");

  const SearchForVideos = (search) => {
    axios.get("/GetVideos/" + search).then((res) => {
      console.log(res.data);
      setVideos(res.data.items);
    });
  };

  return (
    <div>
      <div className="search_div">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for a video..."
          value={Search}
          onChange={(event) => setSearch(event.target.value)}
          name="Search for a video"
        />
        <button className="search_button" onClick={() => SearchForVideos(Search)}>Search</button>
      </div>
      <div className="videoCardContainer">
      { Videos.length > 0 ? "" : <div className="image">
          <div> <img alt="headerpic" src="https://cdn.pixabay.com/photo/2016/06/13/14/57/wizard-1454385__340.png"width="600"></img></div>
          </div>}
      {Videos
        ? Videos.map((element) => {
            return (
              <VideoCard
                videoId={element.id.videoId}
                key={element.etag}
              ></VideoCard>
            );
          })
        : ""}
        </div>
    </div>
  );
};

export default Home;