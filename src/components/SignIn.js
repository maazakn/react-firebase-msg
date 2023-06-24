import React from 'react';
import { VStack, Text, Button } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = React.useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error('errorCode', errorCode, 'email:', email);
        console.error('errorMessage', errorMessage);
        console.error('credential', credential);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <VStack h='100%' justify={'center'} gap={4}>
      <Text>Looks like you are not login</Text>
      <Button
        size={'sm'}
        colorScheme='purple'
        onClick={signInWithGoogle}
        isLoading={loading}
        loadingText='Loading'>
        Login With Google
      </Button>
    </VStack>
  );
};

export default SignIn;
