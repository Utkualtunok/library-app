import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Typography, IconButton, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './BookPage.css';  // CSS dosyasını ekleyin

const apiUrl = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080/api/v1';

const Book = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', publicationYear: '', stock: '', authorId: '', categoryId: '', publisherId: '' });
    const [editData, setEditData] = useState(null);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/api/v1/books`)
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setFilteredBooks(data);  // Tüm kitapları filtrelenmiş kitaplara ekle
            })
            .catch(error => console.error('Kitaplar yüklenirken hata oluştu:', error));

        fetch(`${apiUrl}/api/v1/authors`)
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Yazarlar yüklenirken hata oluştu:', error));

        fetch(`${apiUrl}/api/v1/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Kategoriler yüklenirken hata oluştu:', error));

        fetch(`${apiUrl}/api/v1/publishers`)
            .then(response => response.json())
            .then(data => setPublishers(data))
            .catch(error => console.error('Yayıncılar yüklenirken hata oluştu:', error));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = books.filter(book => book.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredBooks(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editData ? `${apiUrl}/books/${editData.id}` : `${apiUrl}/books`;
        const method = editData ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.title,
                publicationYear: formData.publicationYear,
                stock: formData.stock,
                author: { id: formData.authorId },
                category: { id: formData.categoryId },
                publisher: { id: formData.publisherId }
            })
        })
            .then(response => response.json())
            .then(data => {
                if (editData) {
                    setBooks(books.map(b => b.id === editData.id ? data : b));
                    setEditData(null);
                } else {
                    setBooks([...books, data]);
                }
                setFilteredBooks([...books, data]);  // Güncellenmiş veriyi filtrelenmiş kitaplara ekle
                setModalOpen(true);
            })
            .catch(error => console.error('İşlem sırasında hata oluştu:', error));
    };

    const handleEdit = (book) => {
        setFormData({
            title: book.name,
            publicationYear: book.publicationYear,
            stock: book.stock,
            authorId: book.author?.id || '',
            categoryId: book.category?.id || '',
            publisherId: book.publisher?.id || ''
        });
        setEditData(book);
    };

    const handleDelete = (id) => {
        fetch(`${apiUrl}/books/${id}`, { method: 'DELETE' })
            .then(() => {
                setBooks(books.filter(b => b.id !== id));
                setFilteredBooks(filteredBooks.filter(b => b.id !== id)); // Silinen kitabı filtrelenmiş listeden kaldır
                setModalOpen(true);
            })
            .catch(error => console.error('Kitap silinirken hata oluştu:', error));
    };

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" component="h1" mb={2}>Kitap Sayfası</Typography>
            <Button component={Link} to="/" variant="contained" color="primary" sx={{ mb: 2 }}>Ana Sayfa</Button>

            <form onSubmit={handleSubmit} className="book-form">
                <Stack spacing={2}>
                    <TextField
                        label="Kitap Başlığı"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Yayın Yılı"
                        type="number"
                        value={formData.publicationYear}
                        onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Stok"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        fullWidth
                        required
                    />
                    <FormControl fullWidth required>
                        <InputLabel id="author-select-label">Yazar Seç</InputLabel>
                        <Select
                            labelId="author-select-label"
                            value={formData.authorId}
                            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                            label="Yazar Seç"
                        >
                            <MenuItem value=""><em>Seçiniz</em></MenuItem>
                            {authors.map(author => (
                                <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                        <InputLabel id="category-select-label">Kategori Seç</InputLabel>
                        <Select
                            labelId="category-select-label"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            label="Kategori Seç"
                        >
                            <MenuItem value=""><em>Seçiniz</em></MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                        <InputLabel id="publisher-select-label">Yayıncı Seç</InputLabel>
                        <Select
                            labelId="publisher-select-label"
                            value={formData.publisherId}
                            onChange={(e) => setFormData({ ...formData, publisherId: e.target.value })}
                            label="Yayıncı Seç"
                        >
                            <MenuItem value=""><em>Seçiniz</em></MenuItem>
                            {publishers.map(publisher => (
                                <MenuItem key={publisher.id} value={publisher.id}>{publisher.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        {editData ? 'Güncelle' : 'Ekle'}
                    </Button>
                </Stack>
            </form>

            <TextField
                label="Kitap Arama"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                sx={{ mb: 2 }}
            />

            <Typography variant="h6" component="h3" className="book-list-title">Kitap Listesi:</Typography>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Stack spacing={2}>
                    {filteredBooks.slice(0, 5).map(book => (
                        <Card key={book.id} className="book-card">
                            <CardContent>
                                <Typography variant="body1">{book.name} - {book.author ? book.author.name : 'Yazar yok'}</Typography>
                            </CardContent>
                            <div className="book-card-actions">
                                <IconButton onClick={() => handleEdit(book)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(book.id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Card>
                    ))}
                </Stack>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className="book-modal">
                    <Typography id="modal-title" variant="h6" component="h2">
                        İşlem Başarılı
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        İşlem başarıyla gerçekleştirildi.
                    </Typography>
                    <Button onClick={() => setModalOpen(false)}>Kapat</Button>
                </div>
            </Modal>
        </Paper>
    );
};

export default Book;
