import React from "react";
import { Box, Container, VStack, Heading } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";

const Login = () => {
  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Welcome Back
          </Heading>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <LoginForm />
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Login;
