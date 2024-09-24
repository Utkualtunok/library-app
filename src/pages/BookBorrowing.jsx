import React, { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Snackbar,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    createBookBorrowing,
    getBookBorrowings,
    updateBookBorrowing,
    deleteBookBorrowing,
    getBookBorrowingById,
} from '../api/bookBorrowingsAPI';
import {
    getBooks // Kitapları almak için API
} from '../api/booksAPI';

const BookBorrowing = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [books, setBooks] = useState([]); // Kitapları tutmak için state
    const [borrowerName, setBorrowerName] = useState('');
    const [borrowerMail, setBorrowerMail] = useState('');
    const [borrowingDate, setBorrowingDate] = useState('');
    const [selectedBookId, setSelectedBookId] = useState(''); // Seçilen kitap ID'si
    const [selectedBorrowingId, setSelectedBorrowingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadBorrowings();
        loadBooks(); // Kitapları yükle
    }, []);

    const loadBorrowings = async () => {
        const data = await getBookBorrowings();
        setBorrowings(data);
    };

    const loadBooks = async () => {
        const data = await getBooks(); // Kitapları API'den al
        setBooks(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookBorrowing = {
                borrowerName,
                borrowerMail,
                borrowingDate,
                bookForBorrowingRequest: {
                    id: selectedBookId, // Seçilen kitap ID'si
                },
            };

            if (selectedBorrowingId) {
                bookBorrowing.id = selectedBorrowingId;
                await updateBookBorrowing(bookBorrowing);
                setSuccessMessage('Ödünç alma işlemi başarıyla güncellendi.');
            } else {
                await createBookBorrowing(bookBorrowing);
                setSuccessMessage('Ödünç alma işlemi başarıyla eklendi.');
            }
            resetForm();
            loadBorrowings();
        } catch (error) {
            setErrorMessage('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    };

    const handleEditBorrowing = async (id) => {
        const borrowing = await getBookBorrowingById(id);
        setBorrowerName(borrowing.borrowerName);
        setBorrowerMail(borrowing.borrowerMail);
        setBorrowingDate(borrowing.borrowingDate);
        setSelectedBookId(borrowing.bookForBorrowingRequest.id); // Kitap ID'sini setle
        setSelectedBorrowingId(borrowing.id);
    };

    const handleDeleteBorrowing = async (id) => {
        await deleteBookBorrowing(id);
        setSuccessMessage('Ödünç alma işlemi başarıyla silindi.');
        loadBorrowings();
    };

    const resetForm = () => {
        setBorrowerName('');
        setBorrowerMail('');
        setBorrowingDate('');
        setSelectedBookId(''); // Seçili kitabı sıfırla
        setSelectedBorrowingId(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Kitap Alma İşlemleri
            </Typography>
            <Paper sx={{ padding: 4, marginBottom: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Typography variant="h6">Yeni Ödünç Alma Kaydı</Typography>
                        <TextField
                            fullWidth
                            label="Ödünç Alan Adı"
                            value={borrowerName}
                            onChange={(e) => setBorrowerName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Ödünç Alan E-posta"
                            value={borrowerMail}
                            onChange={(e) => setBorrowerMail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Ödünç Alma Tarihi"
                            type="date"
                            value={borrowingDate}
                            onChange={(e) => setBorrowingDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                        <FormControl fullWidth required>
                            <InputLabel>Kitap Seçin</InputLabel>
                            <Select
                                value={selectedBookId}
                                onChange={(e) => setSelectedBookId(e.target.value)}
                            >
                                {books.map((book) => (
                                    <MenuItem key={book.id} value={book.id}>
                                        {book.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">
                            {selectedBorrowingId ? 'Güncelle' : 'Ekle'}
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Typography variant="h5" gutterBottom>
                Ödünç Alma Kayıtları
            </Typography>
            <Paper sx={{ padding: 2 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ödünç Alan Adı</TableCell>
                                <TableCell>Ödünç Alan E-posta</TableCell>
                                <TableCell>Ödünç Alma Tarihi</TableCell>
                                <TableCell>Kitap</TableCell>
                                <TableCell>İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {borrowings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">Henüz bir kayıt yok.</TableCell>
                                </TableRow>
                            ) : (
                                borrowings.map((borrowing) => (
                                    <TableRow key={borrowing.id}>
                                        <TableCell>{borrowing.borrowerName}</TableCell>
                                        <TableCell>{borrowing.borrowerMail}</TableCell>
                                        <TableCell>{borrowing.borrowingDate}</TableCell>
                                        <TableCell>
                                            {borrowing.bookForBorrowingRequest
                                                ? borrowing.bookForBorrowingRequest.name
                                                : 'Kitap bilgisi yok'}
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEditBorrowing(borrowing.id)}
                                                >
                                                    Düzenle
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDeleteBorrowing(borrowing.id)}
                                                >
                                                    Sil
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage('')}
            >
                <Alert onClose={() => setSuccessMessage('')} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage('')}
            >
                <Alert onClose={() => setErrorMessage('')} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default BookBorrowing;
