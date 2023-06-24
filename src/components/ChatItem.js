import React from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';

const ChatItem = ({ type, text, url }) => {
  return (
    <Flex
      columnGap={2}
      alignItems={'center'}
      alignSelf={type === 'received' ? 'flex-start' : 'flex-end'}
      direction={type === 'received' ? 'row-reverse' : 'row'}>
      <Text
        bg={type === 'received' ? 'cyan.600' : 'purple.500'}
        color={'white'}
        py={1}
        px={3}
        fontSize={'0.85rem'}
        borderRadius={'xl'}>
        {text}
      </Text>
      <Avatar size={'sm'} name='Maaz Ahmed' src={url} />
    </Flex>
  );
};

export default ChatItem;
