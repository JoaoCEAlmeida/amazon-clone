const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const secretKey = require("./secretKey");
const { response } = require("express");
const stripe = require("stripe")(secretKey);

// --- Setting Up API --- //
// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request recieved for this amount, ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// Listen command
exports.api = functions.https.onRequest(app);

// endpoint example
// http://localhost:5001/clone-eaea5/us-central1/api
