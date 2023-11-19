const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  //Validamos los errores
  const errors = validationResult(req);

  //Si hay errores
  if (!errors.isEmpty()) {
    
    return res.status(400)
      .json({
        errors: errors.array().map(error => ({
          field: error.param,
          message: error.msg
        }))
      })
  }
  //Si no hay errores
  next();
}