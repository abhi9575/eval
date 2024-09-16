import React from "react";
import { Box, Container, VStack, Heading } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";
import Layout from "../components/Layout";

const Register = () => {
  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Create an Account
          </Heading>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <RegisterForm />
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Register;
