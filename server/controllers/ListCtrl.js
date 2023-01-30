const {User} = require('../models/user');
const {   SavedVideoList } = require('../models/savedVideoList')

module.exports = {
    AddList: async (req, res) => {
        try {
            const { userId, list } = req.body
            await SavedVideoList.create({ listName:list, userId}) 
      
            res.sendStatus(200)
            console.log('adding list ' + list)
          } catch (error) {
            console.log('ERROR in addListt')
            console.log(error)
            res.sendStatus(400)
          }
        },
        getLists: async (req, res) => {
         try {
          const { userId } = req.params
          const lists =  await SavedVideoList.findAll({where: { userId }})
          res.status(200).send(lists)
         }
         catch(err){

         }
        }
}
