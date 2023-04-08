import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import SocialButton from '../ui/Buttons/SocialButton';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2023 Made with passion.</Text>
        <Text textTransform='capitalize' fontFamily='cursive'>by Justin J</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'LinkedIn'} href={'#'}>
            <FaLinkedinIn />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'GitHub'} href={'#'}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
