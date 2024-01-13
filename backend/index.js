const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

/*app.use(cors());*/
app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hola_mundo_db',
    port: 3306,
  });

  connection.connect(function (err) {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
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
      console.error('Error inesperado en la conexión a la base de datos:', err);
      throw err;
    }
  });
}

handleDisconnect();
app.use(express.json());

app.post('/api/guardarNombre', (req, res) => {
  const { nombre } = req.body;
  const sqlInsert = "INSERT INTO nombres (nombre) VALUES (?)";

  connection.query(sqlInsert, [nombre], (err, result) => {
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
