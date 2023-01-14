/* eslint-disable linebreak-style */
import {
  Button, FormControl, FormHelperText, FormLabel, Input, useToast,
} from '@chakra-ui/react';

import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUserAsync, selectUser } from 'states/users/userSlice';
import { REGISTER_SCHEMA, REGISTER_INITIAL_VALUE, BASE_URL } from '../constants';

function Register() {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmitHandler = (values, { setSubmitting }) => {
    dispatch(registerUserAsync({ ...values }));
    setSubmitting(false);
  };

  useEffect(() => {
    if (users.registered) {
      toast({
        title: 'Akun berhasil ditambahkan.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(BASE_URL.LOGIN);
    } else if (users.registered === false) {
      toast({
        title: 'Akun tidak berhasil ditambahkan.',
        description: users.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [navigate, toast, users]);

  return (
    <Formik
      initialValues={REGISTER_INITIAL_VALUE}
      validationSchema={REGISTER_SCHEMA}
      onSubmit={(values, { setSubmitting }) => onSubmitHandler(values, { setSubmitting })}
    >
      {({
        values, errors, handleChange, handleBlur, handleSubmit, isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl display="flex" flexDirection="column" gap="4">
            <FormLabel>Nama</FormLabel>
            <Input
              type="text"
              name="name"
              isInvalid={errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && <FormHelperText color="tomato">{errors.name}</FormHelperText>}

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

            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="password_confirm"
              isInvalid={errors.password_confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password_confirm}
              data-testid="input-password-confirm"
            />
            {errors.password_confirm && <FormHelperText color="tomato">{errors.password_confirm}</FormHelperText>}

            <Button type="submit" disabled={isSubmitting}>
              {
                !isSubmitting ? 'Register' : 'Loading...'
              }
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
