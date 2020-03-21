const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/streets", require("./routes/api/streets"));
app.use("/api/dashboard", require("./routes/api/dashboard"));
app.use("/api/inventory", require("./routes/api/inventory"));
app.use("/api/households", require("./routes/api/households"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
