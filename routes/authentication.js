import { validateLoginInput } from "../validation/login.js";
import { createToken } from "../configs/passport.js";
import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  const { username, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const token = createToken({ username, password });
  return res.status(200).json({
    status: "success",
    token,
  });
});

export default router;
// const router = express.Router();
// const keys = require("../../config/keys").secretOrKey;
// const jwt = require("jsonwebtoken");
// const passport = require("passport");

// //load input validation

// const validateLoginInput = require("../../validation/login");

// router.post("/login", (req, res) => {
//   // validation
//   const { errors, isValid } = validateLoginInput(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   const email = req.body.email;
//   const password = req.body.password;

//   //Find user by email
//   User.findOne({ email }).then((user) => {
//     // checkfor user
//     if (!user) {
//       errors.email = "User not found";
//       return res.status(404).json(errors);
//     }
//     // Check password
//     bcrypt.compare(password, user.password).then((isMatch) => {
//       if (isMatch) {
//         //usermatched
//         const payload = {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           avatar: user.avatar,
//           wallet: user.wallet,
//           referred_by: user.referred_by,
//           isAdmin: user.isAdmin,
//         }; //create JWT Payload

//         //Sign Token
//         jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
//           res.json({
//             success: true,
//             token: "Bearer " + token,
//           });
//         });
//       } else {
//         errors.password = "Password incorrect";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// module.exports = router;
