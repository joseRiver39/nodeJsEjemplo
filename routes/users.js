const express = require('express');
const router = express.Router();
const db = require('../db/connection');


//obtener los empleados
router.get('/',(req, res)=>{
 db.query('Select * from recursos_humanos_bd.empleados', (err, results)=>{
    if(err)
    {
        return res.status(500).json({error:'Error en la consulta'})
    }
    console.log('aca estamos')

    res.json(results);
 });
});

// Crear un nuevo empleado
router.post('/', (req, res) => {
    const { nombre, departamento, sueldo } = req.body;

    if (!nombre || !departamento || sueldo === undefined) {
        return res.status(400).json({ error: 'Todos los campos (nombre, departamento, sueldo) son requeridos.' });
    }

    const query = 'INSERT INTO recursos_humanos_bd.empleados (nombre, departamento, sueldo) VALUES (?, ?, ?)';
    db.query(query, [nombre, departamento, sueldo], (err, results) => {
        if (err) {
            console.error('Error al crear empleado:', err);
            return res.status(500).json({ error: 'Error al crear el empleado' });
        }
        res.status(201).json({ id_empleado: results.insertId, nombre, departamento, sueldo });
    });
});

// Obtener un empleado por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM recursos_humanos_bd.empleados WHERE id_empleado = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener empleado por ID:', err);
            return res.status(500).json({ error: 'Error al obtener el empleado' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(results[0]);
    });
});

// Actualizar un empleado existente
router.put('/', (req, res) => { // URL cambiada, ya no toma :id de params
    const { id_empleado, nombre, departamento, sueldo } = req.body; // id_empleado ahora viene del body

    if (!id_empleado || !nombre || !departamento || sueldo === undefined) {
        return res.status(400).json({ error: 'Todos los campos (id_empleado, nombre, departamento, sueldo) son requeridos en el body para la actualización.' });
    }

    const query = 'UPDATE recursos_humanos_bd.empleados SET nombre = ?, departamento = ?, sueldo = ? WHERE id_empleado = ?';
    db.query(query, [nombre, departamento, sueldo, id_empleado], (err, results) => { // Usar id_empleado del body
        if (err) {
            console.error('Error al actualizar empleado:', err);
            return res.status(500).json({ error: 'Error al actualizar el empleado' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado para actualizar' });
        }
        res.json({ message: 'Empleado actualizado correctamente', id_empleado: parseInt(id_empleado), nombre, departamento, sueldo });
    });
});

// Eliminar un empleado
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM recursos_humanos_bd.empleados WHERE id_empleado = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar empleado:', err);
            return res.status(500).json({ error: 'Error al eliminar el empleado' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Empleado eliminado correctamente', id_empleado: parseInt(id) });
        // Alternativamente, se puede devolver un estado 204 No Content sin cuerpo de respuesta:
        // res.status(204).send();
    });
});

module.exports= router;