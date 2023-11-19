const debug = require("debug")("app:user-controller");
const ROLES = require("../data/roles.constants.json");
const db = require('../helpers/database');

const controller = {};

//Traer todos los usuarios

controller.findAllUser = async (req, res) => {
    try {
        const userId = req.user.id; 

        // Excluimos el usuario que hace la consulta
        const [users] = await db.query('SELECT * FROM users WHERE hidden = false AND id != ?', [userId]);

        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};




controller.findSomeUser = async (req, res) => {
    try {

        const userId = req.user.id; 

        // Obtener todos los usuarios no ocultos que no sean sysadmins y excluimos el usuario que hace la consulta
        const [users] = await db.query('SELECT * FROM users WHERE hidden = false AND rol != ? AND id != ?', ['sysadmin', userId]);

        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

//Eliminar usuario

// controller.deleteUser = async (req, res) => {
//     try {
//         const { identifier: userID } = req.params;

//         // Buscar el usuario por su username 
//         const sqlQuery = 'SELECT * FROM users WHERE id = ?';
//         const values = [userID];

//         const results = await db.query(sqlQuery, values);

//         // Si el usuario no existe
//         if (results.length === 0)
//             return res.status(400).json({ error: "User not found" });


//         const result = await db.query(
//             'UPDATE users SET hidden = true WHERE id = ?',
//             [userID]
//         );

//         if (result.affectedRows === 0)
//             return res.status(400).json({ error: "User delete failed" });

//         return res.status(200).json({ message: "Usuario eliminado con éxito!" });

//     } catch (error) {
//         debug(error);
//         return res.status(500).json({ error: "Error inesperado" })
//     }
// }

controller.deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        // Verificar si el ID es válido
        if (!id) {
            return res.status(400).json({ error: "Se requiere un ID válido para eliminar el usuario" });
        }

        // Buscar el usuario por su ID
        const selectQuery = 'SELECT * FROM users WHERE id = ?';
        const selectValues = [id];

        const userResults = await db.query(selectQuery, selectValues);

        // Si el usuario no existe
        if (userResults.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Si el usuario existe, procedemos a eliminarlo
        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        const deleteValues = [id];

        const deleteResult = await db.query(deleteQuery, deleteValues);

        if (deleteResult.affectedRows === 0) {
            return res.status(400).json({ error: "Error al eliminar el usuario" });
        }

        return res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

//Actualizar el rol de usuario

controller.updateRol = async (req, res) => {
    try {
        const { id, rol } = req.body;

        // Buscar el usuario por su username o email en la tabla 
        const sqlQuery = 'SELECT * FROM users WHERE id = ?'
        const values = [id];

        const results = await db.query(sqlQuery, values);

        // Si el usuario no existe
        if (results.length === 0)
            return res.status(400).json({ error: "User not found" });


        
        const result = await db.query(
            'UPDATE users SET rol = ? WHERE id = ?',
            [rol, id]
        );

        if (result.affectedRows === 0)
            return res.status(400).json({ error: "User update failed" });

            
        return res.status(200).json({ message: "Rol actualizado con éxito!" });
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error inesperado" })
    }
}


module.exports = controller;