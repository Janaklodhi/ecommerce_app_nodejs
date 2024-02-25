const bcryptjs = require("bcrypt");
const models = require("../models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

function sign_up(req, res) {
  // Check if the email already exists in the database
  models.User.findOne({ where: { email: req.body.email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      } else {
        // Generate salt and hash the password
        bcryptjs
          .genSalt(10)
          .then((salt) => bcryptjs.hash(req.body.password, salt))
          .then((hash) => {
            // Create the user in the database
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
              user_role: req.body.userRole
            };

            return models.User.create(user);
          })
          .then((result) => {
            console.log(result);
            sendVerificationEmail(result.email, result.name);
            res.status(200).json({
              message: "User created successfully",
              user: result
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Error creating user",
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error checking existing user",
        error: error,
      });
    });
}

// verify user email address here//
function sendVerificationEmail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "janakthakur346@gmail.com",
      password: "zxdt ehil hxuf nmot",
    },
  });

// email options // 
  const mailOptions = {
    from: "janakthkaur346@gmail.com",
    to: email,
    subject: "Email verification",
    text: "Click the following link to verify your email: http://your-verification-link",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
}


// user login API//
function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (error, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                "secret",
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication Successful!",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid Credentials",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      req.status(500).json({
        message: "Internal server error",
      });
    });
}
module.exports = {
  sign_up: sign_up,
  login: login,
};
