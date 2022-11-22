module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_IP: process.env.REDIS_IP || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
