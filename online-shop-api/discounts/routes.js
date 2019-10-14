const router = require("express").Router();
const discountController = require("./controller.js");


router.get('/', discountController.getDiscounts);

router.post('/', discountController.createDiscount);

router.get('/:discountId',discountController.getDiscount);

router.put('/:discountId',discountController.updateDiscount);

router.post('/:discountId',discountController.deleteDiscount);

module.exports = router;