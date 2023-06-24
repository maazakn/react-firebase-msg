import React from 'react';
import { VStack, Text, Spinner } from '@chakra-ui/react';

const Loader = ({ text }) => {
  return (
    <VStack h='100%' justify={'center'} gap={2}>
      <Spinner
        thickness='3px'
        speed='0.8s'
        emptyColor='gray.200'
        color='purple.500'
        size='lg'
      />
      <Text>{text}</Text>
    </VStack>
  );
};

export default Loader;
