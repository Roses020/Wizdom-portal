import axios from "axios";
import React from "react";
import "./VideoCard.css";
import { useEffect, useState } from "react";

//import { useNavigate } from "react-router-dom";

const VideoCard = (props) => {
            
  const { videoId, Lists, IsProfilePage, CurrentList, getVideosFromListId } = props;
  const [selectedValue, setSelectedValue] = useState("");

  const deleteVideo = () => {
      axios.delete("/video/" + CurrentList + "/" + videoId).then((res) => {
        getVideosFromListId(CurrentList)
      });
};

  const addToList = (list) => {
    const body = {
      videoId: videoId,
      list: list,
    };
    axios.post("/saveVideo", body).then((res) => {});
  };

  const handleclick = () => {
    alert("Video Was Added To List Succesfully");
  };
  // console.log("Video was added succefully")

  return (
    <div className="video_card">
      <iframe
        width="420"
        height="315"
        allowFullScreen={true}
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>
     <div className="dropdown_btnDiv">
      {IsProfilePage ? (
        ""
      ) : (
        

        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="dropdown"
          name="youtubevideoId"
          id="youtubevideoId"
        >
          {Lists.length > 0
            ? Lists.map((list) => {
                return <option value={list.id}>{list.listName}</option>;
              })
            : ""}
        </select>
        
      )}
      {IsProfilePage ? (
        ""
      ) : (
        <button
          onClick={() => {
            addToList(selectedValue);
            handleclick();
          }}
          className="videoCardBtn"
        >
          Add to List
        </button>
      )}
      {IsProfilePage ? <button  onClick={() => {
          deleteVideo()
          }}>delete</button> : ""}
    </div>
    </div>
  );
        };

export default VideoCard;
