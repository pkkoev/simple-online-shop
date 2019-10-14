const mongoose = require("mongoose");


const ImageSchema = new mongoose.Schema(
    {
        data: Buffer,
        contentType: String
    }
)


const Image = mongoose.model("Image", ImageSchema);


module.exports = Image;