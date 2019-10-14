const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRouter = require("./products/routes.js");
const userRouter = require("./users/routes.js");
const orderRouter = require("./orders/routes.js");
const contactFormRouter = require("./contact-form/routes.js");
const discountRouter = require("./discounts/routes.js");
const imageRouter = require("./images/routes.js");


const app = express();

app.use(bodyParser.json({limit:'15mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'15mb'}));


app.use('/api/image', imageRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contact", contactFormRouter);
app.use("/api/discounts", discountRouter);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {err}
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {}
    });
  });
}

// Initialize DB
mongoose.Promise = global.Promise;
const mongooseUrl =  (process.env.MONGODB_URI || "mongodb://localhost:27017/online-shop-api");

mongoose.connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true  }).then(() => {
  console.log("Connected to db");
}).catch((err)=> console.log(err));


app.listen(9001, (err) => {
  if (err) throw err;
  console.log(`Server started on port 9001`);
});

module.exports = app;