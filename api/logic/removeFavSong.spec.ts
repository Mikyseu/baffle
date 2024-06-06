// @ts-nocheck
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Song } from '../data/index.ts';
import logic from './index.ts';
import { expect } from 'chai';
import { errors } from 'com';

dotenv.config();

const { DuplicityError, CredentialsError, NotFoundError } = errors;

describe('removeFavSong', () => {
    let _user;
    let _song;

    before(() => {
        mongoose.connect(process.env.MONGODB_TEST_URL);
        return Promise.all([
            User.deleteMany({}),
            Song.deleteMany({})
        ])
            .then(() => User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Mikyseu', password: '123qwe123' }))
            .then(user => {
                _user = user;
                return Song.create({ user: user.id, title: 'title', sunoId: 'string' });
            })
            .then(song => {
                _song = song;
                _user.favorites.push(song.id);
                return _user.save();
            });
    });

    it('remove song from favorite', () => {
        return logic.removeFavSong(_song.id, _user.id)
            .then(() => User.findById(_user.id))
            .then(user => {
                expect(user.favorites).to.not.include(_song.id);
            });
    });

    after(() => {
        mongoose.disconnect();
    });
});
