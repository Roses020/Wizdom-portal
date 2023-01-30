import React from "react";
import "./VideoCard.css";
//import { useNavigate } from "react-router-dom";


const VideoCard = (props) => {
    const { videoId } = props
return (
    <div className="video_card">
        <iframe width="420" height="315" allowFullScreen={true}
        src={`https://www.youtube.com/embed/${videoId}`}>
        </iframe>

<button className="video_button">Add Video To List</button>

    </div>
  );
}

export default VideoCard;