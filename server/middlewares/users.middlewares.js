const userValidation = require("../validations/userValidation");
const UsersAuthMiddleWare = (req, res, next) => {
  const { error } = userValidation.validate(req.body);
  if (!error) {
    next();
  } else {
    const { details } = error;
    const message = details[0].message;
    res.send({ message });
  }
};
module.exports = UsersAuthMiddleWare;
