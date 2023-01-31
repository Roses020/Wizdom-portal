import axios from "axios";
import React from "react";
import "./VideoCard.css";
import { useEffect, useState } from "react";

//import { useNavigate } from "react-router-dom";


const VideoCard = (props) => {
    const { videoId, Lists} = props
    const [selectedValue, setSelectedValue] = useState("");
    
    const addToList = (list) => {
        const body = {
            videoId: videoId,
            list: list
        }
        axios.post("/saveVideo", body).then((res) => {
            
          });
    }
 
    const handleclick = () => {
        alert('Video Was Added To List')
    }
        // console.log("Video was added succefully")
    

return (
    <div className="video_card">
        <iframe width="420" height="315" allowFullScreen={true}
        src={`https://www.youtube.com/embed/${videoId}`}>
        </iframe>

        <select value={ selectedValue } onChange={(e) => setSelectedValue(e.target.value)}  className="dropdown" name="youtubevideoId" id="youtubevideoId">
        { Lists.length > 0 ? Lists.map((list) => {
            return    <option value={list.id}>{list.listName}</option>
        }): ''} 
      </select>
   <button    onClick={() => {addToList(selectedValue); handleclick();}}className="videoCardBtn">Add to List</button>
    </div>
  );
}

export default VideoCard;