import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useToken } from 'react-firebase-hooks/messaging';
import { doc, setDoc } from 'firebase/firestore';
import SignIn from '../components/SignIn';
import AllChats from '../components/AllChats';
import Loader from '../components/Loader';
import { auth, messaging, db } from '../firebase';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [token] = useToken(messaging, process.env.REACT_APP_VAPID);

  React.useEffect(() => {
    if (user && token) {
      const collectionName = 'FCM_tokens';
      (async () => {
        try {
          const { uid } = auth.currentUser;
          const docRef = doc(db, collectionName, uid);
          await setDoc(docRef, { token });

          console.log('Token ', token);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      })();
    }
  }, [token, user]);

  return (
    <Box pos='fixed' w='100%' h={'100%'} bg='purple.100'>
      <Container maxW='xl' h='100%' bg='ghostwhite' px={0}>
        {loading ? (
          <Loader text={'Authenticating ...'} />
        ) : user ? (
          <AllChats />
        ) : (
          <SignIn />
        )}
      </Container>
    </Box>
  );
};

export default Home;
