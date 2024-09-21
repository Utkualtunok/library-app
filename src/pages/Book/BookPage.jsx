import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { createBook, getBooks, updateBook, deleteBook } from '../../API/booksAPI'; // Kitap API'sini içeri aktarıyoruz
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BookCRUD = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        id: '',
        name: '',
        publicationYear: '',
        stock: '',
        author: { id: '', name: '', birthDate: '', country: '' },
        publisher: { id: '', name: '', establishmentYear: '', address: '' },
        categories: [{ id: '', name: '', description: '' }],
    });
    const [isEdit, setIsEdit] = useState(false);
    const [alert, setAlert] = useState('');

    // Kitapları almak için GET işlemi
    useEffect(() => {
        getBooks().then((data) => setBooks(data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length > 1) {
            setNewBook({
                ...newBook,
                [keys[0]]: { ...newBook[keys[0]], [keys[1]]: value },
            });
        } else {
            setNewBook({ ...newBook, [name]: value });
        }
    };

    const handleCategoryChange = (index, event) => {
        const { name, value } = event.target;
        const updatedCategories = [...newBook.categories];
        updatedCategories[index] = { ...updatedCategories[index], [name]: value };
        setNewBook({ ...newBook, categories: updatedCategories });
    };

    const handleSubmit = () => {
        if (isEdit) {
            // Update işlemi
            updateBook(newBook.id, newBook)
                .then(() => {
                    setAlert('success');
                    setIsEdit(false);
                    refreshBooks();
                })
                .catch(() => setAlert('error'));
        } else {
            // Create işlemi
            createBook(newBook)
                .then(() => {
                    setAlert('success');
                    refreshBooks();
                })
                .catch(() => setAlert('error'));
        }
    };

    const handleDelete = (id) => {
        deleteBook(id)
            .then(() => {
                setAlert('success');
                refreshBooks();
            })
            .catch(() => setAlert('error'));
    };

    const handleEdit = (book) => {
        setNewBook(book);
        setIsEdit(true);
    };

    const refreshBooks = () => {
        getBooks().then((data) => setBooks(data));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" mb={2}>Kitap Yönetimi</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                {/* Kitap Bilgileri */}
                <TextField
                    label="Kitap Adı"
                    name="name"
                    value={newBook.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Yayın Yılı"
                    name="publicationYear"
                    value={newBook.publicationYear}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Stok"
                    name="stock"
                    value={newBook.stock}
                    onChange={handleChange}
                    fullWidth
                />

                {/* Yazar Bilgileri */}
                <Typography variant="h6">Yazar Bilgileri</Typography>
                <TextField
                    label="Yazar ID"
                    name="author.id"
                    value={newBook.author.id}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Yazar Adı"
                    name="author.name"
                    value={newBook.author.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Doğum Tarihi"
                    name="author.birthDate"
                    value={newBook.author.birthDate}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Ülke"
                    name="author.country"
                    value={newBook.author.country}
                    onChange={handleChange}
                    fullWidth
                />

                {/* Yayınevi Bilgileri */}
                <Typography variant="h6">Yayınevi Bilgileri</Typography>
                <TextField
                    label="Yayınevi ID"
                    name="publisher.id"
                    value={newBook.publisher.id}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Yayınevi Adı"
                    name="publisher.name"
                    value={newBook.publisher.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Kuruluş Yılı"
                    name="publisher.establishmentYear"
                    value={newBook.publisher.establishmentYear}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Adres"
                    name="publisher.address"
                    value={newBook.publisher.address}
                    onChange={handleChange}
                    fullWidth
                />

                {/* Kategoriler */}
                <Typography variant="h6">Kategoriler</Typography>
                {newBook.categories.map((category, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Kategori ID"
                            name="id"
                            value={category.id}
                            onChange={(e) => handleCategoryChange(index, e)}
                            fullWidth
                        />
                        <TextField
                            label="Kategori Adı"
                            name="name"
                            value={category.name}
                            onChange={(e) => handleCategoryChange(index, e)}
                            fullWidth
                        />
                        <TextField
                            label="Açıklama"
                            name="description"
                            value={category.description}
                            onChange={(e) => handleCategoryChange(index, e)}
                            fullWidth
                        />
                    </Box>
                ))}

                {/* Submit Button */}
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {isEdit ? 'Kitabı Güncelle' : 'Kitap Ekle'}
                </Button>
            </Box>

            {/* Alert */}
            {alert && (
                <Alert severity={alert === 'success' ? 'success' : 'error'}>
                    {alert === 'success' ? 'İşlem başarılı!' : 'Bir hata oluştu!'}
                </Alert>
            )}

            {/* Kitap Listesi */}
            <Typography variant="h5" mt={4}>Kitaplar</Typography>
            <List>
                {books.map((book) => (
                    <ListItem
                        key={book.id}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(book)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(book.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={book.name}
                            secondary={`Yayın Yılı: ${book.publicationYear}, Stok: ${book.stock}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default BookCRUD;
