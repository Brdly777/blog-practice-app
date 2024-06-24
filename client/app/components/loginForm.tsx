import { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        emailOrUsername,
        password
      });

      console.log('Inicio de sesión exitoso:', response.data);

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);

      alert('¡Inicio de sesión exitoso!');

      setEmailOrUsername('');
      setPassword('');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="flex flex-col space-y-4">
        <div>
          <Input
            type="text"
            label="Correo Electrónico o Nombre de Usuario"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
            fullWidth
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            className="w-full"
          />
        </div>
        <div>
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;