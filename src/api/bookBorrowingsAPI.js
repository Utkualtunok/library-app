import axios from "axios";

// Tüm kitap ödünç alma işlemlerini getirme
export const getBookBorrowings = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows"
    );
    console.log(data);
    return data;
};

// ID'ye göre kitap ödünç alma işlemi getirme
export const getBookBorrowingById = async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${id}`
    );
    return data;
};

// Yeni kitap ödünç alma işlemi oluşturma
export const createBookBorrowing = async (bookBorrowing) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`,
        bookBorrowing
    );
    return data;
};

// Kitap ödünç alma işlemini güncelleme (PUT)
export const updateBookBorrowing = async (bookBorrowing) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${bookBorrowing.id}`,
        bookBorrowing
    );
    return data;
};

// Kitap ödünç alma işlemini silme (DELETE)
export const deleteBookBorrowing = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${id}`
    );
    return data;
};
