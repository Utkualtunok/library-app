import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Typography, Paper, Stack, IconButton, Modal
} from '@mui/material';
import { createPublisher, getPublishers, updatePublisher, deletePublisher } from '../api/publisherAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PublisherCRUD = () => {
    const [publishers, setPublishers] = useState([]);
    const [newPublisher, setNewPublisher] = useState({ id: '', name: '', establishmentYear: '', address: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    // Yayıncıları almak için GET işlemi
    useEffect(() => {
        fetchPublishers();
    }, []);

    const fetchPublishers = async () => {
        const data = await getPublishers();
        setPublishers(data);
    };

    const handleChange = (e) => {
        setNewPublisher({ ...newPublisher, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updatePublisher(newPublisher);
                setModalTitle('Güncelleme Başarı');
                setModalMessage('Yayıncı başarıyla güncellendi!');
            } else {
                await createPublisher(newPublisher);
                setModalTitle('Ekleme Başarı');
                setModalMessage('Yayıncı başarıyla eklendi!');
            }
            setModalOpen(true);
            fetchPublishers();
            setNewPublisher({ id: '', name: '', establishmentYear: '', address: '' });
            setIsEdit(false);
        } catch {
            setModalTitle('Hata');
            setModalMessage('Bir hata oluştu!');
            setModalOpen(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePublisher(id);
            setModalTitle('Silme Başarı');
            setModalMessage('Yayıncı başarıyla silindi!');
            setModalOpen(true);
            fetchPublishers();
        } catch {
            setModalTitle('Hata');
            setModalMessage('Bir hata oluştu!');
            setModalOpen(true);
        }
    };

    const handleEdit = (publisher) => {
        setNewPublisher(publisher);
        setIsEdit(true);
    };

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" mb={2}>Yayıncı Yönetimi</Typography>

            <Stack spacing={2} mb={2}>
                <TextField
                    label="Yayıncı Adı"
                    name="name"
                    value={newPublisher.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Kuruluş Yılı"
                    name="establishmentYear"
                    value={newPublisher.establishmentYear}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Adres"
                    name="address"
                    value={newPublisher.address}
                    onChange={handleChange}
                    fullWidth
                />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {isEdit ? 'Yayıncıyı Güncelle' : 'Yayıncı Ekle'}
                </Button>
            </Stack>

            <Typography variant="h5" mt={4}>Yayıncılar</Typography>
            {publishers.length === 0 ? (
                <Typography>Henüz bir yayıncı yok.</Typography>
            ) : (
                <Stack spacing={2} mt={2}>
                    {publishers.map((publisher) => (
                        <Paper key={publisher.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <Typography variant="h6">{publisher.name}</Typography>
                                <Typography variant="body2">Kuruluş Yılı: {publisher.establishmentYear}, Adres: {publisher.address}</Typography>
                            </div>
                            <div>
                                <IconButton onClick={() => handleEdit(publisher)} color='primary'>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(publisher.id)} color='secondary'>
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

export default PublisherCRUD;
