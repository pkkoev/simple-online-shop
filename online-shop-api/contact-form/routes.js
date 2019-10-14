const router = require("express").Router();
const contactFormController = require("./controller.js");


router.get('/', contactFormController.getMessages);

router.post('/', contactFormController.createMessage);

router.get('/:messageId',contactFormController.getMessage);

router.post('/:messageId',contactFormController.deleteMessage);

module.exports = router;