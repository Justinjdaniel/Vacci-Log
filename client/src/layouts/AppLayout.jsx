import { Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';

const AppLayout = () => {
  return (
    <Flex
      flexDir='column'
      minH='100vh'
      bg={useColorModeValue('gray.100', 'gray.900')}>
      <Header />
      <Flex p='4'>
        <Outlet />
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  );
};

export default AppLayout;
