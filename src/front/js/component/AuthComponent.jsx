import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente de registro e inicio de sesión de usuario
const AuthComponent = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(true); // Determina si es el formulario de login o registro
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    try {
      const url = isLogin
        ? 'https://vigilant-space-goggles-4jgr644x6rjx2q77w-3001.app.github.dev/api/login'
        : 'https://vigilant-space-goggles-4jgr644x6rjx2q77w-3001.app.github.dev/api/register';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || data.error || 'Algo ha ido mal');
      } else {
        setMessage(data.msg || 'Acción realizada con éxito');
        if (data.token) {
          localStorage.setItem('token', data.token); // Guardar el token en el localStorage
          // Redirige al componente Private
          navigate('/private');
        }
      }
    } catch (err) {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <div>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};

export default AuthComponent;

