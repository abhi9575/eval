import React from "react";
import { useParams } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import BookList from "../components/BookList";
import GenreTabs from "../components/GenreTabs";
import Layout from "../components/Layout";
import { useBooks } from "../contexts/BookContext";

const Genre = () => {
  const { genre } = useParams();
  const { books } = useBooks();
  const genres = [...new Set(books.map((book) => book.genre))];
  const filteredBooks = books.filter((book) => book.genre === genre);

  return (
    <Layout>
      <Box>
        <Heading mb={4}>Books in {genre}</Heading>
        <GenreTabs genres={genres} />
        <BookList books={filteredBooks} />
      </Box>
    </Layout>
  );
};

export default Genre;
