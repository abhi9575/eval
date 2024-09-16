import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </SimpleGrid>
  );
};

export default BookList;
