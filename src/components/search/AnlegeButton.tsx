import React from 'react';
import { Button, Link } from '@chakra-ui/react';
import auth from '@/graphql/auth.ts';

const AdminButton: React.FC = () => {
  const isAdmin = auth.hasRole('admin');

  if (!isAdmin) return null;

  return (
    <Button asChild>
      <Link href="/create">Buch Anlegen</Link>
    </Button>
  );
};

export default AdminButton;
