const multer = require('multer');

const imageRouter = require("express").Router();
const imageController = require("./controller.js");

//set up multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './temp/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

upload = multer({ storage: storage });


//imageRouter.post("/", imageController.createImage);
imageRouter.post("/", upload.single('image'), imageController.createImage1);
imageRouter.get("/:imageId", imageController.getImage);

module.exports = imageRouter;