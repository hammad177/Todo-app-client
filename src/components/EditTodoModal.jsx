import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "react-modal";
import GlobalContext from "../context/GlobalContext";
import {
  CreateTodoContainer,
  CreateTodoInput,
  CreateTodoTitle,
  CreateTodoButton,
  CreateTodoPicker,
} from "../style-components/CreateTodo";
import { Alert, UpdateTask } from "../context/GlobalAction";

Modal.setAppElement("#root");
const innerTheme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
  },
});

const EditTodoModal = ({ edit, handleClose }) => {
  const [submitBtn, setSubmitBtn] = useState("Update");
  const { dispatch } = useContext(GlobalContext);
  const { todo } = edit;

  const today = new Date().getDate();

  // form initial state value
  const initialState = {
    title: todo?.title,
    description: todo?.description,
    time: dayjs(todo?.time).format("YYYY-MM-DDTHH:mm"),
  };

  // form validation schema
  const schema = Yup.object().shape({
    title: Yup.string().required("required field"),
    description: Yup.string().required("required field"),
    time: Yup.string().required("required field"),
  });

  // handle submit form
  const onSubmit = async (value, { resetForm }) => {
    if (dayjs(value.time).diff(today) <= 0) {
      return Alert(
        "error",
        "Time Selection Error",
        "please select the time after this task create"
      );
    }
    setSubmitBtn("Updating ...");
    const isUpdated = await await UpdateTask(dispatch, value, todo.id);
    if (isUpdated) {
      resetForm();
      setSubmitBtn("Updated...");
      handleClose();
    } else {
      setSubmitBtn("Update");
    }
  };

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialState,
      validationSchema: schema,
      onSubmit: onSubmit,
    });
  return (
    <Modal
      isOpen={edit.isOpen}
      onRequestClose={handleClose}
      style={ModalStyles}
    >
      <CreateTodoContainer onSubmit={handleSubmit}>
        <CreateTodoTitle mt={"0px"}>Edit Task</CreateTodoTitle>
        <CreateTodoInput
          type="text"
          placeholder="Enter title ..."
          value={values.title}
          onChange={handleChange}
          name="title"
          onBlur={handleBlur}
          style={{
            border: errors?.title && touched?.title && "1px solid red",
          }}
        />
        <CreateTodoInput
          type="text"
          placeholder="Enter description ..."
          value={values.description}
          onChange={handleChange}
          name="description"
          onBlur={handleBlur}
          style={{
            border:
              errors?.description && touched?.description && "1px solid red",
          }}
        />
        <CreateTodoPicker>
          <ThemeProvider theme={innerTheme}>
            <TextField
              id="datetime-local"
              label="Pick Date and Time"
              type="datetime-local"
              value={values.time}
              onChange={handleChange}
              name="time"
              onBlur={handleBlur}
              error={errors?.time && touched?.time && true}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ThemeProvider>
        </CreateTodoPicker>
        <CreateTodoButton
          type="submit"
          disabled={Object.keys(errors).length ? true : false}
          style={{ opacity: Object.keys(errors).length ? "0.7" : "1" }}
        >
          {submitBtn}
        </CreateTodoButton>
      </CreateTodoContainer>
    </Modal>
  );
};

export default EditTodoModal;

const ModalStyles = {
  overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
  content: {
    minWidth: "280px",
    width: "80vw",
    maxWidth: "400px",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
