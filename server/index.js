require('dotenv').config()

const express= require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env


const { User } = require('./models/user')
const { SavedVideoList } = require('./models/savedVideoList')
const { Video } = require('./models/videos')
const { sequelize } = require('./util/database')

const { login, register } = require('./controllers/authCtrl')
const { isAuthenticated } = require('./middleware/isAuthenticated')
const { getVideos } = require('./controllers/VideoCtrl')
const { AddList, getLists } = require("./controllers/ListCtrl")
// const { seedDatabase } = require('./util/seed')




const app = express()
 
app.use(express.json())
app.use(cors())

app.get("/Lists/:userId", getLists)
app.post("/AddList", AddList)

app.post('/register', register)
app.post('/login', login)

app.get('/GetVideos/:Search', getVideos)

User.hasMany(SavedVideoList)
SavedVideoList.belongsTo(User)
SavedVideoList.hasMany(Video)
Video.belongsTo(SavedVideoList)


// sequelize.sync({force: true}).then(() => seedDatabase())
sequelize.sync()
.then(() => {
app.listen(SERVER_PORT, ()  => console.log(`take us to port ${SERVER_PORT}!`))
})
.catch(err => console.log(err))