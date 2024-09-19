import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { fetchAuthors } from '../services/api';

function Homepage() {
    const [authors, setAuthors] = useState([]); 

    useEffect(() => {
        fetchAuthors()
            .then((response) => {
                setAuthors(response.data); 
            })
            .catch((error) => {
                console.error("Error fetching authors:", error);
            });
    }, []);

    return (
        <Container>
            <h1>Test</h1>
            {authors.map((item, index) => (
                <ul key={index}>
                    <li>
                        {item.name} - {item.birthDate} - {item.country}
                    </li>
                </ul>
            ))}
        </Container>
    );
}

export default Homepage;
