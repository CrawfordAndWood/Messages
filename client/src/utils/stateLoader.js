export const loadState = () => {
  try {
    console.log("loading state", localStorage);
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
    console.log("saving state", state);
    let serializedState = JSON.stringify(state);
    localStorage.setItem("messages:state", serializedState);
  } catch (err) {}
};

export const initializeState = () => {
  return {
    //state object
  };
};
