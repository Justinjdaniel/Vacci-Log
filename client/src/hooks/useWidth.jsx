import React, { useEffect, useRef } from 'react';

const useWidth = (ref) => {
  const [width, setWidth] = React.useState(0);
  const prevWidth = useRef(width);

  useEffect(() => {
    if (ref.current) {
      const newWidth = ref.current.offsetWidth;
      if (newWidth !== prevWidth.current) {
        setWidth(newWidth);
        prevWidth.current = newWidth;
      }
    }

    // Create a new ResizeObserver instance
    const resizeObserver = new ResizeObserver(entries => {
      // Loop through the entries
      for (let entry of entries) {
        // If the width of the entry has changed
        if (entry.contentRect.width !== prevWidth.current) {
          // Update the state and the ref
          setWidth(entry.contentRect.width);
          prevWidth.current = entry.contentRect.width;
        }
      }
    });
    // Observe the element for size changes
    resizeObserver.observe(ref.current);
    // Cleanup function to disconnect the observer
    return () => resizeObserver.disconnect();
  }, [ref]);

  return width;
};

export default useWidth;
