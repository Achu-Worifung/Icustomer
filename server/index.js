const express = require("express");
const cors = require("cors");
const app = express();
const crypto = require("crypto");
require("dotenv").config();
const pg = require("pg");

app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/login", (req, res) => {
  const secretKey = process.env.SECRET_KEY;

  const { email, password } = req.body;
  if (email === "icustomer@icustomer.com" && password === "password") {
    const token = jwt.sign(
      {
        email: email,
      },
      secretKey
    );
    res.json({ token: token });
  } else {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    // Extract token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Database Connection
    const client = new pg.Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 30000, // 30s timeout
    });

    await client.connect();
    console.log("Connected to the database");

    // Query the database
    const query = "SELECT * FROM b2b";
    const result = await client.query(query);

    // Close DB connection before responding
    await client.end();

    // Send response (only once)
    return res.json(result.rows);
  } catch (error) {
    console.error("Unexpected server error:", error);

    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});


app.get("/products/:id", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log('Token:', token);
  // console.log('secrete:', process.env.SECRET_KEY);

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    // console.log('token:', token);
    // console.log('secrete ', process.env.SECRET_KEY);
    // console.log('decoded:', decoded);

    if (err) {
      return res.status(500).json({
        message: "An error has occured",
      });
    } 
  });

  const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 30000, // 30 seconds timeout
  });
  // console.log("client:", client);
  client.connect();

  client.on("uncaughtException", function (err) {
    console.error(err.stack);
  });

  console.log("Connected to the database");
  
  const query = "SELECT * FROM b2b where id = " + req.params.id;
  try {
    client.query(query, (err, result) => {
      if (err) {
        console.error("an error has occured", err);
        return;
      }
      
      res.json(result.rows[0]);
    });
  } catch (error) {
    console.error(error);
  }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

