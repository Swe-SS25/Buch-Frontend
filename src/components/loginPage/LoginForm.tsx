import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Input, Button, Text, Alert, Flex, Image } from '@chakra-ui/react';
import { login } from '@graphql/queries';
import './login.css';
import logo from './logo.png';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');     // <-- Umbenannt
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      /** login(username, password) NICHT email! **/
      const response = await login(username, password);

      if (!response.loggedIn) {
        setError('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
        if (response.errors) {
          setError(prev => prev + ' ' + response.errors.join(' '));
        }
      } else {
        navigate('/search');
      }
    } catch (err: any) {
      setError('Ein Fehler ist aufgetreten: ' + (err.message || 'Unbekannter Fehler'));
      console.error(err);
    }
  };

  return (
    <Flex className="login-flex" justify="center" align="center">
      <Box position="relative" className="login-box">
        <Image
          src={logo}
          alt="Login Logo"
          boxSize="100px"
          position="absolute"
          top="10px"
          left="10px"
        />
        <form onSubmit={handleSubmit}>
          <Input
            className="login-input"
            placeholder="Benutzername"
            value={username}
            onChange={e => setUsername(e.target.value)}
            mb={3}
            required
          />
          <Input
            className="login-input"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            mb={3}
            required
          />
          {error && (
            <Alert.Root status="error" mb={3} borderRadius="md" p={4}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Fehler</Alert.Title>
                <Alert.Description>{error}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}
          <Button colorScheme="blue" type="submit" width="full">
            Einloggen
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginForm;
