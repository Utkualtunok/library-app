// src/routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage'; // Ana sayfa bileşeninin yolu doğru olmalı
import PublisherPage from './pages/PublisherPage';
import CategoryPage from './pages/CategoryPage';
import BookPage from './pages/Book/BookPage';
import AuthorPage from './pages/Author/AuthorPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/publishers" element={<PublisherPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/books" element={<BookPage />} />
                <Route path="/authors" element={<AuthorPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
