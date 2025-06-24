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

module.exports= router;