const debug = require("debug")("app:post-controller");
const db = require('../helpers/database');
const { use } = require("../routes/api/auth.router");

const controller = {};


//crea una pelicula

controller.createMovie = async (req, res) => {
    try {
        const { title, description, genre } = req.body;

        // Crear una nueva película
        const result = await db.query('INSERT INTO movies (title, description, genre) VALUES (?, ?, ?)', [title, description, genre]);

        if (result.affectedRows === 0)
            return res.status(400).json({ error: "No se pudo crear la película" });

        return res.status(201).json({ message: "Película creada con éxito!" });
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}


//busca todas las peliculas

controller.getAllMovies = async (req, res) => {
    try {
        // Consultar solo los títulos y géneros de las películas
        const sqlQuery = 'SELECT title, genre FROM movies';
        const [movies] = await db.query(sqlQuery);

        return res.status(200).json({ movies });
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


//borra una pelicula por id

controller.deleteMovie = async (req, res) => {
    try {
        const { id } = req.body;

        // Buscar la película por su ID
        const sqlQuery = 'SELECT * FROM movies WHERE id = ?';
        const values = [id];

        const results = await db.query(sqlQuery, values);

        // Si la película no existe
        if (results.length === 0)
            return res.status(404).json({ error: "Película no encontrada" });

        // Si la película existe, procedemos a eliminarla
        const deleteQuery = 'DELETE FROM movies WHERE id = ?';

        const result = await db.query(deleteQuery, [id]);

        if (result.affectedRows === 0)
            return res.status(400).json({ error: "Error al eliminar la película" });

        return res.status(200).json({ message: "Película eliminada con éxito" });
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}





//actualiza una pelicula por id
controller.updateMovie = async (req, res) => {
    try {
        const { id, description, genre } = req.body;

        // Buscar la película por su ID
        const sqlQuery = 'SELECT * FROM movies WHERE id = ?';
        const values = [id];

        const results = await db.query(sqlQuery, values);

        // Si la película no existe
        if (results.length === 0)
            return res.status(404).json({ error: "Película no encontrada" });

        // Si la película existe, procedemos a actualizar los campos correspondientes
        const updateQuery = 'UPDATE movies SET description = ?, genre = ? WHERE id = ?';

        const result = await db.query(updateQuery, [description, genre, id]);

        if (result.affectedRows === 0)
            return res.status(400).json({ error: "Error al actualizar la película" });

        return res.status(200).json({ message: "Datos actualizados con éxito" });
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


//busca una pelicula por id

controller.getMoviesByGenre = async (req, res) => {
    try {
        const { genre } = req.params; // Supongamos que el género se pasa como un parámetro en la URL

        // Consultar películas por género
        const sqlQuery = 'SELECT title,genre FROM movies WHERE genre = ?';
        const values = [genre];

        const [movies] = await db.query(sqlQuery, values);

        return res.status(200).json({ movies });
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


module.exports = controller;