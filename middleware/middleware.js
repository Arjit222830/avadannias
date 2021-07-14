const { Update } = require("../model/update");

module.exports = (validator, flag) => {
  return (req, res, next) => {
    const { error } = validator(req.body); //result.error(joi package)
    if (error)
      return res.status(400).render("admin", {
        j: flag,
        message: error.details[0].message,
        updates: updates,
      });
    next();
  };
};
