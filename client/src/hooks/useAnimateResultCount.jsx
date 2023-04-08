import { useState } from 'react';

function useAnimateResultCount(number, target) {
  const [count, setCount] = useState(number);

  if (count < target) {
    setTimeout(() => {
      setCount(count + 1);
    }, 10);
  }

  if (target < count) {
    setTimeout(() => {
      setCount(count - 1);
    }, 30);
  }

  return count;
}

export default useAnimateResultCount;
