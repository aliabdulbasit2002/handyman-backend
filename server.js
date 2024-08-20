const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path") ;

// ROUTERS
const clientAuth = require("./routes/clientAuth");
const freelancer = require("./routes/freelancerAuth");
const booking = require("./routes/bookings");
const transaction = require("./routes/Transactions");
const business = require("./routes/business");
// const comments = require("./routes/comments");
const request = require("./routes/Request");
const comments = require("./routes/commentsRoute");

const app = express();
const port = process.env.PORT || 3001;
//configure doten
dotenv.config() ;
// app.use(
//   cors({
//     origin: ["*", "https://hh-ocmv.onrender.com/", "http://localhost:5173/"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// ); //ENABELING CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (you can specify specific origins instead of '*')
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE, OPTIONS"); // Allow the specified HTTP methods
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   ); // Allow the specified headers
//   next();
// });
app.use(cors({ origin: "https://handyman-topaz.vercel.app/", credentials: true }));

// MIDDLEWARES
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, "Handyman")));
//connect to mongodb database using Mongoose and the connection string from .env file
mongoose.connect(process.env.MONGODB_URL, {}).then((resp) => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    console.log("Connected to DBase");
  });
});

// ROUTES
app.use("/client", clientAuth);
app.use("/freelancer", freelancer);
app.use("/business", business);
app.use("/comments", comments);
app.use("/request", request);
app.use("/transaction", transaction);
