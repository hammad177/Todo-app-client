import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { SignUpUser } from "../context/GlobalAction";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  DescriptionText,
  FormButton,
  FormContainer,
  FormInput,
  FormTitle,
  FormWrapper,
  MainContainer,
} from "../style-components";

const SignUp = () => {
  const { dispatch } = useContext(GlobalContext);
  const [submitBtn, setSubmitBtn] = useState("Sign Up");

  // form initial state value
  const initialState = {
    email: "",
    username: "",
    password: "",
  };

  // form validation schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("please enter valid email")
      .required("required field"),
    username: Yup.string().required("required field"),
    password: Yup.string().min(4).required("required field"),
  });

  // handle submit form
  const onSubmit = async (value, { resetForm }) => {
    setSubmitBtn("Creating ...");
    const isSignUp = await SignUpUser(dispatch, value);
    if (isSignUp) {
      resetForm();
      setSubmitBtn("Created...");
    } else {
      setSubmitBtn("Sign Up");
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
          <FormTitle>Sign Up</FormTitle>
          <DescriptionText>Sign Up and manage what todo next!</DescriptionText>
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
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
            type="text"
            placeholder="john doe"
            style={{
              border: errors?.username && touched?.username && "1px solid red",
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
          <Link to={"/login"}>Already have an account?</Link>
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

export default SignUp;
