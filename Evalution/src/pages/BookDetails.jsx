import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  useDisclosure,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import BookForm from "../components/BookForm";
import { useBooks } from "../contexts/BookContext";
import { useAuth } from "../contexts/AuthContext";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { books, updateBook, deleteBook } = useBooks();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [book, setBook] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const foundBook = books.find((b) => b.id === bookId);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [bookId, books]);

  if (!book) {
    return (
      <Layout>
        <Box>Book not found</Box>
      </Layout>
    );
  }

  const handleUpdate = async (updatedBook) => {
    const success = await updateBook(bookId, updatedBook);
    if (success) {
      setBook({ ...book, ...updatedBook });
      onClose();
      toast({
        title: "Book updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update book",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    const success = await deleteBook(bookId);
    if (success) {
      toast({
        title: "Book deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/books");
    } else {
      toast({
        title: "Error",
        description: "Failed to delete book",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <VStack spacing={4} align="stretch">
        <Heading>{book.title}</Heading>
        <Image
          src={book.coverImage}
          alt={book.title}
          maxHeight="300px"
          objectFit="contain"
        />
        <Text>Author: {book.author}</Text>
        <Text>Genre: {book.genre}</Text>
        <Text>Publication Date: {book.publicationDate}</Text>
        <Text>Synopsis: {book.synopsis}</Text>
        {user && user.isAdmin && (
          <Box>
            <Button colorScheme="blue" mr={2} onClick={onOpen}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
        {isOpen && <BookForm book={book} onSubmit={handleUpdate} />}
      </VStack>
    </Layout>
  );
};

export default BookDetails;
