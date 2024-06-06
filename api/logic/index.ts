import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'

import createSong from './createSong.ts'
import retrieveSongs from './retrieveSongs.ts'

import updateUserAvatar from './updateUserAvatar.ts'
import removeFavSong from './removeFavSong.ts'
import addFavSong from './addFavSong.ts'
import retrieveFavSongs from './retrieveFavSongs.ts'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,

    createSong,
    retrieveSongs,

    removeFavSong,
    addFavSong,
    retrieveFavSongs,

    updateUserAvatar
}

export default logic