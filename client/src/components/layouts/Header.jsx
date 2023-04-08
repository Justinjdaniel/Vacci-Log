import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  chakra,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box bg={bgColor} px={4} boxShadow='md'>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link
          href={'/'}
          fontSize={'xl'}
          fontWeight={'bold'}
          color={color}
          _hover={{
            textDecoration: 'none',
            color: useColorModeValue('teal.500', 'teal.200'),
          }}>
          Vaccination
          <chakra.span color='red.500'> Log</chakra.span>
        </Link>

        <HStack spacing={8} alignItems={'center'}>
          <IconButton
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            aria-label={`Switch to ${
              colorMode === 'light' ? 'dark' : 'light'
            } mode`}
            variant={'ghost'}
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>
    </Box>
  );
}

export default Header;
