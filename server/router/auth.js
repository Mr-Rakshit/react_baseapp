const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('../db/conn')
const User = require("../model/userSchema")
router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

// router.post('/register', (req, res) => {
//     const { first_name, last_name, email, password} = req.body

//     if(!first_name || !last_name || !email || !password) {
//         return res.status(422).json({error:"Please fill the form correctly"})
//     }

//     User.findOne({ email: email})
//         .then((userExist) => {
//             if(userExist) {
//                 return res.status(422).json({ error: "Email already exists"})
//             }
        
        
//         const user = new User({first_name:first_name,last_name:last_name,email:email,password:password})  //new User({first_name,last_name,email,password}) 

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfuly" })
//         }).catch((err) => res.status(500).json({ error: "Failed to registered"}))

//         }).catch(err => {console.log(err) })
// });

router.post('/signup',async (req, res) => {
    const { first_name, last_name, email, password} = req.body
    console.log(req.body)
    if(!first_name || !last_name || !email || !password) {
        return res.status(422).json({error:"Please fill the form correctly"})
        console.log("resp gaya")
    }
    
    try {
        const userExist= await User.findOne({ email: email})
        
        if(userExist){
            return res.status(422).json({ error: "Email already exists"})
        }else {
            const user = new User({first_name:first_name,last_name:last_name,email:email,password:password})  //new User({first_name,last_name,email,password}) 
        console.log(user)


            await user.save()
    
            res.status(201).json({ message: "user registered successfuly" })
    
        }
    } catch(err) {                 // alternative to .catch(err => {console.log(err) })
        console.log(err) 
    }
    
});

//cards display
router.get('/display',async (req, res) => {
    windows.alert("hey")
    try {
        // const userExist= await User.inventory.find( {} )
        
        // if(userExist){
        //    const user = {name:"",email:""}
        //    user.name = userExist.first_name,
        //    user.email = userExist.email
           
        //    user.map((curr) => {
        //        const {first_name,email} = curr
        //        windows.alert(first_name)
        //        console.log(email)
        //    })
          

           

        //     return res.send(user)
        // }
        res.send("hey")
    } catch(err) {                 // alternative to .catch(err => {console.log(err) })
        console.log(err) 
    }
    
});

//login route
router.post('/signin', async (req,res) => {
    try{
        let token
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({error:"Please flll the data"})
        }

        const userLogin = await User.findOne({ email:email })  //UserLogin mei saare details aagaye

        //console.log(userLogin)
        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            token = await jwt.sign({email:userLogin.email},process.env.SECRET_KEY)
            console.log(token)

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            })

            if(!isMatch) {
                res.status(400).json({error:"Invalid Creds"})
            } else {
                res.json({message:"user Signin Successfully"})
            }
        }else {
            res.status(400).json({error:"Invalid Creds in else"})
        }

        
       

    } catch (err) {
        console.log(err)
        window.alert("hry")
    }
})



module.exports = router;