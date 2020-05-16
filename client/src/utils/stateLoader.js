export const loadState = () => {
  try {
    let serializedState = localStorage.getItem("messages:state");

    if (serializedState === null) {
      return initializeState();
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return initializeState();
  }
};

export const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem("messages:state", serializedState);
  } catch (err) {}
};

export const initializeState = () => {
  return {
    //state object
  };
};
