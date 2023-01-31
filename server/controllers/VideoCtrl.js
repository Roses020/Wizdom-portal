const { default: axios } = require("axios")
const { APIKEY } = process.env
const {  Video } = require('../models/videos')

module.exports = {
    getVideos: (req, response) => {
        const { Search } = req.params
        try {
            axios.get(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&q=${Search}&maxResults=12`)
            .then((res) => {
                response.status(200).send(res.data);
            });
        } catch (error) {
            console.log('error in the getVideos function');
            console.log(error);
            res.sendStatus(400);
        }
    },

    addVideoToList: async (req, res) => {
            try {
                const { list, videoId } = req.body
                // console.log(req.body)
                await Video.create({ youtubevideoId: videoId, savedVideoListId: list}) 
          
                res.sendStatus(200)
                //console.log('adding video ' + video + " " + list)
              } catch (error) {
                console.log('ERROR in addVideo')
                console.log(error)
                res.sendStatus(400)
                console.log(req.body)
              }
            },
            
            getListVideos: async (req, res) => {
                const { ListId } = req.params
                try{
                   const videos =  await  Video.findAll({where: { savedVideoListId: ListId }})
                    const formatedVideos = videos.map((ele) =>{
                        return {
                            id: {
                                videoId: ele.youtubevideoId
                            }
                        }
                    } )
                    res.status(200).send(formatedVideos)
                }catch (error) {
                    console.log('ERROR in getVideo')
                    console.log(error)
                    res.sendStatus(400)
                    console.log(req.params)
                  }
            }
    }
