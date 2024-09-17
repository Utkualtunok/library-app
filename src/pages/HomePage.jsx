// src/pages/Homepage.jsx
import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Kütüphane Ana Sayfası
            </Typography>

            <Stack spacing={2} sx={{ mt: 4 }}>
                <Button
                    component={Link}
                    to="/books"
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Kitaplar
                </Button>

                <Button
                    component={Link}
                    to="/authors"
                    variant="contained"
                    color="secondary"
                    size="large"
                >
                    Yazarlar
                </Button>

                <Button
                    component={Link}
                    to="/categories"
                    variant="contained"
                    color="success"
                    size="large"
                >
                    Kategoriler
                </Button>
            </Stack>
        </Container>
    );
}

export default Homepage;
