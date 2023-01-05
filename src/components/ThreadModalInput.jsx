/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { BASE_URL, THREAD_SCHEMA, THREAD_INITIAL_VALUE } from 'constants';

import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createThereadAsync, selectThread } from 'states/threads/threadSlice';
import { setUnAuthorizedUser } from 'states/users/userSlice';

function ThreadModalInput({
  initialRef, finalRef, isOpen, onClose,
}) {
  const threads = useSelector(selectThread);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmitHandler = (values, { setSubmitting }) => {
    dispatch(createThereadAsync({ ...values }));
    setSubmitting(false);
  };

  useEffect(() => {
    if (threads.created) {
      onClose();
    }
    if (threads.expired) {
      toast({
        title: 'Upss ada masalah...',
        description: 'Sepertinya sesi kamu habis, silahkan lakukan login kembali untuk dapat menambahkan diskusi',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      dispatch(setUnAuthorizedUser());
      navigate(BASE_URL.LOGIN);
    }
  }, [threads]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah diskusi baru</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={THREAD_INITIAL_VALUE}
          validationSchema={THREAD_SCHEMA}
          onSubmit={(values, { setSubmitting }) => onSubmitHandler(values, { setSubmitting })}
        >
          {({
            values, errors, handleChange, handleSubmit, isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Judul</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    isInvalid={errors.title}
                    ref={initialRef}
                    onChange={handleChange}
                    value={values.title}
                  />
                  {errors.title && <FormHelperText color="tomato">{errors.title}</FormHelperText>}
                </FormControl>

                <FormControl>
                  <FormLabel>Isi Konten</FormLabel>
                  <Textarea
                    placeholder="Tuliskan isi diskusimu disini"
                    name="body"
                    isInvalid={errors.body}
                    onChange={handleChange}
                    value={values.body}
                  />
                  {errors.body && <FormHelperText color="tomato">{errors.body}</FormHelperText>}
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input
                    type="text"
                    name="category"
                    isInvalid={errors.category}
                    onChange={handleChange}
                    value={values.category}
                  />
                  {errors.category && <FormHelperText color="tomato">{errors.category}</FormHelperText>}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" mr={3} disabled={isSubmitting}>
                  {
                    !isSubmitting ? 'Buat Diskusi' : 'Loading...'
                }
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>

            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default ThreadModalInput;
