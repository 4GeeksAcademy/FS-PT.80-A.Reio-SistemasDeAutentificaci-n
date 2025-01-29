import React, { useEffect, useState } from 'react';

const Private = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/';
    } else {
      fetch('https://vigilant-space-goggles-4jgr644x6rjx2q77w-3001.app.github.dev/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUserData(data.user);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          window.location.href = '/';
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="private-container">
      <h2>Bienvenido al área privada</h2>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Private;

