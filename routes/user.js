// to create the register and login API's for authentication

const express = require("express"); // access to express
const bcrypt = require("bcrypt"); // library to hash password
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10); // hasing the password before saving to db
  const dbUser = await User.create(user);
  res.send(dbUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const dbUser = await User.findOne({ email }); // to find user by email in the db
  isPasswordSame = await bcrypt.compare(password, dbUser.password);
  if (isPasswordSame) {
    //generate token
    const token = jwt.sign(
      { email: dbUser.email, role: dbUser.role },
      process.env.JWT_SECRET, //email and role are 2 keys that we are sending on the payload
    );
    res.send({ token });
  } else {
    //throw error
    res.status(401).send("Unauthorised");
  }
  // res.send({ isPasswordSame });
});

module.exports = router;
