import express from "express";

const router = express.Router();

let friends = {
  "ankitehlan@gamil.com": {
    firstName: "Ankit",
    lastName: "Tehlan",
    DOB: "20-06-1990",
  },
  "ankitehlan.work@gamil.com": {
    firstName: "Ahana",
    lastName: "Tehlan",
    DOB: "20-10-2017",
  },
  "Swatitehlan22@gamil.com": {
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
  // Update the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  // Update the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  // Update the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  // Update the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

export default router;
