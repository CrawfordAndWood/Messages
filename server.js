const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.use("/api/areas", require("./routes/api/areas"));
app.use("/api/areahistory", require("./routes/api/areahistory"));
app.use("/api/households", require("./routes/api/households"));
app.use("/api/householdhistory", require("./routes/api/householdhistory"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/streets", require("./routes/api/streets"));
app.use("/api/dashboard", require("./routes/api/dashboard"));
app.use("/api/inventory", require("./routes/api/inventory"));
app.use("/api/households", require("./routes/api/households"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/roles", require("./routes/api/roles"));
app.use("/api/rolehistory", require("./routes/api/rolehistory"));
app.use("/api/userhistory", require("./routes/api/userhistory"));

//Serve statis assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
