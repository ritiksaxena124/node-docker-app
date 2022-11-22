const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const path = require("path");
const cors = require("cors");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_IP,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
let redisClient = redis.createClient({
  url: `redis://${REDIS_IP}:${REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.log("Error " + err);
});
redisClient.on("connect", (err) => {
  console.log("Connected with redis");
});

// connecting with the database
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("error:", e));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.enable("trust proxy");

// Configure Session Middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 30000,
    },
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/signin.html"));
});
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening at ${PORT}`));
