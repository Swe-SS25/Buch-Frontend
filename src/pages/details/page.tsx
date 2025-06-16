import BookDetails from '@/components/details/BookDetails';
import { Card, Center } from '@chakra-ui/react';

const BuchDetails = () => {
  return (
    <Center>
      <Card.Root margin="40" width="50%">
        <Card.Body>
          <BookDetails />
        </Card.Body>
      </Card.Root>
    </Center>
  );
};

export default BuchDetails;
