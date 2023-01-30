import { React, useContext } from "react";
import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import AuthContext from "../store/AuthContext";

const Profile = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [Lists, setLists] = useState([]);
  const [List, setList] = useState("");

  const AddList = (Add) => {
    const body = {
      userId: userId,
      list: List,
    };
    axios.post("/AddList", body).then((res) => {
      console.log(res.data);
      //   setList(res.data.items);
    });
  };
  
   useEffect(() => {
    axios.get('/Lists/' + userId)
    .then(res => {
       
      console.log(res.data)
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
      <select className="dropdown" name="List" id="List">
        { Lists.length > 0 ? Lists.map((list) => {
            return    <option value={list.listName}>{list.listName}</option>
        }): ''} 
      </select>
    </div>
  );
};

export default Profile;
