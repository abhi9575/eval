import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books.json");
      if (response.data) {
        const booksArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setBooks(booksArray);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await api.post("/books.json", book);
      const newBook = { id: response.data.name, ...book };
      setBooks((prevBooks) => [...prevBooks, newBook]);
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      await api.put(`/books/${id}.json`, updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, ...updatedBook } : book
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating book:", error);
      return false;
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}.json`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting book:", error);
      return false;
    }
  };

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    fetchBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
