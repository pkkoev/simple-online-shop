const Discount = require("./model.js");

const getDiscounts = async (req, res)  => {
  try {
    const discounts = await Discount.find({}); 
    res.status(200).send(discounts);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
}

const createDiscount = async (req, res) => {
  try {
    let discount = new Discount(req.body);
    discount = await discount.save();

    res
      .status(201)
      .location(`/api/discounts/${discount._id}`)
      .send();
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const getDiscount= async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.discountId);

    if (!discount) {
      return res.status(404).send({message: "Discount not found!"});
    }

    res.status(200).send(discount);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const updateDiscount = async (req, res) => {
  try {
    const {discountName, amount, max_uses,curr_uses,starts_at,expires_at} = req.body;

    const discount = await Discount.findByIdAndUpdate(
      req.params.discountId,
      {$set: {discountName, amount, max_uses, curr_uses,starts_at,expires_at}}
    );

    if (!discount) {
      return res.status(404).send({message: "Discount not found!"});
    }

    res.status(200).send(discount);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndRemove(req.params.discountId);

    if (!discount) {
      return res.status(404).send({message: "Discount not found!"});
    }

    res.status(204).send();
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

module.exports = {
  getDiscounts,
  createDiscount,
  getDiscount,
  updateDiscount,
  deleteDiscount
};