const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://subscribe:pugazh896@cluster0.xxxxx.mongodb.net/subscribersDB"
)
.then(() => {
  console.log("MongoDB Atlas Connected");
})
.catch((err) => {
  console.log(err);
});

module.exports = mongoose;

const express = require("express");
const cors = require("cors");
require("./db");

const Subscriber = require("./models/Subscriber");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already subscribed"
      });
    }

    const newSubscriber = new Subscriber({ email });

    await newSubscriber.save();

    res.status(201).json({
      message: "Subscribed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});