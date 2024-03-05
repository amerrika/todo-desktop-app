const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const taskRoutes = require("./app/routes/taskRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:3031",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect to db
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ToDo Application" });
});

// task routes
app.use("/api/tasks", taskRoutes)

// set port, listen for requests
app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
