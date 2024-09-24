// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/HomePage';
import BookPage from './pages/Book/BookPage';
import AuthorPage from './pages/Author/AuthorPage';
import CategoryPage from './pages/CategoryPage';
import PublisherPage from './pages/PublisherPage';
import BookBorrowing from './pages/BookBorrowing';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/authors" element={<AuthorPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/publishers" element={<PublisherPage />} />
        <Route path="/borrowing" element={<BookBorrowing />} />

      </Routes>
    </>
  );
}

export default App;
