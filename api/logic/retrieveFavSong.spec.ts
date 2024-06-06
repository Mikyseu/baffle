// @ts-nocheck
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import { User, Song } from '../data/index.ts';
import logic from './index.ts';
import { expect } from 'chai';
import { errors } from 'com';


dotenv.config();

const { NotFoundError } = errors;

describe('retrieveFavSongs', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves favorite songs by a specific user', () =>
        Promise.all([
            User.deleteMany({}),
            Song.deleteMany({})
        ])
            .then(() => User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Miky', password: '123qwe123' }))
            .then(user =>
                Song.create({ user: new ObjectId(), title: 'title', sunoId: 'string' }))

            .then(song =>
                User.create({ name: 'Pau', email: 'pau@gmail.com', username: 'Pau', password: '123qwe123', favorites: [song.id] }))

            .then(user => {
                logic.retrieveFavSongs(user.id)
                    .then((songs) => {
                        expect(songs).to.be.an('array')
                        expect(songs.length).to.equal(1)
                        expect(songs[0].title).to.equal('title')
                        expect(songs[0].sunoId).to.equal('string')
                        expect(songs[0].user.toString()).to.equal(user.id);
                    })
            })
    )

    it('retrieves favorite songs by a specific user', () => {
        Promise.all([
            User.deleteMany({}),
            Song.deleteMany({})
        ])
            .then(() => User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Miky', password: '123qwe123' }))
            .then(user => {
                const song = Song.create({ user: user.id, title: 'title', sunoId: 'string' });
                user.favorites.push(song.id);
                return user.save();
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError);
                expect(error.message).to.equal('User not found');
            })
    });

    it('retrieves favorite songs by a non-existing user', () => {
        Promise.all([
            User.deleteMany({}),
            Song.deleteMany({})
        ])
            .then(() => User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Miky', password: '123qwe123' }))
            .then(user => {
                const song = Song.create({ user: user.id, title: 'title', sunoId: 'string' });
                user.favorites.push(song._id);
                return user.save();
            })
            .then(user => {
                return logic.retrieveFavSongs('non-existing-user-id');
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError);
                expect(error.message).to.equal('User not found');
            })
    });

    after(() => mongoose.disconnect());
});
