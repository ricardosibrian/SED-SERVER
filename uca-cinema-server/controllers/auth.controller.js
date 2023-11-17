const debug = require("debug")("app:auth-controller");
const ROLES = require("../data/roles.constants.json");
const bcrypt = require('bcrypt');
const db = require('../helpers/database');

const { createToken } = require("../utils/jwt.tools");

const controller = {};



// Crear una función asíncrona para generar un hash de una contraseña
const hashPassword = async (password) => {
    // Generar un salt aleatorio
    const salt = await bcrypt.genSalt(10);
    // Generar el hash de la contraseña con el salt
    const hash = await bcrypt.hash(password, salt);
    // Devolver el hash
    return hash;
};

// Crear una función asíncrona para comparar una contraseña con un hash
const comparePassword = async (password, hash) => {
    // Usar bcrypt para verificar si la contraseña coincide con el hash
    const match = await bcrypt.compare(password, hash);
    // Devolver el resultado
    return match;
};

// REGISTRO
controller.register = async (req, res) => {
    try {
        // REQ.BODY = USER DATA
        const { username, email, password, first_name, last_name } = req.body;

        // Validar que los datos sean válidos
        if (!username || !email || !password || !first_name || !last_name)
            return res.status(400).json({ error: 'Faltan datos' });

        // Encriptar la contrasena 
        const encryptedPassword = await hashPassword(password);

        // Crear una consulta SQL para insertar el usuario en la tabla usuario
        const sqlQuery = 'INSERT INTO users (username, email, password, rol, first_name, last_name) VALUES (?, ?, ?,?, ?, ?)';
        const values = [username, email, encryptedPassword, ROLES.USER, first_name, last_name];

        const rows = await db.query(sqlQuery, values);
        
        console.log(rows);

        if (rows.affectedRows === 0) {
            return res.status(400).json({ error: "No se ha podido crear el usuario" });
        }
        // Devolver una respuesta al cliente


        return res.status(201).json({ message: "Usuario creado con éxito!"});
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error inesperado" })
    }
}


// LOGIN
controller.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Buscar el usuario por su username o email en la tabla
        const sqlQuery = 'SELECT * FROM users WHERE username = ? OR email = ?'
        const values = [identifier, identifier];

        const results = await db.query(sqlQuery, values);

        if (results.length > 0) {
            const user = results[0][0];

            //console.log(user);

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = createToken(user.id);

                const sqlUpdateToken = 'UPDATE users SET token = ? WHERE id = ?';
                const updateValues = [token, user.id];
                const updateResult = await db.query(sqlUpdateToken, updateValues);

                if (updateResult.affectedRows === 0) {
                    return res.status(400).json({ error: "User login failed" });
                }

                return res.status(200).json({ token: token });
            } else {
                return res.status(400).json({ error: "Invalid password" });
            }
        } else {
            return res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        debug(error);
        console.log(error);
        return res.status(500).json({ error: "Unexpected error" });
    }
}


//Identificar al usuario que hace la petición
controller.whoami = async (req, res) => {
    try {
        const { id, username, email, rol} = req.user;
        return res.status(200).json({ id, username, email, rol });
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Unexpected error" })
    }
}


//TODO: cambiar nombre y cobtraseña
// UPDATE USER DATA
controller.updateUserData = async (req, res) => {
    try{
        const { id, email } = req.body;

        // Buscar el usuario por su username o email en la tabla
        const sqlQuery = 'SELECT * FROM users WHERE id = ?'
        const values = [id];

        const results = await db.query(sqlQuery, values);

        console.log(id);
        console.log(results);
    
        // Si el usuario no existe
        if (results[0].length === 0)
            return res.status(400).json({ error: "User not found" });

        // Si el usuario existe, actualizar el email

        const result = await db.query(
            'UPDATE users SET email = ? WHERE id = ?', 
            [email, id]
            );

        if (result.affectedRows === 0) 
            return res.status(400).json({ error: "User update failed" });

        return res.status(200).json({message: "Datos actualizados con éxito!"});
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error inesperado" })
    }
}

//cambiar contraseña y nombre de usuario
controller.changeUserAndPassword = async (req, res) => {
    try {
        // REQ.BODY = USER DATA
        const { id, username, password } = req.body;

        // Validar que los datos sean válidos
        if (!id || !password || !username) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        // Encriptar la contrasena 
        const encryptedPassword = await hashPassword(password);

        // Cambiar la contraseña en la base de datos
        const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
        const updatePasswordValues = [encryptedPassword, id];

        const updatePasswordResult = await db.query(updatePasswordQuery, updatePasswordValues);

        if (updatePasswordResult.affectedRows === 0) {
            return res.status(400).json({ error: "No se ha podido cambiar la contraseña del usuario" });
        }


        // Cambiar el nombre de usuario en la base de datos
        const updateUsernameQuery = 'UPDATE users SET username = ? WHERE id = ?';
        const updateUsernameValues = [username, id];

        const updateUsernameResult = await db.query(updateUsernameQuery, updateUsernameValues);

        if (updateUsernameResult.affectedRows === 0) {
            // Revertir el cambio de contraseña si no se pudo cambiar el nombre de usuario
            await db.query(updatePasswordQuery, [password, id]);

            return res.status(400).json({ error: "No se ha podido cambiar el nombre de usuario" });
        }

        // Devolver una respuesta al cliente
        return res.status(200).json({ message: "Contraseña cambiada con éxito!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error inesperado" });
    }
};


//cambiar contraseña
controller.changePassword = async (req, res) => {
    try {
        // REQ.BODY = USER DATA
        const { id, password } = req.body;

        // Validar que los datos sean válidos
        if (!id || !password) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        // Encriptar la contrasena 
        const encryptedPassword = await hashPassword(password);

        
        const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
        const updateValues = [encryptedPassword, id];

        const updateResult = await db.query(updateQuery, updateValues);

        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ error: "No se ha podido cambiar la contraseña del usuario" });
        }

        // Devolver una respuesta al cliente
        return res.status(200).json({ message: "Contraseña cambiada con éxito!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error inesperado" });
    }
};


//cambiar nombre de usuario
controller.changeUsername = async (req, res) => {
    try {
        // REQ.BODY = USER DATA
        const { id, username } = req.body;

        // Validar que los datos sean válidos
        if (!id || !username) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const updateQuery = 'UPDATE users SET username = ? WHERE id = ?';
        const updateValues = [username, id];

        const updateResult = await db.query(updateQuery, updateValues);

        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ error: "No se ha podido cambiar el nombre de usuario" });
        }

        // Devolver una respuesta al cliente
        return res.status(200).json({ message: "Nombre de usuario cambiado con éxito!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error inesperado" });
    }
};

module.exports = controller;