const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
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

router.post("/signup", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    sevenmarks,
    eightmarks,
    ninemarks,
    tenmarks,
    elevenmarks,
    twelvemarks,
    collegepercent,
  } = req.body;
  console.log(req.body);
  if (!first_name || !last_name || !email || !password) {
    return res.status(422).json({ error: "Please fill the form correctly" });
    console.log("resp gaya");
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else {
      const user = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        sevenmarks: sevenmarks,
        eightmarks: eightmarks,
        ninemarks: ninemarks,
        tenmarks: tenmarks,
        elevenmarks: elevenmarks,
        twelvemarks: twelvemarks,
        collegepercent: collegepercent,
      }); //new User({first_name,last_name,email,password})
      console.log(user);

      await user.save();

      res.status(201).json({ message: "user registered successfuly" });
    }
  } catch (err) {
    // alternative to .catch(err => {console.log(err) })
    console.log(err);
  }
});

//cards display
router.get("/display", async function (req, res) {
  try {
    const userExist = await User.find({});
    console.log(userExist);
    if (userExist) {
      res.send(userExist);
    }
  } catch (err) {
    res.send(err);
  }
});

//userdata
router.get("/userdata", authenticate, async function (req, res) {
  const email = res.locals.email;
  if (!email) {
    return res.status(422).json({ error: "Please login" });
  }
  try {
    const userdata = await User.findOne({ email: email });
    if (!userdata) {
      res.send("No data found");
    } else {
      const user = new User({
        sevenmarks: userdata.sevenmarks,
        eightmarks: userdata.eightmarks,                             //object banega
        ninemarks: userdata.ninemarks,
        tenmarks: userdata.tenmarks,
        elevenmarks: userdata.elevenmarks,
        twelvemarks: userdata.twelvemarks,
        collegepercent: userdata.collegepercent,
      });
      res.send(user);
    }
  } catch (err) {
    res.send(err);
  }
});

//about us
router.get("/about", authenticate, (req, res) => {
  console.log("Hello-about");
  res.send("Hello about from server");
});

//login route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please flll the data" });
    }

    const userLogin = await User.findOne({ email: email }); //UserLogin mei saare details aagaye

    //console.log(userLogin)
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await jwt.sign(
        { email: userLogin.email },
        process.env.SECRET_KEY
      ); //token mei email bharna
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000), //token aise save hota hai cookie mei
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Creds" });
      } else {
        //res.json({email:email,message:"user Signin Successfully"})
        //console.log(email)
        res.send({ email });
      }
    } else {
      res.status(400).json({ error: "Invalid Creds in else" });
    }
  } catch (err) {
    console.log(err);
    window.alert("hry");
  }
});

module.exports = router;
