import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import RegistroForm from './components/RegistroForm';
import IngresoForm from './components/IngresoForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<RegistroForm />} />
        <Route path="/ingreso/verificar" element={<IngresoForm />} />
        <Route
          path="/"
          element={
            <div>
              <Link to="/users">
                <button>Registro</button>
              </Link>
              <Link to="/ingreso/verificar">
                <button>Ingreso</button>
              </Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
