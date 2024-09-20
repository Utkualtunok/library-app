import axios from "axios";

// Tüm yayıncıları getirme
export const getPublishers = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers"
    );
    console.log(data);
    return data;
};

// ID'ye göre yayıncı getirme
export const getPublisherById = async (id) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`
    );
    return data;
};

// Yeni yayıncı oluşturma
export const createPublisher = async (publisher) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`,
        publisher
    );
    return data;
};

// Yayıncıyı güncelleme (PUT)
export const updatePublisher = async (publisher) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${publisher.id}`,
        publisher
    );
    return data;
};

// Yayıncıyı silme (DELETE)
export const deletePublisher = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`
    );
    return data;
};
