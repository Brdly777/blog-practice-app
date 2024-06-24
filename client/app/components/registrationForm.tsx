import { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username,
        email,
        password,
        profile_picture: profilePicture
      });

      console.log('Registro exitoso:', response.data);

      alert('¡Registro exitoso!');

      setUsername('');
      setEmail('');
      setPassword('');
      setProfilePicture('');

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <Input
        type="text"
        label="Nombre de Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        className="mb-4"
      />
      <Input
        type="email"
        label="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        className="mb-4"
      />
      <Input
        type="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        className="mb-4"
      />
      <Input
        type="text"
        label="URL de Foto de Perfil"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <Button type="submit" className="w-full">
        Registrarse
      </Button>
    </form>
  );
};

export default RegisterForm;