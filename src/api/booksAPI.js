import axios from "axios";

// Tüm kitapları getirme
export const getBooks = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/books"
    );
    console.log(data);
    return data;
};

// ID'ye göre kitap getirme
export const getBookById = async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`
    );
    return data;
};

// Yeni kitap oluşturma
export const createBook = async (book) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`,
        book
    );
    return data;
};

// Kitap güncelleme (PUT)
export const updateBook = async (book) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${book.id}`,
        book
    );
    return data;
};

// Kitabı silme (DELETE)
export const deleteBook = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`
    );
    return data;
};
