// @ts-nocheck

import mongoose from 'mongoose';

import { validate, errors } from 'com';
import { User, Song } from '../data/index.ts'


const { SystemError, NotFoundError, DuplicityError } = errors;

const { Types: { ObjectId } } = mongoose



function createSong(userId: string, title: string, sunoId: string): Promise<any> {
    validate.text(userId, 'userId', true);
    validate.text(title, 'title');
    validate.text(sunoId, 'sunoId');

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found');
            return Song.findOne({ sunoId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then((song) => {
                    if (song) throw new DuplicityError('song already exists')
                    const newSong = {
                        user: new ObjectId(userId),
                        title: title,
                        sunoId: sunoId
                    }
                    return Song.create(newSong)
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}

export default createSong;
