const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

/*app.use(cors());*/ 
const corsOptions = {
  origin: 'http://localhost:3000', // Cambia esto si es necesario
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tu nombre de usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'hola_mundo_db',
  port: 3306,
});*/
let connection;

function handleDisconnect() {
  console.log('Intentando conectar a la base de datos...');

  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hola_mundo_db',
    port: 3306,
  });

  console.log('Conexión a la base de datos creada.');

  connection.connect(function (err) {
    if (err) {
      console.log('Error al conectar a la base de datos:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });

  connection.on('error', function (err) {
    console.log('Error en la base de datos:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Conexión perdida. Intentando reconectar...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}


handleDisconnect();
app.use(express.json());

app.post('/guardarNombre', (req, res) => {
  const { nombre } = req.body;
  console.log('Nombre recibido:', nombre);

  connection.query('INSERT INTO nombres (nombre) VALUES (?)', [nombre], (err, results) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    } else {
      console.log('Registro insertado en la base de datos');
      res.json({ mensaje: `Nombre guardado: ${nombre}` });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
