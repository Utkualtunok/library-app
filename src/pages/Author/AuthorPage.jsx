import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Box, Typography, Alert, Paper, Stack, IconButton, Divider
} from '@mui/material';
import { createAuthor, getAuthors, updateAuthor, deleteAuthor } from '../../api/authorsAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AuthorCRUD = () => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ id: '', name: '', birthDate: '', country: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [alert, setAlert] = useState('');

    // Yazarları almak için GET işlemi
    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        const data = await getAuthors();
        setAuthors(data);
    };

    const handleChange = (e) => {
        setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updateAuthor(newAuthor);
            } else {
                await createAuthor(newAuthor);
            }
            setAlert('success');
            fetchAuthors();
            setNewAuthor({ id: '', name: '', birthDate: '', country: '' });
            setIsEdit(false);
        } catch {
            setAlert('error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAuthor(id);
            setAlert('success');
            fetchAuthors();
        } catch {
            setAlert('error');
        }
    };

    const handleEdit = (author) => {
        setNewAuthor(author);
        setIsEdit(true);
    };

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" mb={2}>Yazar Yönetimi</Typography>

            <Stack spacing={2} mb={2}>
                <TextField
                    label="Yazar Adı"
                    name="name"
                    value={newAuthor.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Doğum Tarihi"
                    name="birthDate"
                    value={newAuthor.birthDate}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Ülke"
                    name="country"
                    value={newAuthor.country}
                    onChange={handleChange}
                    fullWidth
                />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {isEdit ? 'Yazarı Güncelle' : 'Yazar Ekle'}
                </Button>
            </Stack>

            {alert && (
                <Alert severity={alert === 'success' ? 'success' : 'error'}>
                    {alert === 'success' ? 'İşlem başarılı!' : 'Bir hata oluştu!'}
                </Alert>
            )}

            <Divider sx={{ mt: 4, mb: 2 }} />
            <Typography variant="h5">Yazarlar</Typography>
            {authors.length === 0 ? (
                <Typography>Henüz bir yazar yok.</Typography>
            ) : (
                <Stack spacing={2} mt={2}>
                    {authors.map((author) => (
                        <Paper key={author.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <Typography variant="h6">{author.name}</Typography>
                                <Typography variant="body2">Doğum Tarihi: {author.birthDate}, Ülke: {author.country}</Typography>
                            </div>
                            <div>
                                <IconButton onClick={() => handleEdit(author)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(author.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Paper>
    );
};

export default AuthorCRUD;
