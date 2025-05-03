import axios from "axios";

// set a base URL for the backend:
const API_URL = "http://localhost:40412/api/Books";
// fetch all books
export const getBooks = () => axios.get(API_URL);
// get one book by its id
export const getBook = (id) => axios.get(`${API_URL}/${id}`);
// adding one book , sending data to the server using post method
export const createBook = (book) => axios.post('http://localhost:40412/api/Books', book);
// update one book, making a put request using put method
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);

// deleting one book
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
