const router = require("express").Router();
const userController = require("./controller.js");
const verifyToken = require('../serverAuth.js').verifyToken;

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:userId',verifyToken, userController.getUser);

router.put('/:userId',verifyToken, userController.updateUser);

router.post('/login',userController.loginUser);

router.post('/:userId',userController.removeUser);

module.exports = router;