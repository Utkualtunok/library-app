import axios from "axios";

// Tüm yazarları getirme
export const getAuthors = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors"
    );
    console.log(data);
    return data;
};

// ID'ye göre yazar getirme
export const getAuthorById = async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${id}`
    );
    return data;
};

// Yeni yazar oluşturma
export const createAuthor = async (author) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`,
        author
    );
    return data;
};

// Yazar güncelleme (PUT)
export const updateAuthor = async (author) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${author.id}`,
        author
    );
    return data;
};

// Yazarı silme (DELETE)
export const deleteAuthor = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${id}`
    );
    return data;
};
