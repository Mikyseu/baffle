// @ts-nocheck

import { User, Song } from "../data/index.ts";
import { SystemError } from "../../com/errors.ts";

function retrieveFavSongs(userId) {
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            const promises = user.favorites.map(id => {
                return Song.findById(id);
            });

            return Promise.all(promises)
                .then(songFavList => {
                    return songFavList.map(({ _id, title, sunoId, user }) => ({
                        id: _id.toString(),
                        title,
                        sunoId,
                        user: user.toString()
                    }));
                });
        });
}

export default retrieveFavSongs;
