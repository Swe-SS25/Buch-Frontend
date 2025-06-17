import BookDetails from '@/components/details/BookDetails';
import { Button, Card, Center } from '@chakra-ui/react';

const BuchDetails = () => {
  return (
    <Center>
      <Card.Root margin="40" width="50%">
        <Card.Body>
          <BookDetails />
        </Card.Body>
        <Card.Footer>
          <Button asChild>
            <a href="/search">Home</a>
          </Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
};

export default BuchDetails;
