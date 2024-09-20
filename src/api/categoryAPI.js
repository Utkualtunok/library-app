import axios from "axios";

// Tüm kategorileri getirme
export const getCategories = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories"
    );
    console.log(data);
    return data;
};

// ID'ye göre kategori getirme
export const getCategoryById = async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`
    );
    return data;
};

// Yeni kategori oluşturma
export const createCategory = async (category) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`,
        category
    );
    return data;
};

// Kategoriyi güncelleme (PUT)
export const updateCategory = async (category) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${category.id}`,
        category
    );
    return data;
};

// Kategoriyi silme (DELETE)
export const deleteCategory = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`
    );
    return data;
};
