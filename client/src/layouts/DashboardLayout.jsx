import { Box, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Sidebar from '../components/layouts/Sidebar';

const DashboardLayout = () => {
  return (
    <Box minH='100dvh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <Sidebar />
      <Flex
        flexDir='column'
        ml={{ base: 0, md: 60 }}
        h='full'
        minH={{ base: '91dvh', md: '100dvh' }}>
        <Flex flex='1' htmlFor='outlet'>
          <Outlet />
        </Flex>
        {/* <Spacer /> */}
        <Footer />
      </Flex>
    </Box>
  );
};

export default DashboardLayout;
