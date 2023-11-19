const Express = require("express");
const router = Express.Router();

const userController = require("../../controllers/user.controller");
const runValidations = require("../../validators/index.middleware");
const ROLES = require("../../data/roles.constants.json");

const { updateRolValidator } = require("../../validators/auth.validators");
const { authentication, authorization } = require("../../middlewares/auth.middewares");

// Obtener todos los usuarios
router.get("/", 
    authentication, 
    authorization(ROLES.SYSADMIN), 
    userController.findAllUser
);

// Obtener todos los usuarios que no sean sysadmins
router.get("/some", 
    authentication, 
    authorization(ROLES.ADMIN), 
    userController.findSomeUser
);

// Actualizar el rol de usuario
router.post("/updateRol",
    authentication,
    authorization(ROLES.SYSADMIN),
    updateRolValidator,
    runValidations,
    userController.updateRol
);

// Eliminar usuario
router.delete("/deleteUser",
    authentication,
    authorization(ROLES.SYSADMIN),
    userController.deleteUser);

module.exports = router;