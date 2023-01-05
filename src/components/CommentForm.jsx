/* eslint-disable linebreak-style */
import {
  Button,
  FormControl, FormHelperText, FormLabel, Textarea,
} from '@chakra-ui/react';
import { COMMENT_INITIAL_VALUE, COMMENT_SCHEMA } from 'constants';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCommentAsync } from 'states/threads/threadSlice';

function CommentForm() {
  const dispatch = useDispatch();
  const params = useParams();

  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    dispatch(createCommentAsync({ ...values, threadId: params.id }));
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={COMMENT_INITIAL_VALUE}
      validationSchema={COMMENT_SCHEMA}
      onSubmit={
        (values, {
          setSubmitting, resetForm,
        }) => onSubmitHandler(values, { setSubmitting, resetForm })
      }
    >
      {({
        values, errors, handleChange, handleSubmit, isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl display="flex" flexDirection="column" gap="4">
            <FormLabel>Email address</FormLabel>
            <Textarea
              placeholder="Tuliskan isi komentarmu disini"
              name="content"
              isInvalid={errors.content}
              onChange={handleChange}
              value={values.content}
            />
            {errors.content && <FormHelperText color="tomato">{errors.content}</FormHelperText>}

            <Button type="submit" disabled={isSubmitting}>
              {
                !isSubmitting ? 'Tambah' : 'Loading...'
              }
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
}

export default CommentForm;
