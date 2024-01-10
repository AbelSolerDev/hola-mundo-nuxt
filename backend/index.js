const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

/*app.use(cors()); */
// Configuración CORS
app.use(cors({
  origin: 'http://localhost:3000', // Ajusta esto según sea necesario
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

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
    console.log('Error en la base de datos:', err.code);
  
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
  console.log('Solicitud recibida en /guardarNombre');
  console.log('Nombre recibido:', nombre);

  connection.query('INSERT INTO nombres (nombre) VALUES (?)', [nombre], (err, results) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    } else {
      console.log('Registro insertado en la base de datos');
      connection.commit((err) => {
        if (err) {
          console.error('Error al hacer commit en la base de datos:', err);
          res.status(500).json({ mensaje: 'Error interno del servidor' });
        } else {
          console.log('Commit exitoso');
          res.json({ mensaje: `Nombre guardado: ${nombre}` });
        }
      });
    }
  });
});

console.log(`La aplicación está escuchando en el puerto: ${port}`);


app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});


