import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Login = () => {
  return (
    <FormControl display="flex" flexDirection="column" gap="4">
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormLabel>Password</FormLabel>
      <Input type="password" />
      <Button type="submit">Login</Button>
    </FormControl>
  );
};

export default Login;
