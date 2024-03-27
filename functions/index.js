// /**
//  * Import function triggers from their respective submodules:
// //  *
// const { onCall } = require("firebase-functions/v2/https");
// const { onDocumentWritten } = require("firebase-functions/v2/firestore");

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "succuss",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(404).json({
      message: "total must be greater than zero",
    });
  }
});
exports.api = onRequest(app);
