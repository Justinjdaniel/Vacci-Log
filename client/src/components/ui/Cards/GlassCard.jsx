import { chakra } from '@chakra-ui/react';

const GlassCard = chakra('div', {
  baseStyle: {
    display: 'flex',
    p: '2',
    shadow: 'lg',
    rounded: '1rem',
    border: '1px solid hsla(0, 100%, 100%, .2)',
    backdropFilter: 'blur(16px) saturate(180%)',
    bgGradient: 'linear(to-br, whiteAlpha.600, whiteAlpha.100)',
  },
});

export default GlassCard;

const glassCardBacklight = {
  content: '""',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '40%',
  height: '110%',
  textDecoration: 'none',
  borderRadius: '8px',
  transform: 'translate(-50%, -50%) skewX(15deg)',
  transition: '0.5s',
  background: 'linear-gradient(315deg, #ffbc00, #ff0058)',
};

export const GlassCardBacklight = chakra('div', {
  baseStyle: {
    display: 'flex',
    w: 'auto',
    h: 'auto',
    pos: 'relative',
    transition: 'all 0.5s',
    _before: {
      ...glassCardBacklight,
    },
    _after: {
      ...glassCardBacklight,
      filter: 'blur(2rem)',
    },
  },
});
