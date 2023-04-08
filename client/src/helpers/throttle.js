export default function throttle(func, delay) {
  // A variable to store the last execution time
  let lastTime = 0;

  // A function that wraps the original function
  function throttledFunc(...args) {
    // Get the current time
    let now = Date.now();

    // Check if the delay has passed since the last execution
    if (now - lastTime >= delay) {
      // Call the original function with the arguments
      func(...args);

      // Update the last execution time
      lastTime = now;
    }
  }

  // Return the throttled function
  return throttledFunc;
}
