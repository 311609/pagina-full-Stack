import { useState } from 'react';
import axios from 'axios';


function IngresoForm() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleIngreso = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/ingreso/verificar/:correo', {
        correo: correo,
        contrasena: contrasena,
      });

      if (response.data.mensaje === 'Usuario registrado') {
        alert('Usuario registrado');
      } else {
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Limpia los campos después de enviar el formulario
    setCorreo('');
    setContrasena('');
  };

  return (
    <div>
      <h1>Ingreso usuarios</h1>
      <form onSubmit={handleIngreso}>
        <div>
          <label>
            Correo:
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default IngresoForm;
