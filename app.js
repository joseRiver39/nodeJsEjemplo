const express = require('express');
const app = express();
require('dotenv').config();


const empleadosRoutes = require('./routes/users');

app.use(express.json());
app.use('/api/empleados',empleadosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> {
    console.log(`servidor coreriendo en el puerto ${PORT}`)
});