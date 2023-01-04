/* eslint-disable linebreak-style */
import {
  FormControl, FormHelperText, FormLabel, Input,
} from '@chakra-ui/react';
import React from 'react';

function CommentForm() {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>never share your email.</FormHelperText>
    </FormControl>
  );
}

export default CommentForm;
