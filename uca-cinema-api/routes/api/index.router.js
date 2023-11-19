const express = require("express");
const router = express.Router();
const ROLES = require("../../data/roles.constants.json");

//Importar los routers
const movieRouter = require("./movie.router");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");

const { authentication, authorization } = require('../../middlewares/auth.middewares');


//Definir las rutas
router.use("/auth", authRouter);
router.use("/movie", movieRouter);
router.use("/user",
    authentication,
    authorization(ROLES.ADMIN || ROLES.SYSADMIN),
    userRouter);

module.exports = router;