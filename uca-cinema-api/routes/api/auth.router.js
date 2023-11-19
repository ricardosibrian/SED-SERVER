const Express = require("express");
const router = Express.Router();

const authController = require("../../controllers/auth.controller");
const runValidations = require("../../validators/index.middleware");

const { registerValidator, updateRolValidator, updateUserDataValidator  } = require("../../validators/auth.validators");
const { authentication } = require("../../middlewares/auth.middewares");


router.post("/signup",
    registerValidator,
    runValidations,
    authController.register
);

router.post("/signin",
    authController.login
);

router.get("/whoami",
    authentication,
    authController.whoami
);

router.post("/update",
    authentication,
    authController.updateUserData
);

router.post("/newprofile",
    authentication,
    updateUserDataValidator,
    runValidations,
    authController.changeUserAndPassword
    
)

router.post("/newpassword",
    authentication,
    authController.changePassword
)

router.post("/newusername",
    authentication,
    authController.changeUsername
)

module.exports = router;