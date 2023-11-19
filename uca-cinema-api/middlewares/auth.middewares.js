const { verifyToken } = require("../utils/jwt.tools");
const debug = require("debug")("app:auth-middleware");
const db = require("../helpers/database");

const ROLES = require("./../data/roles.constants.json");

const middlewares = {};
const tokenPrefix = "Bearer"

middlewares.authentication = async (req, res, next) => {
  try {
    //Paso 01: Obtener el token
    const { authorization } = req.headers;

    //console.log(authorization);

    if (!authorization) {
      return res.status(401).json({ error: "No autorizado" });
    }

    //Paso 02: Verificar que sea un token valido
    const [prefix, token] = authorization.split(" ");

    if (prefix !== tokenPrefix) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (!token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const tokenObject = verifyToken(token);

    if (!tokenObject) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const { userId } = tokenObject;

    //Paso 03: Obtener al usuario
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';

    const values = [userId];

    const user = await db.query(sqlQuery, values);

    if (!user) {
      return res.status(401).json({ error: "No autorizado1" });
    }

    
    const UserToken = user[0][0].token.toString();
    

    const isTokenValid = UserToken.includes(token);

    if (!isTokenValid) {
      return res.status(401).json({ error: "No autorizado" });
    }

    //Paso 05: Modificar la req para tener la info del usuario
    req.user = user[0][0];
    req.token = token;


    //Paso 06: Pasar al siguiente middleware
    next();
  } catch (error) {
    debug({ error })
    console.log(error);
    return res.status(500).json({ error: "Error inesperado de servidor" });
  }
}

//Este parámetro representa el rol necesario para acceder a la ruta protegida. 
//Si no se proporciona, se asumirá que el rol requerido es ROLES.SYSADMIN.

middlewares.authorization = (roleRequired = ROLES.SYSADMIN) => {
  return (req, res, next) => {
    try {
      //Paso 0: Asumir que se ejecuta después del proceso de autenticacion
      //OJO req.user es un array, toma el primer elemento, de lo contrario usa directamente req.user
      const { rol } = req.user;

      debug({ rol });

      //Paso 1: Verificar si el rol existe en el arreglo
      const roleIndex = rol === roleRequired || rol === ROLES.SYSADMIN;

      //Paso 2: Realizar el filtro de rol
      if (!roleIndex) {
        return res.status(403).json({ error: "You dont have access, beacuse you are not an administrator" });
      }

      //Paso 3: Pasar al siguiente middleware
      next();
    } catch (error) {
      console.error(error);
      debug({ error });
      return res.status(500).json({ error: "Error inesperado de servidor" });
    }
  }
}

// middlewares.authorization = () => {
//   return (req, res, next) => {
//       try {
//           // Si req.user es un array, toma el primer elemento, de lo contrario usa directamente req.user
//           const user = Array.isArray(req.user) ? req.user[0] : req.user;
//           const { rol } = user;

//           console.log(user); // Verifica qué contiene user en la consola
//           console.log(rol); // Verifica qué contiene rol en la consola

//           console.log(ROLES.SYSADMIN);

//           isAdmin = rol === ROLES.SYSADMIN;

//           console.log(isAdmin);
//           // Verifica si el rol NO es SYSADMIN ni ADMIN
//           if (!isAdmin) {
//             return res.status(403).json({ error: "No tienes acceso porque no eres un administrador" });
//           }
//           next();
//       } catch (error) {
//           console.error(error);
//           return res.status(500).json({ error: "Error inesperado de servidor" });
//       }
//   };
// };


module.exports = middlewares;