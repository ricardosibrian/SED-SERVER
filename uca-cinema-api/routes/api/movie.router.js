const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

//Controlador de peliculas

const movieController = require("../../controllers/movie.controller")

//validaciones

const movievalidators = require("../../validators/movie.validators");
const runValidations = require("../../validators/index.middleware");

//Middlewares

const { authentication, authorization } = require('../../middlewares/auth.middewares');


// Obtener todas las películas
router.get("/", 
    authentication,
    movieController.getAllMovies);


// Crear una nueva película
router.post("/create",
    authentication,
    movievalidators.createMovieValidator,
    runValidations,
    movieController.createMovie);

//Borrar una película por su ID
router.delete("/delete",
    authentication,
    movievalidators.findMovieByIdValidator,
    runValidations,
    movieController.deleteMovie);

// Actualizar una película por su ID
router.post("/update",
    authentication,
    movievalidators.createMovieValidator,
    runValidations,
    movieController.updateMovie
);

// Encontrar una película por su género

//------------------------------------REVISAR------------------------------------

router.get("/find/:genre",
    authentication,
    movievalidators.findMovieByIdValidator,
    runValidations,
    movieController.getMoviesByGenre);


module.exports = router;