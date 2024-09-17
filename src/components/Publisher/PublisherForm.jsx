// PublisherForm.jsx
import React, { useState } from 'react';

const PublisherForm = ({ onSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default PublisherForm;
