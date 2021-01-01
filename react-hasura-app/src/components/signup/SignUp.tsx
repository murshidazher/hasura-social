import { gql, useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

interface Props {}

const SIGNUP_MUTATION = gql`
    mutation SignUp($email: String!, $password: String!, $displayName: String!) {
        create_user(
        credentials: {
            email: $email
            password: $password
            displayName: $displayName
        }
        ) {
        displayName
        email
        id
        }
  }
`;

const initialValues = {
  displayName: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  displayName: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("It should be an email")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
});

export const SignUp = (props: Props) => {
  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);
  const history = useHistory();
  const signupHandler = (values: FormikValues) => {
    signup({ variables: values })
      .then(({ errors }) => {
        if (errors) {
          console.error(errors);
        } else {
          history.push("/signin");
        }
      })
      .catch(console.error);
  };
  return (
    <Box width={300} margin="30px auto">
      <Typography variant="h6">Sign Up</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={signupHandler}
      >
        {({
          values,
          touched,
          errors,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
          isInitialValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Display Name"
              name="displayName"
              value={values.displayName}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={!!(errors.displayName && touched.displayName)}
              helperText={
                errors.displayName && touched.displayName && errors.displayName
              }
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={!!(errors.email && touched.email)}
              helperText={errors.email && touched.email && errors.email}
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              fullWidth
              error={!!(errors.password && touched.password)}
              helperText={
                errors.password && touched.password && errors.password
              }
              margin="normal"
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={!isValid || !!isInitialValid || loading}
            >
              Sign Up
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};