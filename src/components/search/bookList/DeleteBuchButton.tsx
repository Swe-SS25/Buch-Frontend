import React from 'react';
import { Button } from '@chakra-ui/react';
import auth from '@/graphql/auth.ts';
import type { AxiosResponse } from 'axios';
import { deleteBuch } from '@/graphql/queries';

type DeleteBuchButtonProps = {
  id: string;
  onDeleted?: () => void; // callback after successful delete
};

const DeleteBuchButton: React.FC<DeleteBuchButtonProps> = ({ id, onDeleted }) => {
  const isAdmin = auth.hasRole('admin');

  const handleDelete = async () => {
    try {
      const response: AxiosResponse = await deleteBuch(id);
      console.log('Delete response:', response);
      window.location.reload()
      onDeleted?.();
    } catch (err: any) {
      console.error(err);
    }
  };

  if (!isAdmin) return null;

  return (
    <Button onClick={handleDelete}>Löschen</Button>
  );
};
export default DeleteBuchButton;
