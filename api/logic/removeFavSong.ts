// @ts-nocheck

import { NotFoundError, SystemError } from "../../com/errors.ts";
import { User } from "../data/index.ts";

function removeFavSong(songId, userId) {
    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`User with id ${userId} not found`);
            const index = user.favorites.indexOf(songId);
            if (index === -1) throw new Error(`Song with id ${songId} not found in favorites`);
            user.favorites.splice(index, 1);
            return user.save();
        })
        .catch(error => {
            throw new SystemError(error.message);
        });
}

export default removeFavSong;
