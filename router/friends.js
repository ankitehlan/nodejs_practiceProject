import express from "express";

const router = express.Router();

let friends = {
  "ankitehlan@gmail.com": {
    firstName: "Ankit",
    lastName: "Tehlan",
    DOB: "20-06-1990",
  },
  "ankitehlan.work@gmail.com": {
    firstName: "Ahana",
    lastName: "Tehlan",
    DOB: "20-10-2017",
  },
  "swatitehlan22@gmail.com": {
    firstName: "Swati",
    lastName: "Tehlan",
    DOB: "22-08-1995",
  },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  res.send(friends);
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  console.log(`Inside get friends by email: ${email}`);
  res.send(friends[email]);
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  if (req.body.email) {
    friends[req.body.email] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
    };
    res.send(
      `User ${req.body.firstName} ${req.body.lastName} has been added!. List of all friends: ${friends}`
    );
  } else {
    res.send(`Unable to add user with email: ${req.body.email}`);
  }
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let friend = friends[email];
  if (friend) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let DOB = req.body.DOB;

    if (firstName) {
      friend["firstName"] = firstName;
    }

    if (lastName) {
      friend["lastName"] = lastName;
    }

    if (DOB) {
      friend["DOB"] = DOB;
    }

    res.send(`Details of ${email} has been updated`);
  } else {
    res.send(`Unable to find friend: ${email}`);
  }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  let friend = friends[email];
  if (friend) {
    delete friends[email];
    res.send(`Friend: ${email} has been deleted!`);
  }
  res.send(`Unable to find friend ${email}`);
});

export default router;
