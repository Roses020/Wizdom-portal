require('dotenv').config()
 const {User} = require('../models/user')
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')
 const {SECRET} = process.env


 const createToken = (username, id) => {
    return jwt.sign({username, id},SECRET,{expiresIn: '2 days'})
 }
 
module.exports = {

    register: async(req, res) => {
       try {
        const {username, password,} = req.body;
        let foundUser = await User.findOne({where: {username}});

          if(foundUser){
            console.log(foundUser)
            res.status(400).send('That username is taken, please register with a different username');
          } else {
             const salt = bcrypt.genSaltSync(10);
             const hash = bcrypt.hashSync(password, salt);
             const newUser = await User.create({
                username: username,
                hashedPass: hash,
              
             });
             console.log("newUser", newUser);
             const token = createToken(
               newUser.dataValues.username,
               newUser.dataValues.id
             );
             console.log("token", token);
              const exp = Date.now() + 1000 * 60 * 60 * 48
              res.status(200).send({
                username: newUser.username,
                userId: newUser.id,
                token,
                exp,
              });
          }

       } catch(err) {
        console.log(err)
        res.sendStatus(400)
       }
    },
    login: async (req, res) => {
        try {
         const { username, password } = req.body;
         const foundUser = await User.findOne({ where: {username} });
         if (foundUser) {
             console.log(foundUser)
             const isAuthenticated = bcrypt.compareSync(
               password,
               foundUser.hashedPass
             );

             if (isAuthenticated) {
               const token = createToken(
                 foundUser.dataValues.username,
                 foundUser.dataValues.id
               );
               const exp = Date.now() + 1000 * 60 * 60 * 48;
     
               res.status(200).send({
                 username: foundUser.dataValues.username,
                 userId: foundUser.dataValues.id,
                 token,
                 exp,
               });
             } else {
               res.status(400).send("There is no user with that username");
             }
           } else {
             res.status(400).send("cannot log in");
           }
         } catch (error) {
           console.log("error in the login function");
           console.log(error);
           res.sendStatus(400);
         }
       },
     };
     