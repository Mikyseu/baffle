import registerUser from './registerUser'
import loginUser from './loginUser'
import retrieveUser from './retrieveUser'
import logoutUser from './logoutUser'
import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isUserLoggedIn'
import cleanUpLoggedInUserId from './cleanUpLoggedInUserId'

import retrieveSongs from './retrieveSongs'
import createSong from './createSong'

import updateUserAvatar from './updateUserAvatar'
import addFavorite from './addFavorite'
import removeFavorite from './removeFavorite'


const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,

    retrieveSongs,
    createSong,

    updateUserAvatar,
    addFavorite,
    removeFavorite
}

export default logic