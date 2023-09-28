const express = require('express');
const User = require('./User').User;


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { correo } = req.body; // Obtén el correo electrónico del cuerpo de la solicitud

    // Busca un usuario por su correo electrónico
    const usuario = await User.findOne({ correo });

    if (usuario) {
      res.json(usuario); // Si se encuentra el usuario, devuélvelo como respuesta
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});


router.post('/users', async (req, res) => {
   
    const { nombre, correo, contrasena, confirmacion } = req.body;
    const usuario = new User({ 
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
      confirmacion: confirmacion,
       }); 
    try {
     await usuario.save();
     res.json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
     res.status(500).json({ mensaje: 'Hubo un error al registrar el usuario' });
  }
});

router.post('/ingreso/verificar', async (req, res) => {
  try {
    const correo = req.body.correo;
    
    const usuario = await User.findOne({ correo });
    if (usuario) {
      res.json({ mensaje: 'Usuario registrado' });
    } else {
      res.json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al verificar el usuario' });
  }
});

module.exports = router;
