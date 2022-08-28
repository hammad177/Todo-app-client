import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, CreateTask } from "../../context/GlobalAction";
import {
  CreateTodoContainer,
  CreateTodoInput,
  CreateTodoTitle,
  CreateTodoButton,
  CreateTodoPicker,
} from "../../style-components/CreateTodo";
import GlobalContext from "../../context/GlobalContext";

const innerTheme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
  },
});

const CreateTodo = () => {
  const [submitBtn, setSubmitBtn] = useState("Create");
  const { dispatch } = useContext(GlobalContext);
  const date = new Date();
  const today = date.getDate();
  const nextDay = date.setDate(date.getDate() + 1);

  // form initial state value
  const initialState = {
    title: "",
    description: "",
    time: dayjs(nextDay).format("YYYY-MM-DDTHH:mm"),
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
    setSubmitBtn("Creating ...");
    const isCreate = await CreateTask(dispatch, value);
    if (isCreate) {
      resetForm();
      setSubmitBtn("Created...");
      setTimeout(() => setSubmitBtn("Create"), 2000);
    } else {
      setSubmitBtn("Create");
    }
  };

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialState,
      validationSchema: schema,
      onSubmit: onSubmit,
    });

  return (
    <CreateTodoContainer onSubmit={handleSubmit}>
      <CreateTodoTitle>Create New Task</CreateTodoTitle>
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
  );
};

export default CreateTodo;
