import { useEffect, useRef, useState } from 'react';

// A custom hook to handle errors and log them in a consistent way
const useError = () => {
  const [error, setError] = useState(null);

  const handleError = error => {
    console.error(error);
    setError(error);
  };

  return [error, handleError];
};

// A custom hook to handle loading states and show a spinner or a placeholder while fetching data from local storage
const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return [loading, startLoading, stopLoading];
};

// A custom hook to handle updating dependencies and re-rendering the component when the local storage value changes
const useUpdateEffect = (effect, deps) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      effect();
    }
  }, deps);
};

// A custom hook to manage the value in local storage and state
const useLocalStorage = (key, initialValue) => {
  // State to store the value
  const [storedValue, setStoredValue] = useState(initialValue);

  // Custom hooks to handle errors and loading states
  const [error, handleError] = useError();
  const [loading, startLoading, stopLoading] = useLoading();

  // Function to update the value in local storage and state
  const setValue = value => {
    try {
      // Save the value to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
      // Save the value to state
      setStoredValue(value);
    } catch (error) {
      // If error, handle it
      handleError(error);
    }
  };

  // Function to remove the value from local storage and state
  const removeValue = () => {
    try {
      // Remove the value from local storage
      window.localStorage.removeItem(key);
      // Set the state to null
      setStoredValue(null);
    } catch (error) {
      // If error, handle it
      handleError(error);
    }
  };

  // Function to clear all values from local storage and state
  const clearValues = () => {
    try {
      // Clear all values from local storage
      window.localStorage.clear();
      // Set the state to an empty object
      setStoredValue({});
    } catch (error) {
      // If error, handle it
      handleError(error);
    }
  };

  // Effect to get the value from local storage on mount and update it on change
  useEffect(() => {
    // Start loading
    startLoading();
    try {
      // Get the value from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse and return the stored json or return initialValue
      const value = item ? JSON.parse(item) : initialValue;
      // Save the value to state
      setStoredValue(value);
    } catch (error) {
      // If error, handle it
      handleError(error);
    }
    // Stop loading
    stopLoading();
  }, [key]);

  // Effect to update the value in local storage when it changes in state
  useUpdateEffect(() => {
    try {
      // Save the value to local storage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // If error, handle it
      handleError(error);
    }
  }, [storedValue]);

  // Return the stored value and the functions to update it along with error and loading states
  return [storedValue, setValue, removeValue, clearValues, error, loading];
};

export default useLocalStorage;
