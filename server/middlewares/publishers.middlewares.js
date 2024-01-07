const publisherValidation = require("../validations/publisherValidation");
const PublishersAuthMiddleWare = (req, res, next) => {
  const { error } = publisherValidation.validate(req.body);
  if (!error) {
    next();
  } else {
    const { details } = error;
    const message = details[0].message;
    res.send({ message });
  }
};
module.exports = PublishersAuthMiddleWare;
