const express = require("express");

const morgan = require("morgan");
const productRouter = require("./Routers/ProductRoutes");
const UserRouter = require("./Routers/UserRoutes");
const app = express();
// MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
// cREATE WON MIDDLEWARE
app.use((req, res, next) => {
  console.log("Hello Froom MiddleWare!!!!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/User", UserRouter);

module.exports = app;
