const { body, param } = require("express-validator");
const validators = {};


// Validaciones para crear una película

validators.createMovieValidator = [
  body("title")
    .isString().withMessage("El título debe ser un string")
    .notEmpty().withMessage("El título no debe ser vacío"),

  body("description")
    .notEmpty().withMessage("La descripción no debe ser vacía")
    .isLength({ max: 280 }).withMessage("La descripción no debe superar los 280 caracteres"),

  body("genre")
    .notEmpty().withMessage("El género no debe ser vacío")
    .isString().withMessage("El género debe ser un string"),

];


// Validaciones para eliminar una película

validators.findMovieByIdValidator = [
  body("id")
    .notEmpty().withMessage("El id no debe ir vacío")
    .isInt().withMessage("El id debe ser un número entero"),
];


module.exports = validators;