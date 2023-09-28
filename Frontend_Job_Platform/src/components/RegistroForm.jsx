import axios from 'axios';
import { useState } from 'react';

function RegistroForm() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    confirmacion: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!usuario.nombre || !usuario.correo || !usuario.contrasena || !usuario.confirmacion) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (usuario.contrasena !== usuario.confirmacion) {
      alert('La contraseña y la confirmación de contraseña no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users', usuario);
      const data = response.data;

      if (data.mensaje === 'Usuario registrado exitosamente') {
        alert('Usuario registrado correctamente');
      } else {
        alert('Error al registrar usuario');
      }
      
      localStorage.setItem('name', JSON.stringify(usuario))


    } catch (error) {
      console.error('Error:', error);
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }

    setUsuario({
      nombre: '',
      correo: '',
      contrasena: '',
      confirmacion: '',
    });
  };

  return (
    <div>
      <h1>Formulario de registro</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={usuario.correo}
              onChange={handleChange}
              required
              autoComplete='username'
            />
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input
              type="password"
              name="contrasena"
              value={usuario.contrasena}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </label>
        </div>
        <div>
          <label>
            Confirmar contraseña:
            <input
              type="password"
              name="confirmacion"
              value={usuario.confirmacion}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </label>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistroForm;
