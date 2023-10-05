import express from "express";
import jwt from "jsonwebtoken";
import session from "express-session";
import routes from "./router/friends.js";

const app = express();

let users = [];

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

app.use(
  session({ secret: "fingerpint", resave: true, saveUninitialized: true })
);
app.use(express.json());

app.use("/friends", function auth(req, res, next) {
  if (req.session.authorization) {
    console.log(`Inside friends auth`);
    let token = req.session.authorization["accessToken"];
    console.log(`Inside friends auth token:${token}`);
    jwt.verify(token, "access", (err, user) => {
      console.log(`Inside friends auth verify token:${token}`);
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    console.log(`accessToken:${accessToken},username:${username}`);
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(`username:${username},password:${password}`);

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({ message: "User successfully registered" });
    } else {
      return res.status(404).json({ message: "User already exist" });
    }
  } else {
    return res.status(404).json({ message: "Unable to register username" });
  }
});

const PORT = 5001;

app.use("/friends", routes);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
