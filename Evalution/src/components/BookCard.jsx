import React from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
      <Image
        src={book.coverImage}
        alt={book.title}
        height="200px"
        objectFit="cover"
      />
      <Text mt={2} fontSize="xl" fontWeight="semibold">
        {book.title}
      </Text>
      <Text>Author: {book.author}</Text>
      <Text>Genre: {book.genre}</Text>
      <Link to={`/books/${book.id}`}>
        <Button mt={2} colorScheme="blue">
          Show More
        </Button>
      </Link>
    </Box>
  );
};

export default BookCard;
