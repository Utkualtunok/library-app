import React, { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Modal,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
    const [books, setBooks] = useState([]);
    const [borrowerName, setBorrowerName] = useState('');
    const [borrowerMail, setBorrowerMail] = useState('');
    const [borrowingDate, setBorrowingDate] = useState('');
    const [selectedBookId, setSelectedBookId] = useState('');
    const [selectedBorrowingId, setSelectedBorrowingId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalSeverity, setModalSeverity] = useState('success'); // 'success' veya 'error'

    useEffect(() => {
        loadBorrowings();
        loadBooks();
    }, []);

    const loadBorrowings = async () => {
        const data = await getBookBorrowings();
        setBorrowings(data);
    };

    const loadBooks = async () => {
        const data = await getBooks();
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
                    id: selectedBookId,
                },
            };

            if (selectedBorrowingId) {
                bookBorrowing.id = selectedBorrowingId;
                await updateBookBorrowing(bookBorrowing);
                setModalMessage('Ödünç alma işlemi başarıyla güncellendi.');
                setModalSeverity('success');
            } else {
                await createBookBorrowing(bookBorrowing);
                setModalMessage('Ödünç alma işlemi başarıyla eklendi.');
                setModalSeverity('success');
            }
            resetForm();
            loadBorrowings();
        } catch (error) {
            setModalMessage('Bir hata oluştu, lütfen tekrar deneyin.');
            setModalSeverity('error');
        }
        setOpenModal(true);
    };

    const handleEditBorrowing = async (id) => {
        const borrowing = await getBookBorrowingById(id);
        setBorrowerName(borrowing.borrowerName);
        setBorrowerMail(borrowing.borrowerMail);
        setBorrowingDate(borrowing.borrowingDate);
        setSelectedBookId(borrowing.bookForBorrowingRequest.id);
        setSelectedBorrowingId(borrowing.id);
    };

    const handleDeleteBorrowing = async (id) => {
        await deleteBookBorrowing(id);
        setModalMessage('Ödünç alma işlemi başarıyla silindi.');
        setModalSeverity('success');
        setOpenModal(true);
        loadBorrowings();
    };

    const resetForm = () => {
        setBorrowerName('');
        setBorrowerMail('');
        setBorrowingDate('');
        setSelectedBookId('');
        setSelectedBorrowingId(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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

            {/* Modal for success and error messages */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Paper sx={{ padding: 4, margin: 'auto', marginTop: '1%', maxWidth: 400 }}>
                    <Typography variant="h6" align="center" color={modalSeverity === 'success' ? 'black' : 'red'}>
                        {modalMessage}
                    </Typography>
                    <Stack direction="row" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Button variant="contained" onClick={handleCloseModal}>
                            Kapat
                        </Button>
                    </Stack>
                </Paper>
            </Modal>
        </Container>
    );
};

export default BookBorrowing;
