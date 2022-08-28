import React from "react";
import GlobalContext from "./GlobalContext";
import { useReducer } from "react";
import reducer from "./GlobalReducer";

//global state
const initialState = {
  isLoading: false,
  isSignOut: null,
  todo: [],
};

const GlobalStateProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
