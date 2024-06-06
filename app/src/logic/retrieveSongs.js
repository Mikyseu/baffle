import { validate, errors } from 'com'

async function retrieveSongs(userFavorites) {
    validate.token(sessionStorage.token)

    if (userFavorites) {
        const userFavoritesList = await getUserFavorites()

        console.log(userFavoritesList)

        const mapFavorites = userFavoritesList.map(song => {
            return { ...song, favorite: true }
        })
        return mapFavorites
    }

    return getAllSongs()

}

const getUserFavorites = async () => {

    return await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    }).then(res => {
        if (res.status === 200)
            return res.json()
        throw new Error(message)
    }
    )

}

const getAllSongs = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/songs`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })

        .then(async res => {
            if (res.status === 200) {
                const songList = await res.json()
                const userFavorites = await getUserFavorites()

                const consolidateList = songList.map(song => {
                    const songFound = userFavorites.find(element =>
                        element.sunoId === song.sunoId
                    )

                    if (songFound) {
                        return { ...song, favorite: true }
                    }
                    return song
                })

                return consolidateList
            }


        })

}

export default retrieveSongs