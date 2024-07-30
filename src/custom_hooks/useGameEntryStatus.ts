import { useReducer } from "react";

interface StatusState {
  status: number,
}

interface StatusAction {
  type: 
    "Add To Collection" |
    "Plan To Play" |
    "Playing" |
    "Completed" |
    "Full Completion" |
    "Dropped"
}

const reducer = (state: StatusState, action: StatusAction): StatusState => {
  const { type } = action;
  console.log("using Reducer function");
  
  switch (type) {
    case "Add To Collection": {
      return {...state, status: -1};
    }
    case "Plan To Play": {
      return {...state, status: 1};
    }
    case "Playing": {
      return {...state, status: 2};
    }
    case "Completed": {
      return {...state, status: 3};
    }
    case "Full Completion": {
      return {...state, status: 4};
    }
    case "Dropped": {
      return {...state, status: 5};
    }
    default: {
      return state;
    }
  }
}

//Define the custom hook
const useGameEntryStatus = (initialStatus: StatusState) => {
  //Call useReducer
  const [state, dispatch] = useReducer(reducer, {...initialStatus});

  return {
    state, 
    setStatusToAddToCollection: () => dispatch({ type: "Add To Collection"}),
    setStatusToPlanToPlay: () => dispatch({ type: "Plan To Play"}),
    setStatusToPlaying: () => dispatch({ type: "Playing"}),
    setStatusToCompleted: () => dispatch({ type: "Completed"}),
    setStatusToFullCompletion: () => dispatch({ type: "Full Completion"}),
    setStatusToDropped: () => dispatch({ type: "Dropped"})
  }
}

export default useGameEntryStatus;