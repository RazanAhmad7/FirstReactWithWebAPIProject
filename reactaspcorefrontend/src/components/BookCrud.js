// src/components/BookCrud.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService";

const BookCrud = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBook(editingId, form);
        setEditingId(null);
      } else {
        await createBook(form);
        console.log("book's created successfully!");
      }
      setForm({ title: "", author: "", description: "", price: "" });
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
    });
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Call your delete function
        await deleteBook(id);
        fetchBooks()
          .then(() => {
            Swal.fire("Deleted!", "The book has been deleted.", "success");
            // Refresh list or update state
          })
          .catch((err) => {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error("Delete error:", err);
          });
      }
    });
  };
  return (
    <div>
      <h2>{editingId ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit} className="w-75 m-2 p-2 row gap-2">
        <div className="col-5">
          <input
            className="form-control "
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-5">
          <input
            name="author"
            className="form-control "
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-5">
          <input
            name="description"
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-5">
          <input
            name="price"
            className="form-control"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-primary " type="submit">
            {editingId ? "Update book" : "Add new book"}
          </button>
        </div>
      </form>

      <h2>Book List</h2>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col" className="text-center" colSpan={"2"}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>{book.price}</td>
              <td className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookCrud;
