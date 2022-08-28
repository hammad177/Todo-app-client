import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import {
  DescriptionText,
  FormButton,
  FormContainer,
  FormInput,
  FormTitle,
  FormWrapper,
  MainContainer,
} from "../style-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoginUser } from "../context/GlobalAction";

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const [submitBtn, setSubmitBtn] = useState("LogIn");

  // form initial state value
  const initialState = {
    email: "",
    password: "",
  };

  // form validation schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("please enter valid email")
      .required("required field"),
    password: Yup.string().min(4).required("required field"),
  });

  // handle submit form
  const onSubmit = async (value, { resetForm }) => {
    setSubmitBtn("LogIn...");
    const isLogin = await LoginUser(dispatch, value);
    if (isLogin) {
      resetForm();
      setSubmitBtn("Logged In...");
    } else {
      setSubmitBtn("LogIn");
    }
  };

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialState,
      validationSchema: schema,
      onSubmit: onSubmit,
    });

  return (
    <MainContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormWrapper>
          <FormTitle>Login</FormTitle>
          <DescriptionText>Login and manage what todo next!</DescriptionText>
          <FormInput
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            style={{
              border: errors?.email && touched?.email && "1px solid red",
            }}
          />
          <FormInput
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type="password"
            placeholder="enter password"
            style={{
              border: errors?.password && touched?.password && "1px solid red",
            }}
            mb="10px"
          />
          <Link to={"/sign-up"}>Create New Account</Link>
          <FormButton
            type="submit"
            disabled={Object.keys(errors).length ? true : false}
            style={{ opacity: Object.keys(errors).length ? "0.7" : "1" }}
          >
            {submitBtn}
          </FormButton>
        </FormWrapper>
      </FormContainer>
    </MainContainer>
  );
};

export default Login;
