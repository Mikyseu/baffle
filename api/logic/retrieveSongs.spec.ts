// @ts-nocheck
import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Song } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { DuplicityError, CredentialsError, NotFoundError } = errors

describe('retrieveSongs', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves all songs for existing user', () =>
        Promise.all([
            User.deleteMany(),
            Song.deleteMany()
        ])
            .then(() =>
                User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Miky', password: '123qwe123' })
                    .then(user =>
                        Promise.all([
                            Song.create({ user: user._id.toString(), title: 'Marching to Success', sunoId: '4815c59a-56ad-4870-92c2-8a4713d8da88' }),
                            Song.create({ user: user._id.toString(), title: 'afro-jazz verdean', sunoId: '512ff9f2-3990-4005-b410-5f56a81eea45' }),
                            Song.create({ user: user._id.toString(), title: 'ambient house 16-bit', sunoId: 'fe2e6d06-1dd5-4458-8426-6cb742fce01c' }),
                        ])
                            .then(([song1, song2, song3]) =>
                                logic.retrieveSongs(user._id.toString())
                                    .then(songs => {
                                        expect(songs).to.have.lengthOf(3)

                                        const foundSong1 = songs.find(song => song.title === song1.title)

                                        expect(foundSong1.title).to.equal('Marching to Success')


                                        const foundSong2 = songs.find(song => song.title === song2.title)

                                        expect(foundSong2.title).to.equal('afro-jazz verdean')


                                        const foundSong3 = songs.find(song => song.title === song3.title)

                                        expect(foundSong3.title).to.equal('ambient house 16-bit')

                                    })
                            )
                    )
            )
    )




    it('retrieves an empty array when there are no songs for the user', () =>
        Promise.all([
            User.deleteMany(),
            Song.deleteMany()
        ])
            .then(() =>
                User.create({ name: 'Pol Jan', email: 'pol@jan.com', username: 'Pol', password: '123qwe123' })
                    .then(user =>
                        logic.retrieveSongs(user.id)
                            .then(songs => {
                                expect(songs).to.have.lengthOf(0)
                            })
                    )
            )
    )

    after(() => mongoose.disconnect())
})