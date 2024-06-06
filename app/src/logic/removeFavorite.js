import { validate, errors } from 'com'

function removeFavorite(songId) {
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/favorites/${songId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if (res.status === 200) {

                return;
            } else {

                return res.json()
                    .then(body => {
                        const { error, message } = body
                        const constructor = errors[error]
                        throw new constructor(message)
                    })
            }
        })
}

export default removeFavorite
