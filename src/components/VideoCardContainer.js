import React from 'react'
import VideoCard from './VideoCard';

const VideoCardContainer = (props) => {
    const {Videos, Lists, IsProfilePage, CurrentList,  getVideosFromListId} = props
  return (
    <div className="videoCardContainer">
        
{Videos
    ? Videos.map((element, index) => {
        return (
          <VideoCard
            videoId={element.id.videoId}
            key={element.id.videoId}
            Lists={Lists}
            IsProfilePage={IsProfilePage}
            CurrentList={CurrentList}
            getVideosFromListId={ getVideosFromListId}
          ></VideoCard>
        );
      })
    : ""}
    </div>
  )
}

export default VideoCardContainer









