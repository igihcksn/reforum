const {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} = require("@chakra-ui/react");

const CommentForm = () => {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
};

export default CommentForm;
