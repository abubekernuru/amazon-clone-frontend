
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(
    process.env.STRIPE_KEY
);

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (request, response) => {
    response.status(200).send("hello world");
});

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
if(total > 0){
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    logger.log("Payment Intent:", paymentIntent);
    response.status(201).json(paymentIntent);
    
}else{
    response.status(403).json({
        message: "total must be greater than 0",
    })
}


});

exports.api = onRequest(app);