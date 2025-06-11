import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Input, Button, Text, Alert } from '@chakra-ui/react';
import { login } from '@graphql/queries';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      if (!response.loggedIn) {
        setError('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
        if (response.errors) {
          setError((prev) => prev + ' ' + response.errors.join(' '));
        }
      } else {
        navigate('/search');
      }
    } catch {
      setError('Ein Fehler ist aufgetreten.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <Text mb={1} fontWeight="bold">Email Adresse</Text>
        <Input
          type="email"
          placeholder="Email eingeben"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={3}
          required
        />
        <Text mb={1} fontWeight="bold">Passwort</Text>
        <Input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default LoginForm;
