// @ts-nocheck

import { User } from '../data/index.ts';

function updateUserAvatar(userId, newAvatar) {
    return User.updateOne({ _id: userId }, { $set: { avatar: newAvatar } })
        .then(result => {
            if (result.modifiedCount === 0) {
                throw new Error('The user was not found or the avatar was already updated.');
            }
            return 'Avatar updated successfully';
        })
        .catch(error => {
            throw new Error('Error updating user avatar: ' + error.message);
        });
}

export default updateUserAvatar;
