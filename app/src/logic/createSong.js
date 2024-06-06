import { validate, errors } from 'com'

function createSong(song) {
    validate.token(sessionStorage.token)
    const json = JSON.stringify(song);

    return fetch(`${import.meta.env.VITE_API_URL}/songs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.token}`
        },
        body: json
    })
        .then(res => {
            if (res.status === 201)
                return res.json();
            else
                throw new Error('Error creating song');
        });
}

export default createSong;
