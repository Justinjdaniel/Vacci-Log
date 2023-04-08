import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  chakra,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FormInput from '../components/ui/FormElements/FormInput';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    // Do something with the form data
    console.log(data);
  };
  return (
    <Stack
      h='full'
      w='full'
      direction={{ base: 'column', md: 'row' }}
      htmlFor='login'
      justifySelf='center'
      alignSelf='center'>
      <Flex p={8} flex={1} align='center' justify='center'>
        <Stack
          as={chakra.form}
          spacing={4}
          w='full'
          maxW='md'
          onSubmit={handleSubmit(onSubmit)}>
          <Heading fontSize='2xl'>Sign in to your account</Heading>
          <FormInput
            name='email'
            type='email'
            label='Email address'
            register={register}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            errors={errors}
          />
          <FormInput
            name='password'
            type='password'
            label='Password'
            register={register}
            rules={{ required: 'Password is required' }}
            errors={errors}
          />
          <Stack spacing={6}>
            <Link color='blue.500'>Forgot password?</Link>
            <Button colorScheme='blue' variant='solid' type='submit'>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} display={{ base: 'none', md: 'flex' }}>
        <Image
          alt='Login Image'
          objectFit='cover'
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
