import { React, useContext } from "react";
import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoCardContainer from "./VideoCardContainer";


const Profile = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [Videos, setVideos] = useState([]);
  const [Lists, setLists] = useState([]);
  const [List, setList] = useState("");
  const [CurrentList, setCurrentList] = useState("");
  
  const IsProfilePage = true

  const getVideosFromListId = (listId) => {
    axios.get('/Videos/' + listId)
    .then((res) => {
      setVideos(res.data)
    })
  }
   
  const handleChange = (e) => {
    setCurrentList(e.target.value)
    getVideosFromListId(e.target.value)
  }

  const AddList = (Add) => {
      const body = {
      userId: userId,
      list: Add,
    };
    axios.post("/AddList", body).then((res) => {
      alert(`The List: ${Add} Was Created!`);
     
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
      <VideoCardContainer getVideosFromListId={getVideosFromListId} CurrentList={CurrentList} Videos={Videos} Lists={Lists} IsProfilePage={ IsProfilePage }/>
      { Videos.length > 0 ? "" : <div className="ProfilePic"> <img alt="profilePic" src="https://img.freepik.com/free-vector/simple-sketch-old-wizard_1308-86372.jpg"width="600"></img>
      <h2>Hello!,Add A List!</h2>
      </div>}
    </div>
  );
};

export default Profile;
