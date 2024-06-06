import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema


type UserType = {
    name: string
    email: string
    username: string
    password: string
    avatar?: string
    favorites: Array<String>
}

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,

    },

    favorites: {
        type: Array,
    }

})

type SongType = {
    user: ObjectId
    title: string
    sunoId: string
}

const song = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    sunoId: {
        type: String,
        required: true
    }
})

const User = model<UserType>('User', user)
const Song = model<SongType>('Song', song)

export {
    UserType,
    User,
    SongType,
    Song
}

