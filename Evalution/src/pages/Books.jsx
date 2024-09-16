import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Select,
  Button,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import Layout from "../components/Layout";
import { useBooks } from "../contexts/BookContext";
import { useAuth } from "../contexts/AuthContext";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newToOld");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { books, fetchBooks } = useBooks();
  const { user } = useAuth();

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newToOld") {
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      } else {
        return new Date(a.publicationDate) - new Date(b.publicationDate);
      }
    });

  const handleAddBook = () => {
    onClose();
    fetchBooks();
  };

  return (
    <Layout>
      <VStack spacing={4} align="stretch">
        <Heading>Books</Heading>
        <Input
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newToOld">New to Old</option>
          <option value="oldToNew">Old to New</option>
        </Select>
        {user && user.isAdmin && <Button onClick={onOpen}>Add New Book</Button>}
        {isOpen && <BookForm onSubmit={handleAddBook} />}
        <BookList books={filteredBooks} />
      </VStack>
    </Layout>
  );
};

export default Books;
