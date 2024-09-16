import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useBooks } from "../contexts/BookContext";

const BookForm = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const [synopsis, setSynopsis] = useState(book?.synopsis || "");
  const [publicationDate, setPublicationDate] = useState(
    book?.publicationDate || ""
  );
  const [coverImage, setCoverImage] = useState(book?.coverImage || "");
  const { addBook, updateBook } = useBooks();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title,
      author,
      genre,
      synopsis,
      publicationDate,
      coverImage,
    };
    let success;
    if (book) {
      success = await updateBook(book.id, bookData);
    } else {
      success = await addBook(bookData);
    }
    if (success) {
      toast({
        title: book ? "Book updated" : "Book added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSubmit();
    } else {
      toast({
        title: "Error",
        description: book ? "Failed to update book" : "Failed to add book",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="500px" margin="auto">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Author</FormLabel>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Genre</FormLabel>
          <Input value={genre} onChange={(e) => setGenre(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Synopsis</FormLabel>
          <Textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Publication Date</FormLabel>
          <Input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Cover Image URL</FormLabel>
          <Input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          {book ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </Box>
  );
};

export default BookForm;
