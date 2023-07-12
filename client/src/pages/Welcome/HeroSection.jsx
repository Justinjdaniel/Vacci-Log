import { Box, Container, Heading, Text } from '@chakra-ui/react';

export default function HeroSection() {
  return (
    <Box
      htmlFor='Hero Section'
      pos='relative'
      w='full'
      h='full'
      minH={{ base: 'auto', md: '95vh' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      _before={{
        content: `""`,
        pos: 'absolute',
        top: '0',
        left: '0',
        w: 'full',
        h: 'full',
        bg: "center/cover url('https://images.unsplash.com/photo-1607326207820-989c6d53a0a2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1502&q=80')",
        opacity: '0.75',
      }}>
      <Container maxW='container.lg' pos='relative' zIndex='1'>
        <Box display='flex' flexWrap='wrap' alignItems='center'>
          <Box
            w={{ base: 'full', lg: '6/12' }}
            px={{ base: '4', lg: '0' }}
            mx={{ base: 'auto', lg: '0' }}
            textAlign='center'>
            <Box pr={{ base: '0', lg: '12' }}>
              <Heading
                fontWeight='semibold'
                fontSize={{ base: '4xl', md: '5xl' }}
                data-aos='zoom-in'>
                Prevention starts with us.
              </Heading>
              <Text mt='4' fontSize={{ base: 'lg', md: 'xl' }}>
                Let's prevent these pandemics and save a better tomorrow for our
                future generation. Take Vaccination on time and avoid
                preventable diseases.
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
