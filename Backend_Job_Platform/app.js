const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const users = require('./users');
const { connect, User } = require('./db')

dotenv.config(); 

const app = express();


app.use(cors());
app.use(express.json());
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  next();
});

// Middleware para verificar el método HTTP
app.post('/users', (req, res, next) => {
  const {nombre, correo, contrasena, confirmacion} = req.body;
  
  if(req.method === 'POST') {
    next(); // Si es una solicitud POST, pasa al siguiente middleware
  } else {
    res.status(405).send('Método no permitido');
  }
});

app.post('/ingreso/verificar', async (req, res) => {
  try {
    const { correo, contrasena } = req.body; // Obtiene el correo y la contraseña del cuerpo de la solicitud
    
    const usuario = await User.findOne({ correo, contrasena });

    if (usuario) {
      res.json({ mensaje: 'Usuario registrado' });
    } else {
      res.json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al verificar el usuario' });
  }
});

// Conexión a MongoDB
connect(); // Llamamos a la función connect

// Rutas
app.use('/users', users);
app.use('/ingreso/verificar', users)

const PORT = 8080;
const host = '127.0.0.1';
console.log(PORT)
app.listen(PORT, host, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
