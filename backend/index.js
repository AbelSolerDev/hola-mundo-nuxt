const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors()); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tu nombre de usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'hola_mundo_db',
});

app.use(express.json());

app.post('/guardarNombre', (req, res) => {
  const { nombre } = req.body;

  connection.query('INSERT INTO nombres (nombre) VALUES (?)', [nombre], (err, results) => {
    if (err) throw err;

    res.json({ mensaje: `Nombre guardado: ${nombre}` });
  });
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
