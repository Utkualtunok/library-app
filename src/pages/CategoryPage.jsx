import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Typography, Paper, Stack, IconButton, Modal
} from '@mui/material';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../api/categoryAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CategoryCRUD = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ id: '', name: '', description: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const handleChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updateCategory(newCategory);
                setModalTitle('Güncelleme Başarı');
                setModalMessage('Kategori başarıyla güncellendi!');
            } else {
                await createCategory(newCategory);
                setModalTitle('Ekleme Başarı');
                setModalMessage('Kategori başarıyla eklendi!');
            }
            setModalOpen(true);
            fetchCategories();
            setNewCategory({ id: '', name: '', description: '' });
            setIsEdit(false);
        } catch {
            setModalTitle('Hata');
            setModalMessage('Bir hata oluştu!');
            setModalOpen(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setModalTitle('Silme Başarı');
            setModalMessage('Kategori başarıyla silindi!');
            setModalOpen(true);
            fetchCategories();
        } catch {
            setModalTitle('Hata');
            setModalMessage('Bir hata oluştu!');
            setModalOpen(true);
        }
    };

    const handleEdit = (category) => {
        setNewCategory(category);
        setIsEdit(true);
    };

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" mb={2}>Kategori Yönetimi</Typography>

            <Stack spacing={2} mb={2}>
                <TextField
                    label="Kategori Adı"
                    name="name"
                    value={newCategory.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Açıklama"
                    name="description"
                    value={newCategory.description}
                    onChange={handleChange}
                    fullWidth
                />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {isEdit ? 'Kategoriyi Güncelle' : 'Kategori Ekle'}
                </Button>
            </Stack>

            <Typography variant="h5" mt={4}>Kategoriler</Typography>
            {categories.length === 0 ? (
                <Typography>Henüz bir kategori yok.</Typography>
            ) : (
                <Stack spacing={2} mt={2}>
                    {categories.map((category) => (
                        <Paper key={category.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <Typography variant="h6">{category.name}</Typography>
                                <Typography variant="body2">Açıklama: {category.description}</Typography>
                            </div>
                            <div>
                                <IconButton onClick={() => handleEdit(category)} color='primary'>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(category.id)} color='secondary'>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Paper>
                    ))}
                </Stack>
            )}

            {/* Modal Bileşeni */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className="book-modal">
                    <Typography id="modal-title" variant="h6">
                        {modalTitle}
                    </Typography>
                    <Typography id="modal-description">
                        {modalMessage}
                    </Typography>
                    <Button onClick={() => setModalOpen(false)} variant="contained" color="primary">
                        Tamam
                    </Button>
                </div>
            </Modal>
        </Paper>
    );
};

export default CategoryCRUD;
