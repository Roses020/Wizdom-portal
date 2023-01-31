import { React, useContext } from "react";
import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import AuthContext from "../store/AuthContext";
import VideoCardContainer from "./VideoCardContainer";

const Profile = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [Videos, setVideos] = useState([]);
  const [Lists, setLists] = useState([]);
  const [List, setList] = useState("");
  
  const getVideosFromListId = (listId) => {
    axios.get('/Videos/' + listId)
    .then((res) => {
      console.log(res.data)
      setVideos(res.data)
  
    })
  }
  const handleChange = (e) => {
    const listId = e.target.value;
    getVideosFromListId(listId)
  }

  const AddList = (Add) => {
    const body = {
      userId: userId,
      list: Add,
    };
    axios.post("/AddList", body).then((res) => {
      setList(res.data.items);
    });
  };

   useEffect(() => {
    axios.get('/Lists/' + userId)
    .then(res => {
       
      setLists(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}, [])
  
  return (
    <div className="profile_Div">
      <input
        className="Profile_input"
        type="text"
        placeholder="Add a List..."
        value={List}
        onChange={(event) => setList(event.target.value)}
        name="Add List"
      />
      <button className="Add_btn" onClick={() => AddList(List)}>
        Add
      </button>
      <select onChange={(e) => handleChange(e)} className="dropdown" name="List" id="List">
        { Lists.length > 0 ? Lists.map((list) => {
            return <option key={list.listName} value={list.id}>{list.listName}</option>
        }): ''} 
      </select>
      <VideoCardContainer Videos={Videos} Lists={Lists}/>
    </div>
  );
};

export default Profile;
