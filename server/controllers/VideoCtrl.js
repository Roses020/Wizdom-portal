const { default: axios } = require("axios")
const { APIKEY } = process.env

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
    }
}