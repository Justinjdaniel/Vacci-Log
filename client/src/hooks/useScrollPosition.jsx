import { useEffect, useState } from 'react';
import throttle from '../helpers/throttle';

// A custom hook that returns the current scroll position
export default function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    // A function that updates the scroll position
    function updateScrollPos(e) {
      setScrollPos(e.target.scrollTop);
    }

    // Throttle the function to limit its execution frequency
    const throttledUpdateScrollPos = throttle(updateScrollPos, 100);

    // Add the event listener to the window object
    window.addEventListener('scroll', throttledUpdateScrollPos);

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener('scroll', throttledUpdateScrollPos);
  }, []);

  return scrollPos;
}
