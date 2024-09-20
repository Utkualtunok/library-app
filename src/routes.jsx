// src/routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PublisherPage from './pages/PublisherPage';
import CategoryPage from './pages/CategoryPage';
import BookPage from './pages/BookPage';
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
