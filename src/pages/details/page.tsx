import BookDetails from '@/components/details/BookDetails';
import { Button, Card, Center } from '@chakra-ui/react';
import styles from './details.module.css';

const BuchDetails = () => {
  return (
    <Center >
      <Card.Root className={styles.wrapper}>
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
