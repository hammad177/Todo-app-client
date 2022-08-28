import { ACTION_TYPE } from "./ActionType";

export default function reducer(state, action) {
  switch (action.type) {
    // login or signup reducer
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        isSignOut: false,
      };
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        isSignOut: true,
        todo: [],
      };
    case ACTION_TYPE.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACTION_TYPE.GET_ALL_TASKS:
      return {
        ...state,
        todo: action.payload,
        isLoading: false,
      };
    case ACTION_TYPE.ADD_TODO:
      return {
        ...state,
        todo: [action.payload, ...state.todo],
      };
    case ACTION_TYPE.DELETE_TASK:
      return {
        ...state,
        todo: state.todo.filter((val) => val.id !== action.payload.id),
      };
    case ACTION_TYPE.UPDATE_TASK:
      return {
        ...state,
        todo: state.todo.map((val) => {
          if (val.id === action.payload.id) {
            return { ...val, ...action.payload };
          }
          return val;
        }),
      };
    case ACTION_TYPE.COMPLETE_TASK:
      return {
        ...state,
        todo: state.todo.map((val) => {
          if (val.id === action.payload.id) {
            return { ...action.payload, isCompleted: true };
          }
          return val;
        }),
      };
    default:
      return state;
  }
}
