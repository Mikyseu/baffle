// @ts-nocheck
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Song } from '../data/index.ts';
import logic from './index.ts';
import { expect } from 'chai';
import { errors } from 'com';

dotenv.config();

const { DuplicityError, CredentialsError, NotFoundError } = errors;

describe('updateUserAvatar', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URL);
    });

    it('updates user avatar', async () => {
        await User.deleteMany();

        const user = await User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Mikyseu', password: '123qwe123' });

        await logic.updateUserAvatar(user.id, 'avatar');

        const updatedUser = await User.findById(user.id);

        expect(updatedUser.avatar).to.equal('avatar');
    });

    after(async () => {
        await mongoose.disconnect();
    });

});
