/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { putAccessToken } from 'utilities';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, selectUser } from 'states/users/userSlice';
import {
  Button, FormControl, FormHelperText, FormLabel, Input, useToast,
} from '@chakra-ui/react';
import { BASE_URL, LOGIN_SCHEMA, LOGIN_INITIAL_VALUE } from '../constants';

function Login() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUser);

  const onSubmitHandler = (values, { setSubmitting }) => {
    dispatch(loginUserAsync({ ...values }));
    setSubmitting(false);
  };

  useEffect(() => {
    if (users.authenticated) {
      putAccessToken(users.token);
      toast({
        title: 'Selamat berdiskusi.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(BASE_URL.HOMEPAGE);
    }
  }, [users]);

  return (
    <Formik
      initialValues={LOGIN_INITIAL_VALUE}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={(values, { setSubmitting }) => onSubmitHandler(values, { setSubmitting })}
    >
      {({
        values, errors, handleChange, handleBlur, handleSubmit, isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl display="flex" flexDirection="column" gap="4">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              isInvalid={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              data-testid="input-name"
            />
            {errors.email && <FormHelperText color="tomato">{errors.email}</FormHelperText>}

            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              isInvalid={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              data-testid="input-password"
            />
            {errors.password && <FormHelperText color="tomato">{errors.password}</FormHelperText>}

            <Button type="submit" disabled={isSubmitting}>
              {
                !isSubmitting ? 'Login' : 'Loading...'
              }
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
