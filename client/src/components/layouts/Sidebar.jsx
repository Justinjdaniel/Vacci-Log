import {
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  Link,
  chakra,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {
  FiFeather,
  FiLogOut,
  FiMenu,
  FiMonitor,
  // FiSettings,
  FiSmile,
  FiUsers,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import NavItem from '../ui/Buttons/NavItem';

const linkItems = [
  { name: 'Dashboard', icon: FiMonitor, path: 'dashboard' },
  { name: 'Vaccine', icon: FiFeather, path: 'vaccine' },
  { name: 'Vaccinator', icon: FiSmile, path: 'vaccinator' },
  { name: 'Patient', icon: FiUsers, path: 'patient' },
  // { name: 'Settings', icon: FiSettings, path: 'settings' },
];

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'flex' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const auth = useAuth();
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      py='4'
      h='full'
      pos='fixed'
      justifyContent='space-between'
      flexDir='column'
      {...rest}>
      <Flex flexDir='column'>
        <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
          <Link
            href='/'
            fontSize='xl'
            fontWeight='bold'
            _hover={{
              textDecoration: 'none',
            }}>
            Vaccination
            <chakra.span color='red.500'> Log</chakra.span>
          </Link>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        {linkItems.map(link => (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
          </NavItem>
        ))}
      </Flex>
      <NavItem icon={FiLogOut} onClick={() => auth.signOut(()=>{})} path='/login'>
        Sign Out
      </NavItem>
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-start'
      {...rest}>
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<FiMenu />}
      />
      <Link
        href='/'
        ml='4'
        fontSize='xl'
        fontWeight='bold'
        _hover={{
          textDecoration: 'none',
        }}>
        Vaccination
        <chakra.span color='red.500'> Log</chakra.span>
      </Link>
    </Flex>
  );
};
