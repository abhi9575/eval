import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link to="/">Masai Library</Link>
        </Box>
        <Spacer />
        <Box>
          {user ? (
            <>
              <Link to="/books">
                <Button mr={2}>Books</Button>
              </Link>
              <Link to="/books/genre">
                <Button mr={2}>Genres</Button>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button mr={2}>Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
