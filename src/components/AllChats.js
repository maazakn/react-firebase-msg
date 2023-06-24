import React from 'react';
import { Flex, HStack, Text, Button, Input } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { sort } from 'fast-sort';
import { auth, db } from '../firebase';
import ChatItem from './ChatItem';
import Loader from './Loader';

const Chat = () => {
  const [msgVal, setMsg] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const lastMsg = React.useRef(null);

  const collectionName = 'messages';
  const query = collection(db, collectionName);
  const [docs, loading, error] = useCollectionData(query);
  const isDisable = loading || error;

  // set messages
  React.useEffect(() => {
    if (docs && docs.length > 0) {
      setMessages(sort(docs).asc(d => d?.createdAt?.seconds));
    }
  }, [docs]);

  // scroll to last message
  React.useEffect(() => {
    if (messages && messages.length > 0) {
      lastMsg.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async e => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    try {
      await addDoc(collection(db, collectionName), {
        text: msgVal,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });

      setMsg('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Flex h='100%' direction={'column'} overflow={'hidden'}>
      {React.useMemo(
        () => (
          <React.Fragment>
            <HStack
              bg='purple.500'
              justifyContent={'space-between'}
              alignItems={'center'}
              px={5}
              py={2}
              boxShadow={'md'}>
              <Text
                color={'white'}
                fontSize={'1.1rem'}
                fontWeight={600}
                letterSpacing={1}>
                Chats
              </Text>
              <Button size={'sm'} onClick={() => signOut(auth)}>
                Log out
              </Button>
            </HStack>
            <Flex
              flex={1}
              direction={'column'}
              rowGap={4}
              px={4}
              py={4}
              overflowY={'auto'}
              sx={{
                '&::-webkit-scrollbar': { width: '0.45rem' },
                '&::-webkit-scrollbar-track': {
                  bg: 'ghostwhite',
                  borderLeft: '2px solid var(--chakra-colors-purple-500)',
                },
                '&::-webkit-scrollbar-thumb': {
                  bg: 'purple.500',
                },
              }}>
              {loading ? (
                <Loader text={'Loading Chats ...'} />
              ) : (
                <React.Fragment>
                  {messages.map((item, k) => (
                    <ChatItem
                      key={k}
                      type={
                        item?.uid === auth.currentUser.uid ? 'sent' : 'received'
                      }
                      text={item?.text}
                      url={item?.photoURL}
                    />
                  ))}
                  <span ref={lastMsg} />
                </React.Fragment>
              )}
            </Flex>
          </React.Fragment>
        ),
        [loading, messages]
      )}

      <HStack
        as={'form'}
        onSubmit={sendMessage}
        bg='whitesmoke'
        borderTop={'2px solid'}
        borderColor={'purple.600'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Input
          p={4}
          autoFocus
          fontSize={'0.9rem'}
          variant='unstyled'
          placeholder='Start Chating Here'
          letterSpacing={1}
          isDisabled={isDisable}
          value={msgVal}
          onChange={e => setMsg(e.target.value)}
        />
        <Button
          type='submit'
          colorScheme='purple'
          size={'sm'}
          mr={4}
          isDisabled={isDisable}>
          Send
        </Button>
      </HStack>
    </Flex>
  );
};

export default React.memo(Chat);
