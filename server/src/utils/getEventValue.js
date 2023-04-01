/**
 * Returns the value of an event
 * @async
 * @function
 * @param {Object} contractInstance - The contract instance
 * @param {string} eventName - The name of the event
 * @returns {Promise<any>} - The value of the event
 */
const getEventValue = async (contractInstance, eventName) => {
  // Define a filter for the event
  const filter = contractInstance.filters[eventName]();
  // Subscribe to the event using the filter
  const eventValue = await new Promise((resolve, reject) => {
    contractInstance.on(filter, (value) => {
      resolve(value);
    });
  });

  return eventValue;
};

export default getEventValue;
