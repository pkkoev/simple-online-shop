const ContactForm = require("./model.js");

const getMessages = async (req, res)  => {
  try {
    const messages = await ContactForm.find({});
    res.status(200).send(messages);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
}

const createMessage = async (req, res) => {
  try {
    let message = new ContactForm(req.body);
    message = await message.save();

    res
      .status(201)
      .location(`/api/messages/${message._id}`)
      .send();
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await ContactForm.findById(req.params.messageId);

    if (!message) {
      return res.status(404).send({message: "Order not found!"});
    }

    res.status(200).send(message);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await ContactForm.findByIdAndRemove(req.params.messageId);

    if (!message) {
      return res.status(404).send({message: "Message not found!"});
    }

    res.status(204).send();
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

module.exports = {
  getMessages,
  createMessage,
  getMessage,
  deleteMessage
};