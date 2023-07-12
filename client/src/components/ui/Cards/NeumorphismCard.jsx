import { chakra } from '@chakra-ui/react';

const variants = {
  flat: '.5rem .5rem 2rem hsla(1, 1%, 00%, 0.2), .5rem .5rem 2rem hsla(1, 1%, 90%, 0.2)',
  concave:
    '.5rem .5rem 2rem hsla(1, 1%, 00%, 0.2), .5rem .5rem 2rem hsla(1, 1%, 90%, 0.2)',
  convex:
    '.5rem .5rem 2rem hsla(1, 1%, 00%, 0.2), .5rem .5rem 2rem hsla(1, 1%, 90%, 0.2)',
  pressed:
    'inset .5rem .5rem 2rem hsla(1, 1%, 00%, 0.28), inset .5rem .5rem 2rem hsla(1, 1%, 90%, 0.28)',
};

const NeumorphismCard = chakra('div', {
  baseStyle: {
    display: 'flex',
    p: '2',
    rounded: '1rem',
    boxShadow: (props) => variants[props.variant] || variants['flat'],
    bgGradient: (props) =>
      props.isDarkMode
        ? 'linear(to-br, blackAlpha.800, blackAlpha.600)'
        : 'linear(to-br, whiteAlpha.800, whiteAlpha.800, whiteAlpha.600)',
  },
});

export default NeumorphismCard;
