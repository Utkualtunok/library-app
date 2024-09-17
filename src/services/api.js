// api.js
export const api = {
    fetchPublishers: () => fetch('/api/v1/publishers').then(res => res.json()),
};
