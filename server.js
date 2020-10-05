const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const score = require("./routes/api/score");


const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
// const db = require("./config/keys").mongoURI;

// const db = require("./config/keys").process.env.MONGODB_URI || 'mongodb://localhost/boiling-journey'

// Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/boiling-journey',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/score", score);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));
