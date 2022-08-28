import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { ACTION_TYPE } from "./ActionType";

export const Alert = (type, title, message) => {
  Swal.fire({
    customClass: {
      confirmButton: type === "error" ? "error-alter-btn" : "alter-btn",
    },
    title: title,
    icon: type,
    text: message,
    buttonsStyling: false,
  });
};

export async function SignUpUser(dispatch, value) {
  try {
    const { data } = await axios.post("/auth/signup", value);
    if (data.status) {
      localStorage.setItem("rf-token", data.refresh_token);
      localStorage.setItem("xx-token", data.access_token);
      dispatch({ type: ACTION_TYPE.LOGIN });
      return true;
    }
  } catch (error) {
    if (error.response.status === 409) {
      Alert("error", "Error", "email already exist");
      return false;
    } else {
      Alert("error", "Error", "failed to create account");
      return false;
    }
  }
}

export async function LoginUser(dispatch, value) {
  try {
    const { data } = await axios.post("/auth/login", value);
    if (data.status) {
      localStorage.setItem("rf-token", data.refresh_token);
      localStorage.setItem("xx-token", data.access_token);
      dispatch({ type: ACTION_TYPE.LOGIN });
      return true;
    }
  } catch (error) {
    if (error.response.status === 400) {
      Alert("error", "Error", "invalid credentials");
      return false;
    } else {
      Alert("error", "Error", "failed to create account");
      return false;
    }
  }
}

export async function LogoutUser(dispatch) {
  try {
    const token = localStorage.getItem("rf-token");
    if (!token) {
      dispatch({ type: ACTION_TYPE.LOGOUT });
      return true;
    }
    const { data } = await axios.post("/auth/logout", { token });
    if (data.status) {
      localStorage.removeItem("rf-token");
      localStorage.removeItem("xx-token");
      dispatch({ type: ACTION_TYPE.LOGOUT });
      return true;
    }
  } catch (error) {
    Alert("error", "Error", "failed to logout account");
    return false;
  }
}

export async function CreateTask(dispatch, value) {
  try {
    const { data } = await axios.post("/todo", value);
    if (data.status) {
      Alert("success", "Created", "New task has been created");
      dispatch({ type: ACTION_TYPE.ADD_TODO, payload: data.todo });
      return true;
    }
  } catch (error) {
    Alert("error", "Error", "failed to create task");
    return false;
  }
}

export async function GetAllTask(dispatch, query) {
  dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
  try {
    const { data } = await axios.get(`/todo/all?sort=${query}`);
    if (data.status) {
      dispatch({ type: ACTION_TYPE.GET_ALL_TASKS, payload: data.todo });
    }
  } catch (error) {
    dispatch({ type: ACTION_TYPE.GET_ALL_TASKS, payload: [] });
    Alert("error", "Error", "failed to get tasks");
  }
}

export async function DeleteTask(dispatch, todo) {
  try {
    const { data } = await axios.delete(`/todo/${todo.id}`);
    if (data.status) {
      dispatch({ type: ACTION_TYPE.DELETE_TASK, payload: todo });
      return true;
    }
  } catch (error) {
    Alert("error", "Error", "failed to delete task");
    return false;
  }
}

export async function UpdateTask(dispatch, value, id) {
  try {
    const { data } = await axios.patch(`/todo/${id}`, value);
    if (data.status) {
      value.id = id;
      dispatch({ type: ACTION_TYPE.UPDATE_TASK, payload: value });
      Alert("success", "Updated", "Task Updated Successfully");
      return true;
    }
  } catch (error) {
    Alert("error", "Error", "failed to update task");
    return false;
  }
}

export async function CompleteTask(dispatch, todo) {
  try {
    const { data } = await axios.patch(`/todo/${todo.id}`, {
      isCompleted: true,
    });
    if (data.status) {
      dispatch({ type: ACTION_TYPE.COMPLETE_TASK, payload: todo });
      return true;
    }
  } catch (error) {
    Alert("error", "Error", "failed to complete task");
    return false;
  }
}

export function reloadSession(dispatch) {
  const token = localStorage.getItem("rf-token");
  if (!token) {
    dispatch({ type: ACTION_TYPE.LOGOUT });
  } else {
    dispatch({ type: ACTION_TYPE.LOGIN });
  }
}
