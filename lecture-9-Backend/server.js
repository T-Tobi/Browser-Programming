const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "My first API works!",
    message: "Hello",
    course: "Browser Programming",
    year: 2026,
    name: "Ashaolu Oluwatobiloba",
    role: "Student",
    time: new Date(),
  });
});

// app.get("/api/message2", (req, res) => {
//   res.json({
//     message: "Hello",
//     course: "Browser Programming",
//     year: 2026,
//   });
// });

// app.get("/api/student", (req, res) => {
//   res.json({
//     name: "Your Name",
//     role: "Student"
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
