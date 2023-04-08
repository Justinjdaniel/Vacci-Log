import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      w='full'
      h='full'
      flexDirection='column'>
      <Box maxWidth='500px' textAlign='center'>
        <Heading fontSize='6xl' mb={8}>
          404
        </Heading>
        <Text fontSize='2xl' mb={8}>
          Page not found
        </Text>
        <Image
          src='https://th.bing.com/th?id=OIP.Fx3Vjn-SBmRFHYd7gghX-wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2'
          alt="Illustration of a person searching for a page that doesn't exist"
          width='max-content'
          height='auto'
          mx='auto'
          mb='6'
        />
        <Text fontSize='lg' fontWeight='bold'>
          Sorry, we couldn't find the page you're looking for.
        </Text>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;
