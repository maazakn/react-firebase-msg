import { ChakraProvider } from '@chakra-ui/react';
import Home from './views/Home'
import './firebase'

function App() {
  return (
    <ChakraProvider>
      <Home/>
    </ChakraProvider>
  );
}

export default App;
