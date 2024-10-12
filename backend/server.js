const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Detail = require('./employeeDetails'); 
const User = require("./user"); 

const app = express();
app.use(express.json()); 
app.use(cors());
dotenv.config(); 

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/merncrudbase")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from header
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); 
      }
      req.user = user; 
      next();
    });
  } else {
    res.sendStatus(401); 
  }
};

// // Route to fetch all user data
// app.get("/showdata", async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from MongoDB
//     res.status(200).json(users); // Send user data as JSON
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Error fetching data" }); // Handle error
//   }
// });

// Route to register a new user
app.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const newUser = new User({
      email,
      password, // Storing password as plain text
      firstName,
      lastName,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ message: "Email already exists." });
    }
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// Route to login a user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10h', 
    });

    // If login is successful, return user's data and token
    res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName, email: user.email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Route to logout a user
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
});

// CRUD Operations for Employee Details

// Create a new employee detail
app.post("/employeeDetails", authenticateJWT, async (req, res) => {
  try {
    const { name, post, email, contactNumber } = req.body;
    const newDetail = new Detail({
      name,
      post,
      email,
      contactNumber
    });
    const savedDetail = await newDetail.save();
    res.status(201).json(savedDetail);
  } catch (error) {
    console.error("Error adding employee detail:", error);
    res.status(500).json({ message: "Error adding employee detail", error: error.message });
  }
});

// Read all employee details
app.get("/employeeDetails", authenticateJWT, async (req, res) => {
  try {
    const details = await Detail.find();  
    res.status(200).json(details);
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ message: "Error fetching employee details" });
  }
});

// Read a single employee detail by ID
app.get("/employeeDetails/:id", authenticateJWT, async (req, res) => {
  try {
    const detail = await Detail.findById(req.params.id);
    if (!detail) {
      return res.status(404).json({ message: "Employee detail not found" });
    }
    res.status(200).json(detail);
  } catch (error) {
    console.error("Error fetching employee detail:", error);
    res.status(500).json({ message: "Error fetching employee detail" });
  }
});

// Update an employee detail by ID
app.put("/employeeDetails/:id", authenticateJWT, async (req, res) => {
  try {
    const { name, post, email, contactNumber } = req.body;
    const updatedDetail = await Detail.findByIdAndUpdate(
      req.params.id,
      { name, post, email, contactNumber },
      { new: true }  // Return the updated document
    );
    if (!updatedDetail) {
      return res.status(404).json({ message: "Employee detail not found" });
    }
    res.status(200).json(updatedDetail);
  } catch (error) {
    console.error("Error updating employee detail:", error);
    res.status(500).json({ message: "Error updating employee detail" });
  }
});

// Delete an employee by ID
app.delete("/employeeDetails/:id", authenticateJWT, async (req, res) => {
  try {
    const deletedDetail = await Detail.findByIdAndDelete(req.params.id);
    if (!deletedDetail) {
      return res.status(404).json({ message: "Employee detail not found" });
    }
    res.status(200).json({ message: "Employee detail deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee detail:", error);
    res.status(500).json({ message: "Error deleting employee detail" });
  }
});

// Start the server on port 4800
app.listen(4800, () => {
  console.log("Server running on port 4800");
});
