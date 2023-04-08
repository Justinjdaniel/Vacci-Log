import useScrollPosition from './useScrollPosition';

// A custom hook that returns true if the page has been scrolled to 100vh
export default function useScrolledTo100vh() {
  const scrollPos = useScrollPosition();
  const pageHeight = window.innerHeight;

  return scrollPos >= pageHeight;
}
