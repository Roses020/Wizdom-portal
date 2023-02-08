import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./Home.css";
import VideoCardContainer from "./VideoCardContainer";

import AuthContext from "../store/AuthContext";

const Home = () => {
  const [Videos, setVideos] = useState([]);
  const [Search, setSearch] = useState("");
  const [Lists, setLists] = useState([]);
  const [NextPageToken, setNextPageToken] = useState("");
  const [PrevPageToken, setPrevPageToken] = useState("");
  const IsProfilePage = false 

 const authctx = useContext(AuthContext)
 
  const SearchForVideos = (search) => {
    axios.get("/GetVideos/" + search).then((res) => {
      setNextPageToken(res.data.nextPageToken)
      setVideos(res.data.items);
      authctx.saveUserVideos(res.data.items)
    });
  };

const GetNextSetVideos = (search, nextPage) => {
  axios.get("/GetNextVideos/" + search + "/" + nextPage).then((res) => {
    setPrevPageToken(res.data.prevPageToken)
    setNextPageToken(res.data.nextPageToken)
    setVideos(res.data.items);
    authctx.saveUserVideos(res.data.items)
  });
}
  useEffect(() => {
    if(authctx.userVideos){
      setVideos(authctx.userVideos)
    }
      
    axios.get('/Lists/' + authctx.userId)
    .then(res => {
       
     // console.log(res.data)
      setLists(res.data)

    })
    .catch(err => {
        console.log(err)
    })
}, [])

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
      
      </div><div   onClick={() => GetNextSetVideos(Search, NextPageToken)} class="arrow-container">
  <span class="arrow">&#x2192;</span>
</div >

     <div className="leftArrow">{PrevPageToken ? <span class="arrow" onClick={() => GetNextSetVideos(Search, PrevPageToken)}>&#x2190; </span>: ''}</div> 
  
      <div className="videoCardContainer">
      { Videos.length > 0 ? "" : <div className="image">
          <div> <img alt="headerpic" src="https://cdn.pixabay.com/photo/2016/06/13/14/57/wizard-1454385__340.png"width="600"></img></div>
          </div>}
      <VideoCardContainer  CurrentList={''} Videos={ Videos } Lists={ Lists } IsProfilePage={ IsProfilePage }/>
        </div>
    </div>
  );
};

export default Home;