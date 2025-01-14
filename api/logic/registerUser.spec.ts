import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds a new user', () =>
        User.deleteMany()
            .then(() => logic.registerUser('Miky Seu', 'miky@seu.com', 'Miky', '123qwe123'))
            .then(() => User.findOne({ username: 'Miky' }))
            .then(user => {
                expect(!!user).to.be.true
                expect(user.name).to.equal('Miky Seu')
                expect(user.email).to.equal('miky@seu.com')
                expect(user.username).to.equal('Miky')
                expect(user.password).to.equal('123qwe123')
                expect(user.avatar).to.equal('')
            })
    )

    it('fails on existing users', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Miky Seu', email: 'miky@seu.com', username: 'Miky', password: '123qwe123' }))
            .then(() =>
                logic.registerUser('Miky Seu', 'miky@seu.com', 'Miky', '123qwe123')
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            )
    )

    it('fails on non string name', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerUser(123, 'miky@seu.com', 'Miky', '123qwe123')
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('name 123 is not a string')
    })

    it('fails on empty name', () => {
        let errorThrown

        try {
            logic.registerUser('', 'miky@seu.com', 'Miky', '123qwe123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('name >< is empty or blank')
    })

})

