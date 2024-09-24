import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select, TextField, InputLabel, FormControl } from "@mui/material";
import axios from 'axios';

const initialBook = {
    name: "",
    publicationYear: "",
    stock: "",
    author: {
        id: "",
        name: "",
        birthDate: "2024-09-23",
        country: ""
    },
    publisher: {
        id: "",
        name: "",
        establishmentYear: 0,
        address: ""
    },
    categories: [], // Kategoriler dizi olarak tanımlandı
};

const BookPage = () => {
    const [book, setBook] = useState([]); // Başlangıçta boş dizi
    const [newBook, setNewBook] = useState(initialBook);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Seçilen kategoriler için state
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
            .then((res) => setBook(res.data.content));

        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
            .then((res) => setAuthors(res.data.content));

        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
            .then((res) => setPublishers(res.data.content));

        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
            .then((res) => setCategories(res.data.content));

        setUpdate(true);
    }, [update]);

    const handleNewBookInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({
            ...newBook,
            [name]: value,
        });
    };

    const handleNewBookAuthorSelect = (e) => {
        const { value } = e.target;
        const newBookAuthor = authors.find((aut) => aut.id === value);
        setNewBook((prev) => ({
            ...prev,
            author: newBookAuthor,
        }));
    };

    const handleNewBookPublisherSelect = (e) => {
        const { value } = e.target;
        const newBookPublisher = publishers.find((pub) => pub.id === value);
        setNewBook((prev) => ({
            ...prev,
            publisher: newBookPublisher,
        }));
    };

    const handleNewBookCategorySelect = (e) => {
        const { value } = e.target;
        const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedCategories);
        const newCategories = categories.filter((cat) => selectedCategories.includes(cat.id));
        setNewBook((prev) => ({
            ...prev,
            categories: newCategories,
        }));
    };

    const handleAddNewBookBtn = () => {
        axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books", newBook)
            .then((res) => {
                console.log(res.data);
                setUpdate(false);
                setNewBook(initialBook); // Formu sıfırla
                setSelectedCategories([]); // Seçilen kategorileri sıfırla
            });
    };

    return (
        <>
            <h1>TEST</h1>
            <TextField
                label="Name"
                variant="standard"
                name="name"
                value={newBook.name}
                onChange={handleNewBookInputChange}
            />
            <br />
            <TextField
                label="Publication Year"
                variant="standard"
                name="publicationYear"
                value={newBook.publicationYear}
                onChange={handleNewBookInputChange}
            />
            <br />
            <TextField
                label="Stock"
                variant="standard"
                name="stock"
                value={newBook.stock}
                onChange={handleNewBookInputChange}
            />
            <br />
            <FormControl variant="standard">
                <InputLabel>Select Authors</InputLabel>
                <Select
                    variant="standard"
                    onChange={handleNewBookAuthorSelect}
                >
                    <MenuItem value={0} disabled>
                        Select Authors
                    </MenuItem>
                    {authors.map((aut, index) => (
                        <MenuItem key={`${index}authors`} value={aut.id}>
                            {aut.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            <FormControl variant="standard">
                <InputLabel>Select Publishers</InputLabel>
                <Select
                    variant="standard"
                    onChange={handleNewBookPublisherSelect}
                >
                    <MenuItem value={0} disabled>
                        Select Publishers
                    </MenuItem>
                    {publishers.map((pub, index) => (
                        <MenuItem key={`${index}publishers`} value={pub.id}>
                            {pub.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            <FormControl variant="standard">
                <InputLabel>Select Categories</InputLabel>
                <Select
                    multiple
                    variant="standard"
                    value={selectedCategories} // value prop'u eklendi
                    onChange={handleNewBookCategorySelect}
                >
                    {categories.map((cat, index) => (
                        <MenuItem key={`${index}categories`} value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            <Button variant="contained" color="error" onClick={handleAddNewBookBtn}>
                Add New Book
            </Button>
            {Array.isArray(book) && book.length > 0 ? ( // Hata kontrolü eklendi
                book.map((item, index) => (
                    <ul key={index}>
                        <li>
                            {item.name} {item.author.name} {item.publisher.name}
                        </li>
                    </ul>
                ))
            ) : (
                <p>No books available.</p> // Boşsa bilgi ver
            )}
        </>
    );
};

export default BookPage;
