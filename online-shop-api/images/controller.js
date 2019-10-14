const Image = require("./model.js");
const fs = require('fs');



const createImage1 = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            const error = new Error('Please upload a file');
            error.httpStatusCode = 400;
            res.send({ err: error });
            return;
        }

        let img = fs.readFileSync(req.file.path);
        img = img.toString('base64');

        let image = new Image({
            contentType: req.file.mimetype,
            data: new Buffer(img, 'base64')
        });

        image = await image.save();

        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            //console.log(req.file.path + ' was deleted');
        });

        res
            .status(201)
            .location(`/image/${image._id}`)
            .send();

    } catch (err) {
        return res.status(400).send({ err: err.toString() });
    }
};


const createImage = async (req, res) => {
    try {
        let image = new Image(req.body);
        image = await image.save();

        res
            .status(201)
            .location(`/api/images/${product._id}`)
            .send();
    } catch (err) {
        return res.status(400).send({ err: err.toString() });
    }
};




const getImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);

        if (!image) {
            return res.status(404).send({ message: "Image not found!" });
        }
        res.contentType(image.contentType);
        res.status(200).send(image.data);

    } catch (err) {
        return res.status(400).send({ err: err.toString() });
    }
};

module.exports = {
    getImage,
    createImage,
    createImage1
};