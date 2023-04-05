import { Box, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Sidebar from '../components/layouts/Sidebar';

const DashboardLayout = () => {
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <Sidebar />
      <Flex flexDir='column' ml={{ base: 0, md: 60 }} minH='100vh'>
        <Header />
        <Flex p='4'>
          <Outlet />
        </Flex>
        <Spacer />
        <Footer />
      </Flex>
    </Box>
  );
};

export default DashboardLayout;
